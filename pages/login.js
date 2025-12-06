import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Form } from 'react-bootstrap';
import { useAtom } from 'jotai';
import PageHeader from '@/components/PageHeader';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';
import { favouritesAtom } from '@/store';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);

  const updateAtom = async () => {
    const list = await getFavourites();
    setFavouritesList(Array.isArray(list) ? list : []);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWarning('');

    try {
      await authenticateUser(user, password);
      await updateAtom();
      router.push('/');
    } catch (err) {
      setWarning(err.message);
    }
  };

  return (
    <div>
      <PageHeader text="Login" subtext="Access your account" />
      {warning && <Alert variant="danger">{warning}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginUser">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
