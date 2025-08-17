import { Chromosome } from "../types/api";
import { formatLength } from "../utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ChromosomeListProps {
  chromosomes: Chromosome[];
  totalLength: number;
  speciesName: string;
}

export const ChromosomeList = ({
  chromosomes,
  totalLength,
  speciesName,
}: ChromosomeListProps) => {
  return (
    <Card className="w-full border border-gray-200 shadow-sm border-l-4 border-l-orange-500 border-r-4 border-r-orange-500">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {speciesName}
          </CardTitle>
          <Badge
            variant="secondary"
            className="text-sm bg-gray-100 text-gray-700 border border-gray-300"
          >
            {chromosomes.length} chromosomes
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-lg font-medium">
            Total Length: {totalLength.toLocaleString()} bp
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-4 space-y-1">
            {chromosomes.map((chromosome, index) => (
              <div key={chromosome.name}>
                <div className="flex items-center justify-between py-3 px-2 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant="outline"
                      className="font-mono text-xs border-gray-300 text-gray-700"
                    >
                      {chromosome.name}
                    </Badge>
                    <span className="text-sm text-gray-700 font-medium">
                      {formatLength(chromosome.length)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {((chromosome.length / totalLength) * 100).toFixed(1)}%
                  </div>
                </div>
                {index < chromosomes.length - 1 && (
                  <Separator className="my-1 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
