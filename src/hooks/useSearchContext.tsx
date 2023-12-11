import { useContext } from "react";
import { SearchContext } from "../context/search-store";

export function useSearchContext() {
    return useContext(SearchContext)
}