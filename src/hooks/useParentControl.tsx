import { useEffect, useState } from "react";
import { useSearchContext } from "./useSearchContext";
import { useAuthContext } from "./useAuthContext";
import { authPermitsHandler, recursiveSearch } from "../utils";
import { File, Directory, DocumentType } from "../types";




export const useParentControl = (initialIsOpen: boolean, data: File | Directory) => {
  const { authLevel } = useAuthContext()  
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isEmpty, setIsEmpty] = useState(true);
  const { search,  setHasResult } = useSearchContext()

  const isSearchItem = !!search && data.name.toLowerCase().includes(search);
  const docType: DocumentType = 'extension' in data ? 'file' : 'children' in data ? 'directory' : 'unknown'
  const isAuthPermitted = authPermitsHandler(authLevel, data);

  useEffect(() => {
    if(!authPermitsHandler(authLevel, data)) return;
    if(isSearchItem) setHasResult(true);
    if( docType === 'directory' && (data as Directory).children.length) {
      setIsEmpty(false)
      
      if(search && !isSearchItem && recursiveSearch(data as Directory, search, authLevel)) {
        setIsOpen(true);
        setHasResult(true);
      }
    }
  }, [search, data, docType, isSearchItem, setHasResult, authLevel]);

  return { 
    isOpen, 
    setIsOpen, 
    isEmpty, 
    isSearchItem: isAuthPermitted && isSearchItem,
    docType
  };
};
