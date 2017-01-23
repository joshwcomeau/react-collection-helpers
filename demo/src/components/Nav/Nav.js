import React from 'react';

import twitterSvg from '../../assets/twitter.svg';
import githubSvg from '../../assets/github.svg';
import './Nav.scss';


const Nav = () => (
  <div className="Nav">
    <a href="https://twitter.com/JoshWComeau">
      <img alt="twitter-icon" src={twitterSvg} />
    </a>
    <a href="https://github.com/joshwcomeau/react-collection-helpers">
      <img alt="github-icon" src={githubSvg} />
    </a>
  </div>
);

export default Nav;
