import React, { useState, useEffect } from "react";
import { Routes } from "./Routes";
import { SearchForm } from "../SearchForm/SearchForm";
import "./Loading.css";
import { useDispatch, useSelector } from "react-redux";
import { routeActions } from "../actions/route.actions";
import { ConfirmationModal } from "../components/ConfirmationModal";
// import { routeUpdateAction } from "../actions/routeUpdate.actions";
import Pagination from "react-js-pagination";

const routeHearder = [
  "Select",
  "OrgId-ProductId-Key",
  "Product ID",
  "Organization ID",
  "Default URL",
  "MetaInformation",
  "Action"
];

function RouteList() {
  const routeList = useSelector(state => state.routeReducer);
  const routeUpdate = useSelector(state => state.routeUpdate);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const [activePage, setActivePage] = useState(1);
  const [routeId, setRouteId] = useState("");
  const [isChecked, setIsChecked] = useState({});
  const [updateData, setUpdateData] = useState([]);
  
  const modalClose = () => {
    setModalShow(false);
  };

  const toggleModal = routeId => {
    setRouteId(routeId);
    setModalShow(true);
  };

  const toggleCheckbox = async dataItem => {
    await setIsChecked(!isChecked);
    dispatch(routeActions.getRouteModifiedData(dataItem, routeList));
  };

  const undoChanges = async dataItem => {
    await setIsChecked(!isChecked);
    dispatch(routeActions.undoEditChanges(dataItem, routeList));
  };

  useEffect(() => {
    dispatch(routeActions.getList(1));
  }, []);

  const itemChange = (event, route, field) => {
  //  if(routeUpdate.routes.length > 0) {
  //   dispatch(routeUpdateAction.routeEdit(event,route,field,routeUpdate.routes));
  //  } 
  //  else {
  //   dispatch(routeUpdateAction.routeEdit(event,route,field,routeList.routes.data));
  //  }

  dispatch(routeActions.getModifiedRoute(event, route, field, routeList));
   return;
   
  //  return;
    if (updateData.length > 0) {
      const data = updateData.map(item =>
        item._id === route._id
          ? { ...item, [field]: event.target.value, update_value: true }
          : item
      );
      setUpdateData(data);
    } else {
      const data = routeList.routes.data.map(item =>
        item._id === route._id
          ? { ...item, [field]: event.target.value, update_value: true }
          : item
      );

      setUpdateData(data);
    }
  };
  
  const renderTableHeader = function() {
    return routeHearder.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const handlePageChange = function(pageNumber) {
    setActivePage(pageNumber);
    dispatch(routeActions.getList(pageNumber));
  };
  
  return (
    <div className="routelist">
      <h1 id="title" onClick={toggleCheckbox}>
        List of Routes
      </h1>

      <SearchForm modfiedRecords={routeList} />

      <table id="routes">
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {routeList.routes.data && routeList.routes.data.length > 0 ? (
            <Routes
              itemChange={itemChange}
              undoChanges={undoChanges}
              isChecked={isChecked}
              toggleCheckbox={toggleCheckbox}
              data={routeList.routes.data}
              toggleModal={toggleModal}
            />
          ) : (
            <tr>
              <td colSpan="6"> {"No Data Found"}</td>
            </tr>
          )}
        </tbody>
      </table>
      {routeList.loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {routeList.routes.data && routeList.routes.data.length > 0 ? (
        <div className="d-flex flex-row py-4 align-items-center">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={routeList.routes.totalPassengers}
            pageRangeDisplayed={10}
            onChange={handlePageChange}
            firstPageText={"First Page"}
            lastPageText={"Last Page"}
          />
        </div>
      ) : (
        ""
      )}

      <ConfirmationModal show={modalShow} onHide={modalClose} id={routeId} />
    </div>
  );
}

export { RouteList };
