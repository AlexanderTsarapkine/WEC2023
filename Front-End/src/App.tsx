import UploadFile from "./UploadFile";
import Table from "./Table";
import Output from "./Output";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";

import { useState, useEffect } from "react";
import { convertArsenal, convertCombination, convertAntiCombination } from "./interfaces/convertToTable";
import { sortArsenalArray } from "./interfaces/sort";
import { testArsenal } from "./interfaces/knapsack";



function App() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCombFile, setSelectedCombFile] = useState<File | null>(null);
  const [antiComFile, setAntiComFile] = useState<File | null>(null);

  const [stageOne, setStageOne] = useState<any>([]);
  const [parsedComb, setParsedComb] = useState<any>([]);
  const [parsedAntiCom, setParsedAntiCom] = useState<any>([]);

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

  const fileAntiComUpdated = async () => {
    if (antiComFile) {
      const parsedAntiCom = await (antiComFile);
      setParsedAntiCom(parsedAntiCom);
    }
  }





  useEffect(() => {
    const fetchData = async () => {
      await fileCombUpdated();
    };

    fetchData();
  }, [selectedCombFile]);

  useEffect(() => {
    const fetchData = async () => {
      await fileAntiComUpdated();
    };

    fetchData();
  }, [antiComFile]);

  return (
    <>
      <h1 className="font-bold m-4 text-2xl underline">Elon Musk Hunger Games</h1>
      <div className="flex gap-4 m-4 w-min">
        <div>
          <p>Arsenal</p>
          <UploadFile setSelectedFile={setSelectedFile} /><br />
          <p>Combinations</p>
          <UploadFile setSelectedFile={setSelectedCombFile} /><br />
          <p>Anti Combinations</p>
          <UploadFile setSelectedFile={setAntiComFile} /><br />

          <img src="Elon.jpg" alt="Elon Musk" />
        </div>
        <div className="flex-1 min-w-96">
          <Output tabs={[
            {
              label: "Stage 1",
              content: <Table data={stageOne} />
            },
            {
              label: "Stage 2",
              content: <Stage2 combinations={parsedComb} weight={testArsenal.weight} arsenal={stageOne[0]} optimization={testArsenal.optimization} />
            },
            {
              label: "Stage 3",
              content: <Stage3 weight={testArsenal.weight} arsenal={testArsenal.arsenal} optimization={testArsenal.optimization} anticombos={testArsenal.anticombos} />
            }
          ]} />
        </div>
      </div>
    </>
  );
}

export default App;
