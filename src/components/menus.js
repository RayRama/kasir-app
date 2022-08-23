import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { numberWithDots } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Menus = ({ menu, addToCart, toggleToShowDescription }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow">
        <Card.Img
          variant="top"
          src={`assets/images/${menu.category.nama.toLowerCase()}/${
            menu.gambar
          }`}
        />
        <Card.Body>
          <Card.Title>
            {menu.nama} <strong>({menu.kode})</strong>
          </Card.Title>
          <Card.Text>Rp. {numberWithDots(menu.harga)}</Card.Text>
          <Button variant="primary" onClick={() => addToCart(menu)}>
            Tambah
          </Button>
        </Card.Body>
        <Card.Footer
          className="mt-2"
          onClick={() => toggleToShowDescription(menu)}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faCircleInfo} style={{ marginRight: 2 }} />{" "}
          Klik Untuk Detail
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Menus;
