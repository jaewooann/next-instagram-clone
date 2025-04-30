"use client";

import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

export default function SignUp({ setView }) {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationRequired, setConfirmationRequired] = useState(false);

  const supabase = createBrowserSupabaseClient();

  // 회원가입 뮤테이션
  const signupMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `http://localhost:3000/signup/confirm`,
        },
      });

      if (data) {
        setConfirmationRequired(true);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  // 인증 뮤테이션
  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        type: "signup",
        email,
        token: otp,
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
        {confirmationRequired ? (
          <Input
            value={otp}
            label="otp"
            type="text"
            className="w-full rounded-sm"
            onChange={(e) => setOtp(e.target.value)}
            placeholder="인증번호 6자리를 입력해주세요"
          />
        ) : (
          <>
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
          </>
        )}
        <Button
          color="light-blue"
          className="w-full text-md py-1"
          onClick={() => {
            if (confirmationRequired) {
              verifyOtpMutation.mutate();
            } else {
              signupMutation.mutate();
            }
          }}
          disabled={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signupMutation.isPending
          }
          loading={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signupMutation.isPending
          }
        >
          {confirmationRequired ? "인증하기" : "가입하기"}
        </Button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        이미 계정이 있으신가요?
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNIN")}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
