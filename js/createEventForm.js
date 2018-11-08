var button = document.getElementById('create-event-button');

button.addEventListener('click', function(e) {
  e.preventDefault();

  // Submit data to DB.
  db.collection('events')
    .add({
      title: document.getElementById('event-title').value,
      date: document.getElementById('event-date').value,
      location: document.getElementById('event-location').value,
      description: document.getElementById('event-description').value,
    })

    // Show success alert upon completion.
    .then(function() {
      activateSuccessAlert();

      document.getElementById('create-event-form').reset();
    })

    // Show fail Alert if error.
    .catch(function(error) {
      activateFailedAlert();
      console.log(error);
    });
});
