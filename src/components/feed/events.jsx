import { placeholderEvents } from '@utils/mockdata';
const Events = () => {
  return (
    <section className="mt-4 px-3 ">
      <h2 className="font-bold text-base ">Newest Events</h2>
      <div className="mt-1 grid gap-1">
        {placeholderEvents.map((event, index) => (
          <div key={index} className="cursor-pointer">
            <p className="font-semibold text-sm">{event.name}</p>
            <p className="opacity-60 text-sm">{event.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
