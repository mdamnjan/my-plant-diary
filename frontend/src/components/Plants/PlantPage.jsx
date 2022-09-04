import "./Plants.css"
import PlantCard from "./PlantCard";
import { Divider } from "@mui/material";

const plantList = [
  { id: 1, name: "Calathea Orbifolia" },
  { id: 2, name: "String of Hearts" },
  { id: 3, name: "Peperomia Obtusifolia" },
];

const PlantPage = () => {
  const plants = plantList.map((plant) => <><PlantCard plant={plant} /><Divider/></>);
  return <div className="plant-page-container"><h1>My Plants</h1>{plants}</div>;
};
export default PlantPage;
