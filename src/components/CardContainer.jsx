import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardContainer = ({ repos }) => (
  <main>
    {repos.map(repo =>  
      <Card key={repo.name} {...repo} />
    )}
  </main>
);

CardContainer.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired
};

export default CardContainer;
