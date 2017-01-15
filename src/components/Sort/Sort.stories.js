import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import Sort from '../Sort';


storiesOf('Sort', module)
  .add('default', () => (
    <Sort />
  ))
