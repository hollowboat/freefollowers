import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push
} from
  "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";


// ===============================
// FIREBASE
// ===============================

const firebaseConfig = {
  apiKey: "AIzaSyBCJI2YgCLUyI0U9ufRfCujRjDDTeP-lNY",
  authDomain: "kalakkal1-d6e19.firebaseapp.com",
  databaseURL: "https://kalakkal1-d6e19-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kalakkal1-d6e19",
  storageBucket: "kalakkal1-d6e19.appspot.com",
  messagingSenderId: "979373423767",
  appId: "1:979373423767:web:52485a1a022670f2b6fdd2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// ===============================
// ELEMENTS
// ===============================

const form = document.getElementById("followerForm");

const instagramInput =
  document.getElementById("instagram");

const followersInput =
  document.getElementById("followers");

const errorMessage =
  document.getElementById("errorMessage");

const formPage =
  document.getElementById("formPage");

const prankPage =
  document.getElementById("prankPage");


// ===============================
// ATTEMPT COUNTER
// ===============================

let attempt = 0;


// ===============================
// FORM SUBMISSION
// ===============================

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const instagram =
    instagramInput.value.trim();

  const followers =
    followersInput.value.trim();


  // Basic validation
  if (!instagram || !followers) {
    return;
  }


  // Determine attempt
  attempt++;

  const tryName =
    attempt === 1 ? "Try1" : "Try2";


  try {

    // Remove @ if user entered it
    const cleanUsername =
      instagram.startsWith("@")
        ? instagram.substring(1)
        : instagram;


    // Save submission
    await push(
      ref(database, `prankSubmissions/${tryName}`),
      {
        username: cleanUsername,
        followers: followers,
        timestamp: Date.now()
      }
    );


    // ===========================
    // FIRST ATTEMPT
    // ===========================

    if (attempt === 1) {

      errorMessage.style.display = "block";

      // Clear form
      instagramInput.value = "";
      followersInput.value = "";

      // Put cursor back in username
      instagramInput.focus();

    }


    // ===========================
    // SECOND ATTEMPT
    // ===========================

    else {

      formPage.style.display = "none";

      prankPage.style.display = "flex";

    }


  } catch (error) {

    console.error(
      "Firebase submission error:",
      error
    );

    alert(
      "Something went wrong. Please try again."
    );

  }

});
