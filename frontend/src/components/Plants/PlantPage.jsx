import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Search } from "@mui/icons-material";

import "./Plants.css";
import AddButton from "../common/AddButton";
import PlantCard from "./PlantCard";
import NewPlantForm from "./NewPlantForm";

import { fetchPlants, createPlant, deletePlant, updatePlant } from "../../api";
import { uploadFileToFirebase } from "../../utils";

const PlantPage = () => {
  const [open, setOpen] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [plant, setPlant] = useState({ name: "", watering_frequency: "OAW" });

  const getPlantList = () => {
    fetchPlants().then((response) => {
      if (response.data) {
        setPlantList(response.data);
      }
    });
  };

  const handleEdit = (plant) => {
    setIsEditing(true);
    setOpen(true);
    setPlant(plant);
  };

  const handleSubmit = (e, name, wateringFreq, plantID, img) => {
    const updatePage = () => {
      setOpen(false);
      getPlantList();
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
    deletePlant(plant.id).then(() => getPlantList());
  };

  const plants = plantList.map((plant) => (
    <PlantCard
      plant={plant}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  ));

  useEffect(() => {
    getPlantList();
  }, []);

  return (
    <>
      <Box style={{ width: "80%", margin: "20px auto 10px auto" }}>
        <Autocomplete
          fullWidth
          sx={{
            marginTop: "10px",
            margin: "auto",
            backgroundColor: "#d9d9d99e",
            borderRadius: "10px",
            "& fieldset": { borderRadius: "10px" },
            '& .MuiInputBase-root': {paddingRight: "0"}
          }}
          options={plantList.map((plant) => plant.name)}
          renderInput={(params) => (
            <>
              <TextField
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
        <FormControl sx={{ minWidth: "100px", margin: "20px" }}>
          <InputLabel shrink id="sort-by-select">
            Sort By
          </InputLabel>
          <Select
            labelId="sort-by-select"
            defaultValue="updated"
            sx={{
              backgroundColor: "#d9d9d99e",
              marginTop: "10px",
              borderRadius: "10px",
              padding: "0px 6px",
              "& .MuiSelect-select": { padding: "8px" },
            }}
          >
            <MenuItem value="updated">Updated</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            minWidth: "150px",
            margin: "20px",
          }}
        >
          <InputLabel shrink id="status-select">
            Status
          </InputLabel>
          <Select
            labelId="status-select"
            defaultValue="any"
            sx={{
              backgroundColor: "#d9d9d99e",
              marginTop: "10px",
              borderRadius: "10px",
              padding: "0px 6px",
              "& .MuiSelect-select": { padding: "8px" },
            }}
            style={{ padding: "1px !important" }}
          >
            <MenuItem value="any">Any status</MenuItem>
            <MenuItem value="OK">Ok</MenuItem>
            <MenuItem value="NA">Needs attention</MenuItem>
          </Select>
        </FormControl>{" "}
      </Box>
      <Divider />
      <Box className="plant-list">
        {plants}
        <AddButton
          tooltipText="Add a plant"
          onClick={() => {
            setOpen(true);
            setIsEditing(false);
          }}
        />
      </Box>
      <NewPlantForm
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
export default PlantPage;
