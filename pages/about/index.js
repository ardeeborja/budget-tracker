import { Jumbotron, Row, Col, Container } from 'react-bootstrap';

//Link component from nextjs for navigation
import Link from 'next/link';

import Image from 'next/image';

export default function About() {
  return (
    <>
      <Row>
        <Col>
          <Jumbotron className="text-center text-white jumbotron-fluid aboutImage">
            <h1 className="bannerTitle">About Us</h1>
          </Jumbotron>
        </Col>
      </Row>
      <Container>
        <h5 className="text-justify">
          Hello! I'm Ardee, a Full Stack Web Developer and the creator of this
          Budget Tracker Application. My passion involves developing web apps
          that would help everyone make their daily activities enjoyable and
          easier.
        </h5>
        <Row>
          <Col className="mt-4" sm={6}>
            <Image src="/about.jpg" alt="about" width={500} height={500} />
          </Col>
          <Col className="mt-4 text-justify" sm={6}>
            <p>
              The main objective of this Budget Tracker App is to help us track
              our daily financial transactions. This would help us monitor both
              our spending and income.
            </p>
            <p>
              This budget tracker is user-friendly and feature-packed which
              would truly make your daily use of it enjoyable and productive.
            </p>
            <p>
              With Budget Tracker, you can create categories of your expenses
              and income transactions. Using these categories, you can create
              list of your income and purchases. You would also see the history
              of the created categories and transactions. There are charts
              available as well to help you visualize your monetary activites.
              These charts would help you discern where your income mostly comes
              from and where you primarily spend it.
            </p>
            <p>
              And the best part it? You can use it for free! I hope you enjoy
              using this and find it useful for your financial transactions.
              Thank you!
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

//TESTing again....!!!
