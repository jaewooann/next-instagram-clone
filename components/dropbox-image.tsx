"use client";

import { IconButton, Spinner } from "@material-tailwind/react";
import { getImageUrl } from "utils/supabase/storage";
import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "actions/storageActions";
import { queryClient } from "config/reactQueryClientProvider";

export default function DropboxImage({ image }: { image: any }) {
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
  return (
    <div className="relative w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* image */}
      <div>
        <img
          src={getImageUrl(image.name)}
          alt="cutedog"
          className="w-full aspect-square"
        />
      </div>

      {/* filename */}
      <div>{image.name}</div>

      <div className="absolute top-4 right-4">
        <IconButton
          onClick={() => {
            deleteFileMutation.mutate(image.name);
          }}
          color="red"
        >
          {deleteFileMutation.isPending ? (
            <Spinner />
          ) : (
            <i className="fas fa-trash"></i>
          )}
        </IconButton>
      </div>
    </div>
  );
}
