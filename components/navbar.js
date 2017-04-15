import Link from 'next/link'
import Router from 'next/router'
import cookie from 'react-cookie'
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const navbarStyle = {
  'marginBottom': '15px',
  'backgroundColor': '#24292e'
}

const linkStyle = {
  'color': '#fff',
  'cursor': 'pointer'
}

const logout = () => {
  cookie.remove('username')
  cookie.remove('token')
  Router.push('/login')
}

export default ({ loggedIn }) => (
  <Navbar color='faded' toggleable style={navbarStyle}>
    <Container>
      <Link><a href='/' className='navbar-brand' style={linkStyle}>THE PROJECT</a></Link>
      <Collapse isOpen={true} navbar>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink href='https://github.com/hluckenb/the-project' target='_blank' style={linkStyle} className='text-center'>
              <i className='fa fa-github' aria-hidden='true'></i>
            </NavLink>
          </NavItem>
          {
            loggedIn && <li className='nav-item text-center'>
              <Link href='/'><a className='nav-link' style={linkStyle}><i className='fa fa-bar-chart' aria-hidden='true'></i></a></Link>
            </li>
          }
          {
            loggedIn && <li className='nav-item text-center'>
              <Link href='/settings'><a className='nav-link' style={linkStyle}><i className='fa fa-cog' aria-hidden='true'></i></a></Link>
            </li>
          }
          {
            loggedIn && <NavItem>
              <NavLink onClick={logout} style={linkStyle} className='text-center'><i className='fa fa-sign-out' aria-hidden='true'></i></NavLink>
            </NavItem>
          }
        </Nav>
      </Collapse>
    </Container>
  </Navbar>
)