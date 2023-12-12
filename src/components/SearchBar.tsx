import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useSearchContext } from "../hooks/useSearchContext";
import { useAuthContext } from "../hooks/useAuthContext";
import SearchIcon from "../assets/search.svg?react";
import XMarkIcon from "../assets/xmark.svg?react";
import InfoIcon from "../assets/info.svg?react";
import { IFile } from "../types";

interface ISearchBarProps {
  data?: IFile[];
}

function recursiveFindItem(searchQuery: string, items?: IFile[]): IFile | null {
  if(!items) return null;

  const item = items?.find((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );
  if (item) return item;

  for (const item of items) {
    const result = recursiveFindItem(searchQuery, item.children);
    if (result) return result;
  }

  return null;
}

export const SearchBar: FC<ISearchBarProps> = ({ data }) => {
  const { searchItem, setSearchItem } = useSearchContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const {authLevel} = useAuthContext();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(searchQuery.trim().length === 0) return;
    const item = recursiveFindItem(searchQuery.trim(), data);
    if(item && item.authLevel > authLevel) return;
    setSearchItem(item);
    setIsSubmitted(true);
  }

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery.toLowerCase());
  }

  function handleResetSearch() {
    setSearchItem(null);
    setSearchQuery("");
    setIsSubmitted(false);
  }

  const showNotification = isSubmitted && !searchItem;

  return (
    <>
      <form onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            id="search-input"
            data-testid="search-input"
            value={searchQuery}
            onChange={handleSearchInput}
            name="search-input"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search file..."
            required
          />
          <button
            type="button"
            data-testid="cancel-search-button"
            className={`absolute top-1/2 -translate-y-1/2 end-24 ${
              searchQuery ? "block" : "hidden"
            }`}
            onClick={handleResetSearch}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          <button
            type="submit"
            data-testid="submit-search-button"
            className="text-white absolute top-1/2 -translate-y-1/2 end-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {showNotification && <div
        className="flex items-center p-2 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50"
        role="alert"
      >
        <InfoIcon className="w-5 h-5 mr-2" />
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">No item found!</span> Please try again.
        </div>
      </div>}
    </>
  );
};
