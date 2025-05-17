// homepage.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

// Your Firebase config (same as in sign-in/sign-up script)
const firebaseConfig = {
  apiKey: "AIzaSyCL0gqMAs7GyX3cGGaeL0QLjOsh7w6QGkA",
  authDomain: "nextgenlearn-75032.firebaseapp.com",
  projectId: "nextgenlearn-75032",
  storageBucket: "nextgenlearn-75032.appspot.com",
  messagingSenderId: "750912407281",
  appId: "1:750912407281:web:377193b7bd2c251fb14b50",
  measurementId: "G-HYEGLDT58Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Get references to HTML elements
const fnameSpan = document.getElementById("loggedUserFName");
const lnameSpan = document.getElementById("loggedUserLName");
const emailSpan = document.getElementById("loggedUserEmail");

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;

    try {
      const userDoc = await getDoc(doc(db, "users", uid));

      if (userDoc.exists()) {
        const data = userDoc.data();
        fnameSpan.textContent = data.firstName || "N/A";
        lnameSpan.textContent = data.lastName || "N/A";
        emailSpan.textContent = data.email || "N/A";
      } else {
        console.error("User data not found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    // No user is logged in, redirect to login
    window.location.href = "login.html";
  }
});

// Logout functionality
document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    localStorage.removeItem("loggedInUserId");
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Logout error:", error);
  });
});
