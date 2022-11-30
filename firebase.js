import { initializeApp } from "firebase/app"; 
import {GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut,} from "firebase/auth";
import { getFirestore,query,getDocs,collection, where, addDoc, serverTimestamp, onSnapshot, orderBy } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmFyGT1IbqhGwrw2UZshU9EtR-ZrKYbJE",
    authDomain: "swe-project-f85ff.firebaseapp.com",
    projectId: "swe-project-f85ff",
    storageBucket: "swe-project-f85ff.appspot.com",
    messagingSenderId: "249726761820",
    appId: "1:249726761820:web:4c5994b5dee091efcbdf99",
    measurementId: "G-TSBFD64SY1"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};


async function addLogs(user) {
    try {
        await addDoc(collection(db, 'activity-log'), {
            uid: user.uid,
            text: "ALERT! MOTION DETECTED",
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

function getLogs(callback) {
    return onSnapshot(
        query(
            collection(db, 'activity-log', 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(messages);
        }
    );
}

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  addLogs,
  getLogs
};