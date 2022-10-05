import React from "react";
import { Row, Col, Button } from "reactstrap";
import Search from "../components/Search";
export default (props) => {
  return (
    <div >
      <div className="main">
        <Row noGutters className="text-center align">
          <Col>
            <Button 
              className="restaurantname-btn">
              Choisissez le restaurant
            </Button>
            <Button
              className="book-table-btn">
              {/* <a href="/Calendrier"> */}
              Réserver une table
              {/* </a> */}
            </Button>
          </Col>
        </Row>
        {/* <Row>
          <Search />
        </Row> */}
      </div>
      <Row style={{ display:'flex', justifyContent:'space-around', alignItems: 'center', margin:'20px 0 0 0'}}>
          <Col md={6}>
            <Search />
          </Col>
          <Col  md={6}>
            <img src={require("../assets/img/Cover.jpg" )} style={{width:'100%'}}/>
          </Col>
      </Row>
      </div>
  );
};
