/**
 * Module for Firebase configuration, initializing and functions.
 *
 * @module Firebase
 * @author Eeli Klemettilä
 */

'use strict';

import {initializeApp} from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import Home from './home';

/**
 * Configure Firebase.
 */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

/**
 * Initialize Firebase.
 */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Log in with email and password. Alert if e-mail and password don't match.
 * @param {String} email - Account e-mail
 * @param {String} password - Account password
 */
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

/**
 * Register new account to Firebase and renders Home page. If e-mail already exist throws error alert.
 * @param {String} displayName - Account username
 * @param {String} email - Account e-mail
 * @param {String} password - Account password
 */
const registerWithEmailAndPassword = async (displayName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      displayName,
      authProvider: 'local',
      email,
    });
    Home.render();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

/**
 * Logout current account.
 */
const logout = () => {
  signOut(auth);
};

/**
 * Upload blogpost data to Firebase Firestore database and Cloud Storage and then reset post form.
 */
const uploadPost = async () => {
  const storage = getStorage();
  const file = document.getElementById('image').files[0];
  const restaurant = document.getElementById('restaurant').value;
  const portion = document.getElementById('portion').value;
  const rating = document.getElementById('rating').value;
  const description = document.getElementById('description').value;
  const location = document.getElementById('location').value;
  const metadata = {
    contentType: 'image',
  };
  const storageRef = ref(
    storage,
    'images/' + Timestamp.now().toMillis().toString()
  );
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  const postForm = document.getElementById('post-form');
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      const uploadButton = document.getElementById('uploadButton');
      const spinner = document.createElement('span');
      spinner.classList = 'spinner-border spinner-border-sm';
      spinner.role = 'status';
      spinner.ariaHidden = 'true';
      uploadButton.textContent = 'Tallennetaan';
      uploadButton.append(spinner);
      if (progress === 100) {
        uploadButton.textContent = 'Tallenna';
      }
    },
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          console.log('Log in or register to upload data.');
          break;
        case 'storage/unknown':
          console.log('Unknown error.');
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        let timestamp = Timestamp.now().toDate();
        const date = new Date(timestamp);
        addDoc(collection(db, 'posts'), {
          restaurant: restaurant,
          portion: portion,
          rating: rating,
          description: description,
          imageUrl: downloadURL,
          location: location,
          created: {
            time: date.getHours() + ':' + date.getMinutes(),
            date:
              date.getDay() +
              '.' +
              (date.getMonth() + 1) +
              '.' +
              date.getFullYear(),
          },
        });
        postForm.reset();
      });
    }
  );
};

/**
 * Fetch all blogposts from Firebase collection posts.
 *
 * @returns Object
 */
const getAllPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      restaurant: doc.data().restaurant,
      portion: doc.data().portion,
      rating: doc.data().rating,
      description: doc.data().description,
      imageUrl: doc.data().imageUrl,
      location: doc.data().location,
      created: doc.data().created,
    });
  });
  return data;
};

/**
 * Fetch all blogpost from Firebase collection based on location.
 *
 * @param {String} location - Name of the city based on physical location.
 * @returns Object
 */
const getPostsByCity = async (location) => {
  const q = query(
    collection(db, 'posts'),
    where('location', '==', `${location}`)
  );
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      restaurant: doc.data().restaurant,
      portion: doc.data().portion,
      rating: doc.data().rating,
      description: doc.data().description,
      imageUrl: doc.data().imageUrl,
      location: doc.data().location,
      created: doc.data().created,
    });
  });
  return data;
};

const Firebase = {
  auth,
  signInWithEmailAndPassword,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  uploadPost,
  getAllPosts,
  getPostsByCity,
};

export default Firebase;
