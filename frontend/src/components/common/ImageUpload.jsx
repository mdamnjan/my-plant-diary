import UploadButton from "./UploadButton";

import { getImageFromFile } from "../../utils";
import { Image } from "@mui/icons-material";

const ImageUpload = ({ img, setImg }) => {
  return (
    <>
      <div
        style={{
          height: "200px",
          objectFit: "contain",
          backgroundColor: "#b5b5b5",
          width: "100%",
          border: "3px dashed #3c8bd9",
          margin: "20px 0px",
          backgroundImage: "",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {!img && <Image sx={{ fontSize: "40px", fill: "white" }} />}
        {img && (
          <img
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            alt="uploaded"
            src={getImageFromFile(img) || ""}
          ></img>
        )}
      </div>
      <UploadButton setFile={setImg} />
    </>
  );
};
export default ImageUpload;
