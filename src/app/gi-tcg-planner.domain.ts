export enum DiceElement {
  OMNI = "omni",
  ANEMO = "anemo",
  CRYO = "cryo",
  DENDRO = "dendro",
  ELECTRO = "electro",
  GEO = "geo",
  HYDRO = "hydro",
  PYRO = "pyro"
}

export interface Die {
  element: DiceElement;
  selected: boolean;
}
