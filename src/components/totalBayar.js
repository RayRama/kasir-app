import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithDots } from "../utils/utils";
import { API_URL } from "../utils/constants";
import swal from "sweetalert";
import { Navigate } from "react-router-dom";

export default class TotalBayar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
    };
  }
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.carts,
    };

    if (this.props.carts.length !== 0) {
      swal({
        title: "Apakah anda yakin?",
        text: "Anda akan melakukan pembayaran",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      }).then((confirmPesanan) => {
        if (confirmPesanan) {
          axios.post(`${API_URL}/pesanans`, pesanan).then((res) => {
            swal({
              title: "Pesanan Berhasil!",
              text: "",
              icon: "success",
              button: "OK",
            }).then((ok) => {
              if (ok) {
                this.setState({ done: true });
              }
            });
          });
        }
      });
    } else {
      swal("Pesanan Kosong!", "Silahkan tambah pesanan", "warning", {
        timer: 2000,
      });
    }
  };

  render() {
    const { done } = this.state;
    const totalBayar = this.props.carts.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);

    return (
      <div
        className={window.innerWidth >= 760 ? "fixed-bottom" : null}
        style={{ backgroundColor: window.innerWidth >= 760 ? null : "white" }}
      >
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h6>
              Total Harga:{" "}
              <strong className="float-end">
                Rp. {numberWithDots(totalBayar)}
              </strong>
            </h6>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                className="mb-2 mt-2"
                size="md"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <strong>BAYAR</strong>
              </Button>
              {done && <Navigate to="/success" replace={true} />}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
