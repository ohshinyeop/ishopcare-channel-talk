import { useState } from "react";

export function useIsVisible() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onVisible = () => {
    setIsVisible(true);
  };

  const onHidden = () => {
    setIsVisible(false);
  };

  const onToggleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  return {
    isVisible,
    onVisible,
    onHidden,
    onToggleVisible,
  };
}
