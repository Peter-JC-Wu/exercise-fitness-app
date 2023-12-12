import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FooterLogo from "../assets/icons/human-bones.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom" collapseOnSelect>
        <Container>
          <Nav className="mx-auto">
            <LinkContainer to="/dashboard">
              <Nav.Link >
                <img src={FooterLogo} alt="footer-logo" width="auto" height="55px" />
                <Navbar.Text>Wu Tech Fitness &copy;{currentYear}</Navbar.Text>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </footer>
  )
};

export default Footer;