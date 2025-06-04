export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  isdeleted: boolean;
  tags: string[];
  thumbnailUrl: string;
  visibility: "public" | "private";
  likes: number;
  comments: string[];
}
