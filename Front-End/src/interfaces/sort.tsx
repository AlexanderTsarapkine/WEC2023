import { useState } from 'react';

interface SortedArsenal<T> {
  data: T[];
  sortedColumn: keyof T | null;
  sortColumn(columnName: keyof T): void;
  sortedDataByColumns: Record<keyof T, T[]>;
}

interface ObjectType {
  ObjectName: string;
  Weight: number;
  SurvivalUsefulness: number;
  CombatUsefulness: number;
}

export function useSortableTable(initialData: ObjectType[]): SortedArsenal<ObjectType> {
  const [data, setData] = useState(initialData);
  const [sortedColumn, setSortedColumn] = useState<keyof ObjectType | null>(null);
  const [sortedDataByColumns, setSortedDataByColumns] = useState<Record<keyof ObjectType, ObjectType[]>>({
    ObjectName: [],
    Weight: [],
    SurvivalUsefulness: [],
    CombatUsefulness: [],
  });

  const sortColumn = (columnName: keyof ObjectType) => {
    const sortedData = [...data];
    const sortedDataCopy = { ...sortedDataByColumns };

    sortedData.sort((a, b) => {
      if (a[columnName] < b[columnName]) return -1;
      if (a[columnName] > b[columnName]) return 1;
      return 0;
    });

    sortedDataCopy[columnName] = sortedData;
    setData(sortedData);
    setSortedColumn(columnName);
    setSortedDataByColumns(sortedDataCopy);
  };

  return { data, sortedColumn, sortColumn, sortedDataByColumns };
}
