
  // Import the functions you need from the SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
  import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCL0gqMAs7GyX3cGGaeL0QLjOsh7w6QGkA",
    authDomain: "nextgenlearn-75032.firebaseapp.com",
    projectId: "nextgenlearn-75032",
    storageBucket: "nextgenlearn-75032.appspot.com", // fixed here
    messagingSenderId: "750912407281",
    appId: "1:750912407281:web:377193b7bd2c251fb14b50",
    measurementId: "G-HYEGLDT58Q"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Function to show messages
  function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
      messageDiv.style.opacity = 0;
    }, 5000);
  }

  // Signup Handler
  const signUp = document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    if (!email || !password || !firstName || !lastName) {
      showMessage('Please fill in all fields.', 'signUpMessage');
      return;
    }

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          firstName: firstName,
          lastName: lastName
        };

        showMessage('Account Created Successfully', 'signUpMessage');

        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            window.location.href = 'index.html';
          })
          .catch((error) => {
            console.error("Error writing document:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          showMessage('Email Address Already Exists !!!', 'signUpMessage');
        } else {
          showMessage('Unable to create User: ' + error.message, 'signUpMessage');
        }
      });
  });

  // SignIn Handler
  const signIn = document.getElementById('submitSignIn');
  signIn.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      showMessage('Please enter email and password.', 'signInMessage');
      return;
    }

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        showMessage('Login is successful', 'signInMessage');
        window.location.href = 'homepage.html';
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
          showMessage('Incorrect Email or Password', 'signInMessage');
        } else {
          showMessage('Account does not Exist or Login Failed', 'signInMessage');
        }
        console.error("Login error:", error.message);
      });
  });

