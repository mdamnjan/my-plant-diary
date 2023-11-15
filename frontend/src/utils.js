import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "./firebaseConfig";

export const uploadFileToFirebase = (file) => {
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

export const getNumDaysUntilDate = (inputDate) => {
  let date = new Date(inputDate);
  let today = new Date();

  let difference = new Date(today - date);

  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Convert back to days and return
  let numDays = Math.abs(Math.floor(difference / ONE_DAY));

  if (numDays === 0) {
    return "Due today";
  }

  if (date < today) {
    return `${numDays} days late`;
  }

  return `Due in ${numDays} days`;
};
