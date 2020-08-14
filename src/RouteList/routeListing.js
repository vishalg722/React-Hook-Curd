import React, { useState, useEffect } from "react";
import { Pagination } from "../components/Pagination";
import { Routes } from "./Routes";
import { SearchForm } from "../SearchForm/SearchForm";
import axios from "axios";
import { Link } from "react-router-dom";
import './Loading.css';
import { useDispatch, useSelector } from 'react-redux';
import { routeActions } from '../actions/route.actions';

const routeHearder = [
  "OrgId-ProductId-Key",
  "Product ID",
  "Organization ID",
  "Default URL",
  "MetaInformation",
  "Action"
];

function RouteList() {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const routeList = useSelector(state => state.routeReducer);
  const dispatch = useDispatch();


  const [currentPage, setCurrentPage] = useState(1);
  const [routePerPage, setRoutePerPage] = useState(3);
  

  const getRoutes = () => {
    setLoading(true);  
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const routes = res.data;
        setRoutes(routes);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false)
      });
  };

  useEffect(() => {
    //getRoutes();
    dispatch(routeActions.getList()); 
  }, []);

  console.log(routeList);
  const renderTableHeader = function() {
    return routeHearder.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const indexOfLastPost = currentPage * routePerPage;
  const indexOfFirstPost = indexOfLastPost - routePerPage;
  const currentRoutes = routes.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNum => setCurrentPage(pageNum);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="routelist">
      <h1 id="title">List of Routes</h1>
      <SearchForm getRoutes = {getRoutes}/>
      
      { loading && <div className="loader" /> }
      <table id="routes">
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {routes.length > 0 ? (
             <Routes data = {routes}/>
          ) : (
            <tr>
              <td colSpan="6"> {"No Data Found"}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* {currentRoutes.length > 0 && 
       <Pagination postsPerPage={routePerPage} totalPosts={routes.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
       } */}
    </div>
  );
}

export { RouteList };
