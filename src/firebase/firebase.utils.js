import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDBza8xlFpjwRLyj4NlOlTCVozmD9dxnhY",
    authDomain: "crwn-db-9749b.firebaseapp.com",
    projectId: "crwn-db-9749b",
    storageBucket: "crwn-db-9749b.appspot.com",
    messagingSenderId: "265144366409",
    appId: "1:265144366409:web:a1c67cf35a69a00bf2d698",
    measurementId: "G-RWLE0806VS"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if ( !userAuth ) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log("createUserProfile(): snapShot=", userRef, snapShot );
    if ( ! snapShot.exists ) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set( {
                displayName,
                email,
                createdAt,
                additionalData
            });
        } catch (err) {
            console.log('error creating user', err.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
  
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;