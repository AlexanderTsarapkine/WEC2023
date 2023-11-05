import { Arsenal, Combination } from "./types";

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

function parseCsvRowComb(row: string): Combination | null {
  const [ObjectOneName, ObjectTwoName, CombinationName, SurvivalBonus, CombatBonus] = row.split(',');
  const parsedSurvivalBonus = parseInt(SurvivalBonus, 10);
  const parsedCombatBonus = parseInt(CombatBonus, 10);


  if (
    isNaN(parsedSurvivalBonus) ||
    isNaN(parsedCombatBonus)
  ) {
    return null; // Skip rows with invalid data
  }

  return {
    ObjectOneName,
    ObjectTwoName,
    CombinationName,
    SurvivalBonus: parsedSurvivalBonus,
    CombatBonus: parsedCombatBonus
  };
}

export function convertCombination(file: File): Promise<Combination[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      const rows = content.trim().split('\n');
      const data: Combination[] = [];

      for (const row of rows) {
        const combination = parseCsvRowComb(row);
        if (combination) {
          data.push(combination);
        }
      }

      resolve(data);
    };

    reader.readAsText(file);
  });
}