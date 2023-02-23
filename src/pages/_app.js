import Post_FeedLayout from '@components/ui/layout';
import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthLayout from '@ui/layout/authLayout';

const queryClient = new QueryClient();

export default function App({ Component, pageProps, ...appProps }) {
  // console.log(appProps.router.pathname);
  const pathname = appProps.router.pathname;

  if (pathname === '/login' || pathname === '/signup') {
    return (
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    );
  }

  if (
    pathname === '/feed' ||
    pathname === '/profile' ||
    pathname === '/messages'
  ) {
    return (
      <QueryClientProvider client={queryClient}>
        <Post_FeedLayout>
          <Component {...pageProps} />
        </Post_FeedLayout>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
