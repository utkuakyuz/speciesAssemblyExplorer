import axios from "axios";
import type { SpeciesResponse, AssemblyInfo } from "../types/api";

const ENSEMBL_BASE_URL = "https://rest.ensembl.org";

export const api = axios.create({
  baseURL: ENSEMBL_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchSpecies = async (): Promise<SpeciesResponse> => {
  const response = await api.get("/info/species?content-type=application/json");
  return response.data;
};

export const fetchAssemblyInfo = async (
  speciesName: string
): Promise<AssemblyInfo> => {
  const response = await api.get(
    `/info/assembly/${speciesName}?content-type=application/json`
  );
  return response.data;
};
