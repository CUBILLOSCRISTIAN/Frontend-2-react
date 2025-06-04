import type { AuthRepository } from "../repositories/AuthRepository";

export class ResetPasswordUser {
  private readonly authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(email: string): Promise<void> {
    await this.authRepo.resetPassword(email);
  }
}
