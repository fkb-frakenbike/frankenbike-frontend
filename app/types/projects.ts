export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  user: { email: string };
  createdAt: string;
  updatedAt: string;
  comments: unknown[];
  components: unknown[];
};
