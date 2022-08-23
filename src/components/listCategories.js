import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCheese,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ icon }) => {
  if (icon === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} style={{ marginRight: 6 }} />;
  if (icon === "Minuman")
    return <FontAwesomeIcon icon={faMugHot} style={{ marginRight: 4 }} />;
  if (icon === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} style={{ marginRight: 4 }} />;

  return <FontAwesomeIcon icon={faUtensils} style={{ marginRight: 4 }} />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/categories/`)
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, chosenCategory } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Daftar Kategori</strong>
          <hr />
          <ListGroup>
            {categories &&
              categories.map((kategori) => (
                <ListGroup.Item
                  className={
                    chosenCategory === kategori.nama && "category-active"
                  }
                  key={kategori.id}
                  onClick={() => changeCategory(kategori.nama)}
                  style={{ cursor: "pointer" }}
                >
                  <h6>
                    <Icon icon={kategori.nama} /> {kategori.nama}
                  </h6>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </h4>
      </Col>
    );
  }
}
