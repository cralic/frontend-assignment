"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchShelterResults, fetchShelters } from "@/api/shelters";

export const sheltersQueryKey = ["shelters", "list"] as const;
export const shelterResultsQueryKey = ["shelters", "results"] as const;

export function useShelters() {
  return useQuery({
    queryKey: sheltersQueryKey,
    queryFn: fetchShelters,
  });
}

export function useShelterResults() {
  return useQuery({
    queryKey: shelterResultsQueryKey,
    queryFn: fetchShelterResults,
    refetchInterval: 60_000,
  });
}
