import { apiConfig } from "@/config/api";
import type {
  ContributeRequest,
  ContributeResponse,
  ShelterResults,
  SheltersResponse,
} from "@/types/shelters";

export class ContributeApiError extends Error {
  readonly status: number;
  readonly response: ContributeResponse;

  constructor(status: number, response: ContributeResponse) {
    const firstError = response.messages.find(
      (message) => message.type === "ERROR",
    );
    super(firstError?.message ?? `Contribute failed (${status})`);
    this.name = "ContributeApiError";
    this.status = status;
    this.response = response;
  }
}

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

export async function contributeToShelters(
  body: ContributeRequest,
): Promise<ContributeResponse> {
  const response = await fetch(
    `${apiConfig.baseUrl}/api/v1/shelters/contribute`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  let payload: ContributeResponse;
  try {
    payload = (await response.json()) as ContributeResponse;
  } catch {
    throw new Error(`Contribute failed (${response.status})`);
  }

  if (!response.ok) {
    throw new ContributeApiError(response.status, payload);
  }

  const hasError = payload.messages.some(
    (message) => message.type === "ERROR",
  );
  if (hasError) {
    throw new ContributeApiError(response.status, payload);
  }

  return payload;
}
