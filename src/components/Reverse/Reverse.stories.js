import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import Reverse from '../Reverse';


storiesOf('Reverse', module)
  .add('Reverses a supplied collection', () => (
    <Reverse
      collection={[
        { id: 'a', name: 'apple' },
        { id: 'b', name: 'banana' },
        { id: 'c', name: 'carrot' },
      ]}
    >
      {item => <div>{item.name}</div>}
    </Reverse>
  ));
