import 'fetch';

export function getEvents() {
  return fetch('events.json').then((res) => res.json());
}

export function generateEventsHTML(json) {
  return Promise.resolve(json.events.map(function(event) {
    return `<li>${event.date} ${event.time} @ <a href="${event.uri}">${event.location}</a></li>`;
  }).join(''));
}