import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import Last from '../Last';


storiesOf('Last', module)
  .add('default', () => (
    <Last />
  ))
