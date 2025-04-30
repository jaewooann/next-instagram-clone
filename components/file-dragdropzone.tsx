"use client";

import { uploadFile } from "actions/storageActions";
import { useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "config/reactQueryClientProvider";
import { useDropzone } from "react-dropzone";
import { Spinner } from "@material-tailwind/react";

export default function FileDragDropZone() {
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();

      acceptedFiles.forEach((file) => {
        formData.append(file.name, file);
      });

      const result = await uploadImageMutation.mutate(formData);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col justify-center items-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {uploadImageMutation.isPending ? (
        <Spinner />
      ) : (
        <>
          {isDragActive ? (
            <p>파일을 놓아주세요.</p>
          ) : (
            <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
          )}
        </>
      )}
    </div>
  );
}
