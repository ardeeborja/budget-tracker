import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

//import hooks
import { useState, useEffect } from 'react';

//Bootstrap Components
import { Container } from 'react-bootstrap';

import NavBar from '../components/NavBar';

import Footer from '../components/Footer';

//import our UserProvider
import { UserProvider } from '../userContext';

function MyApp({ Component, pageProps }) {
  console.log(Component);

  const [user, setUser] = useState({
    email: null,
  });

  useEffect(() => {
    setUser({
      email: localStorage.getItem('email'),
    });
  }, []);

  const unsetUser = () => {
    //clear localstorage
    localStorage.clear();

    //set the values of our state back to its initial value
    setUser({
      email: null,
    });
  };

  const [token, setToken] = useState({
    token: null,
  });

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser, token, setToken }}>
        <NavBar />
        {/* <Container> */}
        <Component {...pageProps} />
        {/* </Container> */}
        <Footer />
      </UserProvider>
    </>
  );
}

export default MyApp;
