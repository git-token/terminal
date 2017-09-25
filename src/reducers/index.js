const INITIAL_STATE = {
  views: [
    'Registry',
    'Account',
    'Register',
    'Torvalds Network',
    'Community',
    'Downloads'
  ],
  currentView: 'Welcome',
  currentOrganization: {},
  registered: [],
  contributions: []
}

export default function reducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_ORGANIZATION':
    return {
      ...state,
      currentOrganization: action.result
    }
    break;
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.result
      }
      break;
    case 'GET_REGISTERED':
      return {
        ...state,
        registered: action.result
      }
      break;
    default:
      state
  }
}
