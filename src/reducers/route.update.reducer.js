const initialState = {
  routes: [],
};

export function routeUpdate(state = initialState, action) {
  switch (action.type) {
    case "ROUTE_ROW_UPDATE":
      return {
        ...initialState,
        routes: action.modifiedRoute
      };

    default:
      return state;
  }
}
