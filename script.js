import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push
} from
  "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";


// ==========================================
// FIREBASE
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyBCJI2YgCLUYI0U9ufRfCujRjDDTeP-lNY",
  authDomain: "kalakkal1-d6e19.firebaseapp.com",
  databaseURL:
    "https://kalakkal1-d6e19-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kalakkal1-d6e19",
  storageBucket: "kalakkal1-d6e19.appspot.com",
  messagingSenderId: "979373423767",
  appId: "1:979373423767:web:52485a1a022670f2b6fdd2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// ==========================================
// HTML ELEMENTS
// ==========================================

const form =
  document.getElementById("followerForm");

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


// ==========================================
// ATTEMPT COUNTER
// ==========================================

let attempt = 0;


// ==========================================
// FORM
// ==========================================

if (!form) {
  console.error("followerForm was not found.");
}


// ==========================================
// SUBMIT
// ==========================================

form?.addEventListener("submit", async (event) => {

  event.preventDefault();


  // ----------------------------------------
  // GET INPUTS
  // ----------------------------------------

  const instagram =
    instagramInput.value.trim();

  const followers =
    followersInput.value.trim();


  // ----------------------------------------
  // VALIDATION
  // ----------------------------------------

  if (!instagram || !followers) {
    return;
  }


  // ----------------------------------------
  // INCREASE ATTEMPT
  // ----------------------------------------

  attempt++;

  const tryName =
    attempt === 1
      ? "Try1"
      : "Try2";


  // ----------------------------------------
  // CLEAN USERNAME
  // ----------------------------------------

  const cleanUsername =
    instagram.replace(/^@/, "");


  try {

    // ======================================
    // SAVE TO FIREBASE
    // ======================================

    const submissionRef =
      ref(
        database,
        `prankSubmissions/${tryName}`
      );

    await push(
      submissionRef,
      {
        username: cleanUsername,
        followers: followers,
        timestamp: Date.now()
      }
    );


    console.log(
      `Saved successfully: ${tryName}`
    );


    // ======================================
    // FIRST ATTEMPT
    // ======================================

    if (attempt === 1) {

      if (errorMessage) {
        errorMessage.style.display =
          "block";
      }

      instagramInput.value = "";
      followersInput.value = "";

      instagramInput.focus();

      return;
    }


    // ======================================
    // SECOND ATTEMPT
    // ======================================

    if (attempt === 2) {

      if (formPage) {
        formPage.style.display =
          "none";
      }

      if (prankPage) {
        prankPage.style.display =
          "flex";
      }

    }

  } catch (error) {

    console.error(
      "Firebase error:",
      error
    );

    alert(
      "Something went wrong. Please try again."
    );

  }

});
