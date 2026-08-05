export type Shelter = {
  id: number;
  name: string;
};

export type SheltersResponse = {
  shelters: Shelter[];
};

export type ShelterResults = {
  contributors: number;
  contribution: number;
};

export type ContributeContributor = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ContributeRequest = {
  contributors: ContributeContributor[];
  shelterID?: number;
  value: number;
};

export type ContributeMessageType = "SUCCESS" | "ERROR" | (string & {});

export type ContributeMessage = {
  message: string;
  type: ContributeMessageType;
  path?: string;
};

export type ContributeResponse = {
  messages: ContributeMessage[];
};
