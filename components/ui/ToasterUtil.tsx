import { useSetAtom } from "jotai";
import { toastAtom } from "state/atoms";
import { ToasterProps } from "./Toaster";


export const UseToster = () => {
  const setToasts = useSetAtom(toastAtom);

  const addToaster = (toast: Omit<ToasterProps, "id">) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { ...toast, id: Date.now() }, 
    ]);
  };

  return { addToaster };
};
