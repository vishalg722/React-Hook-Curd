const initialState = {
  routes: [],
  error: "",
  loading: false
};

const status = false;
export function routeReducer(state = initialState, action) {
  //console.log(action.routesData);
  switch (action.type) {
    case "SUCCESSFUL_GETLIST":
      return {
        ...initialState,
        loading: false,
        routes: action.routesData
      };
    case "INITIAL_FETCH":
      return {
        ...initialState,
        loading: true
      };
    case "ERROR_DURING_FETCH":
      return {
        ...initialState,
        loading: false
    };
    case "MODIFIED_ROUTE":
      return {
        ...initialState,
        routes: action.routes.routes
      };
    default:
      return state;
  }
}
