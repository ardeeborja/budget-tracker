import { Fragment, useState, useEffect, useContext } from 'react';

import Banner from '../../components/Banner';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// import UserContext from '../../userContext'

//import router from nextjs for redirection
import Router from 'next/router';

import Swal from 'sweetalert2';

import BarChart from '../../components/BarChart';

import UserContext from '../../userContext';

import moment from 'moment';

export default function monthlyIncome() {
  const [categoryName, setCategoryName] = useState('');
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [balance, setBalance] = useState(0);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState([]);

  useEffect(() => {
    console.log('chart');
    createChart();
  }, []);

  function createChart() {
    const token = localStorage.getItem('token');
    console.log(token);

    // fetch('http://localhost:8000/api/transaction/list', {
    fetch('https://jade-alligator-hose.cyclic.app/api/transaction/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          console.log(data);
          const incomeFilter = data.category.filter(
            (obj) => obj.type === 'income'
          );
          const expenseFilter = data.category.filter(
            (obj) => obj.type === 'expense'
          );

          setExpenseList(expenseFilter);
          setIncomeList(incomeFilter);

          console.log(expenseFilter);
          console.log(incomeFilter);

          let expenseMonthlyTotal = [];
          let janExpenseTotal = 0;
          let febExpenseTotal = 0;
          let marExpenseTotal = 0;
          let aprExpenseTotal = 0;
          let mayExpenseTotal = 0;
          let junExpenseTotal = 0;
          let julExpenseTotal = 0;
          let augExpenseTotal = 0;
          let sepExpenseTotal = 0;
          let octExpenseTotal = 0;
          let novExpenseTotal = 0;
          let decExpenseTotal = 0;

          expenseFilter.forEach((expense) => {
            console.log(expense);
            expense.transaction.forEach((item) => {
              console.log(moment(item.transactionDate).format('MMMM'));
              if (moment(item.transactionDate).format('MMMM') == 'January') {
                janExpenseTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'February'
              ) {
                febExpenseTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'March'
              ) {
                marExpenseTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'April'
              ) {
                aprExpenseTotal += item.amount;
              } else if (moment(item.transactionDate).format('MMMM') == 'May') {
                mayExpenseTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'June'
              ) {
                junExpenseTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'July'
              ) {
                julExpenseTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'August'
              ) {
                augExpenseTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'September'
              ) {
                sepExpenseTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'October'
              ) {
                octExpenseTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'November'
              ) {
                novExpenseTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'December'
              ) {
                decExpenseTotal += item.amount;
              }
            });
          });
          expenseMonthlyTotal.push(
            janExpenseTotal,
            febExpenseTotal,
            marExpenseTotal,
            aprExpenseTotal,
            mayExpenseTotal,
            junExpenseTotal,
            julExpenseTotal,
            augExpenseTotal,
            sepExpenseTotal,
            octExpenseTotal,
            novExpenseTotal,
            decExpenseTotal
          );
          console.log(expenseMonthlyTotal);
          setExpenseTotal(expenseMonthlyTotal);

          let incomeMonthlyTotal = [];
          let janIncomeTotal = 0;
          let febIncomeTotal = 0;
          let marIncomeTotal = 0;
          let aprIncomeTotal = 0;
          let mayIncomeTotal = 0;
          let junIncomeTotal = 0;
          let julIncomeTotal = 0;
          let augIncomeTotal = 0;
          let sepIncomeTotal = 0;
          let octIncomeTotal = 0;
          let novIncomeTotal = 0;
          let decIncomeTotal = 0;

          incomeFilter.forEach((income) => {
            console.log(income);
            income.transaction.forEach((item) => {
              console.log(moment(item.transactionDate).format('MMMM'));
              if (moment(item.transactionDate).format('MMMM') == 'January') {
                janIncomeTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'February'
              ) {
                febIncomeTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'March'
              ) {
                marIncomeTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'April'
              ) {
                aprIncomeTotal += item.amount;
              } else if (moment(item.transactionDate).format('MMMM') == 'May') {
                mayIncomeTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'June'
              ) {
                junIncomeTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'July'
              ) {
                julIncomeTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'August'
              ) {
                augIncomeTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'September'
              ) {
                sepIncomeTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'October'
              ) {
                octIncomeTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'November'
              ) {
                novIncomeTotal += item.amount;
              } else if (
                moment(item.transactionDate).format('MMMM') == 'December'
              ) {
                decIncomeTotal += item.amount;
              }
            });
          });
          incomeMonthlyTotal.push(
            janIncomeTotal,
            febIncomeTotal,
            marIncomeTotal,
            aprIncomeTotal,
            mayIncomeTotal,
            junIncomeTotal,
            julIncomeTotal,
            augIncomeTotal,
            sepIncomeTotal,
            octIncomeTotal,
            novIncomeTotal,
            decIncomeTotal
          );
          console.log(incomeMonthlyTotal);
          setIncomeTotal(incomeMonthlyTotal);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Data Available',
            text: `Something went wrong.`,
          });
        }
      });
  }

  return (
    <Fragment>
      <Container>
        <Row>
          <Col className="mt-5">
            <h2 className="text-left cardHead">Monthly Income</h2>
            <BarChart
              type="Income"
              color="blue"
              rawData={incomeTotal}
              label="Monthly Income"
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-5">
            <h2 className="text-left cardHead">Monthly Expense</h2>
            <BarChart
              type="Expense"
              color="red"
              rawData={expenseTotal}
              label="Monthly Expense"
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

/*
			
			<h1>Expense Income</h1>
			<BarChart rawData={expenseMonthlyTotal}/>

*/

// export async function getStaticProps() {

// 	console.log('static')
// 	useEffect(()=>{
// 		const token = localStorage.getItem("token")
// 		console.log('token', token)
// 	},[])

// 	// const token = localStorage.getItem("token")
// 	// console.log('token', token)
// 	// const {tokenProvider} = useContext(UserContext)
// 	// console.log(tokenProvider)

// 	const res = await fetch('http://localhost:8000/api/category/get',{
// 			method: 'GET',
// 			headers: {
// 				"Content-Type": 'application/json',
// 				'Authorization': `Bearer ${tokenProvider}`
// 			}
// 		})

// 		const data = await res.json()
// 		console.log('DATAWW', data)

// 		return {

// 			props: {
// 				data
// 			}

// 	}

// }

/*
	return (
		<Fragment>
			<Container>
				<Row>
					<Col className="mt-4" sm={6}>
						<h1 className="text-center">Monthly Income</h1>
						<BarChart type="Income" color="blue" rawData={incomeTotal}/>
					</Col>
					<Col className="mt-4" sm={6}>
						<h1 className="text-center">Monthly Expense</h1>
						<BarChart type="Expense" color="red" rawData={expenseTotal}/>
					</Col>					
				</Row>
			</Container>
		</Fragment>

	)

*/
