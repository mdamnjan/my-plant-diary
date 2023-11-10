import { Autocomplete, Avatar, Box, Chip, TextField } from "@mui/material";
import { useQuery } from "react-query";

import { fetchPlants } from "../../api";

const PlantTag = (plant) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "30px",
        backgroundColor: "rgb(225 223 223)",
        margin: "10px 0px",
        padding: "5px 10px 5px 5px",
        position: "relative",
        justifyContent: "space-between",
        alignSelf: "flex-start",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={plant.plant.img_url || "../../Calathea_orbifolia.jpg"}
          alt="plant"
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            marginRight: "5px",
          }}
        ></img>
        {plant.plant.name}
      </div>
    </div>
  );
};

const PlantSelectField = ({ plant, setPlant }) => {
  const { data: plantList } = useQuery({
    queryKey: ["plants"],
    queryFn: () => fetchPlants(),
    initialData: [],
  });

  return (
    <>
      <Autocomplete
        fullWidth
        style={{
          margin: "10px 0px",
          alignSelf: "flex-start",
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.name}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        getOptionLabel={(option) => option.name}
        options={plantList}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search for a plant..." />
        )}
        renderOption={(props, option) => {
          console.log("option", option.img_url);
          return (
            <Box
              {...props}
              style={{
                alignSelf: "flex-start",
                borderRadius: "60px",
                padding: "10px",
                display: "inline-block",
                marginBottom: "10px",
                width: "100%",
              }}
            >
              <Avatar
                sx={{
                  marginRight: "10px",
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
                src={option.img_url || "../../Calathea_orbifolia.jpg"}
              />
              <p style={{ display: "inline-block" }} className="username">
                {option.name}
              </p>
            </Box>
          );
        }}
        onChange={(e, newValue) => {
          setPlant(newValue);
        }}
      />
      {plant && <PlantTag plant={plant} />}
    </>
  );
};
export default PlantSelectField;
