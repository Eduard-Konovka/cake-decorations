import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner';
import sendСart from 'api/ordersApi';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import 'api/baseUrl';
import 'App.css';

const BooksView = lazy(() =>
  import('pages/BooksView' /* webpackChunkName: "BooksView" */),
);
const SpecificBookView = lazy(() =>
  import('pages/SpecificBookView' /* webpackChunkName: "SpecificBookView" */),
);
const CartView = lazy(() =>
  import('pages/CartView' /* webpackChunkName: "CartView" */),
);
const SignInView = lazy(() =>
  import('pages/SignInView' /* webpackChunkName: "SignInView" */),
);
const NotFoundView = lazy(() =>
  import('pages/NotFoundView' /* webpackChunkName: "NotFoundView" */),
);

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setTotalPrice(cart.reduce((acc, obj) => acc + obj.cost, 0));
  }, [cart]);

  const hendleUser = obj => {
    setUser({ ...user, ...obj });
  };

  const addToCart = bookData => {
    const productDuplication = cart.filter(obj => obj._id === bookData.id);

    if (productDuplication.length > 0) {
      toast.error('This item is already in the cart!');
      return;
    }

    setCart([...cart, bookData]);
  };

  const removeFromCart = _id => {
    const newCart = cart.filter(obj => obj._id !== _id);
    setCart(newCart);
  };

  const changeQwantity = obj => {
    const setQwantity = item => {
      item.qwantity = Number(obj.qwantity);
      item.cost = obj.cost;
      return item;
    };

    setCart(
      cart.map(product =>
        product._id === obj._id ? setQwantity(product) : product,
      ),
    );
  };

  const submitCart = () => {
    if (!user.name) {
      toast.error('Fill in the client data in the field "Name"!');
      return;
    }

    if (!user.email) {
      toast.error('Fill in the client data in the field "Email"!');
      return;
    }

    if (!user.phone) {
      toast.error('Fill in the client data in the field "Phone"!');
      return;
    }

    if (!user.address) {
      toast.error('Fill in the client data in the field "Address"!');
      return;
    }

    setCart([]);
    setUser({});
    setSending(true);
    sendСart({ user, cart, totalPrice }).finally(
      setTimeout(() => {
        setSending(false);
      }, 5000),
    );
  };

  return (
    <Container>
      <AppBar user={user} onSignOut={() => setUser({})} />

      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '25vh',
            }}
          >
            <Puff
              height="200"
              width="200"
              radius={1}
              color="#00BFFF"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        }
      >
        <Routes>
          <Route
            path=""
            element={<BooksView onClick={id => setSelectedBook(id)} />}
          />
          <Route
            path="/books/:id"
            element={
              <SpecificBookView bookId={selectedBook} addToCart={addToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <CartView
                user={user}
                setUser={hendleUser}
                sending={sending}
                cart={cart}
                totalPrice={totalPrice}
                onSelectQwantity={changeQwantity}
                onDeleteProduct={removeFromCart}
                onSubmit={submitCart}
              />
            }
          />
          <Route path="/signin" element={<SignInView onClick={null} />} />
          <Route
            path="*"
            element={<NotFoundView message="Page not found :(" />}
          />
        </Routes>
      </Suspense>

      <ToastContainer />
    </Container>
  );
}
