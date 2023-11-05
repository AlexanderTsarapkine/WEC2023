import UploadFile from "./UploadFile";
import Table from "./Table";
import Output from "./Output";
function App() {
  return (
    <>
      <h1 className="font-bold m-4 text-2xl underline">Elon Musk Hunger Games</h1>
      <div className="flex gap-4 m-4">
        <div>
          <UploadFile />

        </div>
        <div className="flex-1">
          <Output tabs={[
            {
              label: "Stage 1",
              content: <Table />
            },
            {
              label: "Stage 2",
              content: <div>Chart</div>
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
