// Firebase firestore config
// TODO: store apikey on server so no visible in source code;
var config = {
  apiKey: 'AIzaSyBxjowyeeA_U4McwGnekjU3Srb5inI-eZw',
  authDomain: 'omnyon-web-app.firebaseapp.com',
  databaseURL: 'https://omnyon-web-app.firebaseio.com',
  projectId: 'omnyon-web-app',
  storageBucket: 'omnyon-web-app.appspot.com',
  messagingSenderId: '741881936395',
};

var authenticatedUser = undefined;
// TODO Move this somewhere more reasonable;
// Is
var eventsDisplayed = false;
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
});

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: window.location,
  // Autorization methods.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],

  // Disable account chooser redirects
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,

  // Create callback for successful login
  callbacks: {
    signInSuccessWithAuthResult: function(authResult) {
      return false;
    },
  },
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Observe authentication
initApp = function() {
  firebase.auth().onAuthStateChanged(
    function(user) {
      if (user) {
        addUserToNav(user);
        authenticatedUser = user;

        // Reset event display if function is available
        if (typeof resetEventList === 'function' && eventsDisplayed) {
          resetEventList();
        }
      } else {
        document
          .getElementById('sign-in-link')
          .addEventListener('click', function(e) {
            e.preventDefault();
            ui.start('#firebaseui-auth-container', uiConfig);
          });
      }
    },
    function(error) {
      console.log(error);
    }
  );
};

/**
 * Add items to nav available for authenticated users
 *
 * @param {object} authUser
 */
function addUserToNav(authUser) {
  var displayName = authUser.displayName;
  var email = authUser.email;

  if (!displayName) displayName = email.split('.')[0];

  document.getElementById('authorization').classList.remove(['reveal']);

  // Create Event nav link.
  var createEventItem = document.createElement('li');
  createEventItem.innerHTML = '<a href="/createEventForm">Create Event</a>';
  createEventItem.classList.add('navbar-hidden-item');

  // User name and sign out link
  var displayNameItem = document.createElement('li');
  displayNameItem.innerHTML = `
    <a href="" id="sign-out" style="color:#219ab5;">
      <strong>${displayName}</strong>
    </a>
  `;
  displayNameItem.classList.add('navbar-hidden-item');

  var navList = document.getElementById('top-navigation');
  navList.appendChild(createEventItem);
  navList.appendChild(displayNameItem);

  //Add sign out function to link
  document.getElementById('sign-out').addEventListener('click', function(e) {
    e.preventDefault();
    firebase
      .auth()
      .signOut()

      // On success refresh page to complete log out.
      .then(function() {
        location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  // Add animation.
  setTimeout(function() {
    createEventItem.classList.add('reveal');
    displayNameItem.classList.add('reveal');
  }, 10);

  /*document.getElementById('sign-in-nav-button').innerHTML =
    '<a href="" id="sign-out" style="color:#219ab5;"><strong>' +
    displayName +
    '</strong></a>';*/

  /*document.getElementById('create-event-nav-button').innerHTML =
    '<a href="/createEventForm">Create Event</a>';*/
}

window.addEventListener('load', function() {
  initApp();
});
