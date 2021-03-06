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

export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach( obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

export const convertCollectionsSnapshotToMap =  (collections) => {
    const transformedCollection = collections.docs.map( doc => {
        const {title, items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    console.log("transformedCollection=", transformedCollection);
    const reducedCollection = transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
    console.log("reducedCollection=", reducedCollection);
    return reducedCollection;
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
  
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;