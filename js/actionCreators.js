import fetch from 'isomorphic-fetch'

export function toggleFileInput (value) {
  return {
    type: 'TOGGLE_FILE_INPUT',
    value: value
  }
}

export function setFormValid (isValid) {
  return {
    type: 'SET_FORM_VALID',
    value: isValid
  }
}

export function toggleNav (isOpen) {
  return {
    type: 'TOGGLE_NAV',
    value: isOpen
  }
}

export function isScrolled (isScrolled) {
  return {
    type: 'IS_SCROLLED',
    value: isScrolled
  }
}

export function setSubject (subject) {
  return {
    type: 'SET_SUBJECT',
    value: subject
  }
}

export function invalidateEvents () {
  return {
    type: 'INVALIDATE_EVENTS'
  }
}

export function requestEvents () {
  return {
    type: 'REQUEST_EVENTS'
  }
}

export function recieveEvents (json) {
  return {
    type: 'RECIEVE_EVENTS',
    isFetching: false,
    didInvalidate: false,
    data: json.events,
    recievedAt: Date.now()
  }
}

export function fetchEvents () {
  return function (dispatch) {
    dispatch(requestEvents())
    return fetch('events.json')
      .then(response => response.json())
      .then(json => dispatch(recieveEvents(json)))
  }
}