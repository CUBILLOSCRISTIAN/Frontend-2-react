// src/container.ts
import { LoginUser } from "@/features/auth/domain/usecases/loginUser";
import { RegisterUser } from "@/features/auth/domain/usecases/registerUser";
import { LogoutUser } from "@/features/auth/domain/usecases/logoutUser";
import { GetCurrentUser } from "@/features/auth/domain/usecases/getCurrentUser";
import { FirebaseAuthService } from "@/features/auth/data/firebaseAuthService";

import { CreateProject } from "@/features/project/domain/usecases/CreateProject";
import { GetMyProjects } from "@/features/project/domain/usecases/GetMyProjects";
import { UpdateProject } from "@/features/project/domain/usecases/UpdateProject";
import { DeleteProject } from "@/features/project/domain/usecases/DeleteProject";

import { ProjectRepositoryImpl } from "@/features/project/data/repositories/ProjectRepositoryImpl";
import { FirebaseProjectDatasource } from "@/features/project/data/datasources/FirebaseProjectDatasource";
import { GetAllProjects } from "@/features/project/domain/usecases/GetAllProjects";
import { CloudinaryService } from "@/features/project/data/datasources/CloudinaryService";
import { UploadImage } from "@/features/project/domain/usecases/UploadImage";
import { GetOneProject } from "@/features/project/domain/usecases/GetOneProject";

// Crear una instancia de todos los casos de uso
export const container = {
  loginUser: new LoginUser(new FirebaseAuthService()),
  registerUser: new RegisterUser(new FirebaseAuthService()),
  logoutUser: new LogoutUser(new FirebaseAuthService()),
  getCurrentUser: new GetCurrentUser(new FirebaseAuthService()),

  cloudinaryService: new CloudinaryService(
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ""
  ),

  getCreateProjectUseCase: () => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(
      datasource,
      container.cloudinaryService
    );
    return new CreateProject(repository);
  },

  getUpdaloadImageUseCase: () => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(
      datasource,
      container.cloudinaryService
    );
    return new UploadImage(repository);
  },

  getGetMyProjectsUseCase: () => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(
      datasource,
      container.cloudinaryService
    );
    return new GetMyProjects(repository);
  },

  getAllProjectsUseCase: () => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(
      datasource,
      container.cloudinaryService
    );
    return new GetAllProjects(repository);
  },

  getUpdateProjectUseCase: () => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(
      datasource,
      container.cloudinaryService
    );
    return new UpdateProject(repository);
  },

  getDeleteProjectUseCase: () => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(
      datasource,
      container.cloudinaryService
    );
    return new DeleteProject(repository);
  },

  getOneProjectUseCase: () => {
    const datasource = new FirebaseProjectDatasource();
    const repository = new ProjectRepositoryImpl(
      datasource,
      container.cloudinaryService
    );
    return new GetOneProject(repository);
  },
};
