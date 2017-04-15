import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const navbarStyle = {
  'marginBottom': '15px',
  'backgroundColor': '#24292e'
}

const linkStyle = {
  'color': '#fff'
}

export default () => (
  <Navbar color='faded' toggleable style={navbarStyle}>
    <Container>
      <NavbarToggler right />
      <NavbarBrand href='/' style={linkStyle}>THE PROJECT</NavbarBrand>
      <Collapse isOpen={false} navbar>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink href='https://github.com/hluckenb/the-project' style={linkStyle}><i className='fa fa-github' aria-hidden='true'></i></NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Container>
  </Navbar>
)