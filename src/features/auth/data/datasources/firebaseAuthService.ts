
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import type { AuthRepository } from "../../domain/repositories/AuthRepository";
import type { User } from "../../domain/entities/User";
import { firebaseToDomainUser } from "../mappers/firebase-to-domain-user.mapper";
import { mapFirebaseErrorToAppError } from "../mappers/mapFirebaseError";


const auth = getAuth();

export class FirebaseAuthService implements AuthRepository {
  
  async register(email: string, password: string, name: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      return firebaseToDomainUser(userCredential.user);
    } catch (error) {
      throw mapFirebaseErrorToAppError(error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return firebaseToDomainUser(userCredential.user);
    } catch (error) {
      throw mapFirebaseErrorToAppError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw mapFirebaseErrorToAppError(error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user) {
          try {
            const domainUser = await firebaseToDomainUser(user);
            resolve(domainUser); // Devolvemos el usuario mapeado
          } catch (error) {
            reject(mapFirebaseErrorToAppError(error));
          }
        } else {
          resolve(null); // El usuario no está autenticado
        }
      });
    });
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw mapFirebaseErrorToAppError(error);
    }
  }
}
