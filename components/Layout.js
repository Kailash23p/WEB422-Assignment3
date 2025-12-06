import Head from 'next/head';
import { Container } from 'react-bootstrap';
import MainNav from './MainNav';

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>WEB422 Assignment 1</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainNav />
      <main>
        <Container>{children}</Container>
      </main>
      <footer className="py-4 text-center text-muted small">
        <Container>
          &copy; {new Date().getFullYear()} WEB422 Assignment 1
        </Container>
      </footer>
    </>
  );
}

export default Layout;
