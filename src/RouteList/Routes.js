import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import checkedCheckbox from "../../src/image/checked.png";
import uncheckedCheckbox from "../../src/image/unchecked.png";

const Routes = function(props) {
  let tableContent = "";
  if (props.data.length > 0) {
    tableContent = props.data.map(route => {
      const { _id, name, trips, airline } = route;

      return (
        <tr key={_id}>
          <td>
            {route.inEdit ? (
              <img
                className="routeCheckbox"
                src={checkedCheckbox}
                onClick={() => props.undoChanges(route)}
              />
            ) : (
              <img
                className="routeCheckbox"
                src={uncheckedCheckbox}
                onClick={() => props.toggleCheckbox(route)}
              />
            )}
          </td>
          <td>{_id}</td>
          <td>
            {!route.inEdit ? (
              name
            ) : (
              <input
                type="textbox"
                field={"name"}
                defaultValue={name}
                name={`${_id}-name`}
                onChange={e => props.itemChange(e, route, "name")}
              />
            )}
          </td>

          <td>
            {!route.inEdit ? (
              trips
            ) : (
              <input
                type="textbox"
                defaultValue={trips}
                name={`${_id}-trips`}
                onChange={e => props.itemChange(e, route, "trips")}
              />
            )}
          </td>

          <td>
            {!route.inEdit ? (
              airline.name
            ) : (
              <input
                type="textbox"
                defaultValue={airline.name}
                name={`${_id}-airlinename`}
                onChange={e => props.itemChange(e, route, "name")}
              />
            )}
          </td>

          <td>
            {!route.inEdit ? (
              airline.country
            ) : (
              <input
                type="textbox"
                defaultValue={airline.country}
                name={`${_id}-airlinecountry`}
                onChange={e => props.itemChange(e, route, "name")}
              />
            )}
          </td>

          <td>
            <Link className="btn btn-primary" to={`/edit/${_id}`}>
              {"Edit"}
            </Link>
            <button
              className="btn btn-danger ml-2"
              onClick={() => props.toggleModal(_id)}
            >
              {"Delete"}
            </button>
          </td>
        </tr>
      );
    });
  }

  return <>{tableContent}</>;
};

export { Routes };
