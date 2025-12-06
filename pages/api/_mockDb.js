// Persist mock data across hot reloads in dev
const globalStore = globalThis.__mockStore || { users: [] };
globalThis.__mockStore = globalStore;
const { users } = globalStore;

const findUser = (userName) => users.find((user) => user.userName === userName);

const buildToken = (userName) => {
  const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({ userName })).toString('base64');
  return `${header}.${payload}.mock-signature`;
};

export const registerUser = (userName, password, password2) => {
  if (!userName || !password || !password2) {
    return { status: 400, message: 'All fields are required.' };
  }

  if (password !== password2) {
    return { status: 400, message: 'Passwords do not match.' };
  }

  if (findUser(userName)) {
    return { status: 400, message: 'User already exists.' };
  }

  users.push({ userName, password, favourites: [] });
  return { status: 200, message: 'User registered successfully.' };
};

export const loginUser = (userName, password) => {
  const user = findUser(userName);
  if (!user || user.password !== password) {
    return { status: 401, message: 'Invalid credentials.' };
  }

  const token = buildToken(userName);
  return { status: 200, token, message: 'Authenticated.' };
};

const parseToken = (authHeader) => {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'JWT' || !token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
    return payload?.userName ?? null;
  } catch (err) {
    return null;
  }
};

export const getUserFromAuth = (authHeader) => {
  const userName = parseToken(authHeader);
  if (!userName) return null;
  return findUser(userName) ?? null;
};

export const getFavourites = (authHeader) => {
  const user = getUserFromAuth(authHeader);
  if (!user) return { status: 401, data: [] };
  return { status: 200, data: user.favourites };
};

export const addFavourite = (authHeader, id) => {
  const user = getUserFromAuth(authHeader);
  if (!user) return { status: 401, data: [] };
  if (!id) return { status: 400, data: [], message: 'Missing id.' };
  if (!user.favourites.includes(id)) {
    user.favourites.push(id);
  }
  return { status: 200, data: user.favourites };
};

export const removeFavourite = (authHeader, id) => {
  const user = getUserFromAuth(authHeader);
  if (!user) return { status: 401, data: [] };
  if (!id) return { status: 400, data: [], message: 'Missing id.' };
  user.favourites = user.favourites.filter((fav) => fav !== id);
  return { status: 200, data: user.favourites };
};
