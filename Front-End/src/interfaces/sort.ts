import { Arsenal } from './types';

function sortArsenalByColumn(data: Arsenal[], columnName: keyof Arsenal): Arsenal[] {
  return data.slice().sort((a, b) => {
    if (a[columnName] < b[columnName]) {
      return -1;
    }
    if (a[columnName] > b[columnName]) {
      return 1;
    }
    return 0;
  });
}

export function sortArsenalArray(data: Arsenal[]): Array<Arsenal[]> {
  const sortedByTitle = sortArsenalByColumn(data, 'ObjectName');
  const sortedByWeight = sortArsenalByColumn(data, 'Weight');
  const sortedBySurvivalUsefulness = sortArsenalByColumn(data, 'SurvivalUsefulness');
  const sortedByCombatUsefulness = sortArsenalByColumn(data, 'CombatUsefulness');

  return [sortedByTitle, sortedByWeight, sortedBySurvivalUsefulness, sortedByCombatUsefulness];
}
