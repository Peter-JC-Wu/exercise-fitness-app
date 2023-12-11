import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt,FaUser, FaUserCheck } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../assets/images/dumbbell-health-logo.png";
import FaveList from "../assets/icons/favorites-list.png";

const Header = () => {
  // Get logged-in user information from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Redux setup
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  // Local state to track the logout process for auto-logout
  const [loggingOut, setLoggingOut] = useState(false);

  const logoutHandler = useCallback(async () => {
    try {
      // Set loggingOut to true before starting the logout operation
      setLoggingOut(true);
      await logout().unwrap();
      // Clear userInfo from Redux state and local storage (including the token)
      dispatch(clearCredentials());
      navigate("/"); // Where do I want to send the user after logging out?
    } catch (err) {
      console.log(err);
    } finally {
      // Set loggingOut to false after the logout operation completes (success or failure)
      setLoggingOut(false);
    }
  }, [dispatch, logout, navigate]);

  // Effect to check token expiration and logout if necessary
  useEffect(() => {
    const checkTokenExpiration = () => {
      // Check if user is logged in and has a token
      if (userInfo && userInfo.token) {
        const decodedToken = jwtDecode(userInfo.token);

        // Check if the token has expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token has expired, logout the user
          toast.error("Your session has expired. Please log in again.");
          logoutHandler();
        }
      }
    };

    // Check token expiration on mount
    checkTokenExpiration();

    // Set up an interval to check token expiration periodically
    const intervalId = setInterval(checkTokenExpiration, 15 * 60 * 1000); // Check every 15 minutes

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [userInfo, logoutHandler]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect>
        <Container>
          <LinkContainer to="/dashboard">
            <Navbar.Brand>
            <img src={Logo} alt="logo" 
              style={{width: "48px", height: "48px", margin: "0 20px"}}/>
              My Exercise Planner Fitness App
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              { userInfo? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <FaUserCheck /> Profile 
                      </NavDropdown.Item>
                    </LinkContainer>
                    {/* Disable the Logout button while logging out */}
                    <NavDropdown.Item onClick={logoutHandler} disabled={loggingOut}>
                      <FaSignOutAlt /> Logout
                    </NavDropdown.Item>
                  </NavDropdown> 
                  <span className="mx-auto">
                  <LinkContainer to="/favoriteexercisesdashboard">
                    <Nav.Link>
                      <Navbar.Text>
                        Favorite Exercises <img src={FaveList} alt="favorite exercises list" 
                        style={{width: "22px", height: "22px", margin: "0 5px"}}/>
                      </Navbar.Text>
                    </Nav.Link>
                  </LinkContainer>
                  </span>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaUser /> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;