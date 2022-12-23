import { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

//import Link component
import Link from 'next/link';

import UserContext from '../userContext';

export default function NavBar() {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    // <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar className="navBarElement" variant="dark" expand="lg">
      <Link href="/">
        <a className="navbar-brand">Budget Tracker</a>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/">
            <a className="nav-link" role="button">
              Home
            </a>
          </Link>
          {user.email ? (
            <>
              <Link href="/category">
                <a className="nav-link" role="button">
                  Category
                </a>
              </Link>

              <NavDropdown
                title="Transaction"
                id="nav-dropdown"
                bg="dark"
                variant="dark"
              >
                <NavDropdown.Item href="/transaction">
                  Create Transaction
                </NavDropdown.Item>
                <NavDropdown.Item href="/search">
                  Search Records
                </NavDropdown.Item>
                <NavDropdown.Item href="/incomeExpense">
                  Income/Expense Records
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Analytics"
                id="nav-dropdown"
                bg="dark"
                variant="dark"
              >
                <NavDropdown.Item href="/monthlyIncomeExpense">
                  Monthly Income/Expense
                </NavDropdown.Item>
                <NavDropdown.Item href="/balanceTrend">
                  Balance Trend
                </NavDropdown.Item>
                <NavDropdown.Item href="/categoryPercentages">
                  Category Percentages
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Others"
                id="nav-dropdown"
                bg="dark"
                variant="dark"
              >
                <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              </NavDropdown>

              <Link href="/logout">
                <a className="nav-link" role="button">
                  Logout
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <a className="nav-link" role="button">
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a className="nav-link" role="button">
                  Register
                </a>
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
