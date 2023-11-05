import UploadFile from "./UploadFile";
import Table from "./Table";
import Output from "./Output";
import Stage2 from "./Stage2";

import { useState, useEffect } from "react";
import { convertArsenal, convertCombination } from "./interfaces/convertToTable";
import { sortArsenalArray } from "./interfaces/sort";
import { testArsenal } from "./interfaces/knapsack";
import { Combination } from "./interfaces/types";
function App() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCombFile, setSelectedCombFile] = useState<File | null>(null);
  const [stageOne, setStageOne] = useState<any>([]);
  const [parsedComb, setParsedComb] = useState<any>([]);

  const fileUpdated = async () => {
    if (selectedFile) {
      const parsedData = await convertArsenal(selectedFile);
      setStageOne(sortArsenalArray(parsedData));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fileUpdated();
    };

    fetchData();
  }, [selectedFile]);

  const fileCombUpdated = async () => {
    if (selectedCombFile) {
      const parsedComb = await convertCombination(selectedCombFile);
      setParsedComb(parsedComb);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fileCombUpdated();
    };

    fetchData();
  }, [selectedCombFile]);

  return (
    <>
      <h1 className="font-bold m-4 text-2xl underline">Elon Musk Hunger Games</h1>
      <div className="flex gap-4 m-4">
        <p>Arsenal</p>
        <div>
          <UploadFile setSelectedFile={setSelectedFile} />

        </div>
        <p>Combinations</p>
        <div>
          <UploadFile setSelectedFile={setSelectedCombFile} />

        </div>
        <div className="flex-1">
          <Output tabs={[
            {
              label: "Stage 1",
              content: <Table data={stageOne} />
            },
            {
              label: "Stage 2",
              content: <Stage2 combinations={parsedComb} weight={testArsenal.weight} arsenal={testArsenal.arsenal} optimization={testArsenal.optimization} />
            },
            {
              label: "Stage 3",
              content: <div>Chart</div>
            }
          ]} />
        </div>
      </div>
    </>
  );
}

export default App;
