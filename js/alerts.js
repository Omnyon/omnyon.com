/**
 * Temporarily makes success alert visible.
 */
function activateSuccessAlert() {
  var successAlert = document.getElementById('success-alert');
  successAlert.classList.add('alert-active');

  setTimeout(function() {
    successAlert.classList.remove(['alert-active']);
  }, 3000);
}

/**
 * Temporarirly makes failed alert visible.
 */
function activateFailedAlert() {
  var failAlert = document.getElementById('fail-alert');
  failAlert.classList.add('alert-active');

  setTimeout(function() {
    failAlert.classList.remove(['alert-active']);
  }, 3000);
}
