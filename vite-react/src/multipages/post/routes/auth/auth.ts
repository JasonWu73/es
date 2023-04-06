/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  loggedIn: false,

  login(callback: VoidFunction) {
    fakeAuthProvider.loggedIn = true;
    setTimeout(callback, 1000); // Fake async
  },

  logout(callback: VoidFunction) {
    fakeAuthProvider.loggedIn = false;
    setTimeout(callback, 1000);
  }
};

export {fakeAuthProvider};
