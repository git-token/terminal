const INITIAL_STATE = {
  views: [
    'Home',
    'Account',
    'Registry',
    'Exchange',
    'Torvalds Network'
  ],
  currentView: 'Home',
  currentOrganization: {},
  registered: [],
  organizations: {}
}

export default function reducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case 'ORGANIZATION_DATA_UPDATE':

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
    case 'ORGANIZATION_HIGHEST_BLOCK':
      return {
        ...state,
        organizations: {
          ...state['organizations'],
          [action.org]: {
            ...state['organizations'][action.org],
            fromBlock: action.data
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
    case 'CACHED_ORGANIZATIONS':
      return {
        ...state,
        organizations: action.data
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
