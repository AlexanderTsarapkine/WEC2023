import UploadFile from "./UploadFile";
import Table from "./Table";
import Output from "./Output";
import Stage2 from "./Stage2";

import { useState, useEffect } from "react";
import { convertArsenal } from "./interfaces/convertToTable";
import { sortArsenalArray } from "./interfaces/sort";
import { testArsenal } from "./interfaces/knapsack";
function App() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [stageOne, setStageOne] = useState<any>([]);

  const fileUpdated = async () => {
    if (selectedFile) {
      const parsedData = await convertArsenal(selectedFile);
      setStageOne(sortArsenalArray(parsedData));
    }
  };

  // Use a useEffect to run the function when selectedFile changes
  useEffect(() => {
    const fetchData = async () => {
      await fileUpdated();
    };

    fetchData();
  }, [selectedFile]);

  return (
    <>
      <h1 className="font-bold m-4 text-2xl underline">Elon Musk Hunger Games</h1>
      <div className="flex gap-4 m-4">
        <div>
          <UploadFile setSelectedFile={setSelectedFile} />

        </div>
        <div className="flex-1">
          <Output tabs={[
            {
              label: "Stage 1",
              content: <Table data={stageOne} />
            },
            {
              label: "Stage 2",
              content: <Stage2 weight={testArsenal.weight} arsenal={testArsenal.arsenal} optimization={testArsenal.optimization} />
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
