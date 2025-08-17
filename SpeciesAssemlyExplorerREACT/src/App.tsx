import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeciesSelector } from "./components/SpeciesSelector";
import { ChromosomeList } from "./components/ChromosomeList";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { useSpecies } from "./hooks/useSpecies";
import { useAssembly } from "./hooks/useAssembly";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "./components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");

  const {
    data: species,
    isLoading: speciesLoading,
    error: speciesError,
  } = useSpecies();
  const {
    data: assembly,
    isLoading: assemblyLoading,
    error: assemblyError,
  } = useAssembly(selectedSpecies || null);

  const handleSpeciesChange = (speciesName: string) => {
    setSelectedSpecies(speciesName);
  };

  if (speciesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorDisplay message="Failed to load species data. Please try again." />
        </div>
      </div>
    );
  }

  if (speciesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        <div className="space-y-8">
          <SpeciesSelector
            species={species || []}
            selectedSpecies={selectedSpecies}
            onSpeciesChange={handleSpeciesChange}
            isLoading={speciesLoading}
          />

          {/* Assembly Data */}
          {assemblyLoading && selectedSpecies && <LoadingSpinner />}

          {assemblyError && (
            <ErrorDisplay message="Failed to load assembly data. Please try again." />
          )}

          {assembly && assembly.chromosomes.length > 0 && (
            <ChromosomeList
              chromosomes={assembly.chromosomes}
              totalLength={assembly.totalLength}
              speciesName={selectedSpecies}
            />
          )}

          {assembly && assembly.chromosomes.length === 0 && selectedSpecies && (
            <ErrorDisplay message="No chromosome data available for this species. It may only have scaffold data." />
          )}

          {/* Info Card when no species selected */}
          {!selectedSpecies && (
            <Card className="w-full bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center">
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black-800">
                  Select a species from the dropdown above to explore its genome
                  assembly.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// Normally I would prefer create a withAppProvider.tsx to wrap App
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;
