"use client";

import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <div className="col-span-1 relative">
      {/*  image */}
      <img className="w-full" src={movie.image_url} />
      {/* ,"Follow the mythic journey of Paul Atreides as he unites
      with Chani and the Fremen while on a path of revenge against the
      conspirators who destroyed his family. Facing a choice between the love of
      his life and the fate of the known universe, Paul endeavors to prevent a
      terrible future only he can foresee.",8.3,3437.313,2024-02-27 */}

      {/* title dim */}
      <Link href={`/movies/${movie.id}`}>
        <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 z-10 transition-opacity duration-300 bg-black opacity-0 hover:opacity-80">
          <p className="text-white font-bold text-xl">{movie.title}</p>
        </div>
      </Link>
    </div>
  );
}
