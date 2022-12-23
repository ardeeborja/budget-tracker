import { Jumbotron, Row, Col } from 'react-bootstrap';

//Link component from nextjs for navigation
import Link from 'next/link';

/*
	Link component is used to navigate through pages.
*/

import Image from 'next/image';

export default function Banner({ dataProp }) {
  console.log(dataProp);
  const { title, content } = dataProp;

  return (
    <Jumbotron className="text-center bannerImage jumbotron-fluid">
      <h1 className="bannerTitle">{title}</h1>
      <h5 className="bannerSubTitle">{content}</h5>
    </Jumbotron>
  );
}

/* <Row>
<Col>
  <Jumbotron className="text-center bannerImage">
    <h1 className="bannerTitle">{title}</h1>
    <h5 className="bannerSubTitle">{content}</h5>
  </Jumbotron>
</Col>
</Row> */
