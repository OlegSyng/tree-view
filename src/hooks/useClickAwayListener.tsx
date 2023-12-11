import { useState, useEffect, useRef } from "react";

export const useClickAwayListener = (initialIsOpen: boolean) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  return { ref, isOpen, setIsOpen };
};
