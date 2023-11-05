import { useState } from 'react';

interface SortedArsenal<Arsenal> {
  data: Arsenal[];
  sortedColumn: keyof Arsenal | null;
  sort(columnName: keyof Arsenal): void;
  sortedDataByColumns: Record<keyof Arsenal, Arsenal[]>;
}

interface Arsenal {
  ObjectName: string;
  Weight: number;
  SurvivalUsefulness: number;
  CombatUsefulness: number;
}

export function useSortableTable(initialData: Arsenal[]): SortedArsenal<Arsenal> {
  const [data, setData] = useState(initialData);
  const [sortedColumn, setSortedColumn] = useState<keyof Arsenal | null>(null);
  const [sortedDataByColumns, setSortedDataByColumns] = useState<Record<keyof Arsenal, Arsenal[]>>({
    ObjectName: [],
    Weight: [],
    SurvivalUsefulness: [],
    CombatUsefulness: [],
  });

  const sort = (columnName: keyof Arsenal) => {
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

  return { data, sortedColumn, sort, sortedDataByColumns };
}

export type {Arsenal as Arsenal};