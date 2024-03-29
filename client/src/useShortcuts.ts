import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Shortcut {
  [key: string]: () => void;
}

const useKeyboard = (
  gameId: string | undefined,
  shortcuts: Shortcut | undefined = undefined
) => {
  const push = useNavigate();
  const keyup = ({ code }: any) => {
    console.log(code);
    if (code === "F2") push(`/top/${gameId}`);
    if (code === "F4") push(`/run/${gameId}`);
    if (shortcuts) {
      const custom = shortcuts[code];
      if (custom) {
        custom();
      }
    }
  };

  useEffect(() => {
    window?.addEventListener("keyup", keyup, false);
    return () => {
      window?.removeEventListener("keyup", keyup);
    };
  }, []);
};

export default useKeyboard;
