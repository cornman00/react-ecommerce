import React, { Component } from "react";
import Product from "./components/Product";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }

  //helper func for handlDetail and addToCart
  getItem = id => {
    const item = this.state.products.find(elem => elem.id === id);
    return item;
  };

  //Get the specified product when users click a product
  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = id => {
    let productCopy = [...this.state.products];
    //use index not to change the order of the products just in case
    const index = productCopy.indexOf(this.getItem(id));
    const product = productCopy[index];
    product.count = 1;
    product.total = product.price;
    product.inCart = true;
    this.setState(
      () => {
        return { products: productCopy, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  // copy storeProducts, not reference. To keep the original data in data.js
  setProducts = () => {
    let tempProduct = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProduct = [...tempProduct, singleItem];
    });
    this.setState(() => {
      return { products: tempProduct };
    });
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {
    let tempCart = [...this.state.cart];
    const productInc = tempCart.find(item => item.id === id);

    productInc.count += 1;
    productInc.total = productInc.count * productInc.price;

    this.setState(
      () => {
        return {
          cart: [...tempCart]
        };
      },
      () => this.addTotals()
    );
  };

  decrement = id => {
    let tempCart = [...this.state.cart];
    const productInc = tempCart.find(item => item.id === id);

    if (productInc.count > 1) {
      productInc.count -= 1;
      productInc.total = productInc.count * productInc.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart]
          };
        },
        () => this.addTotals()
      );
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let productRemoved = tempProducts[index];
    productRemoved.inCart = false;
    productRemoved.total = 0;
    productRemoved.count = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: []
        };
      },
      () => {
        this.setProducts(); //set original data to make products have default values. ex) cart button is enabled again
        this.addTotals();
      }
    );
  };

  //calculate total amount for products in cart
  addTotals = () => {
    let tempTotal = 0;
    this.state.cart.map(item => (tempTotal += item.total));
    const tempTax = tempTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = tempTotal + tempTax;
    this.setState(() => {
      return {
        cartSubTotal: tempTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };
  render() {
    return (
      //pass down product information and methods for products as an object using context.provider
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
