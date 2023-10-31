import { Like } from "./like.interface";
import { Topic } from "./topic.interface";
import { User } from "./user.interface";

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author?: User;
  topics?: Topic[];
  like?: Like;
  likes?: Like[];
  createdAt?: Date;
  updatedAt?: Date;
}
