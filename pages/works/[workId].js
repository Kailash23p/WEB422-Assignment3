import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export default function WorkDetails() {
  const router = useRouter();
  const { workId } = router.query;
  const resolvedWorkId = Array.isArray(workId) ? workId[0] : workId;

  const { data, error, isLoading, isValidating } = useSWR(
    resolvedWorkId ? `https://openlibrary.org/works/${resolvedWorkId}.json` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: true,
      errorRetryCount: 2,
    }
  );

  if ((isLoading || isValidating) && !data) {
    return (
      <div>
        <PageHeader text="Loading…" />
        <p>Loading book details…</p>
      </div>
    );
  }

  if (!resolvedWorkId) {
    return null;
  }

  if (error || !data || Object.keys(data).length === 0) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <PageHeader text={data.title ?? 'Book Details'} />
      <BookDetails book={data} workId={resolvedWorkId} />
    </div>
  );
}
