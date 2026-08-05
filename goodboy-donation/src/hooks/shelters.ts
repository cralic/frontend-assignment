"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  contributeToShelters,
  fetchShelterResults,
  fetchShelters,
} from "@/api/shelters";
import type { ContributeRequest } from "@/types/shelters";

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

export function useContributeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ContributeRequest) => contributeToShelters(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: shelterResultsQueryKey });
    },
  });
}
