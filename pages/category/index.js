import { useState, useEffect, useContext, Fragment } from 'react';

import Banner from '../../components/Banner';

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Table,
} from 'react-bootstrap';

import UserContext from '../../userContext';

//import router from nextjs for redirection
import Router from 'next/router';

// import Swal
import Swal from 'sweetalert2';

import { useRouter } from 'next/router';

export default function CreateCategory() {
  const { user } = useContext(UserContext);
  console.log(user);

  const [categoryName, setCategoryName] = useState('');
  const [type, setType] = useState('expense');
  const [catList, setCatList] = useState('');
  const [isActive, setIsActive] = useState(true);
  const router = useRouter();

  //check the user's input
  useEffect(() => {
    console.log('QQQ', categoryName);
    console.log('QQQ', type);
    if (categoryName !== '' && type !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [categoryName, type]);
  // console.log(isActive)

  useEffect(() => {
    getCategoryList();
  }, []);

  function getCategoryList() {
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
        let list;
        if (data.category.length === 0) {
          list = <h5 className="text-left mt-4">No Categories Available</h5>;
        } else {
          list = data.category.map((category) => {
            console.log(category);
            return (
              <Fragment>
                <Card className="mt-3">
                  <Card.Body key={category._id}>
                    <p className="my-0">
                      {category.type}: {category.name}
                    </p>
                  </Card.Body>
                </Card>
              </Fragment>
            );
          });
        }

        setCatList(list);
        console.log(list);
        console.log(catList);
      });
  }

  function addCategory(e) {
    e.preventDefault();

    // console.log(`The ${categoryName} has been added. It has a price of ${price} and will start on ${startDate} and end on ${endDate}.`)

    let token = localStorage.getItem('token');
    console.log(token);

    fetch('http://localhost:8000/api/category/add', {
      // fetch('https://sleepy-atoll-78626.herokuapp.com/api/category/add', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: categoryName,
        type: type,
      }),
    })
      .then((res) => res.json())
      // .then(data => {console.log(data)})
      .then((data) => {
        //if the creation of the course is successful, redirect admin to the courses page
        if (data === true) {
          Swal.fire({
            icon: 'success',
            title: 'Category Added',
            text: `The category ${categoryName} has been added.`,
          });

          //redirect admin to courses page
          // Router.push('/courses')
          getCategoryList();
        } else {
          // error while creating a course
          Swal.fire({
            icon: 'error',
            title: 'Category Not Added',
            text: `Something went wrong.`,
          });
        }
      });

    setCategoryName('');
    setType('expense');
    // router.reload()
  }

  // let data = {

  // 	title: "Error 403",
  // 	content: "You don't have enough permission to view this page.",
  // 	destination: "/",
  // 	label: "Back to Home"
  // }

  return (
    <>
      <Container>
        <Row>
          {/* <Col sm={4}> */}
          <Col sm={{ span: 4, offset: 1 }}>
            <h2 className="text-left mt-5 cardHead">Create Category</h2>
            <Form onSubmit={(e) => addCategory(e)}>
              <Form.Group controlId="categoryName">
                <Form.Label className="mt-3">Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="type">
                <Form.Label>Category Type</Form.Label>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>expense</option>
                  <option>income</option>
                </Form.Control>
              </Form.Group>

              {isActive ? (
                // <Button type="submit" variant="dark">
                <Button className="addCatButton" type="submit">
                  Add Category
                </Button>
              ) : (
                <Button className="addCatButton" disabled>
                  Add Category
                </Button>
              )}
            </Form>
          </Col>

          <Col className="tableCol" sm={{ span: 5, offset: 1 }}>
            <h2 className="text-left mt-5 cardHead">Categories Overview</h2>
            {catList}
          </Col>
        </Row>
      </Container>
    </>
  );
}
