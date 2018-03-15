import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ description }) => {
  const technologies = ['react', 'react-router', 'redux', 'node', 'jquery', 'chart.js', 'mongo', 'mongoose', 
    'postgres', 'mocha', 'chai', 'jest', 'express','bulma', 'sass', 'handlebars', 'heroku'];

  return (
    <div className="tags">
      {technologies.map(tech => 
        description.includes(tech) && 
          <span key={tech} className={`tag ${tech}`}>
            {tech}
          </span>
      )}
    </div>
  );
};

Tags.propTypes = {
  description: PropTypes.string.isRequired
};

export default Tags;
