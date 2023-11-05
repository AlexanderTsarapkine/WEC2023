import { Arsenal } from "./types";

function parseCsvRow(row: string): Arsenal | null {
  const [ObjectName, Weight, SurvivalUsefulness, CombatUsefulness] = row.split(',');
  const parsedWeight = parseFloat(Weight);
  const parsedSurvivalUsefulness = parseInt(SurvivalUsefulness, 10);
  const parsedCombatUsefulness = parseInt(CombatUsefulness, 10);

  if (
    isNaN(parsedWeight) ||
    isNaN(parsedSurvivalUsefulness) ||
    isNaN(parsedCombatUsefulness)
  ) {
    return null; // Skip rows with invalid data
  }

  return {
    ObjectName,
    Weight: parsedWeight,
    SurvivalUsefulness: parsedSurvivalUsefulness,
    CombatUsefulness: parsedCombatUsefulness,
  };
}

export function convertArsenal(file: File): Promise<Arsenal[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      const rows = content.trim().split('\n');
      const data: Arsenal[] = [];

      for (const row of rows) {
        const arsenal = parseCsvRow(row);
        if (arsenal) {
          data.push(arsenal);
        }
      }

      resolve(data);
    };

    reader.readAsText(file);
  });
}
export function convertCombination(file: File): Arsenal[] {

    return [];
}