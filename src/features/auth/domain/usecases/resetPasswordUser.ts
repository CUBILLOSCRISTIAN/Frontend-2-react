import type { AuthRepository } from "../repositories/AuthRepository";

export class ResetPasswordUser {
    constructor(private readonly authRepo: AuthRepository) { }

    async execute(email: string): Promise<void> {
        await this.authRepo.resetPassword(email);
    }
}
