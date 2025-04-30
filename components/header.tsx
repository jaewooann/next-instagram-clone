"use client";

import Logo from "./logo";
import { useRecoilState } from "recoil";
import { searchState } from "utils/recoil/atoms";

export default function Header() {
  const [search, setSearch] = useRecoilState(searchState);

  return (
    <header className="fixed z-50 top-0 left-0 right-0 px-4 py-2 bg-gray-900 flex items-center justify-between">
      <nav className="flex items-center gap-4">
        <Logo />
        <ul className="flex gap-2 text-white">
          <li>Movies</li>
          <li>Dramas</li>
        </ul>
      </nav>

      <div className="border w-full max-w-72 border-white rounded-md p-2 flex items-center gap-2">
        <i className="fas fa-search text-white" />
        <input
          type="text"
          className="bg-transparent text-white"
          placeholder="search movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </header>
  );
}
