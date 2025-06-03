import type { UserRepository } from "../../repositories/UserRepository";

export class GetFollowersUseCase {
  private repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(userId: string): Promise<string[]> {
    return await this.repository.getFollowers(userId);
  }
}
