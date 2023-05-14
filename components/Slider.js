import { Container, Carousel } from 'react-bootstrap';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import finance from '../components/finance.jpg';
import money from '../components/money.jpg';
import graph from '../components/graph.jpg';

export default function Slider() {
  const FinanceImage = () => {
    return <Image src={finance} alt="finance pic" />;
  };
  const MoneyImage = () => {
    return <Image src={money} alt="money pic" />;
  };
  const GraphImage = () => {
    return <Image src={graph} alt="graph pic" />;
  };

  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  return (
    <Container
      className={`carousel mb-5 ${
        inView ? 'onscroll onscroll-zoom' : 'onscroll'
      }`}
      ref={ref}
    >
      <Carousel>
        <Carousel.Item>
          <FinanceImage className="d-block w-100" />
          <Carousel.Caption>
            <h3>Monitor Expenses</h3>
            <p>Understand where and how much you spend your money.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <MoneyImage className="d-block w-100" />
          <Carousel.Caption>
            <h3>Track your finances</h3>
            <p>Understand where and how much you spend your money.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <GraphImage className="d-block w-100" />
          <Carousel.Caption>
            <h3>Check it in graph </h3>
            <p>Graph makes your data easier to understand.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
