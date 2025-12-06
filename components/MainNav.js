import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { readToken, removeToken } from '@/lib/authenticate';

function MainNav() {
  const router = useRouter();
  const token = readToken();
  const userName = token?.userName;

  const logout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} href="/">
          WEB422 Assignment 1
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
          </Nav>

          {token && (
            <Nav className="ms-auto">
              <NavDropdown title={userName ?? 'User'} align="end">
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          {!token && (
            <Nav className="ms-auto">
              <Nav.Link as={Link} href="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;
