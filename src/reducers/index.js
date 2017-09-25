const INITIAL_STATE = {
  views: [
    'Registry',
    'Torvalds Network',
    'Account',
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
