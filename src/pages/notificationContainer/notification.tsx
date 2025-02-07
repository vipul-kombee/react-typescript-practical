import { toast } from "react-toastify";

export const notification = (message: string, type: any) => {
  toast(message, {
    type: type,
  });
};
