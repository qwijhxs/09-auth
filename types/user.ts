export interface User {
  user: User | null;
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}