import { Row, Col, Card, Container } from 'react-bootstrap';

export default function Highlights() {
  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <Card className="cardHighlight">
            <Card.Body>
              <Card.Title>
                <h4 className="cardHead">Create Categories and Transactions</h4>
              </Card.Title>
              <Card.Text>
                Sunt eu esse id consectetur nisi reprehenderit veniam ad quis
                incididunt nisi commodo id excepteur eu.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className="cardHighlight">
            <Card.Body>
              <Card.Title>
                <h4 className="cardHead">Monitor Your Income and Expenses</h4>
              </Card.Title>
              <Card.Text>Lorem ipsum nostrud magna adipisicing.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className="cardHighlight">
            <Card.Body>
              <Card.Title>
                <h4 className="cardHead">
                  Visualize your Datas through Charts
                </h4>
              </Card.Title>
              <Card.Text>
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
