export const formatLength = (length: number): string => {
  if (length >= 1000000) {
    return (length / 1000000).toFixed(2) + " Mb";
  } else if (length >= 1000) {
    return (length / 1000).toFixed(2) + " Kb";
  } else {
    return length + " bp";
  }
};

export const sortChromosomes = (a: string, b: string): number => {
  // Handle special cases for human chromosomes
  if (a === "MT") return 1;
  if (b === "MT") return -1;
  if (a === "X") return 1;
  if (b === "X") return -1;
  if (a === "Y") return 1;
  if (b === "Y") return -1;

  // Sort numeric chromosomes
  const aNum = parseInt(a);
  const bNum = parseInt(b);

  if (!isNaN(aNum) && !isNaN(bNum)) {
    return aNum - bNum;
  }

  // Fallback to string comparison
  return a.localeCompare(b);
};
