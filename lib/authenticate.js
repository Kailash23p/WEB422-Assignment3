const TOKEN_KEY = 'token';

const storeToken = (token) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
};

export const readToken = () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    // Token is invalid / not a JWT; remove it so it doesn't keep throwing
    removeToken();
    return null;
  }
};

export const removeToken = () => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
};

const getApiUrl = () => {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) {
    throw new Error('NEXT_PUBLIC_API_URL is not set. Add it to .env.local.');
  }
  return base;
};

const parseJson = async (res) => {
  const text = await res.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(text || 'Unexpected response from server.');
  }
};

export const authenticateUser = async (user, password) => {
  const res = await fetch(`${getApiUrl()}/login`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await parseJson(res);

  if (res.status === 200) {
    storeToken(data.token);
    return data;
  }

  throw new Error(data.message ?? 'Unable to authenticate');
};

export const registerUser = async (user, password, password2) => {
  const res = await fetch(`${getApiUrl()}/register`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password, password2 }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await parseJson(res);

  if (res.status === 200) {
    return data;
  }

  throw new Error(data.message ?? 'Unable to register');
};
