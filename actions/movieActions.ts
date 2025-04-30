"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error: any) {
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function searchMovies({
  search,
  page,
  pageSize,
}: {
  search: string;
  page: number;
  pageSize: number;
}) {
  const supabase = await createServerSupabaseClient();

  const { data, count, error } = await supabase
    .from("movie")
    .select("*")
    .like("title", `%${search}%`)
    .range((page - 1) * pageSize, page * pageSize - 1);
    
    const hasNextPage = count > page * pageSize

  if (error) {
    console.log(error);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    }
  }

  return {
    data,
    page,
    pageSize,
    hasNextPage
  }
}

export async function getMoive(id) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  handleError(error);

  return data;
}
