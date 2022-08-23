import React, { Component } from "react";
import { Col, Container, Row, ToastContainer, Toast } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import "../App.css";
import axios from "axios";
import { API_URL } from "../utils/constants";
import swal from "sweetalert";
import logo from "../logo.svg";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      chosenCategory: "Makanan",
      carts: [],
      showDescription: false,
      namaProduk: "",
      deskripsiProduk: "",
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/products?category.nama=${this.state.chosenCategory}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${API_URL}/keranjangs`)
      .then((res) => {
        const carts = res.data;
        this.setState({ carts });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate = (prevState) => {
    if (this.state.carts !== prevState.carts) {
      axios
        .get(`${API_URL}/keranjangs`)
        .then((res) => {
          const carts = res.data;
          this.setState({ carts });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  changeCategory = (value) => {
    this.setState({ chosenCategory: value, menus: [] });
    axios
      .get(`${API_URL}/products?category.nama=${value}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addToCart = (value) => {
    axios
      .get(`${API_URL}/keranjangs?product.id=${value.id}`)
      .then((res) => {
        if (res.data.length === 0) {
          const cart = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(`${API_URL}/keranjangs`, cart)
            .then((res) => {
              swal({
                title: "Berhasil!",
                text: cart.product.nama + " berhasil ditambahkan ke keranjang",
                icon: "success",
                timer: 2000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const cart = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(`${API_URL}/keranjangs/${res.data[0].id}`, cart)
            .then((res) => {
              swal({
                title: "Berhasil!",
                text: cart.product.nama + " berhasil ditambahkan ke keranjang",
                icon: "success",
                timer: 2000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleToShowDescription = (value) => {
    axios
      .get(`${API_URL}/products?id=${value.id}`)
      .then((res) => {
        console.log(res.data[0]);
        const toasted = {
          namaProduk: res.data[0].nama,
          deskripsiProduk: res.data[0].deskripsi,
        };
        this.setState({
          namaProduk: toasted.namaProduk,
          deskripsiProduk: toasted.deskripsiProduk,
          showDescription: !this.state.showDescription,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // this.setState({ showDescription: !this.state.showDescription });
    // console.log(this.state.menus);
  };

  render() {
    // console.log(this.state.menus);
    const { menus, chosenCategory, carts, showDescription } = this.state;
    return (
      <div className="mt-2">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              chosenCategory={chosenCategory}
            />
            <Col>
              <h4>
                <strong>Daftar Menu</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      addToCart={this.addToCart}
                      toggleToShowDescription={this.toggleToShowDescription}
                    />
                  ))}
                <ToastContainer
                  className="p-3"
                  containerPosition="fixed"
                  position="bottom-center"
                >
                  <Toast
                    onClose={() => this.setState({ showDescription: false })}
                    show={showDescription}
                    delay={3500}
                    autohide
                  >
                    <Toast.Header closeButton={false}>
                      <img src={logo} width={20} alt="" />
                      <strong className="me-auto">
                        {this.state.namaProduk}
                      </strong>
                    </Toast.Header>
                    <Toast.Body style={{ backgroundColor: "#fff" }}>
                      {this.state.deskripsiProduk}
                    </Toast.Body>
                  </Toast>
                </ToastContainer>
              </Row>
            </Col>
            <Hasil carts={carts} {...this.props} />
          </Row>
        </Container>
      </div>
    );
  }
}
