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
