export type Project = {
  id: number;
  user: { id: number; email: string; profile: { firstName: string; photoUrl: string | null } };
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  comments: unknown[];
  components: unknown[];
};
