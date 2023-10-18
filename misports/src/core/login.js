import React from "react";
import "./styles/login-styles.css";

const Home = (props) => {
  return (
    <div className="container">
      <div className="container01">
        <div className="container02"></div>
        <div className="container04">
          <div className="container05">
            <div className="container06">
              <span className="text">
                <span>LOGIN</span>
              </span>
            </div>
            <div className="container07">
              <form className="form">
                <div className="container08">
                  <input
                    type="text"
                    placeholder="EMAIL ADDRESS"
                    className="textinput"
                  />
                </div>
                <div className="container09">
                  <input
                    type="text"
                    placeholder="PASSWORD"
                    className="textinput"
                  />
                  <div className="textinput-fp">
                    <span>Forgot Password?</span>
                  </div>
                </div>

                <div className="container10">
                  <button type="button" className="button">
                    LOG IN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
