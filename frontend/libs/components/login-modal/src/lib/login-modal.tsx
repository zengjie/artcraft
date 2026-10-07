import { useEffect, useRef, useState } from "react";
import type { UserInfo } from "@storyteller/api";
import { DesktopLoginBridge } from "./DesktopLoginBridge";
import { getNativeLoginSession } from "./NativeLoginBridge";
import { useLoginModalStore } from "./useLoginModalStore";

interface LoginModalProps {
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  onArtCraftAuthSuccess?: (user: UserInfo) => void;
  isSignUp?: boolean;
  videoUrl?: string;
  videoSrc2D?: string;
  videoSrc3D?: string;
}

export function LoginModal(props: LoginModalProps) {
  const { isOpen, recheckTrigger, openModal, closeModal } = useLoginModalStore();
  const [error, setError] = useState("");
  const callbacks = useRef(props);
  const generation = useRef(0);
  callbacks.current = props;
  const complete = (user: UserInfo) => {
    generation.current += 1;
    callbacks.current.onArtCraftAuthSuccess?.(user);
    closeModal();
    callbacks.current.onClose?.();
  };
  useEffect(() => {
    const current = ++generation.current;
    let active = true;
    getNativeLoginSession().then(user => {
      if (!active || current !== generation.current) return;
      if (user) complete(user);
      else openModal();
    }).catch(() => {
      if (!active || current !== generation.current) return;
      setError("无法连接登录服务，请检查 Proxy 地址后重试。");
      openModal();
    });
    return () => { active = false; };
  }, [recheckTrigger, openModal, closeModal]);
  useEffect(() => { callbacks.current.onOpenChange?.(isOpen); }, [isOpen]);
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
    <section role="dialog" aria-modal="true" aria-labelledby="feishu-login-title" className="w-full max-w-md border border-white/20 bg-[#1e1f22] p-8 text-white">
      <img src="/resources/logo/artcraft-icon.png" alt="ArtCraft" className="mb-6 h-8" />
      <h1 id="feishu-login-title" className="mb-3 text-2xl">登录 ArtCraft</h1>
      <p className="mb-6 text-sm text-white/60">使用飞书账号登录，开始创作。</p>
      <DesktopLoginBridge onStart={() => { generation.current += 1; setError(""); }} onSuccess={complete} />
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
    </section>
  </div>;
}
export default LoginModal;
