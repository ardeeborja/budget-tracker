import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default function Footer() {
  return (
    <>
      {/* <div className="clear"></div> */}
      <div className="footer">
        {/* <footer className="footer bg-dark fixed-bottom"> */}
        <footer className="footer footerElement">
          <p className="p-3 mb-0 text-center text-white">
            Budget Tracker &copy;
          </p>
        </footer>
      </div>
    </>
  );
}
