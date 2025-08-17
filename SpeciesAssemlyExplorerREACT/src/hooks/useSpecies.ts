import { useQuery } from "@tanstack/react-query";
import { fetchSpecies } from "../services/api";
import type { Species } from "../types/api";

export const useSpecies = () => {
  return useQuery({
    queryKey: ["species"],
    queryFn: fetchSpecies,
    select: (data) => {
      const variationSpecies = data.species
        .filter(
          (species: Species) =>
            species.groups && species.groups.includes("variation")
        )
        .sort((a: Species, b: Species) => {
          const nameA = (a.display_name || a.name).toLowerCase();
          const nameB = (b.display_name || b.name).toLowerCase();
          return nameA.localeCompare(nameB);
        });

      return variationSpecies;
    },
  });
};
