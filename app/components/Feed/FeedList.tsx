import React from 'react';
import CardComponent from '../Card';

type Project = {
  id: number;
  user: { email: string };
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  comments: unknown[];
  components: unknown[];
};

const FeedList: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="grid min-h-full grid-cols-1 justify-items-center gap-6">
      {Array.isArray(projects) &&
        projects.map(project => (
          <CardComponent
            key={project.id}
            title={project.title}
            text={project.description}
            img={project.imageUrl}
            comments={project.comments.length}
            date={project.updatedAt}
            userName={project.user.email}
            variant="cardcolor"
          />
        ))}
    </div>
  );
};

export default FeedList;
