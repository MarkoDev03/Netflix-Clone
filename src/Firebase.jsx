import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0EiFuZdwTY1yzEdfQ7pFb-BZIekvjV_w",
    authDomain: "netflix-clone-2bc90.firebaseapp.com",
    projectId: "netflix-clone-2bc90",
    storageBucket: "netflix-clone-2bc90.appspot.com",
    messagingSenderId: "201359628552",
    appId: "1:201359628552:web:efc29463c1a896778234bd",
    measurementId: "G-7M3QFC25TX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firestore = firebaseApp.firestore();
  const database = firebaseApp.database();
  const auth = firebaseApp.auth();
  const storage = firebaseApp.storage();

  export {auth}
  export {database}
  export {storage}
  export default firestore;