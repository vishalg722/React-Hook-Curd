import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function EditRoute(props) {
  const [inputs, setInputs] = useState({
    productId: "",
    orgId: "",
    routeUrl: "",
    metainformation: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { productId, orgId, routeUrl, metainformation } = inputs;
  const [checkSave, setCheckSave] = useState(false);


  let id = props.match.params.id;
  let url = `https://api.instantwebtools.net/v1/passenger/${id}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(res => {
        const route = res.data;
        setLoading(false);
        if (route._id) {
          let routeInfo = {
            productId: route._id,
            orgId: route.name,
            routeUrl: route.airline.logo,
            metainformation: route.airline.name
          };
          setInputs(routeInfo);
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    let url = `https://api.instantwebtools.net/v1/passenger/${id}`;
    setSubmitted(true);
    if (productId && orgId && routeUrl) {
      axios
      .patch(url , { name : inputs.orgId , airline : { logo : routeUrl } })
      .then(res => {
        const route = res.data;
        setLoading(false);
        setCheckSave(true);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
    }
  };

  return (
    <>
      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error.message}</div>}

      <div className="col-lg-4 offset-lg-4 management-form">
      { checkSave && (
        <div className="alert alert-success">
         { 'Route has been updated successfully.'}
      </div>      
      )}
    
        <h2 className="form-heading">Edit Route</h2>
        <form name="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product ID</label>
            <input
              type="text"
              name="productId"
              onChange={handleChange}
              value={productId}
              className={
                "form-control" + (submitted && !productId ? " is-invalid" : "")
              }
            />
            {submitted && !productId && (
              <div className="invalid-feedback">ProductId is required</div>
            )}
          </div>
          <div className="form-group">
            <label>Org ID</label>
            <input
              type="text"
              name="orgId"
              onChange={handleChange}
              value={orgId}
              className={
                "form-control" + (submitted && !orgId ? " is-invalid" : "")
              }
            />
            {submitted && !orgId && (
              <div className="invalid-feedback">OrgId is required</div>
            )}
          </div>
          <div className="form-group">
            <label>Route URL</label>
            <input
              type="text"
              name="routeUrl"
              onChange={handleChange}
              value={routeUrl}
              className={
                "form-control" + (submitted && !orgId ? " is-invalid" : "")
              }
            />
            {submitted && !routeUrl && (
              <div className="invalid-feedback">Route Url is required</div>
            )}
          </div>

          <div className="form-group">
            <label>Meta Information</label>
            <input
              type="text"
              name="metainformation"
              onChange={handleChange}
              value={metainformation}
              className={"form-control"}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary">
              {loading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Save
            </button>
            <Link className="btn btn-secondary ml-3" to="/list">
              Back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export { EditRoute };
