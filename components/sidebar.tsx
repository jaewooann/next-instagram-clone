"use client";

import Link from "next/link";
import { Home, Logout, People, Search, Send } from "@mui/icons-material";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function SideBar() {
  const supabase = createBrowserSupabaseClient();

  return (
    <aside className="w-fit h-screen p-6 border-r border-gray-300 flex flex-col justify-between">
      {/* 홈, 프로필 ~채팅 페이지 */}
      <div className="flex flex-col gap-4">
        <Link href="/">
          <Home className="text-2xl mb-10" />
        </Link>
        <Link href="/people">
          <People className="text-2xl" />
        </Link>
        <Link href="/discover">
          <Search className="text-2xl" />
        </Link>
        <Link href="/chat">
          <Send className="text-2xl" />
        </Link>
      </div>

      {/* 로그아웃 */}
      <div>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          <Logout className="text-2xl text-deep-purple-900" />
        </button>
      </div>
    </aside>
  );
}
