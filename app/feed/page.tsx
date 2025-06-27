import Feed from '../components/Feed';
import CardSlider from '../components/CardComponent';

export default function FeedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100">
      <div className="w-full max-w-2xl px-4 pt-16">
        <Feed />
        <CardSlider />
      </div>
    </div>
  );
}
