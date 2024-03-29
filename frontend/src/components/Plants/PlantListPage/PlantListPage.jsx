import {
  Autocomplete,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";

import "../Plants.css";
import AddButton from "../../common/AddButton";
import PlantCard from "../PlantCard";
import PlantForm from "../../Forms/PlantForm";

import { fetchPlants, createPlant, deletePlant, updatePlant } from "../../../api";
import { uploadFileToFirebase } from "../../../utils";

import { useQuery, useQueryClient } from "react-query";

const PlantListPage = () => {
  const {
    data: plantList,
    isLoading,
  } = useQuery({
    queryKey: ["plants"],
    queryFn: () => fetchPlants(),
    initialData: [],
  });

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [plant, setPlant] = useState({ name: "", watering_frequency: "OAW" });
  const [filterTerm, setFilterTerm] = useState("");

  const queryClient = useQueryClient();

  const handleEdit = (plant) => {
    setIsEditing(true);
    setOpen(true);
    setPlant(plant);
  };

  const handleSubmit = (e, name, wateringFreq, plantID, img) => {
    const updatePage = () => {
      setOpen(false);
      queryClient.invalidateQueries(["plants"]);
      setIsEditing(false);
    };

    const body = {
      name: name,
      watering_frequency: wateringFreq,
    };

    if (img) {
      uploadFileToFirebase(img).then((url) => {
        createPlant({ img_url: url, ...body }).then(() => updatePage());
      });
    } else {
      if (isEditing) {
        updatePlant(plantID, body).then(() => updatePage());
      } else {
        createPlant(body).then(() => updatePage());
      }
    }
  };


  const handleDelete = (plant) => {
    deletePlant(plant.id).then(() => queryClient.invalidateQueries(["plants"]));
  };

  return (
    <>
      <Box style={{ maxWidth: "1000px", margin: "20px auto 10px auto" }}>
        <Autocomplete
          onSelect={(e) => {
            setFilterTerm(e.target.value.toLowerCase());
          }}
          sx={{
            marginTop: "0px",
            margin: "auto",
            "& .MuiInputBase-root": { paddingRight: "10px !important" }
          }}
          options={plantList.map((plant) => plant.name)}
          renderInput={(params) => (
            <>
              <TextField
              variant="filled"
                {...params}
                placeholder="Search for a plant..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
        />
      </Box>
      <Divider />
      <Box className="plant-list">
        {(!plantList || plantList.length===0 || isLoading) && (
          <>
            <PlantCard isLoading={true} />
            <PlantCard isLoading={true} />
            <PlantCard isLoading={true} />
            <PlantCard isLoading={true} />
            <PlantCard isLoading={true} />
            <PlantCard isLoading={true} />
          </>
        )}
        {plantList
          .filter((plant) => plant.name.toLowerCase().includes(filterTerm))
          .map((plant) => (
            <PlantCard
              plant={plant}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
      </Box>
      <AddButton
        tooltipText="Add a plant"
        onClick={() => {
          setOpen(true);
          setIsEditing(false);
        }}
      />
      <PlantForm
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        plant={plant}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      />
    </>
  );
};
export default PlantListPage;
