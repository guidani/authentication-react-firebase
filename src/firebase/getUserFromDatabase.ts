import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

export async function getUserFromDatabase(userId: string) {
  try {
    let data = {};
    const q = query(collection(db, "users"), where("userid", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      data = userData;
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
