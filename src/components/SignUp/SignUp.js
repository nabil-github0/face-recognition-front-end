import React, { Component } from "react";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpName: "",
      signUpEmail: "",
      signUpPassword: "",
      errorResponse: "",
    };
  }

  onNameChange = (event) => {
    this.setState({
      signUpName: event.target.value,
      errorResponse: "",
    });
  };

  onEmailChange = (event) => {
    this.setState({
      signUpEmail: event.target.value,
      errorResponse: "",
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      signUpPassword: event.target.value,
      errorResponse: "",
    });
  };

  onChangePasswordVisiblity = () => {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye-slash');
  }

  onSubmitSignUp = () => {
    fetch("https://jittery-shrug-moth.cyclic.app/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.signUpName,
        email: this.state.signUpEmail,
        password: this.state.signUpPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.onRouteChange("home");
        }
        this.setState({ errorResponse: data });
      });
  };

  onKeyDownSignUp = (event) => {
    if(event.Key === "Enter") {
      fetch("https://face-recognition-back-end-production.up.railway.app/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.signUpName,
        email: this.state.signUpEmail,
        password: this.state.signUpPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.onRouteChange("home");
        }
        this.setState({ errorResponse: data });
      });
    }
  }

  render() {
    const { onRouteChange } = this.props;
    const { errorResponse } = this.state;

    return (
      <article className="br3 mv4 w-90 w-75-m w-25-l mw6 shadow-1 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  onKeyDown={this.onKeyDownSignUp}
                  className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
                  type="text"
                  name="name"
                  id="name"
                  autocomplete="off"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  onKeyDown={this.onKeyDownSignUp}
                  className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3 relative">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  onKeyDown={this.onKeyDownSignUp}
                  className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100 pr4"
                  type="password"
                  name="password"
                  id="password"
                />
                <i
                  onClick={this.onChangePasswordVisiblity}
                  className="far fa-eye"
                  id="togglePassword"
                  style={{
                    position: "absolute",
                    top: "67%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer"
                  }}
                ></i>
              </div>
            </fieldset>
            {errorResponse ? (
              <p className="error-message f6 red db">{errorResponse}</p>
            ) : (
              ""
            )}
            <div className="">
              <input
                onClick={this.onSubmitSignUp}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign Up"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => onRouteChange("signin")}
                className="f6 link dim black db"
              >
                Sign In
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignUp;
