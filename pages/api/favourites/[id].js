import { addFavourite, removeFavourite } from '../_mockDb';

export default function handler(req, res) {
  const authHeader = req.headers.authorization;
  const {
    query: { id },
    method,
  } = req;

  if (method === 'PUT') {
    const result = addFavourite(authHeader, id);
    return res.status(result.status).json(result.data);
  }

  if (method === 'DELETE') {
    const result = removeFavourite(authHeader, id);
    return res.status(result.status).json(result.data);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
