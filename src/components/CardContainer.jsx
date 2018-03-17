import React from 'react';
import Card from './Card';

const CardContainer = ({ repos }) => {
  return (
    <main>
      {repos.map(repo =>  
        <Card key={repo.name} {...repo} />
      )}
    </main>
  );
};

export default CardContainer;
