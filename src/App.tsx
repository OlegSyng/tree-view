import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { TreeView } from "./components/TreeView";
import { AuthContextProvider } from "./context/authorization-store";
import { useFetch } from "./hooks/useFetch";
import { IFileData } from "./types";
import { SearchContextProvider } from "./context/search-store";

function App() {
  const { data, isLoading } = useFetch<IFileData>("./data.json");

  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <Header />
        <div className="w-96 p-3 mx-auto mt-10">
          <SearchBar data={data?.items} />
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
