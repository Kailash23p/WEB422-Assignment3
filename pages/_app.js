import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SWRConfig } from 'swr';
import Layout from '@/components/Layout';
import RouteGuard from '@/components/RouteGuard';

const fetcher = async (...args) => {
  const response = await fetch(...args);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.status = response.status;
    throw error;
  }

  return response.json();
};

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  );
}

export default MyApp;
