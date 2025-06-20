export interface ProjectDTO {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  url?: string;
  authorId?: string;
  authorName?: string;
  isDeleted: boolean;
  tags?: string[];
  thumbnailUrl?: string;
  visibility?: "public" | "private";
  likes?: number;
  comments?: string[];
}

export interface CommentDTO {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  likes?: number;
  replies?: CommentDTO[];
}
