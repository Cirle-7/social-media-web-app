import Feed from '@components/feed';
import { parseJWT } from '@utils/parseJWT';
import { useEffect } from 'react';

function FeedPage() {
  useEffect(() => {
    parseJWT();
  }, []);

  return <Feed />;
}

export default FeedPage;
