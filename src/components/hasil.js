import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Badge, Button, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithDots } from "../utils/utils";
import ModalKeranjang from "./modalKeranjang";
import TotalBayar from "./totalBayar";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({ showModal: true, keranjangDetail: menuKeranjang });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { carts } = this.props;
    return (
      <Col md={3} mt="2" mb="4">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {carts.length !== 0 ? (
          <ListGroup
            variant="flush"
            style={{
              overflowY: "scroll",
              height: window.innerWidth >= 760 ? "450px" : "330px",
            }}
          >
            {carts.map((menuKeranjang) => (
              <ListGroup.Item key={menuKeranjang.id}>
                <Row>
                  <Col xs={2}>
                    <h5>
                      <Badge pill bg="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h5>
                  </Col>
                  <Col>
                    <strong>{menuKeranjang.product.nama}</strong>
                    <p>Rp. {numberWithDots(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col xs="4">
                    <strong>
                      Rp. {numberWithDots(menuKeranjang.total_harga)}
                    </strong>

                    {/* <Row> */}
                    <Button
                      className="float-end"
                      size="sm"
                      onClick={() => this.handleShow()}
                      style={{
                        width: window.innerWidth >= 760 ? "70px" : "auto",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPencil}
                        style={{ marginRight: 10 }}
                      />
                      Edit
                    </Button>
                    {/* </Row> */}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalKeranjang handleClose={this.handleClose} {...this.state} />
          </ListGroup>
        ) : (
          <h6>Belum ada pesanan</h6>
        )}
        <TotalBayar carts={carts} {...this.props} />
      </Col>
    );
  }
}
