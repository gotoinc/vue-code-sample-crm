import firebase from "firebase/app";

export default class InfoService {
  static async fetchUserInfo(uuid) {
    return await firebase.database().ref(`users/${uuid}/info`).once("value");
  }

  static async fetchCurrency() {
    return await fetch(` https://api.exchangerate-api.com/v4/latest/EUR`);
  }

  static async updateUserInfo({ uuid, updateData }) {
    return await firebase
      .database()
      .ref(`/users/${uuid}/info`)
      .update(updateData);
  }
}
