import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Form } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import { registerUser } from '@/lib/authenticate';

function Register() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [warning, setWarning] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWarning('');

    try {
      await registerUser(user, password, password2);
      router.push('/login');
    } catch (err) {
      setWarning(err.message);
    }
  };

  return (
    <div>
      <PageHeader text="Register" subtext="Register for an account" />
      {warning && <Alert variant="danger">{warning}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="registerUser">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
