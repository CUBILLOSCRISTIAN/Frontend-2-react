import { firestore } from "@/firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import type { ProjectDTO } from "../dto/ProjectDTO";

export class FirebaseProjectDatasource {
  async create(project: ProjectDTO): Promise<void> {
    const docRef = doc(firestore, "projects", project.id);
    await setDoc(docRef, project);
  }

  async getMyProjects(userId: string): Promise<ProjectDTO[]> {
    const q = query(
      collection(firestore, "projects"),
      where("userId", "==", userId),
      where("isDeleted", "==", false)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as ProjectDTO);
  }

  async getAllProjects(): Promise<ProjectDTO[]> {
    const q = query(
      collection(firestore, "projects"),
      where("isDeleted", "==", false)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as ProjectDTO);
  }

  async update(project: ProjectDTO): Promise<void> {
    const docRef = doc(firestore, "projects", project.id);
    await updateDoc(docRef, {
      title: project.title,
      description: project.description,
      url: project.url,

      updatedAt: serverTimestamp(),
    });
  }

  async delete(projectId: string): Promise<void> {
    const docRef = doc(firestore, "projects", projectId);

    // Soft delete
    await updateDoc(docRef, {
      isDeleted: true,
    });
  }
  async getOneProject(projectId: string): Promise<ProjectDTO | null> {
    const docRef = doc(firestore, "projects", projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as ProjectDTO;
    } else {
      return null;
    }
  }
}
