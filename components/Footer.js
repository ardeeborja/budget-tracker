import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default function Footer() {
  return (
    <>
      <div className="clear"></div>
      <div className="footer">
        {/* <footer className="footer bg-dark fixed-bottom"> */}
        <footer className="footer fixed-bottom footerElement">
          <p className="p-3 mb-0 text-center text-white">
            {' '}
            Ardee Borja | Full Stack Web Developer
          </p>
        </footer>
      </div>
    </>
  );
}
