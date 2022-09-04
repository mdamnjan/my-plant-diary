import "./Plants.css";
import PlantCard from "./PlantCard";
import { Divider } from "@mui/material";
import NavBar from "../common/NavBar";

const plantList = [
  { id: 1, name: "Calathea Orbifolia" },
  { id: 2, name: "String of Hearts" },
  { id: 3, name: "Peperomia Obtusifolia" },
];

const navBarItems = [
  { text: "Home", link: "/" },
  { text: "My Plants", link: "/plants" },
  { text: "My Notes", link: "/notes"}
];

const PlantPage = () => {
  const plants = plantList.map((plant) => (
    <>
      <PlantCard plant={plant} />
      <Divider />
    </>
  ));
  return (
    <div>
      <h1>My Plants</h1>
      <div className="plant-page-container">
        <NavBar navItemList={navBarItems} />
        <div className="plant-list">{plants}</div>
        <div style={{width: "20%", backgroundColor: "white", border: "1px solid rgb(226, 225, 225)"}}><h4>Recent Notes</h4></div>
      </div>
    </div>
  );
};
export default PlantPage;
