import { placeholderTrends } from '@utils/mockdata';

const Trending = () => {
  return (
    <section className="mt-4 px-3 ">
      <h2 className="font-bold text-base ">Most Trending</h2>
      <div className="h-[60vh] overflow-y-scroll mt-1 grid gap-2 scrollbar-hide">
        {placeholderTrends.map((trends, index) => (
          <div key={index} className="cursor-pointer">
            <p className="font-semibold text-sm">{trends.trend}</p>
            <p className="opacity-60 text-sm">{trends.postCount}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
