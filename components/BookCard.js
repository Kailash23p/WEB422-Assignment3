
import Link from 'next/link';
import Error from 'next/error';
import useSWR from 'swr';
import { Button, Card } from 'react-bootstrap';

function BookCard({ workId }) {
  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: true,
      errorRetryCount: 2,
    }
  );

  if (!workId) {
    return null;
  }

  if (error || (!isLoading && (!data || Object.keys(data).length === 0))) {
    return (
      <Card className="h-100 border-danger">
        <Card.Body>
          <Card.Title className="text-danger">Error Loading Book</Card.Title>
          <Card.Text className="text-muted">
            Unable to load book with ID: {workId}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  if (isLoading || !data) {
    return (
      <Card className="h-100">
        <Card.Body>
          <Card.Title>Loading…</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  const displayTitle = data.title ?? '';
  const publishedDate =
    data.first_published_date ??
    data.first_publish_date ??
    data.created?.value?.slice(0, 4) ??
    'N/A';

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src =
            'https://placehold.co/400x600?text=Cover+Not+Available';
        }}
        className="img-fluid w-100"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt="Cover Image"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{displayTitle}</Card.Title>
        <Card.Text className="text-muted">First Published: {publishedDate}</Card.Text>
        <div className="mt-auto">
          <Button as={Link} href={`/works/${workId}`} variant="primary">
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
