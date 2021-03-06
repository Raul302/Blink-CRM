
import { startLogout } from "actions/auth/auth";
import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";
import routes from '../../routes';
import { createStore } from 'redux';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent",
      user : JSON.parse(localStorage.getItem('user')),
    };
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.sidebarToggle = React.createRef();
  }
  closeSession() {
     const { history } = this.props;  
    // this.props.store.dispatch(sendMessage(message))
      localStorage.removeItem('user');
      window.location.reload(false);
  }
  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent",
      });
    } else {
      this.setState({
        color: "dark",
      });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  getBrand() {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  }
  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark",
      });
    } else {
      this.setState({
        color: "transparent",
      });
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  showParticipant = (type = 'user',name) => {
    let n = name ? name.split(" ") : " ";
    let tag = '';
    if (n.length >= 3) {
        n = n[0].charAt(0).toUpperCase() + n[1].charAt(0).toUpperCase() + n[2].charAt(0).toUpperCase();
    } else {
      n = n[0].charAt(0);
    }
    switch (type) {
        case 'user':
        tag = <span  class="mr-n1 sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV">{n}</span>;
        break;
        case 'contactos':
        tag = <span  class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP">{n}</span>;
            break;
        case 'colegio':
          tag = <span  class="sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnZ">{n}</span>;

            break;
        default:
            tag = <span  class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnZ">{n}</span>;
        break;
    }
    return tag;
}
  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand style={{fontFamily:'Montserrat, sans-serif', margin:'0', color:'#000000'}}href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <Nav navbar>
              <NavItem>
                <Link to="#profile" className="nav-link btn-magnify">
                  <i className="nc-icon nc-layout-11" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={(e) => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                {this.showParticipant('adm',this.state.user.name)}
                  {/* <i className="nc-icon nc-bell-55" /> */}
                  <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={(e) => this.closeSession()}tag="a">Cerrar sesión</DropdownItem>
                  {/* <DropdownItem tag="a">Another Action</DropdownItem>
                  <DropdownItem tag="a">Something else here</DropdownItem> */}
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <Link to="#profile" className="nav-link btn-rotate">
                  <i className="nc-icon nc-settings-gear-65" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
