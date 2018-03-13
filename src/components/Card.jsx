import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ name, description }) => (
  <section>
    <figure>
      {description && <figcaption>{description}</figcaption>}
    </figure>
    <footer>
      <p>{name}</p>
      {/* tags go here */}
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
