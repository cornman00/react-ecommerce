import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";

export default class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="Welcome To iShoes" />
            <br />
            <Title title="Our Product" />
            <div className="row">
              <ProductConsumer>
                {/* value = object that the provider passes*/}
                {value => {
                  return value.products.map(elem => {
                    return <Product key={elem.id} elem={elem} />;
                    {
                      /* return each shoes data in product component form*/
                    }
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
