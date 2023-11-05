import { useState } from 'react';

interface SortedArsenal<Arsenal> {
  data: Arsenal[];
  sortedColumn: keyof Arsenal | null;
  sort(columnName: keyof Arsenal): void;
  sortedByColumns: Record<keyof Arsenal, Arsenal[]>;
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
  const [sortedByColumns, setSortedByColumns] = useState<Record<keyof Arsenal, Arsenal[]>>({
    ObjectName: [],
    Weight: [],
    SurvivalUsefulness: [],
    CombatUsefulness: [],
  });

  const sort = (columnName: keyof Arsenal) => {
    const sorted = [...data];
    const sortedCopy = { ...sortedByColumns };

    sorted.sort((a, b) => {
      if (a[columnName] < b[columnName]) return -1;
      if (a[columnName] > b[columnName]) return 1;
      return 0;
    });

    sortedCopy[columnName] = sorted;
    setData(sorted);
    setSortedColumn(columnName);
    setSortedByColumns(sortedCopy);
  };

  return { data, sortedColumn, sort, sortedByColumns };
}

export type {Arsenal as Arsenal};