import { useEffect, useMemo, useReducer } from "react";

export interface State<TData> {
  loading: boolean;
  error: string | undefined;
  data: TData | undefined;
}
export type Cache<TData> = Record<string, TData>;
export type Action<TData> =
  | { type: "loading" }
  | { type: "error"; payload: { message: string } }
  | { type: "success"; payload: { data: TData } };

const abortController = new AbortController();

export const useFetch = <TData>(url: string, options?: RequestInit) => {
  const cache: Cache<TData> = useMemo(() => ({}), []);
  const initialState: State<TData> = {
    loading: false,
    data: undefined,
    error: undefined
  };
  const fetchReducer = (
    initialState: State<TData>,
    action: Action<TData>
  ): State<TData> => {
    switch (action.type) {
      case "success":
        return { error: undefined, loading: false, data: action.payload.data };
      case "loading":
        return { ...initialState, loading: true, error: undefined };
      case "error":
        return {
          ...initialState,
          loading: false,
          error: action.payload.message
        };
      default:
        return initialState;
    }
  };
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (cache[url]) {
      console.log("USING Cache");
      dispatch({ type: "success", payload: { data: cache[url] } });
      return;
    }
    fetch(url, { ...options, signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "success", payload: { data } });
        cache[url] = data;
      })
      .catch((error) =>
        dispatch({
          type: "error",
          payload: { message: error?.message ?? "Failed to fetch" }
        })
      );
  }, [cache, url, options]);
  return { ...state };
};
