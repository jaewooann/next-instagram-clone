"use client";

import { useQuery } from "@tanstack/react-query";
import MovieCard from "./movie-card";
import { Spinner } from "@material-tailwind/react";
import { searchMovies } from "actions/movieActions";
import { useRecoilValue } from "recoil";
import { searchState } from "utils/recoil/atoms";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function MovieCardList() {
  const search = useRecoilValue(searchState);
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["movie", search],
      queryFn: ({ pageParam }) =>
        searchMovies({ search, page: pageParam, pageSize: 12 }),
      getNextPageParam: (lastPage) =>
        lastPage.page ? lastPage.page + 1 : null,
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    console.log(inView);
  }, [inView]);

  return (
    <div className="grid md:grid-cols-4 grid-cols-3 w-full gap-1 h-full">
      {(isFetching || isFetchingNextPage) && <Spinner className="w-12 h-12" />}
      {
        <>
          {data?.pages
            ?.map((page) => page.data)
            ?.flat()
            ?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          <div ref={ref} className="h-1"></div>
        </>
      }
    </div>
  );
}
