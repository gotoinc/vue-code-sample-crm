import firebase from "firebase";

export default class RecordService {
  static async createRecord({ uuid, record }) {
    return firebase.database().ref(`/users/${uuid}/records`).push(record);
  }

  static async fetchRecords({ uuid }) {
    return await firebase
      .database()
      .ref(`/users/${uuid}/records`)
      .once("value");
  }

  static async fetchRecord({ uuid, id }) {
    return await firebase
      .database()
      .ref(`/users/${uuid}/records/`)
      .child(id)
      .once("value");
  }
}
