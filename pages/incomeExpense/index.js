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
  const [expenseCatList, setExpenseCatList] = useState([]);
  const [incomeCatList, setIncomeCatList] = useState([]);
  const [rowsTranList, setRowsTranList] = useState([]);

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    console.log('effect2');
    getCategoryNames();
    // computeBalance()
  }, []);

  function getCategoryNames() {
    const token = localStorage.getItem('token');
    console.log(token);

    // fetch('http://localhost:8000/api/category/get', {
    fetch('http://localhost:8000/api/category/get', {
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

          //EXPENSE list
          let rowsTran;
          let tranDateFomat;
          let tempList = [];

          const rowsCat2 = expenseFilter.map((category) => {
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
            tranDateFomat = moment(item.transactionDate).format('L');
            itemList.push(
              <Fragment>
                <Card className="mt-3">
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
                      <span>{tranDateFomat}</span>
                    </p>
                  </Card.Body>
                </Card>
              </Fragment>
            );
          });
          console.log('FINAL LIST', itemList);
          setExpenseCatList(itemList);

          //INCOME list
          let rowsTranIncome;
          let tempList2 = [];

          const rowsCat1 = incomeFilter.map((category) => {
            console.log(category);

            return (rowsTranIncome = category.transaction.map((tran) => {
              console.log(category.name);
              console.log(category.type);
              console.log(tran.description);

              tempList2.push({
                name: category.name,
                type: category.type,
                description: tran.description,
                amount: tran.amount,
                balance: tran.balance,
                // transactionDate: moment(tran.transactionDate).format('LLL')
                transactionDate: tran.transactionDate,
              });

              tempList2.sort((a, b) => {
                return (
                  new Date(a.transactionDate) - new Date(b.transactionDate)
                );
              });
              console.log(tempList2);
            }));
          });

          let incomeCat = [];
          tempList2.forEach((item) => {
            tranDateFomat = moment(item.transactionDate).format('L');
            incomeCat.push(
              <Fragment>
                <Card className="mt-3">
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
                      <span>{tranDateFomat}</span>
                    </p>
                  </Card.Body>
                </Card>
              </Fragment>
            );
          });
          console.log(incomeCat);
          setIncomeCatList(incomeCat);
          // setRowsTranList(rowsTran)
        } else {
          let list;
          list = <h5 className="text-left mt-4">No Transactions Available</h5>;
          setExpenseCatList(list);
          setIncomeCatList(list);
        }
      });
  }

  return (
    <>
      <Container className="container-height-others">
        <Row className="mb-5">
          <Col sm={6}>
            <h2 className="text-left mt-5 cardHead">Income Transactions</h2>
            {incomeCatList}
          </Col>

          <Col className="tableCol" sm={{ span: 6, offset: 0 }}>
            <h2 className="text-left mt-5 cardHead">Expense Transactions</h2>
            {expenseCatList}
          </Col>
        </Row>
      </Container>
    </>
  );
}
