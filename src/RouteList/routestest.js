import React, { useState, useEffect, useReducer } from "react";
import Pagination from 'reactjs-hooks-pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const pageLimit = 2;
const initialState = {  
  routes: {},  
  loading: true,  
  error: ''  
}
const routeHearder = ['OrgId-ProductId-Key','Product ID','Organization ID','Default URL','MetaInformation']


const reducer = (state, action) => {  
    switch (action.type) {  
        case 'OnSuccess':  
            return {  
                loading: false,  
                routes: action.payload,  
                error: ''  
            }  
        case 'OnFailure':  
            return {  
                loading: false,  
                routes: {},  
                error: 'Something went wrong'  
            }  
        default:  
            return state  
    }  
  }




function RouteList() {
//   const [routes, setRoutes] = useState([]);
//   const [error, setError] = useState();
  const [routesData, dispatch] = useReducer(reducer, initialState);
  
  const [offset, setOffset] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);  
  const [activePage, setActivePage] = useState(15);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const routes = res.data;
      //console.log(routes);
      setTotalRecords(routes.length)
      dispatch({ type: 'OnSuccess', payload: routes })  
      //setRoutes(routes);
    })
    .catch( err => dispatch({ type: 'OnFailure' })  );
  }, [currentPage]);


  const renderTableData = function() {
    return routes.map((route, index) => {
       const { id, name, username, email } = route //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{username}</td>
             <td>{email}</td>
             <td>{id}</td>
          </tr>
       )
    })
 }

 const renderTableHeader = function() {
    return routeHearder.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

 const { loading, routes, error }  = routesData;
 console.log(routesData);
 return (
    <div className="routelist">
       <h1 id='title'>List of Routes</h1>
       <table id='routes'>
          <tbody>
             <tr>{renderTableHeader()}</tr>
              {routes.length > 0 ? renderTableData() : <tr><td colSpan ="5"> { 'No Data Found' }</td></tr>}

          </tbody>
       </table>
       { currentPage }
       <Pagination
                totalRecords={totalRecords}
                pageLimit={pageLimit}
                pageRangeDisplayed={1}
                onChangePage={setCurrentPage}
      />
       
    </div>
 )
}

export { RouteList };
