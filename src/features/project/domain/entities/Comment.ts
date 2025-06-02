export interface CommentEntity {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  projectId: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
