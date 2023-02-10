import {
  BarChartIcon,
  ChatBubbleIcon,
  HeartIcon,
  PersonIcon,
  Share2Icon,
} from '@radix-ui/react-icons';

const Posts = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-t-0 border-l-0 border-r-0 border-black w-[98vw] md:w-[50vw]"
        >
          <div className="flex py-1">
            <div className="ml-[.5rem] w-[40px] h-[40px] rounded-full border-2 border-black grid place-items-center">
              <PersonIcon width="30" height="30" />
            </div>

            <div className="ml-2">
              <h2 className="font-bold m-0 p-0"> {post.name} </h2>
              <div className="flex items-center text-text-accent gap-2">
                <p className="font-base text-sm">@{post.username} </p>
                <div className="bg-text-accent w-[5px] h-[5px] rounded-full"></div>
                <p className="text-sm">{post.date}</p>
              </div>

              <p className="text-base mt-1">{post.text}</p>
              {/** Interactio Icons */}
              <ul className="list justify-between w-[70vw] md:w-[40vw] mt-3">
                <li className="cursor-pointer">
                  <ChatBubbleIcon /> <span>{post.replyCount}</span>
                </li>
                <li className="cursor-pointer">
                  <HeartIcon /> <span>{post.likeCount}</span>
                </li>
                <li className="cursor-pointer">
                  <BarChartIcon />
                </li>
                <li className="cursor-pointer">
                  <Share2Icon /> <span>{post.repostCount}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
