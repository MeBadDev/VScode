import "./index.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { GithubAuthProvider, getAuth, setPersistence, browserLocalPersistence, signInWithPopup, signInWithCredential } from "firebase/auth";
import { AuthCredential } from "firebase/auth/cordova";
const GITHUB_SIGNIN_BUTTON = document.getElementById("sign-in-github") as HTMLButtonElement
const firebaseConfig = {
  apiKey: "AIzaSyBDTT27bdvYarY_ZC5pqPTAkoWf5CUfK3I",
  authDomain: "vscode-arena.firebaseapp.com",
  projectId: "vscode-arena",
  storageBucket: "vscode-arena.appspot.com",
  messagingSenderId: "281647827583",
  appId: "1:281647827583:web:695306ab70b0a7cce18d4a",
  measurementId: "G-XKDF11JJFR"
};
const githubProvider = new GithubAuthProvider()
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
githubProvider.addScope("user")
const auth = getAuth()
auth.onAuthStateChanged((user) => {
  console.log(auth.currentUser)
  if (user) {
    console.log("User is signed in.")
  } else {
    console.log("No user is signed in.")
  }
})
GITHUB_SIGNIN_BUTTON.addEventListener("click", async () => {
  setPersistence(auth, browserLocalPersistence).then(async () => {
    signInWithPopup(auth, githubProvider)
      .then(async (result) => {
        const credential = GithubAuthProvider.credentialFromResult(result)
        const userData = result.user.providerData
        const githubInfo = await fetch(`https://api.github.com/user/${userData[0].uid}`)
          .then(res => res.json())
        const githubUsername = githubInfo.login
        const userInfo = {
          email: userData[0].email,
          username: githubUsername,
        }
        const userRef = doc(db, "users", result.user.uid)
        const userDoc = await getDoc(userRef)
        // check if userInfo's property is same as userDoc's property
        // if not, update userDoc
        // if same, do nothing
        if (!userDoc.exists()) {
          await setDoc(userRef, { "exprience": 0, "permission": ["player"], ...userInfo })
          return
        }
        if (userDoc.data().username !== userInfo.username) {
          await setDoc(userRef, { ...userDoc.data(), ...userInfo })
        }
        if (userDoc.data().email !== userInfo.email) {
          await setDoc(userRef, { ...userDoc.data(), ...userInfo })
        }
        console.log("Sign in with GitHub successfully!")
      })
  })
})

