import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import Find from '../Find';


storiesOf('Find', module)
  .add('default', () => (
    <Find />
  ))
