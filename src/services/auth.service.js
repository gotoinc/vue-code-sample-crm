import firebase from "firebase/app";

export default class AuthService {
  static async login({ email, password }) {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static async logout() {
    return await firebase.auth().signOut();
  }

  static async signUp({ email, password }) {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  }

  static async setInitialUserData({ uuid, name }) {
    return await firebase.database().ref(`/users/${uuid}/info`).set({
      bill: 10000,
      name,
    });
  }

  static getCurrentUser() {
    return firebase.auth().currentUser;
  }
}
