import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ToastState {
  message: string;
  visible: boolean;
}

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    visible: false,
  });

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
  }, []);

  useEffect(() => {
    if (!toast.visible) return;
    const id = window.setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3200);
    return () => window.clearTimeout(id);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`pointer-events-none fixed left-1/2 z-50 w-[min(92%,420px)] -translate-x-1/2 transition-all duration-300 ease-out ${
          toast.visible
            ? "translate-y-0 opacity-100"
            : "translate-y-3 opacity-0"
        }`}
        style={{
          bottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))",
        }}
        role="status"
        aria-live="polite"
      >
        {toast.message ? (
          <div className="rounded-panel border border-nykaa-pink/30 bg-nykaa-ink px-4 py-3 text-sm text-white shadow-lg">
            {toast.message}
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
