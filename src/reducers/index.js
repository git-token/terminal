const INITIAL_STATE = {
  views: [
    'Registry',
    'Torvalds Network',
    'Account',
    'Exchange'
  ],
  currentView: 'Welcome',
  currentOrganization: {},
  registered: [],
  organizations: {}
}

export default function reducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case 'WATCH_TOKEN':

      state['organizations'][action.org] =
        !state['organizations'][action.org] ? {} :
        state['organizations'][action.org]

      return {
        ...state,
        organizations: {
          ...state['organizations'],
          [action.org]: {
            ...state['organizations'][action.org],
            [action.event]: {
              ...state['organizations'][action.org][action.event],
              [action.id]: action.data
            }
          }
        }
      }
      break;
    case 'ORGANIZATION_DATA':
      return {
        ...state,
        organizations: {
          ...state['organizations'],
          [action.org]: action.data
        }
      }
      break;
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
      return state
  }
}
