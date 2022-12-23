import { useState, useEffect, useContext } from 'react';

import Banner from '../../components/Banner';

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Table,
  Card,
} from 'react-bootstrap';

import { Fragment } from 'react';

// import UserContext from '../../userContext'

//import router from nextjs for redirection
import Router from 'next/router';

// import Swal
import Swal from 'sweetalert2';

import moment from 'moment';

export default function Profile() {
  // const {user} = useContext(UserContext)
  // console.log(user)

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    console.log('effect1');
    getProfile();
  }, []);

  function getProfile() {
    const token = localStorage.getItem('token');
    console.log(token);

    fetch('http://localhost:8000/api/category/get', {
      // fetch('https://sleepy-atoll-78626.herokuapp.com/api/category/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.category.length);
        if (data) {
          // const profile = data
          const firstName = data.firstName;
          const lastName = data.lastName;
          const emailAdd = data.email;
          const mobileNo = data.mobileNo;

          console.log(firstName);
          setFName(firstName);
          setLName(lastName);
          setMobile(mobileNo);
          setEmail(emailAdd);
        }
      });
  }

  return (
    <Container>
      <h2 className="text-center mt-5 cardHead">Profile</h2>

      <Row>
        <Col md="6">
          {/* <Col className="mr-auto mx-auto" md="6"> */}
          {/* <p className="h-25 d-inline-block"></p> */}
          <Card className="profileCardTopMargin">
            <Card.Body>
              <h6 className="mt-4">Name: {`${fName} ${lName}`}</h6>
              <h6>Mobile: {mobile}</h6>
              <h6 className="mb-4">Email: {email}</h6>
            </Card.Body>
          </Card>
        </Col>
        <Col className="profileImage mt-5" md="6"></Col>
      </Row>
    </Container>
  );
}

/*
		<Container>
			<Row>
				<Col sm={6}>
					<h1 className="text-center mt-4">Profile</h1>
					{incomeCatList}
				</Col>
				
			</Row>
		</Container>

*/
