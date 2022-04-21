import React from "react";
import { Link } from "react-router-dom";

export default function PublicPage() {
  return (
    <div className="constainer my-3 mx-5">
      <h1 className="mb-5 text-center text-warning display-4">Welcome to <em>CloudNote</em></h1>
      <div className="row">
        <div className="col-lg-6 mb-5">
          <img src="/image/homepage_bg.jpg" className="img-fluid" 
                width={500} height={400} alt="Sticky Notes"/>
        </div>
        <div className="col-lg-6 mb-5">
          <h2 className="text-warning">
            CouldNote is your{" "}
            <strong>
              <em>free, secure, cloud</em>
            </strong>{" "}
            notebook, that can be accessed where ever you go ...
          </h2>
          <h4 className="text-muted lead">
            <em>
              You can add, edit and access your notes online on secure cloud.
            </em>
          </h4>
          <h5 className="text-warning my-5">
            So, What are you waiting for.. Join us now..
          </h5>
          <Link to="/signup" type="button" className="btn btn-dark btn-lg my-3 mx-2">Sign Up</Link>
          <Link to="/login" type="button" className="btn btn-dark btn-lg my-3 mx-2">Log In</Link>
        </div>
      </div>
      <hr></hr>
      <div className="row d-flex justify-content-around">
        <div className="card col-md-4 my-3 mb-5 mx-5 shadow p-3 mb-5 bg-body rounded" style={{width: "18rem"}}>
          <img src="/image/cloud.jpg" className="card-img-top my-3" alt="cloud" />
          <div className="card-body">
            <h5 className="card-title">Always On-Cloud</h5>
            <p className="card-text">
              Your notes remain always on cloud.
            </p>
          </div>
        </div>
        <div className="card col-md-4 my-3 mb-5 mx-5 shadow p-3 mb-5 bg-body rounded" style={{width: "18rem"}}>
          <img src="/image/free.jpg" className="card-img-top my-3" alt="free" />
          <div className="card-body">
            <h5 className="card-title">Absolutely FREE</h5>
            <p className="card-text">
              You can access and manage your notes in absolutely free of cost.
            </p>
          </div>
        </div>
        <div className="card col-md-4 my-3 mb-5 mx-5 shadow p-3 mb-5 bg-body rounded" style={{width: "18rem"}}>
          <img src="/image/notebook.jpg" className="card-img-top my-3" alt="notebook" />
          <div className="card-body">
            <h5 className="card-title">Secure and Safe</h5>
            <p className="card-text">
              Your notes remain secure always.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
