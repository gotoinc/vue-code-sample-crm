import firebase from "firebase";

export default class CategoryService {
  static async fetchCategories({ uuid }) {
    return await firebase
      .database()
      .ref(`/users/${uuid}/categories`)
      .once("value");
  }

  static async fetchCategory({ uuid, id }) {
    return await firebase
      .database()
      .ref(`/users/${uuid}/records/`)
      .child(id)
      .once("value");
  }
}
