import PlantCard from "./PlantCard";

import { Box } from "@mui/material";

const PlantList = ({ plantList, isLoading, handleEdit, handleDelete }) => {
  return (
    <Box className="plant-list">
      {(!plantList || isLoading) && (
        <>
          <PlantCard isLoading={true} />
          <PlantCard isLoading={true} />
          <PlantCard isLoading={true} />
          <PlantCard isLoading={true} />
          <PlantCard isLoading={true} />
          <PlantCard isLoading={true} />
        </>
      )}
      {plantList.length === 0 && <span>You have no plants yet!</span>}
      {plantList.map((plant) => (
        <PlantCard
          plant={plant}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </Box>
  );
};
export default PlantList;
