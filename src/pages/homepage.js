import { useSelector } from "react-redux";
import { SheetsAndCuts } from "../components/sheetsAndCuts";


export const HomePage = () => {
  const sheetDimensions = useSelector((state) => state.calcSheets.sheetDimensions);
  const cattingSheetsCount = useSelector((state) => state.calcSheets.cattingSheetsCount);

  return (
    <div>
      <div className="flex justify-center text-3xl">
        Sheet dimensions (sm): <span className="mx-4 font-bold">{sheetDimensions.width} x {sheetDimensions.height}</span>
      </div>
      <div className="mt-10 flex justify-center text-2xl">
        Sheets in cutting <span className="mx-4 font-bold">{cattingSheetsCount}</span>
      </div>
      <SheetsAndCuts />
    </div>
  );
}
