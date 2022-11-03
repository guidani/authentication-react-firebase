import { addDoc, collection } from "firebase/firestore";
import { db } from "./config";

export async function saveUserToDatabase(email: string, userId: string) {
  try {
    const resp = await addDoc(collection(db, "users"), {
      userid: userId,
      email: email,
      roles: 0,
    });
    return console.log(resp);
  } catch (error) {
    return console.log(error);
  }
}
