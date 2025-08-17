import React from "react";
import { Species } from "../types/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SpeciesSelectorProps {
  species: Species[];
  selectedSpecies: string;
  onSpeciesChange: (speciesName: string) => void;
  isLoading: boolean;
}

export const SpeciesSelector = ({
  species,
  selectedSpecies,
  onSpeciesChange,
  isLoading,
}: SpeciesSelectorProps) => {
  return (
    <Card className="w-full border border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Select Species
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          value={selectedSpecies}
          onValueChange={onSpeciesChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a specie to explore" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            {species.map((speciesData, index) => (
              <React.Fragment key={speciesData.name}>
                <SelectItem
                  value={speciesData.name}
                  className="hover:bg-orange-50 hover:text-orange-700 transition-colors duration-150 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">
                      {speciesData.display_name || speciesData.name}
                    </span>
                  </div>
                </SelectItem>
                {index < species.length - 1 && <SelectSeparator />}
              </React.Fragment>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500 mt-2">
          {species.length} species with variation data available
        </p>
      </CardContent>
    </Card>
  );
};
