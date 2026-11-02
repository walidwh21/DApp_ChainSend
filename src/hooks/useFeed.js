import { useCallback, useEffect, useState } from "react";
import { config } from "../lib/config";
import { fetchCount, fetchLatest } from "../lib/ledger";

/** Loads the newest-first activity feed with "load more" paging. */
export function useFeed(enabled) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError("");
    try {
      const [count, page] = await Promise.all([fetchCount(), fetchLatest(0, config.pageSize)]);
      setTotal(count);
      setItems(page);
    } catch (e) {
      setError("Could not read the ledger. Check the contract address and network.");
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const page = await fetchLatest(items.length, config.pageSize);
      setItems((prev) => [...prev, ...page]);
    } finally {
      setLoading(false);
    }
  }, [items.length]);

  useEffect(() => { refresh(); }, [refresh]);

  return { items, total, loading, error, refresh, loadMore, hasMore: items.length < total };
}
