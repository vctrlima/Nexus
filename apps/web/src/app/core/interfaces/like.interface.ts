import { Post } from "./post.interface";
import { User } from "./user.interface";

export interface Like {
  id: string;
  user: User;
  post: Post;
  createdAt?: Date;
}
