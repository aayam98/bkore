import React from "react";
import { useAtom } from "jotai";
import { toastAtom } from "state/atoms";
import Toaster from "./Toaster";

const ToasterContainer: React.FC = () => {
  const [toasts, setToasts] = useAtom(toastAtom);

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div>
      {toasts.map((toast) => (
        <Toaster
          key={toast.id}
          id={toast.id}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default ToasterContainer;
