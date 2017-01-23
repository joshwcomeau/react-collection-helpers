import React from 'react';

import HorizontalRule from '../HorizontalRule';
import './Footer.scss';


const Footer = () => (
  <footer className="Footer">
    <HorizontalRule />

    © <a href="https://twitter.com/joshwcomeau">Josh Comeau</a>, 2017 and beyond. All rights, wrongs, and grey areas reserved.
  </footer>
);

export default Footer;
