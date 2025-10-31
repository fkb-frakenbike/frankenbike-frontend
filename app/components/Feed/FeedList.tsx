import React from 'react';
import CardComponent from '../Card';
import Link from 'next/link';

type Project = {
  id: number;
  user: { email: string; profile: { photoUrl: string | null } };
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
      {Array.isArray(projects) && projects.length > 0 ? (
        projects.map(project => (
          <CardComponent
            key={project.id}
            name={project.title}
            description={project.description}
            img={project.imageUrl}
            comments={project.comments.length}
            date={project.updatedAt}
            userName={project.user.email}
            userImg={
              project.user.profile.photoUrl && project.user.profile.photoUrl.trim() !== ''
                ? project.user.profile.photoUrl
                : '/SvgSite/defaultProfilePic.png'
            }
            variant="cardcolor"
            likes={0}
          />
        ))
      ) : (
        <div className="flex flex-col items-center gap-6 py-12">
          <p className="text-center text-lg font-semibold text-[#2d005e]">
            Aucun projet pour l’instant.
            <br />
            Soyez le premier à ajouter le vôtre !
          </p>
          <Link
            href="/addProject"
            title="Ajouter un projet"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2d005e] px-6 py-2 text-white shadow transition hover:bg-[#6c3cff]"
          >
            <span className="text-6xl leading-none">+</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeedList;
