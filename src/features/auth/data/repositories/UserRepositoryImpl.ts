import type { User } from "../../domain/entities/User";
import type { UserRepository } from "../../domain/repositories/UserRepository";
import type { FireBaseUserService } from "../datasources/firebaseUserService";

export class UserRepositoryImpl implements UserRepository {
  private readonly datasource: FireBaseUserService;

  constructor(datasource: FireBaseUserService) {
    this.datasource = datasource;
  }

  getById(id: string): Promise<User | null> {
    return this.datasource.getById(id);
  }
  followUser(userIdToFollow: string): Promise<void> {
    return this.datasource.followUser(userIdToFollow);
  }
  unfollowUser(userIdToUnfollow: string): Promise<void> {
    return this.datasource.unfollowUser(userIdToUnfollow);
  }
  getFollowing(userId: string): Promise<string[]> {
    return this.datasource.getFollowing(userId);
  }
  getFollowers(userId: string): Promise<string[]> {
    return this.datasource.getFollowers(userId);
  }
}
