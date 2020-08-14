import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from 'react-redux';
import { routeActions } from '../actions/route.actions';
import axios from "axios";

const ConfirmationModal = (props)=> {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const deleteRoute = () => {
    let url = `https://api.instantwebtools.net/v1/passenger/${props.id}`;
      axios
      .delete(url)
      .then(res => {
        dispatch(routeActions.getList());
        setSuccess(true);
        
        setTimeout(() => {
          setSuccess(false);
          props.onHide();
        }, 2000);
      })
      .catch(err => {
        setError(err);
        setSuccess(false)
    });
  }  
  return (
      <>
      <Modal
        {...props}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {success && (
        <div className="alert alert-success">
          { 'Route has been disabled successfully.'}
        </div>  
        )}
        {error && (
        <div className="alert alert-danger">
          { JSON.stringify(error) }
        </div>  
        )}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Are you sure  you want to delete this route ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Button className = "ml-3" onClick={props.onHide}>Cancel</Button>
           <Button className = "btn-danger ml-3" onClick={deleteRoute}>Confirm Delete</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
export { ConfirmationModal };

