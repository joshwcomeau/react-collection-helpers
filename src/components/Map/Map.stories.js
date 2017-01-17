import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Map from '../Map';


storiesOf('Map', module)
  .add('Mapping a few items', () => (
    <Map
      collection={[
        { id: 'a', name: 'apple' },
        { id: 'b', name: 'banana' },
        { id: 'c', name: 'carrot' },
      ]}
    >
      {item => <div>{item.name}</div>}
    </Map>
  ));
