import { Fragment, useState, useEffect, useContext } from 'react';

import Banner from '../../components/Banner';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// import UserContext from '../../userContext'

//import router from nextjs for redirection
import Router from 'next/router';

import Swal from 'sweetalert2';

import LineChart from '../../components/LineChart';

import UserContext from '../../userContext';

import moment from 'moment';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default function BudgetTrend() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allCat, setAllCat] = useState([]);
  const [uniqueCats, setUniqueCats] = useState([]);
  const [finalTran, setFinalTran] = useState([]);
  const [noData, setNoData] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (startDate !== '' && endDate !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [startDate, endDate]);

  function getCategory(e) {
    e.preventDefault();

    console.log(startDate);
    console.log(endDate);

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
        if (data.category.length > 0) {
          console.log(data);
          // console.log(data.category[0].type);

          const allFilter = data.category.filter(
            (obj) => obj.type === 'income' || obj.type === 'expense'
          );
          // console.log('filter', obj.type)

          console.log(allFilter);
          setAllCat(allFilter);
        } else {
          let noDataAvail = 'No Data Available';
          setNoData(noDataAvail);
          setStartDate('');
          setEndDate('');
        }
      });
  }

  useEffect(() => {
    console.log(allCat);

    let cats = [];

    allCat.forEach((element) => {
      if (!cats.find((cat) => cat === element.name)) {
        console.log(element.name);
        cats.push(element.name);
      }
    });

    setUniqueCats(cats);
  }, [allCat]);

  useEffect(() => {
    console.log(uniqueCats);
    console.log(allCat);
    // console.log(allCat[0].transaction[0].transactionDate)
    // console.log(startDate)
    // console.log(endDate)

    let tranList = [];

    let amount = 0;
    allCat.forEach((item) => {
      item.transaction.forEach((object) => {
        tranList.push({
          amount: object.amount,
          balance: object.balance,
          description: object.description,
          // transactionDate: moment(object.transactionDate).format('LLL')
          transactionDate: object.transactionDate,
        });

        // setStartDate('')
        // setEndDate('')
      });
    });
    console.log('TRANLIST', tranList);

    tranList.sort((a, b) => {
      return new Date(a.transactionDate) - new Date(b.transactionDate);
    });

    // let sDate = startDate.toLocaleString()
    // let eDate = endDate.toLocaleString()

    // let sNewDate = moment(sDate).format('LLL')
    // let eNewDate = moment(eDate).format('LLL')
    // console.log(sNewDate)
    // console.log(eNewDate)

    let filterTran = [];
    tranList.forEach((tran) => {
      console.log('ENTER');
      let tranDateFomat = moment(tran.transactionDate).format('YYYY-MM-DD');
      console.log(tranDateFomat);

      let from = startDate;
      let to = endDate;
      let check = tranDateFomat;
      if (check >= from && check <= to) {
        console.log(startDate);
        console.log(endDate);
        console.log(tranDateFomat);
        console.log(check >= from && check <= to);

        filterTran.push({
          balance: tran.balance,
          description: tran.description,
          transactionDate: moment(tran.transactionDate).format('LLL'),
        });
      }
    });
    console.log(filterTran);
    setFinalTran(filterTran);

    //set nodata if empty
    if (filterTran.length === 0) {
      let noDataAvail = 'No Data Available';
      setNoData(noDataAvail);
    }
    //

    setStartDate('');
    setEndDate('');
  }, [uniqueCats]);
  console.log(finalTran);

  // useEffect(()=>{

  // },[uniqueCats])

  return (
    <Fragment>
      <Container>
        <Row>
          <Col className="mt-5" sm={{ span: 6, offset: 3 }}>
            <Form onSubmit={(e) => getCategory(e)}>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Button className="addCatButton" type="submit">
                Generate Chart
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="mt-5">
            <h2 className="text-center cardHead">Balance Trend</h2>
            {!finalTran.length ? (
              <p className="text-center">{noData}</p>
            ) : (
              <LineChart catData={finalTran} />
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
//<LineChart catData={amountPerCats}/>

//sm={{ span: 3, offset: 2 }}
/*
						<p>End Date:</p>
						<DatePicker className="react-datepicker" selected={endDate}
							onChange={date => setEndDate(date)}
							dateFormat="MM/dd/yyyy" 
						/>




					<Col className="mt-4" sm={{ span: 6, offset: 0 }}>
					</Col>	
*/
