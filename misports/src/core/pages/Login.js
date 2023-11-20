import React, { useEffect, useState } from "react";
import "../styles/login-styles.css";
import { useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  sendPasswordReset,
} from "../components/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "react-modal";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendPasswordReset = () => {
    sendPasswordReset(email);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);
  // }, [user, loading]);
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="container09">
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    className="textinput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="textinput-fp">
                    <button
                      type="button"
                      className="button-fp"
                      onClick={openModal}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.8)", // Change the background color and opacity
                    },
                    content: {
                      // Your other styles for the modal content
                      background: "white",
                      padding: "20px",
                      borderRadius: "10%",
                    },
                  }}
                  className="modal-content"
                >
                  <h2 className="text-fp">FORGOT PASSWORD</h2>
                  <span className="text-fp1">
                    Enter your Registered Email Id to receive Password Reset
                    Email.
                  </span>
                  <div className="containerloginform">
                    {" "}
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      className="divinput-fp"
                    />
                  </div>
                  <div className="containerloginform">
                    <button
                      onClick={handleSendPasswordReset}
                      className="modal-button"
                    >
                      Send Reset Email
                    </button>
                  </div>
                </Modal>
                <div className="container10">
                  <button
                    type="button"
                    className="button"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                  >
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

export default Login;
