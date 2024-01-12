import { useSelector } from "react-redux";
import { Cats } from "../components/cats";


export const HomePage = () => {
  const sheetDimensions = useSelector((state) => state.calc.sheetDimensions);


  return (
    <div>
      <div className="flex justify-center text-3xl font-bold">
        Sheet dimensions (sm): {sheetDimensions.width} x {sheetDimensions.height}
      </div>
      <Cats />
    </div>
  );
}
