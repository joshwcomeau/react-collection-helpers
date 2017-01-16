/* eslint-disable no-unused-vars, react/prop-types, react/prefer-stateless-function, react/no-multi-comp, max-len */
import React, { Component } from 'react';
import { expect } from 'chai';

import { DISPLAY_NAME_PREFIX } from '../constants';
import { isCollectionHelper } from './misc.helpers';


const { describe, context, it } = global;

describe('Misc helpers', () => {
  describe('isCollectionHelper', () => {
    it('returns false for a <div />', () => {
      expect(isCollectionHelper(<div />)).to.equal(false);
    });

    context('with an SFC', () => {
      it('returns false when no displayName is set', () => {
        // eslint-disable-next-line react/prop-types
        const Item = ({ children }) => <div>{children}</div>;

        const actualOutput = isCollectionHelper(<Item>Apple</Item>);
        const expectedOutput = false;

        expect(actualOutput).to.equal(expectedOutput);
      });

      it('returns false when an unrelated displayName is set', () => {
        // eslint-disable-next-line react/prop-types
        const Item = ({ children }) => <div>{children}</div>;
        Item.displayName = 'SomeOtherThing';

        const actualOutput = isCollectionHelper(<Item>Apple</Item>);
        const expectedOutput = false;

        expect(actualOutput).to.equal(expectedOutput);
      });

      it('returns true when the appropriate displayName is set', () => {
        // eslint-disable-next-line react/prop-types
        const Item = ({ children }) => <div>{children}</div>;
        Item.displayName = `${DISPLAY_NAME_PREFIX}Item`;

        const actualOutput = isCollectionHelper(<Item>Apple</Item>);
        const expectedOutput = true;

        expect(actualOutput).to.equal(expectedOutput);
      });
    });

    context('with a class component', () => {
      it('returns false when no displayName is set', () => {
        class Item extends Component {
          render() {
            return (
              <div>{this.props.children}</div>
            );
          }
        }

        const actualOutput = isCollectionHelper(<Item>Apple</Item>);
        const expectedOutput = false;

        expect(actualOutput).to.equal(expectedOutput);
      });

      it('returns false when an unrelated displayName is set', () => {
        class Item extends Component {
          render() {
            return (
              <div>{this.props.children}</div>
            );
          }
        }
        Item.displayName = 'SomeOtherThing';

        const actualOutput = isCollectionHelper(<Item>Apple</Item>);
        const expectedOutput = false;

        expect(actualOutput).to.equal(expectedOutput);
      });
    });
  });
});
