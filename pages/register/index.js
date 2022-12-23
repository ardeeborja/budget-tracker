import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

//import router from nextjs for redirection
import Router from 'next/router';

//import Swal
import Swal from 'sweetalert2';

export default function Register() {
  //bind input to track user input in real time
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  //state for conditionally redering button
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      mobileNo !== '' &&
      password1 !== '' &&
      password2 !== '' &&
      password1 === password2 &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password1, password2]);

  function registerUser(e) {
    e.preventDefault();

    fetch('http://localhost:8000/api/user/email-exists', {
      // fetch('https://sleepy-atoll-78626.herokuapp.com/api/user/email-exists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); //boolean

        if (data === false) {
          fetch('http://localhost:8000/api/user', {
            // fetch('https://sleepy-atoll-78626.herokuapp.com/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password1,
              mobileNo: mobileNo,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              if (data === true) {
                Swal.fire({
                  icon: 'success',
                  title: 'Successfully Registered',
                  text: 'Thank you for registering',
                });

                //redirect to login page
                Router.push('/login');
              } else {
                //error in creating registration
                Swal.fire({
                  icon: 'error',
                  title: 'Failed Registration',
                  text: 'Something went wrong',
                });
              }
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Email Already Registered',
          });
        }
      });

    setFirstName('');
    setLastName('');
    setEmail('');
    setMobileNo(0);
    setPassword1('');
    setPassword2('');
  }

  return (
    <Row>
      <Col className="mr-auto mx-auto" md="5">
        <Card className="mt-4">
          <Card.Body>
            <Card.Title className="text-center cardHead">
              Budget Tracker
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center">
              Register Now
            </Card.Subtitle>

            <Form onSubmit={(e) => registerUser(e)}>
              <Form.Group controlId="userFirstName">
                <Form.Label className="mt-4">First Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="userLastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="userEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="mobileNo">
                <Form.Label>Mobile Number:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Mobile No."
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password1">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password2">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </Form.Group>

              {isActive ? (
                // <Button variant="dark" type="submit" className="btn-block">
                <Button type="submit" className="btn-block regButton">
                  Register
                </Button>
              ) : (
                // <Button variant="dark" disabled className="btn-block">
                <Button disabled className="btn-block regButton">
                  Register
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
