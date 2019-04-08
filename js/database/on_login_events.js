(function () {
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // User successfully signed in.
  // Return type determines whether we continue the redirect automatically
  // or whether we leave that to developer to handle.
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        $("#lean_overlay").fadeOut(200);
        $("#login-dialog").css('display', 'none');
        return true;
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '#',
    signInOptions: [
      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };

  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
})();

(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //Log In...
      var promise = firebase.database().ref("users/" + user.uid).update({
        "name": user.displayName,
        "email": user.email
      });
      $('#login-anchor').hide();
      $('#logout-anchor').show();
      $('#item-container').empty();
      let firstName = user.displayName.split(' ')[0];
      $('#user-greeting').empty();
      $('#user-greeting').html('Hi ' + firstName + '!');
      $('#user-greeting').show();
    } else {
      //Log Out...
      $('#logout-anchor').hide();
      $('#user-greeting').hide();
      $('#login-anchor').show();
      $('#item-container').empty();
      $('#user-greeting').empty();
    }
  });
})();

//Event handlers for Log In and Log Out buttons
(function () {
  $('#logout-anchor').click(function () {
    firebase.auth().signOut();
  });
})();