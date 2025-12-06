import useSWR from 'swr';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

const featuredWorkId = 'OL453657W';

export default function About({ book }) {
  const { data, error, isLoading, isValidating } = useSWR(
    `https://openlibrary.org/works/${featuredWorkId}.json`,
    { fallbackData: book },
  );

  const loading = (!data && !error) || isLoading || isValidating;
  const resolvedBook = data ?? null;

  return (
    <div>
      <PageHeader text="About" subtext="Exploring favourite speculative fiction" />
      <p>
        I am a web development student who loves building interfaces that make data approachable and
        engaging. Outside of class, I spend my time experimenting with UI patterns, reading satirical
        fantasy, and tinkering with personal projects that blend storytelling with technology.
      </p>
      <p>
        For this assignment I picked Terry Pratchett&apos;s classic <em>The Colour of Magic</em>, the first
        entry in the Discworld series. It captures the tone I aspire to in my own work—curious, witty,
        and always ready to dive into a new world. Below are the details fetched directly from the
        Open Library API.
      </p>
      {loading && !resolvedBook && <p>Loading book details…</p>}
      {error && !resolvedBook && (
        <p className="text-danger">Unable to load book details at this time.</p>
      )}
      {resolvedBook && !loading && (
        <BookDetails book={resolvedBook} workId={featuredWorkId} showFavouriteBtn={false} />
      )}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch(`https://openlibrary.org/works/${featuredWorkId}.json`);

    if (!response.ok) {
      throw new Error('Failed to fetch book data');
    }

    const book = await response.json();

    return {
      props: { book },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    console.error(error);
    // Provide null to allow client-side SWR to refetch on the browser
    return {
      props: { book: null },
      revalidate: 60 * 60 * 12,
    };
  }
}
