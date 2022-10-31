import { addDoc, collection } from "firebase/firestore";
import { db } from "./config";

export async function saveUserToDatabase(email, userId) {
  // const collectionRef = collection(db, "users");
  await addDoc(collection(db, "users"), {
    email: email,
    roles: ["student"],
    userid: userId,
  })
    .then((resp) => console.log(resp))
    .catch((error) => console.log(error));
}
