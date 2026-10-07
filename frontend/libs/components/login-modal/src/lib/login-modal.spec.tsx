import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { LoginModal } from "./login-modal";
import { useLoginModalStore } from "./useLoginModalStore";

const { native } = vi.hoisted(() => ({ native: vi.fn() }));
vi.mock("@tauri-apps/api/core", () => ({ invoke: native }));
vi.mock("@storyteller/api", () => { throw new Error("Login only imports API types"); });
vi.mock("qrcode.react", () => ({ QRCodeSVG: () => <svg aria-label="Login QR" /> }));
const USER = { user_token: "user_feishu", username: "feishu_test" };
beforeEach(() => {
  vi.useFakeTimers();
  useLoginModalStore.setState({ isOpen: true, recheckTrigger: 0 });
  native.mockReset().mockImplementation(async (command: string) => {
    if (command === "storyteller_get_login_session_command") return null;
    if (command === "storyteller_create_login_challenge_command") return {
      challenge_id: "handle", verification_url: "https://proxy.example/login/desktop#approval_token=abc",
      confirmation_code: "ABCDEFGH", expires_at: new Date(Date.now() + 600_000).toISOString(), poll_interval_seconds: 5,
    };
    if (command === "storyteller_poll_login_challenge_command") return { status: "redeemed", maybe_user: USER };
  });
});
afterEach(() => { cleanup(); vi.useRealTimers(); });

it("offers Feishu browser and QR login without password or signup forms", async () => {
  await act(async () => { render(<LoginModal />); });
  expect(screen.getByRole("button", { name: "使用飞书登录" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "扫码登录" })).toBeTruthy();
  expect(document.querySelector('input[type="password"]')).toBeNull();
});
it("finishes native login and closes the modal", async () => {
  const success = vi.fn();
  await act(async () => { render(<LoginModal onArtCraftAuthSuccess={success} />); });
  await act(async () => { fireEvent.click(screen.getByRole("button", { name: "使用飞书登录" })); });
  await act(async () => { await vi.advanceTimersByTimeAsync(5000); });
  expect(success).toHaveBeenCalledExactlyOnceWith(USER);
  expect(useLoginModalStore.getState().isOpen).toBe(false);
});
it("a stale startup response cannot reopen the modal after login", async () => {
  let resolveStartup!: (value: null) => void;
  const implementation = native.getMockImplementation()!;
  native.mockImplementation((command: string, ...args: unknown[]) => command === "storyteller_get_login_session_command"
    ? new Promise(resolve => { resolveStartup = resolve; }) : implementation(command, ...args));
  const success = vi.fn();
  await act(async () => { render(<LoginModal onArtCraftAuthSuccess={success} />); });
  await act(async () => { fireEvent.click(screen.getByRole("button", { name: "使用飞书登录" })); });
  await act(async () => { await vi.advanceTimersByTimeAsync(5000); });
  await act(async () => { resolveStartup(null); });
  expect(success).toHaveBeenCalledTimes(1);
  expect(useLoginModalStore.getState().isOpen).toBe(false);
});
