
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  const favouritesClicked = async () => {
    if (!workId) {
      console.error('No workId provided');
      return;
    }

    console.log('Favourites clicked. Current state:', { showAdded, workId, favouritesList });

    try {
      if (showAdded) {
        console.log('Removing from favourites:', workId);
        const updated = await removeFromFavourites(workId);
        console.log('Remove result:', updated);
        if (Array.isArray(updated)) {
          setFavouritesList(updated);
        } else {
          console.warn('Remove returned non-array, using fallback');
          setFavouritesList((current = []) => current.filter((fav) => fav !== workId));
        }
      } else {
        console.log('Adding to favourites:', workId);
        const updated = await addToFavourites(workId);
        console.log('Add result:', updated);
        if (Array.isArray(updated)) {
          setFavouritesList(updated);
        } else {
          console.warn('Add returned non-array, using fallback');
          setFavouritesList((current = []) => {
            if (current.includes(workId)) return current;
            return [...current, workId];
          });
        }
      }
    } catch (error) {
      console.error('Error updating favourites:', error);
    }
  };

  if (!book) {
    return null;
  }

  const description =
    typeof book.description === 'string'
      ? book.description
      : book.description?.value;

  const characters = Array.isArray(book.subject_people)
    ? book.subject_people.join(', ')
    : null;

  const settings = Array.isArray(book.subject_places)
    ? book.subject_places.join(', ')
    : null;

  const links = Array.isArray(book.links) ? book.links : [];

  return (
    <Container className="px-0">
      <Row>
        <Col lg="4" className="mb-4 mb-lg-0">
          <img
            onError={(event) => {
              // Remove the event handler to prevent infinite loop
              event.target.onerror = null;
              event.target.src =
                'https://placehold.co/400x600?text=Cover+Not+Available';
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>
        <Col lg="8">
          <h3>{book.title || 'Untitled Book'}</h3>
          {description && <p>{description}</p>}
          {characters && (
            <>
              <br />
              <h5>Characters</h5>
              {characters}
            </>
          )}
          {settings && (
            <>
              <br />
              <h5>Settings</h5>
              {settings}
            </>
          )}
          {links.length > 0 && (
            <>
              <br />
              <h5>More Information</h5>
              {links.map((link) => {
                if (!link?.url) {
                  return null;
                }

                const title = link.title || link.url;
                return (
                  <span key={link.url}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {title}
                    </a>
                    <br />
                  </span>
                );
              })}
            </>
          )}
          {showFavouriteBtn && workId && (
            <>
              <br />
              <Button
                variant={showAdded ? 'primary' : 'outline-primary'}
                onClick={favouritesClicked}
              >
                {showAdded ? '+ Favourite (added)' : '+ Favourite'}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default BookDetails;
