const defaultState = {
}

export default function example(state = defaultState, action) {
  switch (action.type) {
    case 'SENT_REQUEST_PENDING':
      return Object.assign({}, state, {
        isFetching: true,
      })
    default:
      return state;
  }
}
