import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import axios from "../utils/axios";
import { useState } from "react";

import { loadLazyRecipe } from "../store/reducers/RecipeSlice";

const useRegister = (initialCursor = null) => {
  const dispatch = useDispatch();

  const recipe = useSelector((state) => state.recipes.data) || [];
  const userId = useSelector((state) => state?.users?.data?.data?.user?._id);

  const [cursor, setCursor] = useState(initialCursor);
  const abortRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    try {
      const params = { limit: 6 };
      if (cursor) params.after = cursor;
      if (userId) params.userId = userId;

      const res = await axios.get("/recipes", { params, signal });
      const newItems = res.data?.recipes ?? [];
      const nextCursor = res.data?.nextCursor ?? null;
      const remoteHasMore = !!res.data?.hasMore;

      if (newItems.length === 0) {
        setHasMore(false);
        setCursor(null);
        return;
      }

      const existingIds = new Set((recipe || []).map((r) => r._id ?? r.id));
      const itemsToAdd = newItems.filter(
        (i) => !existingIds.has(i._id ?? i.id)
      );

      if (itemsToAdd.length > 0) {
        dispatch(loadLazyRecipe(itemsToAdd));
      } else {
        // console.log(
        //   "All fetched items were duplicates — advanced cursor to avoid loop."
        // );
      }

      setCursor(nextCursor);
      setHasMore(remoteHasMore);

      if (!remoteHasMore) {
        setHasMore(false);
      }
    } catch (error) {
      if (error?.code === "ERR_CANCELED" || error?.name === "AbortError") {
        // ignore aborted requests
      } else {
        console.error("fetch error", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);
  return { recipe, hasMore, fetchRecipes, isLoading };
};

export default useRegister;
