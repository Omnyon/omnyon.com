export function navIsOpen (state = false, action) {
  switch (action.type) {
    case 'TOGGLE_NAV':
      return (action.value !== undefined ? action.value : !state)
    default:
      return state
  }
}

export function pageIsScrolled (state = false, action) {
  switch (action.type) {
    case 'IS_SCROLLED':
      return action.value
    default:
      return state
  }
}

let initialSections = [
  {navTitle: 'Values', title: 'values'},
  {navTitle: 'Who we are', title: 'benefits'},
  {navTitle: 'Openings', title: 'openings'},
  {navTitle: 'Expertise', title: 'expertise'},
  {navTitle: 'Events', title: 'events'},
  {navTitle: 'Contact', title: 'contact'}
]

export function sections (state = initialSections, action) {
  return state
}

export function showFileInput (state = true, action) {
  switch (action.type) {
    case 'TOGGLE_FILE_INPUT':
      return action.value
    default:
      return state
  }
}
export function formIsValid (state = false, action) {
  switch (action.type) {
    case 'SET_FORM_VALID':
      return (action.value !== undefined ? action.value : !state)
    default:
      return state
  }
}

export function subject (state = '', action) {
  switch (action.type) {
    case 'SET_SUBJECT':
      return action.value
    case 'CLEAR_SUBJECT':
      return ''
    default:
      return state
  }
}

let initialEvents = {
  isFetching: false,
  didInvalidate: false,
  data: [],
  lastUpdated: null
}

export function events (state = initialEvents, action) {
  switch (action.type) {
    case 'INVALIDATE_EVENTS':
      return {
        ...state,
        didInvalidate: true,
        data: []
      }
    case 'REQUEST_EVENTS':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case 'RECIEVE_EVENTS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}