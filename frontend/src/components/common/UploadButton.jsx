import { styled } from "@mui/material/styles";
import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadButton = ({ setFile }) => {
  return (
    <Button
      sx={{ marginBottom: "20px" }}
      component="label"
      variant="contained"
      startIcon={<CloudUpload />}
    >
      Upload file
      <VisuallyHiddenInput
        onInput={(e) => {
          setFile(e.target.files[0]);
        }}
        type="file"
      />
    </Button>
  );
};
export default UploadButton;
