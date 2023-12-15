/// <reference types="vite-plugin-svgr/client" />
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { TreeView } from "./components/TreeView";
import { AuthContextProvider } from "./context/authorization-store";
import { useFetch } from "./hooks/useFetch";
import { SearchContextProvider } from "./context/search-store";
import { Data } from "./types";

function App() {
  const { data, isLoading } = useFetch<Data>("./data.json");

  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <Header />
        <div className="w-96 p-3 mx-auto mt-10">
          <SearchBar />
          {isLoading && <div>Loading...</div>}
          <ul className="space-y-2 py-2 text-left text-gray-500 dark:text-gray-400">
            {data?.items.map((file) => (
              <TreeView key={file.id} data={file} />
            ))}
          </ul>
        </div>
      </SearchContextProvider>
    </AuthContextProvider>
  );
}

export default App;
