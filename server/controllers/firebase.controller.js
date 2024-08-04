// ------ Importing Modules ------ //
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { giveCurrentDateTime } from "../utils/index.js";

//Controller to upload image to Firebase Storage
export const uploadImage = async (req, res, next) => {
  // Get the storage bucket
  const storage = getStorage();
  try {
    //Give a name to file
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(
      storage,
      `images/${req.file.originalname + "_" + dateTime}`
    );

    //Create File Metadata
    const metadata = {
      contentType: req.file.mimetype,
    };

    //Upload file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

    //Grab the public URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    // Send a response
    return res.send({
      message: "Image uploaded successfully",
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL,
    });
  } catch (error) {
    return next(error);
  }
};
