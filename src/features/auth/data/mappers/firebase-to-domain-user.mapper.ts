import type { User as FirebaseUser } from "firebase/auth";
import type { User } from "../../domain/entities/User";

export const firebaseToDomainUser = async (
  firebaseUser: FirebaseUser
): Promise<User> => {
  const token = await firebaseUser.getIdToken(); // Aquí obtenemos el token asincrónicamente

  return {
    id: firebaseUser.uid,
    email: firebaseUser.email ?? "",
    name: firebaseUser.displayName ?? "",
    token: token, // Devolvemos la promesa directamente
    followers: [],
    following: [],
  };
};
