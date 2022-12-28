import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

import Swal from 'sweetalert2';

//to redirect our user, use the Router component from nextjs
import Router from 'next/router';

import UserContext from '../../userContext';

//import google login component
import { GoogleLogin } from 'react-google-login';

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  //create states for user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  function authenticate(e) {
    e.preventDefault();

    // fetch('https://jade-alligator-hose.cyclic.app/api/user/login', {
    fetch('https://jade-alligator-hose.cyclic.app/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);

          // fetch('https://jade-alligator-hose.cyclic.app/api/user/details', {
          fetch('https://jade-alligator-hose.cyclic.app/api/user/details', {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
              'Access-Control-Allow-Origin': '*',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              localStorage.setItem('email', data.email);
              // localStorage.setItem('isAdmin', data.isAdmin)

              //after getting user details from the API server, we'll set the global user state
              setUser({
                email: data.email,
                // isAdmin: data.isAdmin
              });
            });

          Swal.fire({
            icon: 'success',
            title: 'Successfully Logged In',
            text: 'Thank you for logging in',
          });

          //redirect user to the endpoint given as argument
          Router.push('/');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Unsuccessful Login',
            text: 'User authentication has failed',
          });
        }
      });

    //set the input states into their initial value
    setEmail('');
    setPassword('');
  }

  function authenticateGoogleToken(response) {
    //google's response with our token id to be used to authenticate our google login user
    console.log(response);

    //pass accessToken grom google to allow us to use google API to send an email to the google login user who logs on for the first time

    fetch(
      // 'https://jade-alligator-hose.cyclic.app/api/user/verify-google-id-token',
      'https://jade-alligator-hose.cyclic.app/api/user/verify-google-id-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          tokenId: response.tokenId,
          accessToken: response.accessToken,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //we will show alerts to show if the user logged in properly or if error
        if (typeof data.accessToken !== 'undefined') {
          //set accessToken to our localStorage as token
          localStorage.setItem('token', data.accessToken);

          //run a fetch req to get the user's details and upfate our global user state and save our user details int o the localstorage
          // fetch('https://jade-alligator-hose.cyclic.app/api/user/details', {
          fetch('https://jade-alligator-hose.cyclic.app/api/user/details', {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
              'Access-Control-Allow-Origin': '*',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem('email', data.email);
              localStorage.setItem('isAdmin', data.isAdmin);

              //after getting user details, update the global user state:
              setUser({
                email: data.email,
                isAdmin: data.isAdmin,
              });
              Swal.fire({
                icon: 'success',
                title: 'Successful Login',
              });
              Router.push('/');
            });
        } else {
          //if data.accessToken is undefined, data contains a property called error
          if (data.error === 'google-auth-error') {
            Swal.fire({
              icon: 'error',
              title: 'Google Authentication Failed',
            });
          } else if (data.error === 'login-type-error') {
            Swal.fire({
              icon: 'error',
              title: 'login Failed',
              text: 'You may have registered through a different procedure',
            });
          }
        }
      });
  }

  // function failed(response){
  // 	console.log(response)
  // }

  return (
    <Row>
      <Col className="mr-auto mx-auto" md="5">
        <Card className="mt-4">
          <Card.Body>
            <Card.Title className="text-center cardHead">
              Budget Tracker
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center">
              Login Now
            </Card.Subtitle>
            <Form onSubmit={(e) => authenticate(e)}>
              <Form.Group controlId="userEmail">
                <Form.Label className="mt-4">Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="userPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {isActive ? (
                // <Button variant="dark" type="submit" className="btn-block">
                <Button type="submit" className="btn-block loginButton">
                  Submit
                </Button>
              ) : (
                // <Button variant="dark" disabled className="btn-block">
                <Button disabled className="btn-block loginButton">
                  Submit
                </Button>
              )}
              <GoogleLogin
                clientId="793860826559-5ai2gtrphvumfqd0t8tdr6csctmtmusp.apps.googleusercontent.com"
                buttonText="Login Using Google"
                onSuccess={authenticateGoogleToken}
                // onFailure={failed}
                onFailure={authenticateGoogleToken}
                cookiePolicy={'single_host_origin'}
                className="w-100 text-center my-4 d-flex justify-content-center"
              />
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

/*
your client id
793860826559-5ai2gtrphvumfqd0t8tdr6csctmtmusp.apps.googleusercontent.com
your client secret:
8Gvqy5MDUJfWK1Awi3S6tu7h
*/
