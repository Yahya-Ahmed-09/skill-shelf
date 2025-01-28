import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD7SThIYPFehgiXSwhaVchDa6V83mnbsCs",
  authDomain: "skill-shelf.firebaseapp.com",
  projectId: "skill-shelf",
  storageBucket: "skill-shelf.firebasestorage.app",
  messagingSenderId: "495571122421",
  appId: "1:495571122421:web:082ffac29edff4d90a2dbc",
  measurementId: "G-LX7VB7MYZJ"
};

// Initialize Firebase
const app:any = initializeApp(firebaseConfig);
export const auth:any = getAuth(app)

export default app

// Android : 840600528292-h831mj9b2aprqrotcoo8s96f03ghl8nm.apps.googleusercontent.com