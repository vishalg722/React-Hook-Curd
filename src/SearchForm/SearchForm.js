import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { routeActions } from "../actions/route.actions";

const SearchForm = props => {
  const [formError, setformError] = useState("");
  const [searchState, setSearchState] = useState({ filterBy: "", search: "" });
  const [updatedRecordCount, setUpdatedRecordCount] = useState(1);
  
  const routeList = useSelector(state => state.routeReducer);
  const dispatch = useDispatch();

  const onSubmitHandler = event => {
    event.preventDefault();
    if (searchState.filterBy === "" || searchState.search === "") {
      setformError("Please fill all details.");
      return;
    } else {
      setformError("");
      dispatch(routeActions.getListByProductId(searchState));
    }
  };
//   useEffect( () => {
//     if(props.modfiedRecords.routes.data &&  props.modfiedRecords.routes.data.length > 0) {
//         const routes = props.modfiedRecords.routes.data.filter( 
//             route => route.update_value === true && route.inEdit ===  true );
//             setUpdatedRecordCount(routes.length)
//     }   
//   },[props]);

  const massUpdate = () => {
    console.log(props.modfiedRecords.routes)
    if(props.modfiedRecords.routes.data &&  props.modfiedRecords.routes.data.length > 0) {
        const routes = props.modfiedRecords.routes.data.filter( route => route.update_value === true && route.inEdit ===  true );
        routes.map( (record ) => {
        let routesUpdateData = {};
            routesUpdateData['name'] = record.name;
            routesUpdateData['trips'] = record.trips;
            console.log(routesUpdateData);
           
        })

    }
  }

const discardChanges = () => {
    dispatch(routeActions.getList());
}

  const onChangeHandler = event => {
    const formDataCopy = { ...searchState };
    formDataCopy[event.target.name] = event.target.value;
    setSearchState(formDataCopy);
  };

  const resetSearch = event => {
    setformError("");
    dispatch(routeActions.getList());
    const serachData = { ...searchState, filterBy: "", search: "" };
    setSearchState(serachData);
  };
  
  return (
    <div className="mb-4 mt-4">
      <form
            onSubmit={onSubmitHandler}
            onReset={resetSearch}
            >
        <div className="form-inline">
          <div className="form-group col-xs-6">
            <label htmlFor="inlineFormEmail">Filter By</label>
            <select
              name="filterBy"
              className="browser-default custom-select ml-3"
              onChange={onChangeHandler}
            >
              <option value="">{"Please select"}</option>
              <option value="product">Product ID</option>
              <option value="organization">Organization ID</option>
              <option value="url">{"URL"}</option>
              <option value="routeId">{"RouteId"}</option>
            </select>
          </div>
          <div className="form-group col-xs-6">
            <input
              className="form-control ml-3"
              name="search"
              type="text"
              onChange={onChangeHandler}
            />
          </div>
          <input type="submit" className="btn btn-primary button ml-3" />
          <input type="reset" className="btn btn-danger ml-3" value={"Reset"} />
        </div>
      </form>
      <div className="ml-3 error-messages"> {formError} </div>

      <div className="group-btn"> 
        <button className = "btn btn-primary" disabled={ updatedRecordCount === 0 ? true : false} onClick={massUpdate}>{'Mass Update'}</button>
        <button className =  "btn btn-danger ml-3"  onClick={discardChanges}>{'Discard Changes'}</button>
      </div>
    </div>
  );
};

export { SearchForm };