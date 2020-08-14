import axios from "axios";
const data = {
  totalPassengers: 987,
  totalPages: 99,
  data: [
    {
      _id: "5f1c59c3fa523c3aa793bd17",
      name: "Kassie Willytt",
      trips: 633,
      airline: {
        id: 4,
        name: "Emirates",
        country: "Dubai",
        logo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985"
      },
      __v: 0
    },
    {
      _id: "5f1c59c3fa523c3aa793bcfe",
      name: "Laureen Linis",
      trips: 625,
      airline: {
        id: 4,
        name: "Emirates",
        country: "Dubai",
        logo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985"
      },
      __v: 0
    },
    {
      _id: "5f1c59c3fa523c3aa793bd03",
      name: "Connie Evin",
      trips: 959,
      airline: {
        id: 9,
        name: "Japan Airlines",
        country: "Japan",
        logo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Japan_Airlines_Logo_%282011%29.svg/300px-Japan_Airlines_Logo_%282011%29.svg.png",
        slogan: "Fly into tomorrow",
        head_quaters: "Shinagawa, Tokyo, Japan",
        website: "www.jal.com",
        established: "1951"
      },
      __v: 0
    },
    {
      _id: "5f1c59c3fa523c3aa793bcf9",
      name: "Shirleen Lan",
      trips: 348,
      airline: {
        id: 9,
        name: "Japan Airlines",
        country: "Japan",
        logo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Japan_Airlines_Logo_%282011%29.svg/300px-Japan_Airlines_Logo_%282011%29.svg.png",
        slogan: "Fly into tomorrow",
        head_quaters: "Shinagawa, Tokyo, Japan",
        website: "www.jal.com",
        established: "1951"
      },
      __v: 0
    },
    {
      _id: "5f1c59c3fa523c3aa793bd0d",
      name: "Blaire Rolph",
      trips: 344,
      airline: {
        id: 4,
        name: "Emirates",
        country: "Dubai",
        logo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
        slogan: "From Dubai to destinations around the world.",
        head_quaters: "Garhoud, Dubai, United Arab Emirates",
        website: "www.emirates.com/",
        established: "1985"
      },
      __v: 0
    },
    {
      _id: "5f1c59c3fa523c3aa793bd12",
      name: "Ninnetta Crist",
      trips: 992,
      airline: {
        id: 2,
        name: "Singapore Airlines",
        country: "Singapore",
        logo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
        slogan: "A Great Way to Fly",
        head_quaters: "Airline House, 25 Airline Road, Singapore 819829",
        website: "www.singaporeair.com",
        established: "1947"
      },
      __v: 0
    },
    {
      _id: "5f1c59c3fa523c3aa793bd08",
      name: "Suzie Estren",
      trips: 841,
      airline: {
        id: 2,
        name: "Singapore Airlines",
        country: "Singapore",
        logo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
        slogan: "A Great Way to Fly",
        head_quaters: "Airline House, 25 Airline Road, Singapore 819829",
        website: "www.singaporeair.com",
        established: "1947"
      },
      __v: 0
    },
    {
      _id: "5f1c59c3fa523c3aa793bcfa",
      name: "Elie McIlroy",
      trips: 321,
      airline: {
        id: 3,
        name: "Cathay Pacific",
        country: "Hong Kong",
        logo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Cathay_Pacific_logo.svg/300px-Cathay_Pacific_logo.svg.png",
        slogan: "Move Beyond",
        head_quaters:
          "Cathay City, Hong Kong International Airport, Chek Lap Kok, Hong Kong",
        website: "www.cathaypacific.com",
        established: "1946"
      },
      __v: 0
    },
    {
      _id: "5f1c59c3fa523c3aa793bd26",
      name: "Phyllis Jessen",
      trips: 819,
      airline: {
        id: 7,
        name: "Deutsche Lufthansa AG",
        country: "Germany",
        logo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lufthansa_Logo_2018.svg/300px-Lufthansa_Logo_2018.svg.png",
        slogan: "Say yes to the world",
        head_quaters: "Cologne, Germany",
        website: "lufthansa.com",
        established: "1953"
      },
      __v: 0
    },
    {
      _id: "5f1c59c3fa523c3aa793bd30",
      name: "Darcie Coleville",
      trips: 279,
      airline: {
        id: 1,
        name: "Quatar Airways",
        country: "Quatar",
        logo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/300px-Qatar_Airways_Logo.svg.png",
        slogan: "Going Places Together",
        head_quaters: "Qatar Airways Towers, Doha, Qatar",
        website: "www.qatarairways.com",
        established: "1994"
      },
      __v: 0
    }
  ]
};

function getList(pageNum) {
  return dispatch => {
    dispatch(request());
    let url = `https://api.instantwebtools.net/v1/passenger?page=${pageNum}&size=10`;
    dispatch(success(data));
    // axios
    //   .get(url)
    //   .then(res => {
    //     console.log(res)
    //     const routes = res.data;
    //     dispatch(success(routes));
    //   })
    //   .catch(err => {
    //     dispatch(failure(err.toString()));
    //   });
  };
}

function request() {
  return { type: "INITIAL_FETCH" };
}

function success(routesData) {
  return { type: "SUCCESSFUL_GETLIST", routesData };
}

function failure(error) {
  return { type: "ERROR_DURING_FETCH", error };
}

function modify(routes) {
  return { type: "MODIFIED_ROUTE", routes };
}

function getRouteModifiedData(dataItem, routeList,isChecked=true) {
  //console.log(routeList);
  const modifiedData = routeList.routes.data.map(item =>
    item._id === dataItem._id ? { ...item, inEdit: isChecked } : item
  );
  const modifiedRoute = {
    totalPassengers: routeList.routes.totalPassengers,
    totalPages: routeList.routes.totalPages,
    data: modifiedData
  };

  const routes = { routes:modifiedRoute ,error: "" , loading:false}
  //console.log(routes);
  return dispatch => {
    dispatch(modify(routes));
  };
}

function undoEditChanges(dataItem, routeList,isChecked=false) {
  const modifiedData = routeList.routes.data.map(item =>
    item._id === dataItem._id ? { ...item, inEdit: isChecked } : item
  );
  const modifiedRoute = {
    totalPassengers: routeList.routes.totalPassengers,
    totalPages: routeList.routes.totalPages,
    data: modifiedData
  };
  const routes = { routes:modifiedRoute ,error: "" , loading:false}
  //console.log(routes);
  return dispatch => {
    dispatch(modify(routes));
  };
}

function getModifiedRoute(event, route, field, updateData) {
  const makeRoutesAsModified = updateData.routes.data.map(item =>
    item._id === route._id
      ? { ...item, [field]: event.target.value, update_value: true }
      : item
  );
  const modifiedRoute = {
    totalPassengers: updateData.routes.totalPassengers,
    totalPages: updateData.routes.totalPages,
    data: makeRoutesAsModified
  };
  const routes = { routes:modifiedRoute ,error: "" , loading:false}
  return dispatch => {
    dispatch(modify(routes));
  };
}

export const routeActions = {
  getList,
  getRouteModifiedData,
  undoEditChanges,
  getModifiedRoute
};
