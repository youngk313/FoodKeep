(function() {
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // User successfully signed in.
  // Return type determines whether we continue the redirect automatically
  // or whether we leave that to developer to handle.
  var uiConfig = { callbacks: 
                  { signInSuccessWithAuthResult: 
                   function(authResult, redirectUrl) {
                     $( "#login-dialog" ).dialog("close");
                     return true;
                   },

  // The widget is rendered.
  // Hide the loader.
  uiShown: function() { document.getElementById('loader').style.display = 'none';} },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '#',
  signInOptions: [
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
  firebase.auth.GoogleAuthProvider.PROVIDER_ID] };

  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
})();


(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref("users/"+user.uid).update(
          {
          "name": user.displayName, 
           "email": user.email
          });
      $('#login-anchor').hide();
      $('#logout-anchor').show();
      // ...
    } else {
      $('#logout-anchor').hide();
      $('#login-anchor').show();
    }
  });
})();

(function() {
    $('#login-anchor').click(function() {
      $( "#login-dialog" ).dialog("open");
    });
    $('#logout-anchor').click(function() {
      firebase.auth().signOut();
    });
  })();