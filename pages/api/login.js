import { loginUser } from './_mockDb';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userName, password } = req.body || {};
  const result = loginUser(userName, password);

  return res.status(result.status).json({ token: result.token, message: result.message });
}
