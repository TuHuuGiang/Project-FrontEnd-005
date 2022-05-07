import {
  useEffect,
  useState
} from 'react';
import firebase, {
  initializeApp
} from 'firebase/app';
import {
  getFirestore
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser
} from 'firebase/auth';
import {
  async
} from '@firebase/util';
import { getStorage } from 'firebase/storage';

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);


// REGISTER
export function register(email, password) {
  console.log(auth);
  return createUserWithEmailAndPassword(auth, email, password);
}

// LOGIN
export function login(email, password) {
  console.log(auth);
  return signInWithEmailAndPassword(auth, email, password);
}

// LOG OUT
export function logout() {
  return signOut(auth);
}

// DEL USER
export function delUser(uid) {
  return deleteUser(uid);
}

// Check User
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    console.log(currentUser);
    return unsub;
  }, [currentUser]);

  return currentUser;
}
