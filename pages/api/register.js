import { registerUser } from './_mockDb';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userName, password, password2 } = req.body || {};
  const result = registerUser(userName, password, password2);

  return res.status(result.status).json({ message: result.message });
}
