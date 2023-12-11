import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseData: T = await response.json();

        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        if(error instanceof Error) {
            setError(error.message);
        }
        setError('Something went wrong! Error occured while fetching data.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data, error };
}
