import React from "react";
import { Row, Col } from "reactstrap";

export default (_) => {
  return (
    <div className="thankyou">
      <Row noGutters className="text-center">
        <Col>
          <p className="thanks-header">Nous vous remercions!</p>
          <i className="Thankyou"></i>
          <p className="thanks-subtext">
            Vous devriez recevoir un email de confirmation pour votre
            réservation
          </p>
        </Col>
      </Row>
    </div>
  );
};
