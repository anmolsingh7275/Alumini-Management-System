import { useEffect, useState } from "react";
import api from "../services/api";

/**
 * useFetch - simple data fetching hook
 * @param {string} url - API endpoint (e.g. '/jobs')
 * @param {Array} deps - dependency array
 */
export default function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get(url)
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
    // eslint-disable-next-line
  }, deps); // caller supplies deps (e.g. [])
  return { data, loading, error };
}
