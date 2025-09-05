import Feed from '../components/Feed';

export default function FeedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100">
      <div className="min-h-screen p-3 px-4 pt-44 text-indigo-900">
        <Feed />
      </div>
    </div>
  );
}
