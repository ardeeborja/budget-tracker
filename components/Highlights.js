import { Row, Col, Card, Container } from 'react-bootstrap';

export default function Highlights() {
  return (
    <Container className="container-height-home">
      <Row className="my-5">
        <Col className="mb-3" xs={12} md={4}>
          <Card className="cardHighlight">
            <Card.Body>
              <Card.Title>
                <h4 className="cardHead">Create Categories and Transactions</h4>
              </Card.Title>
              <Card.Text className="mb-3">
                Sunt eu esse id consectetur nisi reprehenderit veniam ad quis
                incididunt nisi commodo id excepteur eu.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-3" xs={12} md={4}>
          <Card className="cardHighlight">
            <Card.Body>
              <Card.Title>
                <h4 className="cardHead">Monitor Your Income and Expenses</h4>
              </Card.Title>
              <Card.Text className="mb-3">
                Lorem ipsum nostrud magna adipisicing.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-3" xs={12} md={4}>
          <Card className="cardHighlight">
            <Card.Body>
              <Card.Title>
                <h4 className="cardHead">
                  Visualize your Datas through Charts
                </h4>
              </Card.Title>
              <Card.Text className="mb-3">
                Aliquip irure esse ex pariatur culpa pariatur irure in velit non
                enim officia adipisicing dolor excepteur id anim consectetur.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
