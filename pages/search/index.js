import { useState, useEffect, useContext } from 'react';

import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Table,
} from 'react-bootstrap';

import { Fragment } from 'react';

// import UserContext from '../../userContext'

//import router from nextjs for redirection
import Router from 'next/router';

// import Swal
import Swal from 'sweetalert2';

import moment from 'moment';

export default function Search() {
  // const {user} = useContext(UserContext)
  // console.log(user)

  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [rowsCatList, setRowsCatList] = useState([]);
  const [rowsTranList, setRowsTranList] = useState([]);
  const [searchResultList, setSearchResultList] = useState([]);
  // const [tranDate, setTranDate] = useState(`Transaction Date\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0: `);
  // const [tranAmount, setTranAmount] = useState('')
  // const [availableBal, setAvailableBal] = useState('')
  // const [tranDesc, setTranDesc] = useState('')
  // const [catTypeName, setCatTypeName] = useState('')
  let tranDate = `Transaction Date\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0: `;
  let tranAmount = `Transaction Amount\u00A0\u00A0\u00A0\u00A0\u00A0: `;
  let availableBal = `Available Balance\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0: `;
  let tranDesc = `Description\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0: `;
  let catTypeName = `Category Type/Name\u00A0\u00A0: `;

  const [isActive, setIsActive] = useState(true);

  //check the user's input
  useEffect(() => {
    console.log('effect1', type);
    console.log('effect1', description);
    if (description !== '' && type !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [description, type]);
  // console.log(isActive)

  function searchTran(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log(token);

    // fetch('https://jade-alligator-hose.cyclic.app/api/transaction/search', {
    fetch('https://jade-alligator-hose.cyclic.app/api/transaction/search', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.category.length !== 0) {
          const incomeFilter = data.category.filter(
            (obj) => obj.type === 'income'
          );
          const expenseFilter = data.category.filter(
            (obj) => obj.type === 'expense'
          );
          const availBalance = data.balance;
          // parseFloat(data.balance).toFixed(2)
          // parseFloat(data.balance.toFixed(2))

          setExpenseList(expenseFilter);
          setIncomeList(incomeFilter);

          //default value on initial render
          setSelectedList(expenseFilter);

          console.log('1', expenseFilter);
          console.log('2', expenseList);
          console.log('1A', incomeFilter);

          console.log(type);

          if (type === 'expense') {
            console.log('not length 0');

            let resultList = [];

            const rowsCat = expenseFilter.map((category) => {
              console.log('expense category', category);
              category.transaction.forEach((tran) => {
                if (tran.description === description) {
                  const catItem = {
                    name: category.name,
                    type: category.type,
                    description: tran.description,
                    amount: tran.amount,
                    balance: tran.balance,
                    date: moment(tran.transactionDate).format('L'),
                  };

                  resultList.push(catItem);
                }
              });
            });

            setSearchResultList(resultList);
            console.log(resultList);
          } else {
            console.log('ELSE');

            let resultList = [];

            const rowsCat = incomeFilter.map((category) => {
              console.log('expense category', category);
              category.transaction.forEach((tran) => {
                if (tran.description === description) {
                  const catItem = {
                    name: category.name,
                    type: category.type,
                    description: tran.description,
                    amount: tran.amount,
                    balance: tran.balance,
                    date: moment(tran.transactionDate).format('L'),
                  };

                  resultList.push(catItem);
                }
              });
            });

            setSearchResultList(resultList);
            console.log(resultList);
          }
        } else {
          let list;
          list = <h5 className="text-left mt-4">No Transactions Available</h5>;
          setRowsCatList(list);
        }
      });
    setType('expense');
    setDescription('');
  }

  return (
    <Fragment>
      <Container>
        <Row>
          <Col sm={4}>
            <h2 className="text-left mt-5 cardHead">Search Transaction</h2>

            <Form onSubmit={(e) => searchTran(e)}>
              <Form.Group controlId="type">
                <Form.Label className="mt-3">Category Type</Form.Label>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>expense</option>
                  <option>income</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              {isActive ? (
                <Button className="addTranButton" type="submit">
                  Search Transaction
                </Button>
              ) : (
                <Button className="addTranButton" disabled>
                  Search Transaction
                </Button>
              )}
            </Form>
          </Col>

          <Col className="tableCol" sm={{ span: 7, offset: 1 }}>
            <h2 className="text-left mt-5 cardHead">Searched Transactions</h2>
            {searchResultList.length !== 0 ? (
              <>
                {searchResultList &&
                  searchResultList.map((result, _id) => {
                    return (
                      <Card className="mt-3">
                        <Card.Body key={_id}>
                          <p className="mb-0">
                            <span>{catTypeName}</span>
                            <span>
                              {result.type}/{result.name}
                            </span>
                          </p>
                          <p className="mb-0">
                            <span>{tranDesc}</span>
                            <span>{result.description}</span>
                          </p>
                          <p className="mb-0">
                            <span>{tranAmount}</span>
                            <span>₱ {result.amount}</span>
                          </p>
                          <p className="mb-0">
                            <span>{availableBal}</span>
                            <span>₱ {result.balance}</span>
                          </p>
                          <p className="mb-0">
                            <span>{tranDate}</span>
                            <span>{moment(result.date).format('l')}</span>
                          </p>
                        </Card.Body>
                      </Card>
                    );
                  })}
              </>
            ) : (
              <h5 className="text-left mt-4">No Transactions Available</h5>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
