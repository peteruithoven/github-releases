const PREFIX = 'github_releases_';

export function read(id) {
  try {
    return localStorage.getItem(PREFIX + id);
  } catch (error) {
    console.error('Reading localStorage failed, falling back to default'); // eslint-disable-line no-console
  }
  return undefined;
}

export function write(id, value) {
  try {
    localStorage.setItem(PREFIX + id, value);
  } catch (error) {
    console.error('Storing data to localStorage failed'); // eslint-disable-line no-console
  }
  return value;
}

export function remove(id) {
  try {
    localStorage.removeItem(PREFIX + id);
  } catch (error) {
    console.error('Removing data from localStorage failed'); // eslint-disable-line no-console
  }
}
