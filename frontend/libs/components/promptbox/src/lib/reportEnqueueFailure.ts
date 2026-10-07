import { toast } from "@storyteller/ui-toaster";
import { commandErrorMessage } from "@storyteller/tauri-api";
import { useLoginModalStore } from "@storyteller/ui-login-modal";
import { enabled as falServiceActive } from "@storyteller/fal-proxy";

interface EnqueueFailure {
  status?: string;
  error_type?: string;
  error_message?: string;
}

/**
 * Surfaces a failed generation. A 401 from the official ArtCraft API means the
 * chosen model runs on ArtCraft's own service and the person is not logged in
 * there; say so in plain words and open the login modal instead of showing
 * the raw JSON.
 */
export function reportEnqueueFailure(reason: unknown, fallback: string, modelName?: string) {
  const failure = (reason ?? {}) as EnqueueFailure;
  const unauthorized =
    failure.status === "unauthorized" ||
    failure.error_type === "unauthorized" ||
    /"error_code"\s*:\s*401/.test(String(failure.error_message ?? ""));
  if (unauthorized && falServiceActive) {
    toast.error("The FAL session has expired. Reconnect with Feishu in Settings, under Accounts.");
    return;
  }
  if (unauthorized) {
    toast.error(
      `${modelName ?? "This model"} runs on ArtCraft's own service. Log in to your ArtCraft account to use it, or switch the generation service to FAL in Settings.`,
    );
    useLoginModalStore.getState().openModal();
    return;
  }
  toast.error(commandErrorMessage(reason, fallback));
}
