import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "./firebaseConfig";

export const uploadFileToFirebase = (file) => {
  console.log("file", file);
  const storageRef = ref(firebaseStorage, `images/${file.name}`);

  //   'file' comes from the Blob or File API
  return uploadBytes(storageRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref);
  });
};

export const getImageFromFile = (file) => {
  try {
    return URL.createObjectURL(file);
  } catch (error) {
    console.log(error);
    return;
  }
};
