export function getPath() {
  return window.location.pathname.substring(1);
}

export function setPath(path) {
  window.history.pushState({}, '', path || '/');
}

export function getTitleFromPath(path) {
  let index = path.indexOf('/');

  if (path === '/') {
    return 'Home';
  }
  return path.charAt(index + 1).toUpperCase() + path.substring(index + 2);
}