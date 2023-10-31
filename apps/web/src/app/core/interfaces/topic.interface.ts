import { Post } from "./post.interface";

export interface Topic {
  id: string;
  label: string;
  posts?: Post[];
  selected?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
