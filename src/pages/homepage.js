import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cats } from "../components/cats";


export const HomePage = () => {
  const navigate = useNavigate();


  return (
    <div>
      <Cats />
    </div>
  );
}
