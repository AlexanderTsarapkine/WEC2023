import { Arsenal } from './types';

function sortArsenalByColumn(data: Arsenal[], columnName: keyof Arsenal): Arsenal[] {
  return data.slice().sort((a, b) => {
    if (a[columnName] < b[columnName]) {
      return -1;
    }
    if (a[columnName] > b[columnName]) {
      return 1;
    }
    // Check the name of the object if the values are equal
    if (a.ObjectName < b.ObjectName) {
      return -1;
    }

    return 1;

  });
}

export function sortArsenalArray(data: Arsenal[]): Array<Arsenal[]> {
  let starttime = new Date().getMilliseconds();
  const sortedByTitle = sortArsenalByColumn(data, 'ObjectName');
  const sortedByWeight = sortArsenalByColumn(data, 'Weight');
  const sortedBySurvivalUsefulness = sortArsenalByColumn(data, 'SurvivalUsefulness');
  const sortedByCombatUsefulness = sortArsenalByColumn(data, 'CombatUsefulness');

  console.log(`Sorting took ${new Date().getMilliseconds() - starttime}ms`);

  return [sortedByTitle, sortedByWeight, sortedBySurvivalUsefulness, sortedByCombatUsefulness];
}
