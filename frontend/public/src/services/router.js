export const router = {
  navigateTo(path) {
    window.history.pushState({}, path, window.location.origin + path);
  },
  getCurrentRoute() {
    return window.location.pathname;
  }
};
