import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage} from "firebase/storage";

const linkSheet = "142Ei6ewo87GYD-f6qzL_V-KmKtBQN5s6cDObMkgsBXI/Sheet1";
const firebaseConfig = {
  apiKey: "AIzaSyAELzR4q4bjuFBwiyODlQRNnSvbTdUfKAw",
  authDomain: "gdsc---qr-app.firebaseapp.com",
  databaseURL: "https://gdsc---qr-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gdsc---qr-app",
  storageBucket: "gdsc---qr-app.appspot.com",
  messagingSenderId: "411056113880",
  appId: "1:411056113880:web:c841c975d077d52d14afad"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const storage = getStorage(app);
export {
  database,
  storage,
  linkSheet
}