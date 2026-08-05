import { apiConfig } from "@/config/api";
import type { ShelterResults, SheltersResponse } from "@/types/shelters";

export async function fetchShelters(): Promise<SheltersResponse> {
  const response = await fetch(`${apiConfig.baseUrl}/api/v1/shelters/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch shelters (${response.status})`);
  }

  return response.json() as Promise<SheltersResponse>;
}

export async function fetchShelterResults(): Promise<ShelterResults> {
  const response = await fetch(
    `${apiConfig.baseUrl}/api/v1/shelters/results`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch shelter results (${response.status})`);
  }

  return response.json() as Promise<ShelterResults>;
}
