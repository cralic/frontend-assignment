"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchShelterResults } from "@/api/shelters";

export const shelterResultsQueryKey = ["shelters", "results"] as const;

export function useShelterResults() {
  return useQuery({
    queryKey: shelterResultsQueryKey,
    queryFn: fetchShelterResults,
    refetchInterval: 60_000,
  });
}
