import { Col, Row } from 'react-bootstrap';
import { useAtom } from 'jotai';
import PageHeader from '@/components/PageHeader';
import BookCard from '@/components/BookCard';
import { favouritesAtom } from '@/store';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  const hasFavourites = favouritesList.length > 0;

  if (!hasFavourites) {
    return (
      <div>
        <PageHeader text="Nothing Here" subtext="Add a book to see it in your favourites list." />
        <p>Use the + Favourite button on any book to pin it here.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader text="Favourites" subtext="Your favourite books" />
      <Row className="gy-4">
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
