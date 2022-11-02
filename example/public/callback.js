/* eslint-disable no-undef */
if (Oidc && Oidc.Log && Oidc.Log.logger) {
  Oidc.Log.logger = console;
}

new Oidc.UserManager({ response_mode: "query" })
  .signinRedirectCallback()
  .then(function (usr) {
    window.location = "/home";
  })
  .catch(function (err) {
    console.log("signinRedirectCallback error", err);
    redirectToRoot();
  });

function redirectToRoot(redirect = null) {
  if (redirect) {
    window.location = redirect;
    return;
  }
  var pathname = window.location.pathname || "";
  var paths = pathname.split("/");
  paths.pop();
  window.location = paths.join("/") || "/";
}
