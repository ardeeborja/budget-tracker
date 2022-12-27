import { useState, useEffect, useContext } from 'react';

import Banner from '../../components/Banner';

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

export default function CreateCategory() {
  // const {user} = useContext(UserContext)
  // console.log(user)

  const [categoryName, setCategoryName] = useState('');
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [balance, setBalance] = useState(0);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [rowsCatList, setRowsCatList] = useState([]);
  const [rowsTranList, setRowsTranList] = useState([]);
  const [itemListFormat, setItemListFormat] = useState([]);

  const [isActive, setIsActive] = useState(true);

  //check the user's input
  useEffect(() => {
    console.log('effect1', categoryName);
    console.log('effect1', type);
    console.log('effect1', amount);
    console.log('effect1', description);
    if (
      categoryName !== '' &&
      type !== '' &&
      amount !== 0 &&
      amount !== '' &&
      description !== ''
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [categoryName, type, amount, description]);
  console.log(isActive);

  useEffect(() => {
    console.log('effect2');
    getCategoryNames();
    // computeBalance()
  }, []);

  function getCategoryNames() {
    const token = localStorage.getItem('token');
    console.log(token);

    // fetch('http://localhost:8000/api/category/get', {
    fetch('https://jade-alligator-hose.cyclic.app/api/category/get', {
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
          const allFilter = data.category.filter(
            (obj) => obj.type === 'income' || obj.type === 'expense'
          );
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
          setBalance(availBalance);

          //default value on initial render
          setSelectedList(expenseFilter);
          if (expenseFilter.length > 0) {
            setCategoryName(expenseFilter[0].name);
          }

          console.log('1', expenseFilter);
          console.log('2', expenseList);
          console.log('1A', incomeFilter);

          // code block can be deleted
          console.log('TRAN', expenseFilter);
          expenseFilter.forEach((expense) => {
            // console.log(expense.name)
            // console.log(expense.type)
            let catHeader = <h1>{expense.name}</h1>;
            console.log(catHeader);
            expense.transaction.forEach((tran) => {
              console.log();
              console.log(tran.description);
            });
          });
          // code block can be deleted

          let rowsTran;
          let tranDateFomat;
          let tempList = [];

          console.log();
          const rowsCat = allFilter.map((category) => {
            console.log(category);

            return (rowsTran = category.transaction.map((tran) => {
              console.log(category.name);
              console.log(category.type);
              console.log(tran.description);

              tempList.push({
                name: category.name,
                type: category.type,
                description: tran.description,
                amount: tran.amount,
                balance: tran.balance,
                // transactionDate: moment(tran.transactionDate).format('LLL')
                transactionDate: tran.transactionDate,
              });

              tempList.sort((a, b) => {
                return (
                  new Date(a.transactionDate) - new Date(b.transactionDate)
                );
              });
              console.log(tempList);
            }));
          });

          let itemList = [];
          let tranDate = `Transaction Date\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0: `;
          let tranAmount = `Transaction Amount\u00A0\u00A0\u00A0\u00A0\u00A0: `;
          let availableBal = `Available Balance\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0: `;
          let tranDesc = `Description\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0: `;
          let catTypeName = `Category Type/Name\u00A0\u00A0: `;

          tempList.forEach((item) => {
            itemList.push(
              <Card
                className={`mt-3${
                  item.type == 'income'
                    ? ' incomeBorderColor'
                    : ' expenseBorderColor'
                }`}
              >
                <Card.Body key={item._id}>
                  <p className="mb-0">
                    <span>{catTypeName}</span>
                    <span>
                      {item.type}/{item.name}
                    </span>
                  </p>
                  <p className="mb-0">
                    <span>{tranDesc}</span>
                    <span>{item.description}</span>
                  </p>
                  <p className="mb-0">
                    <span>{tranAmount}</span>
                    <span>₱ {item.amount}</span>
                  </p>
                  <p className="mb-0">
                    <span>{availableBal}</span>
                    <span>₱ {item.balance}</span>
                  </p>
                  <p className="mb-0">
                    <span>{tranDate}</span>
                    <span>{moment(item.transactionDate).format('l')}</span>
                  </p>
                </Card.Body>
              </Card>
            );
          });
          console.log('FINAL LIST', itemList);

          setItemListFormat(itemList);
        } else {
          let list;
          list = <h5 className="text-left mt-4">No Transactions Available</h5>;
          setRowsCatList(list);
        }
      });
  }

  // function computeBalance() {
  // 	console.log()
  // 	const expenseTotal = expenseList.map(expense => {
  // 		// expense.
  // 	})

  // }

  function handleTypeChange(e) {
    console.log('TT', e.target.value);
    setType(e.target.value);
    if (e.target.value === 'income') {
      setSelectedList(incomeList);
      console.log('UU', incomeList);
      if (incomeList.length === 0) {
        setCategoryName('');
      } else {
        setCategoryName(incomeList[0].name);
      }
    } else {
      setSelectedList(expenseList);
      console.log('VV', expenseList);
      if (expenseList.length === 0) {
        setCategoryName('');
      } else {
        setCategoryName(expenseList[0].name);
      }
    }

    // console.log('1', e.target.value)
    // console.log('2', type)
  }

  function addTransaction(e) {
    e.preventDefault();

    console.log('balance', balance);
    console.log('amount', amount);
    console.log('type', type);
    // availBalance = parseFloat(data.balance).toFixed(2)

    let availBalance = balance;
    if (type === 'income') {
      // availBalance += parseFloat(amount).toFixed(2)
      // availBalance = availBalance + (Math.round(amount * 100) / 100)
      availBalance = availBalance + parseFloat(amount);
      availBalance = Math.round(availBalance * 100) / 100;
      console.log('availBalance', availBalance);
    } else {
      // availBalance -= parseFloat(amount).toFixed(2)
      // availBalance = availBalance - (Math.round(amount * 100) / 100)
      availBalance = availBalance - parseFloat(amount);
      availBalance = Math.round(availBalance * 100) / 100;
      console.log('availBalance', availBalance);
    }

    // useEffect(()=>{
    // 	console.log('effect bal')
    // 	setBalance(availBalance)
    // 	console.log('balance',balance)
    // },[balance])

    // setBalance(availBalance)
    // console.log('balance',balance)

    const token = localStorage.getItem('token');

    // fetch('http://localhost:8000/api/transaction/add', {
    fetch('https://jade-alligator-hose.cyclic.app/api/transaction/add', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: categoryName,
        type: type,
        amount: amount,
        description: description,
        balance: availBalance,
      }),
    })
      .then((res) => res.json())
      // .then(data => {console.log('fetchQQ',data)})
      .then((data) => {
        console.log('DATArr', data);
        if (data === true) {
          Swal.fire({
            icon: 'success',
            title: 'Transaction Added',
            text: `The transaction has been successfully added.`,
          });

          setCategoryName('');
          setType('expense');
          setAmount(0);
          setDescription('');
          // setBalance(0)
          // setBalance(availBalance)
          // console.log('balance',balance)
          getCategoryNames();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Transaction Not Added',
            text: `Something went wrong.`,
          });
        }
      });
  }

  return (
    <>
      <Container>
        <Row>
          <Col sm={4}>
            <h2 className="text-left mt-5 cardHead">Create Transaction</h2>
            <h5 className="text-left mt-3">
              Availabe Balance: ₱{' '}
              {/* <span style={{ color: 'green' }}>{balance}</span> */}
              <span
                className={`${
                  balance >= 0 ? ' amountColorGreen' : ' amountColorRed'
                }`}
              >
                {balance}
              </span>
            </h5>

            <Form onSubmit={(e) => addTransaction(e)}>
              <Form.Group controlId="type">
                <Form.Label className="mt-4">Category Type</Form.Label>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={(e) => handleTypeChange(e)}
                >
                  <option>expense</option>
                  <option>income</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  as="select"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                >
                  {selectedList &&
                    selectedList.map((item, _id) => {
                      return <option key={_id}>{item.name}</option>;
                    })}
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
              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>

              {isActive ? (
                // <Button className="addTran" type="submit" variant="dark">
                <Button className="addTranButton" type="submit">
                  Add Transaction
                </Button>
              ) : (
                // <Button className="addTran" variant="dark" disabled>
                <Button className="addTranButton" disabled>
                  Add Transaction
                </Button>
              )}
            </Form>
          </Col>

          <Col className="tableCol" sm={{ span: 7, offset: 1 }}>
            <h2 className="text-left mt-5 cardHead">Transaction History</h2>
            {itemListFormat}
          </Col>
        </Row>
      </Container>
    </>
  );
}
