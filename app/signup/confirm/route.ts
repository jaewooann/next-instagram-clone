import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "utils/supabase/server";

// localhost:3000/signup/confirm?code=1234567890
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // localhost:3000
  return NextResponse.redirect(requestUrl.origin);
}
