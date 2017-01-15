/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
/* eslint-enable */

import Filter from '../Filter';
import { MockContext } from '../../helpers/test.helpers';

const { describe, it } = global;

describe('Filter', () => {
  it('renders without incident', () => {
    const wrapper = shallow(<Filter />);

    expect(wrapper).to.be.ok;
  });
});
