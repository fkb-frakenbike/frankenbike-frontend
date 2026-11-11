export type Project = {
  id: string;
  user: { id: string; email: string; profile: { firstName: string; photoUrl: string | null } };
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  comments: unknown[];
  components: unknown[];
};
