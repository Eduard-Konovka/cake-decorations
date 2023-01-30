import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import fetchBooks from 'api/booksApi';
import Spinner from 'components/Spinner';
import Blank from 'components/Blank';
import IconButton from 'components/IconButton';
import Button from 'components/Button';
import OptionList from 'components/OptionList';
import BookList from 'components/BookList';
import { ReactComponent as SearchIcon } from './search.svg';
import imageBlank from 'images/shop.jpg';
import s from './BooksView.module.css';

export default function BooksView({ onClick }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchByName, setSearchByName] = useState('');
  const [optionList, setOptionList] = useState(true);
  const [visibleBooks, setVisibleBooks] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetchBooks()
      .then(books => {
        setBooks(books);
        setVisibleBooks(books);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setOptionList(true);
  }, [optionList]);

  function handleNameChange(event) {
    if (event.target.value) {
      setSearchByName(event.target.value);
    } else {
      setSearchByName('');
    }
  }

  function handleNameClick() {
    const visibleBooksToLowerCase = visibleBooks.map(book => ({
      ...book,
      title: book.title.toLowerCase(),
    }));

    const targetBooksToLowerCase = visibleBooksToLowerCase.filter(book =>
      book.title.includes(searchByName.toLowerCase()),
    );

    const bookIds = targetBooksToLowerCase.map(
      bookToLowerCase => bookToLowerCase._id,
    );

    const targetBooks = visibleBooks.filter(book => bookIds.includes(book._id));

    if (targetBooks.length > 0) {
      setVisibleBooks(targetBooks);
    } else {
      toast.error('Please enter the correct book title!');
      // setVisibleBooks(visibleBooks);
    }
  }

  function handlePriceChange(event) {
    if (event.target.value === 'All prices') {
      setVisibleBooks(visibleBooks);
    } else {
      const targetBooks = visibleBooks.filter(
        book => book.price === Number(event.target.value),
      );
      setVisibleBooks(targetBooks);
    }
  }

  function Reset() {
    setSearchByName('');
    setVisibleBooks(books);
    setOptionList(false);
  }

  return (
    <main className={s.bookpage}>
      {error && <p>Whoops, something went wrong: {error.message}</p>}

      {loading && <Spinner size={70} color="blue" />}

      {!loading && books.length === 0 && (
        <Blank
          title="There are currently no books for sale in the store"
          image={imageBlank}
          alt="Open shop"
        />
      )}

      {books.length > 0 && (
        <>
          <section className={s.formBar}>
            <form className={s.formByName}>
              <input
                className={s.inputByName}
                name="searchByName"
                type="text"
                placeholder="Search by book name"
                value={searchByName}
                onChange={handleNameChange}
              />

              <IconButton
                type="button"
                title="Search by book name"
                aria-label="Search by book name"
                onClick={handleNameClick}
              >
                <SearchIcon width="24" height="24" />
              </IconButton>
            </form>

            <div className={s.reset}>
              <Button type="button" title="Reset filters" onClick={Reset}>
                Reset filters
              </Button>
            </div>

            <form>
              <select className={s.inputByPrice} onChange={handlePriceChange}>
                {optionList && <OptionList books={books} />}
              </select>
            </form>
          </section>

          <BookList books={visibleBooks} onClick={onClick} />
        </>
      )}
    </main>
  );
}

BooksView.propTypes = {
  onClick: PropTypes.func.isRequired,
};
