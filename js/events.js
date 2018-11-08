var dateFormat = 'MM-DD-YYYY hh:mma';
var doneLoading = false;

displayEvents();

/**
 * Fetch and display event data from DB.
 */
function displayEvents() {
  db.collection('events')
    .get()
    .then(function(querySnapshot) {
      // Parse events from query, format date property for sorting.
      var events = [];
      querySnapshot.forEach(function(doc) {
        var event = doc.data();
        event.id = doc.id;
        event.date = moment(event.date, dateFormat).toISOString();
        events.push(event);
      });

      if (events.length <= 0) {
        document.querySelector('.loader').classList.remove('loader');
      }

      // Sort events by date, earliest event at top.
      events = _.orderBy(events, ['date'], ['asc']);

      _.forEach(events, function(event) {
        var eventItem = document.createElement('div');

        // Set template of each event
        eventItem.innerHTML = `
          ${authenticatedUser ? createRemoveButton(event.id) : '<div></div>'}
          <p class="lead">
            ${moment(event.date).format('dddd, MMMM Do @ hh:mma')} | 
            <strong>${event.title}</strong>
          </p>
          <p>${event.description}</p>
          <p><em>${event.location}</em></p>
        `;

        // Stop loader
        if (!doneLoading) {
          document.querySelector('.loader').classList.remove('loader');
          doneLoading = true;
        }

        eventItem.classList.add('event-item', 'hidden-event');
        document.getElementById('event-list').appendChild(eventItem);

        // Add remove button to event element if user is authenticated.
        if (authenticatedUser) {
          document
            .getElementById(event.id)
            .addEventListener('click', function(e) {
              e.preventDefault();
              db.collection('events')
                .doc(event.id)
                .delete()
                .then(function() {
                  eventItem.classList.remove(['reveal']);
                  activateSuccessAlert();
                })
                .catch(function(error) {
                  console.log(error);
                  activateFailedAlert();
                });
            });
        }

        // Add Animation class to element after its mounted.
        setTimeout(function() {
          eventItem.classList.add('reveal');
        }, 10);
      });

      eventsDisplayed = true;
    });
}

/**
 * Remove currently displayed events, re-fetch events from DB.
 */
function resetEventList() {
  var eventList = document.getElementById('event-list');
  while (eventList.firstChild) {
    eventList.removeChild(eventList.firstChild);
  }

  displayEvents();
}

/**
 * Creates template for remove button.
 *
 * @param {string} id
 * @returns {string} template
 */
function createRemoveButton(id) {
  return `<div id="remove-event-container">
    <a href="" id="${id}">Remove</a>
  </div>`;
}
