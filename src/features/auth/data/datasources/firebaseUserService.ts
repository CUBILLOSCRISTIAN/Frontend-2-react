import {
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import type { User } from "../../domain/entities/User";
import type { UserRepository } from "../../domain/repositories/UserRepository";
import { getAuth } from "firebase/auth";

export class FireBaseUserService implements UserRepository {
  private usersCollection = collection(firestore, "users");

  private getCurrentUserId(): string {
    const currentUser = getAuth().currentUser;
    if (!currentUser) throw new Error("No authenticated user");
    return currentUser.uid;
  }

  async getById(id: string): Promise<User | null> {
    const ref = doc(this.usersCollection, id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return null;
    return snapshot.data() as User;
  }

  async followUser(userIdToFollow: string): Promise<void> {
    const currentUserId = this.getCurrentUserId();

    const currentUserRef = doc(this.usersCollection, currentUserId);
    const targetUserRef = doc(this.usersCollection, userIdToFollow);

    // Añadir a "following" del usuario actual
    await updateDoc(currentUserRef, {
      following: arrayUnion(userIdToFollow),
    });

    // Añadir a "followers" del usuario objetivo
    await updateDoc(targetUserRef, {
      followers: arrayUnion(currentUserId),
    });
  }

  async unfollowUser(userIdToUnfollow: string): Promise<void> {
    const currentUserId = this.getCurrentUserId();

    const currentUserRef = doc(this.usersCollection, currentUserId);
    const targetUserRef = doc(this.usersCollection, userIdToUnfollow);

    // Eliminar de "following" del usuario actual
    await updateDoc(currentUserRef, {
      following: arrayRemove(userIdToUnfollow),
    });

    // Eliminar de "followers" del usuario objetivo
    await updateDoc(targetUserRef, {
      followers: arrayRemove(currentUserId),
    });
  }

  async getFollowers(userId: string): Promise<string[]> {
    const ref = doc(this.usersCollection, userId);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return [];
    const data = snapshot.data() as User;
    return data.followers || [];
  }

  async getFollowing(userId: string): Promise<string[]> {
    const ref = doc(this.usersCollection, userId);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return [];
    const data = snapshot.data() as User;
    return data.following || [];
  }
}
