import { useQuery } from "@tanstack/react-query";
import { fetchAssemblyInfo } from "../services/api";
import { sortChromosomes } from "../utils/formatters";

export const useAssembly = (speciesName: string | null) => {
  return useQuery({
    queryKey: ["assembly", speciesName],
    queryFn: () => fetchAssemblyInfo(speciesName!),
    enabled: !!speciesName,
    select: (data) => {
      const chromosomes = data.top_level_region
        .filter((region) => region.coord_system === "chromosome")
        .sort((a, b) => sortChromosomes(a.name, b.name))
        .map((region) => ({
          name: region.name,
          length: region.length,
        }));

      const totalLength = chromosomes.reduce((sum, chr) => sum + chr.length, 0);

      return {
        chromosomes,
        totalLength,
        assemblyName: data.assembly_name,
      };
    },
  });
};
