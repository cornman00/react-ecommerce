import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import Modal from "./Modal";
export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart
          } = value.detailProduct;
          return (
            <div className="container py-5">
              {/*title*/}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-black my-5">
                  <h1>{title}</h1>
                </div>
              </div>

              {/*image and info*/}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} alt="product" className="img-fluid" />
                </div>

                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>model: {title}</h2>
                  <h4 className="text-title text-uppercase text-muted mt-4 mb-5">
                    Company : <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>price: ${price}</strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    <p className="text-muted lead">{info}</p>
                  </p>
                  {/*Buttons*/}
                  <div>
                    <Link to="/">
                      <ButtonContainer>To Homepage</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart // Pass this prop to make the 'Add to cart' button color different
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "inCart" : "Add To Cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
