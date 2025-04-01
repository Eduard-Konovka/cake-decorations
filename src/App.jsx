import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner';
import { sendСart } from 'api';
import {
  useGlobalState,
  useChangeGlobalState,
  updateMainHeight,
  updateCart,
} from 'state';
import { Container, AppBar, Footer, PublicRoute } from 'components';
import { getLanguage } from 'functions';
import { languageWrapper } from 'middlewares';
import { GLOBAL, LANGUAGE } from 'constants';
import 'App.css';

const CategoriesView = lazy(() =>
  import('pages/CategoriesView' /* webpackChunkName: "CategoriesView" */),
);
const ProductsView = lazy(() =>
  import('pages/ProductsView' /* webpackChunkName: "ProductsView" */),
);
const SpecificProductView = lazy(() =>
  import(
    'pages/SpecificProductView' /* webpackChunkName: "SpecificProductView" */
  ),
);
const ContactsView = lazy(() =>
  import('pages/ContactsView' /* webpackChunkName: "ContactsView" */),
);
const DeliveryView = lazy(() =>
  import('pages/DeliveryView' /* webpackChunkName: "DeliveryView" */),
);
const CartView = lazy(() =>
  import('pages/CartView' /* webpackChunkName: "CartView" */),
);
const OrderingView = lazy(() =>
  import('pages/OrderingView' /* webpackChunkName: "OrderingView" */),
);
const SignInView = lazy(() =>
  import('pages/SignInView' /* webpackChunkName: "SignInView" */),
);
const SignUpView = lazy(() =>
  import('pages/SignUpView' /* webpackChunkName: "SignUpView" */),
);
const NotFoundView = lazy(() =>
  import('pages/NotFoundView' /* webpackChunkName: "NotFoundView" */),
);

export default function App() {
  const { cart } = useGlobalState('global');
  const { user } = useGlobalState('auth');

  const changeGlobalState = useChangeGlobalState();

  const [productsByCategoryOrTag, setProductsByCategoryOrTag] = useState([]);
  const [sending, setSending] = useState(false);

  const languageDeterminer = obj => languageWrapper(getLanguage(), obj);

  useEffect(() => {
    requestAnimationFrame(() => {
      const appHeight = window.innerHeight;

      const container = document.getElementById('container');
      const header = document.getElementById('header');
      const footer = document.getElementById('footer');

      if (!container || !header || !footer) return;

      // Зчитуємо стилі перед оновленням стану
      const containerStyle = window.getComputedStyle(container);
      const containerPaddings =
        Number.parseInt(containerStyle.getPropertyValue('padding')) * 2;

      const headerStyle = window.getComputedStyle(header);
      const headerHeight =
        Number.parseInt(headerStyle.getPropertyValue('height')) +
        Number.parseInt(headerStyle.getPropertyValue('margin-bottom'));

      const footerStyle = window.getComputedStyle(footer);
      const footerHeight =
        Number.parseInt(footerStyle.getPropertyValue('margin-top')) +
        Number.parseInt(footerStyle.getPropertyValue('height'));

      // Container, header and footer subtracted from viewport height
      const computedHeight =
        appHeight - (containerPaddings + headerHeight + footerHeight);

      changeGlobalState(updateMainHeight, computedHeight);
    });
  }, [changeGlobalState]);

  function changeCount(obj) {
    const setCount = item => {
      item.count = Number(obj.count);
      return item;
    };

    changeGlobalState(
      updateCart,
      cart.map(product =>
        product._id === obj._id ? setCount(product) : product,
      ),
    );
  }

  function addToCart(productToBeAdded) {
    const productDuplication = cart.filter(
      obj => obj._id === productToBeAdded._id,
    );

    if (productDuplication.length > 0) {
      toast.error(languageDeterminer(LANGUAGE.addingToCard.productDuplication));
      return;
    }

    toast.success(languageDeterminer(LANGUAGE.addingToCard.productAdded));
    changeGlobalState(updateCart, [...cart, productToBeAdded]);
  }

  function removeFromCart(_id) {
    const newCart = cart.filter(obj => obj._id !== _id);
    changeGlobalState(updateCart, newCart);
  }

  function submitCart(totalCost, customer) {
    setSending(true);

    setTimeout(() => {
      sendСart({
        customer: customer || user,
        cart: cart.map(obj => ({ _id: obj._id, quantity: obj.count })),
        totalCost,
        type: 'new',
      }).finally(() => {
        changeGlobalState(updateCart, []);
        setSending(false);
      });
    }, GLOBAL.sending);
  }

  return (
    <Container>
      <AppBar setDefaultsProducts={() => setProductsByCategoryOrTag([])} />

      <Suspense
        fallback={
          <Puff
            height="200"
            width="200"
            radius={1}
            color="#FF00BF"
            ariaLabel="puff-loading"
            wrapperStyle={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            wrapperClass=""
            visible={true}
          />
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/categories" />} />

          <Route
            path="/signin"
            element={
              <PublicRoute restricted>
                <SignInView />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute restricted>
                <SignUpView />
              </PublicRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <PublicRoute>
                <CategoriesView
                  setProductsByCategory={setProductsByCategoryOrTag}
                />
              </PublicRoute>
            }
          />

          <Route
            path="/products"
            element={
              <PublicRoute>
                <ProductsView
                  productsByCategoryOrTag={productsByCategoryOrTag}
                  addToCart={addToCart}
                />
              </PublicRoute>
            }
          />

          <Route
            path="/products/:id"
            element={
              <PublicRoute>
                <SpecificProductView
                  setProductsByTag={setProductsByCategoryOrTag}
                  changeSelectCount={changeCount}
                  addToCart={addToCart}
                />
              </PublicRoute>
            }
          />

          <Route
            path="/contacts"
            element={
              <PublicRoute>
                <ContactsView />
              </PublicRoute>
            }
          />

          <Route
            path="/delivery"
            element={
              <PublicRoute>
                <DeliveryView />
              </PublicRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <PublicRoute>
                <CartView
                  sending={sending}
                  changeSelectCount={changeCount}
                  onDeleteProduct={removeFromCart}
                  onSubmit={submitCart}
                />
              </PublicRoute>
            }
          />

          <Route
            path="/ordering"
            element={
              <PublicRoute>
                <OrderingView sending={sending} onSubmit={submitCart} />
              </PublicRoute>
            }
          />

          <Route
            path="*"
            element={
              <PublicRoute>
                <NotFoundView
                  message={languageDeterminer(LANGUAGE.notFoundView.pageTitle)}
                />
              </PublicRoute>
            }
          />
        </Routes>
      </Suspense>

      <Footer />

      <ToastContainer />
    </Container>
  );
}
