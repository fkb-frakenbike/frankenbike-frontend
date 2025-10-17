type Comment = {
  id: number;
  name: string;
  avatarUrl: string;
  text: string;
  likes: number;
  date: string;
};

const comments: Comment[] = [
  {
    id: 1,
    name: "Patrick Square",
    avatarUrl: "/13Patrick.png",
    text: "Wow c’est si bien, la correspondance des couleurs est superbe, je suis vraiment content pour toi",
    likes: 56,
    date: "Aujourd’hui à 16:30",
  },
  // Ajoute d'autres si besoin
];

export default function CommentBox() {
  return (
    <div className="bg-gradient-to-b from-purple-800 to-purple-600 rounded-xl p-4 mt-8 shadow-lg max-w-xl w-full">
      <div className="mb-2 text-white font-semibold text-lg">Commentaires</div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex items-start gap-3 bg-white bg-opacity-10 rounded-lg p-3 mb-3"
        >
          {/* Avatar */}
          <img
            src={comment.avatarUrl}
            alt={comment.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Contenu */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{comment.name}</span>
              <span className="ml-auto text-xs text-gray-300">{comment.date}</span>
            </div>
            <div className="text-white mt-1">{comment.text}</div>
          </div>

          {/* Like */}
          <div className="flex flex-col items-center ml-2 mt-1">
            <img
              src={"/SvgSite/like.png"}
              alt="Like"
              className="w-4 h-4 sm:w-5 sm:h-5 mb-1"
            />
            <span className="text-xs text-white">{comment.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
