import { useState, useEffect, useRef } from "react";
import { useSearchContext } from "./useSearchContext";

export const useParentControl = (initialIsOpen: boolean, name: string) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isEmpty, setIsEmpty] = useState(true);
  const { search,  setHasResult } = useSearchContext()
  const ref = useRef<HTMLUListElement>(null);

  const isSearchItem = !!search && name.toLowerCase().includes(search);

  useEffect(() => {
    if(isSearchItem) {
        setHasResult(true);
    }
  }, [isSearchItem, setHasResult])

  useEffect(() => {
    if (ref.current && ref.current.hasChildNodes()) {
        setIsEmpty(false);
    }  
    if (search && ref.current && ref.current.hasChildNodes()) {
        for (const child of ref.current.childNodes) {
            if(child.textContent?.toLowerCase().includes(search)) {
                setIsOpen(true);
                setHasResult(true);
                break;
            } 
        }
    }

  }, [ref, search,isSearchItem, setHasResult]);

  return { ref, isOpen, setIsOpen, isEmpty, isSearchItem };
};
