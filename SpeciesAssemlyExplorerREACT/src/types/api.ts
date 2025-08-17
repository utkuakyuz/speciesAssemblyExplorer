export interface Species {
  name: string;
  display_name: string;
  groups: string[];
  assembly_name: string;
  taxonomy_id: number;
}

export interface TopLevelRegion {
  name: string;
  coord_system: string;
  length: number;
  assembly_name: string;
}

export interface AssemblyInfo {
  assembly_name: string;
  top_level_region: TopLevelRegion[];
}

export interface SpeciesResponse {
  species: Species[];
}

export interface Chromosome {
  name: string;
  length: number;
}
