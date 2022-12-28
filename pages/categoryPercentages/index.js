import { Fragment, useState, useEffect, useContext } from 'react';

import Banner from '../../components/Banner';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// import UserContext from '../../userContext'

//import router from nextjs for redirection
import Router from 'next/router';

import Swal from 'sweetalert2';

import PieChart from '../../components/PieChart';

import UserContext from '../../userContext';

import moment from 'moment';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default function CategoryPercentages() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allCat, setAllCat] = useState([]);
  const [uniqueCats, setUniqueCats] = useState([]);
  const [amountPerCats, setAmountPerCats] = useState([]);
  const [noData, setNoData] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isAllZero, setIsAllZero] = useState(false);

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

    // fetch('https://jade-alligator-hose.cyclic.app/api/category/get', {
    fetch('https://jade-alligator-hose.cyclic.app/api/category/get', {
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
    let tranDateFomat;

    setAmountPerCats(
      uniqueCats.map((cat) => {
        let amount = 0;
        allCat.forEach((item) => {
          item.transaction.forEach((object) => {
            // allCat.forEach(element => {
            if (item.name === cat) {
              tranDateFomat = moment(object.transactionDate).format(
                'YYYY-MM-DD'
              );
              let from = startDate;
              let to = endDate;
              let check = tranDateFomat;
              if (check >= from && check <= to) {
                console.log(startDate);
                console.log(endDate);
                console.log(tranDateFomat);
                console.log(check >= from && check <= to);
                amount += parseInt(object.amount);
              }
            }
            // console.log(object.transactionDate)
            // console.log(tranDateFomat = moment(object.transactionDate).format('YYYY-MM-DD'))
            // console.log(cat,amount)
            // })

            // var d1 = startDate.split("/");
            // var d2 = endDate.split("/");
            // var c = tranDateFomat.split("/");

            // var from = new Date(d1)  // -1 because months are from 0 to 11
            // var to   = new Date(d2)
            // var check = new Date(c)

            // console.log(check > from && check < to)

            setStartDate('');
            setEndDate('');
          });
        });
        return {
          name: cat,
          amount: amount,
        };
      })
    );
  }, [uniqueCats]);

  console.log(amountPerCats);

  useEffect(() => {
    //check if all amounts are 0; if all 0, set flag to to true
    let zeroFlag = amountPerCats.every((catItem) => {
      console.log(catItem.amount);
      return catItem.amount === 0;
    });
    setIsAllZero(zeroFlag);
    console.log(zeroFlag);
  }, [amountPerCats]);

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
            <h2 className="text-center cardHead">Category Percentage</h2>
            {isAllZero === true ? (
              <p className="text-center">No Data Available</p>
            ) : (
              <PieChart catData={amountPerCats} />
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

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
