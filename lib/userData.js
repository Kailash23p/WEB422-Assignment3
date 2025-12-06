import { getToken, removeToken } from './authenticate';

const getApiUrl = () => {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) {
    console.error('NEXT_PUBLIC_API_URL is not set. Add it to .env.local.');
    return null;
  }
  return base;
};

const withAuthHeaders = () => {
  const token = getToken();
  if (!token) return {};
  return { Authorization: `JWT ${token}` };
};

export const addToFavourites = async (id) => {
  const base = getApiUrl();
  const headers = withAuthHeaders();
  console.log('addToFavourites called:', { id, base, hasAuth: !!headers.Authorization });
  
  if (!base || !headers.Authorization) {
    console.warn('No base URL or auth header, returning empty array');
    return [];
  }

  try {
    const url = `${base}/favourites/${id}`;
    console.log('Fetching:', url);
    const res = await fetch(url, {
      method: 'PUT',
      headers,
    });

    console.log('Response status:', res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error('Failed to add favourite', res.status, text);
      return [];
    }

    if (res.status === 200) {
      const data = await res.json();
      console.log('Successfully added to favourites:', data);
      return data;
    }
  } catch (err) {
    console.error('Failed to add favourite', err);
  }

  return [];
};

export const removeFromFavourites = async (id) => {
  const base = getApiUrl();
  const headers = withAuthHeaders();
  if (!base || !headers.Authorization) return [];

  try {
    const res = await fetch(`${base}/favourites/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Failed to remove favourite', res.status, text);
      return [];
    }

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    console.error('Failed to remove favourite', err);
  }

  return [];
};

export const getFavourites = async () => {
  const base = getApiUrl();
  const headers = withAuthHeaders();
  if (!base || !headers.Authorization) return [];

  try {
    const res = await fetch(`${base}/favourites`, {
      headers,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Failed to fetch favourites', res.status, text);
      return [];
    }

    if (res.status === 200) {
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }
  } catch (err) {
    console.error('Failed to fetch favourites', err);
  }

  return [];
};
