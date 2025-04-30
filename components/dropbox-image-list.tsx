"use client";

import { searchFiles } from "actions/storageActions";
import DropboxImage from "./dropbox-image";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
export default function DropboxImageList({
  searchInput,
}: {
  searchInput: string;
}) {
  const searchImageQuery = useQuery({
    queryKey: ["images", searchInput],
    queryFn: () => searchFiles(searchInput),
  });

  return (
    <section className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2">
      {searchImageQuery.isLoading && <Spinner />}
      {searchImageQuery.data &&
        searchImageQuery.data.map((image) => (
          <DropboxImage key={image.id} image={image} />
        ))}
    </section>
  );
}
