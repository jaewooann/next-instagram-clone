"use client";

import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function SignIn({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createBrowserSupabaseClient();

  // 카카오 로그인
  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
          : "http://localhost:3000/auth/callback",
      },
    });

    console.log(data);
  };

  // 로그인 뮤테이션
  const signInMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data) {
        console.log(data);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="gap-2 pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white">
        <img src={"/images/inflearngram.png"} className="w-60 mb-6" />
        <Input
          value={email}
          label="email"
          type="email"
          className="w-full rounded-sm"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          value={password}
          label="password"
          type="password"
          className="w-full rounded-sm"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          color="light-blue"
          className="w-full text-md py-1"
          onClick={() => {
            signInMutation.mutate();
          }}
          loading={signInMutation.isPending}
          disabled={signInMutation.isPending}
        >
          로그인
        </Button>
        <Button
          color="light-blue"
          className="w-full text-md py-1"
          onClick={() => signInWithKakao()}
        >
          카카오 로그인
        </Button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        아직 계정이 없으신가요?
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNUP")}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
