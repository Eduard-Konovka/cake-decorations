import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { getLanguage } from 'functions';
import { languageWrapper } from 'middlewares';
import { GLOBAL, LANGUAGE } from 'constants';
import defaultImage from 'assets/notFound.png';
import s from './Book.module.css';

export default function Book({ book }) {
  const languageDeterminer = obj => languageWrapper(getLanguage(), obj);

  return (
    <article>
      <img
        className={s.image}
        src={book.image && book.image !== '' ? book.image : defaultImage}
        alt={book.title}
      />

      <div className={s.thumb}>
        <h3 className={s.title}>
          {book.title.length < GLOBAL.titleLength
            ? book.title
            : book.title.slice(0, GLOBAL.titleLength) + '...'}
        </h3>

        <p className={s.shortDescription}>
          {book.description.slice(0, GLOBAL.titleLength) + '...'}
        </p>
      </div>

      <p className={s.product_type}>
        {languageDeterminer(LANGUAGE.product.product_type)}
        <span className={s.value}>{book.product_type}</span>
      </p>

      <p className={s.barcode}>
        {languageDeterminer(LANGUAGE.product.barcode)}
        <span className={s.value}>{book.barcode ?? book._id}</span>
      </p>

      <div className={s.control}>
        <p className={s.price}>
          {languageDeterminer(LANGUAGE.product.price)}
          <span className={s.value}>{book.price} ₴</span>
        </p>

        <Button title={languageDeterminer(LANGUAGE.product.buttonTitle)}>
          <Link to={`/books/:${book._id}`} className={s.btnLink}>
            {languageDeterminer(LANGUAGE.product.buttonText)}
          </Link>
        </Button>
      </div>
    </article>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    product_type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
  }).isRequired,
};
