export const router = {
  navigateTo(path) {
    window.history.pushState({}, '', window.location.origin + path);
  },
  getCurrentRoute() {
    return window.location.pathname;
  }
};
