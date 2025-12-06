import { getFavourites } from '../_mockDb';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const result = getFavourites(authHeader);

  return res.status(result.status).json(result.data);
}
