import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "./firebaseConfig";

export const uploadFileToFirebase = (file, setDownloadURL) => {
  console.log(file);
  const storageRef = ref(firebaseStorage, `images/${file.name}`);
  //   'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadUrl) =>
      setDownloadURL(downloadUrl)
    );
  });
};
