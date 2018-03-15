import React from 'react';
import PropTypes from 'prop-types';
import Tags from './Tags';

const Card = ({ name, description }) => (
  <section>
    <figure>
      {description && <figcaption>{description}</figcaption>}
    </figure>
    <footer>
      <p className={description ? null : 'no-tags'}>{name}</p>
      {description && <Tags description={description.toLowerCase()} />}
    </footer>
  </section>
);

Card.defaultProps = {
  description: ''
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default Card;
