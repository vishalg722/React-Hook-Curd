function request(route) {
  return { type: "ROUTE_ROW_UPDATE", modifiedRoute: route };
}

function routeEdit(event, route, field, updateData) {
  //console.log(updateData);
  const modifiedRoute = updateData.map(item =>
    item._id === route._id
      ? { ...item, [field]: event.target.value, update_value: true }
      : item
  );
  return dispatch => {
    dispatch(request(modifiedRoute));
  };
}

export const routeUpdateAction = {
  routeEdit
};
