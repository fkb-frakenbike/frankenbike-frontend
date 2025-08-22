import Feed from '../components/Feed';

export default function FeedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100">
      <div className="min-h-screen w-full max-w-2xl bg-indigo-100 p-3 px-4 pt-24 text-indigo-900 shadow">
        <Feed />
      </div>
    </div>
  );
}
