import type { User } from "../entities/User";

export interface UserRepository {
  getById(id: string): Promise<User | null>;
  followUser(userIdToFollow: string): Promise<void>;
  unfollowUser(userIdToUnfollow: string): Promise<void>;
  getFollowing(userId: string): Promise<string[]>;
  getFollowers(userId: string): Promise<string[]>;
}
