import type { UserRepository } from "../../repositories/UserRepository";

export class UnFollowUserUseCase {
  private repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(userIdToFollow: string): Promise<void> {
    return await this.repository.unfollowUser(userIdToFollow);
  }
}
