import { Card, CardContent } from "@/components/ui/card";

export const LoadingSpinner = () => {
  return (
    <Card className="w-full border border-gray-200 shadow-sm">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-orange-300 rounded-full animate-ping"></div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-medium text-gray-900">
            Loading genome data...
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Fetching chromosome information from Ensembl
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
