import Input from '@components/ui/input';
import { PersonIcon } from '@radix-ui/react-icons';
import { messageData } from '@utils/messageData';

function Message() {
  return (
    <section className="w-[100vw] md:w-[55vw] h-[100vh] md:overflow-y-scroll md:scrollbar-hide">
      <div className="w-full px-2 md:px-0">
        <h1 className="mt-16 md:mt-4 text-2xl font-bold">Messages</h1>
        <Input
          className="w-full mt-2 h-6 mx-auto px-6 bg-gray-200 rounded-lg"
          type="text"
          placeholder="Search..."
        />
      </div>
      {/* message list */}
      <ul className="w-full px-2 md:px-0 mt-5">
        {messageData.map(mes => {
        return <li key={mes.id} className="flex h-14 max-h-16 my-8 gap-4 items-center">
          <div className="w-14 h-14 flex justify-center items-center rounded-full border-2 border-black">
            <PersonIcon width={40} height={40} />
          </div>
          <div className='w-3/5 h-16 max-h-20'>
            <h2 className="text-xl min-w-3/5 max-w-2/3 overflow-hidden font-bold">{mes.name}</h2>
            <p className='min-w-3/5 max-w-2/3 overflow-hidden whitespace-nowrap'>{mes.message}</p>
          </div>
          <div className="bg-text-accent w-[5px] h-[5px] rounded-full"></div>
          <p>{mes.time}</p>
        </li>
        })}
      </ul>
    </section>
  );
}

export default Message;
