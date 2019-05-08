import React, { Component } from 'react';

class ProfileUpdate extends Component {
  componentDidMount() {
    this.props.nameUpdateMethod();
    this.props.bioUpdateMethod();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>
            Navbar Placeholder
            </h2>
          </div>
          <div className="row">
            <div className="col-3" />
            <div className="col-4">
              <form>
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                  <small id="emailHelp" className="form-text text-muted"> share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
            <div className="col-3">
              <img src="..." className="img-fluid" alt="Placholder" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileUpdate;
