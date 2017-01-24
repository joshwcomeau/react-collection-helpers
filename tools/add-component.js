/* eslint-disable no-console, no-use-before-define */
const path = require('path');
const fs = require('fs');
const changeCase = require('change-case');


function run(ComponentName) {
  if (!ComponentName) {
    throw new Error(`
      Please supply a component name!
      'npm run add-component -- YourComponentName'
    `);
  } else if (!changeCase.isUpperCase(ComponentName[0])) {
    throw new Error(`
      Custom React components need to be in PascalCase.
      You provided ${ComponentName}.

      Please capitalize the first letter:
      "${changeCase.upperCaseFirst(ComponentName)}"
    `);
  }

  const componentDirectory = path.join(
    __dirname,
    '../src/components',
    ComponentName
  );
  createDirectory(componentDirectory);

  const className = changeCase.camelCase(ComponentName);

  // Create our index file, for nice imports
  const indexPath = path.join(componentDirectory, 'index.js');
  const indexTemplate = `export { default } from './${ComponentName}';\n`;
  fs.writeFileSync(indexPath, indexTemplate);

  // Create and write JS to file
  const componentPath = path.join(componentDirectory, `${ComponentName}.js`);
  const componentTemplate = buildJSTemplate(ComponentName, className);
  fs.writeFileSync(componentPath, componentTemplate);

  // Create and write stories to file
  const storiesPath = path.join(componentDirectory, `${ComponentName}.stories.js`);
  const storiesTemplate = buildStoriesTemplate(ComponentName);
  fs.writeFileSync(storiesPath, storiesTemplate);

  // Create and write a test to file
  const testPath = path.join(
    componentDirectory,
    `${ComponentName}.test.js`
  );
  const testTemplate = buildTestTemplate(ComponentName);
  fs.writeFileSync(testPath, testTemplate);

  console.info(`Component ${ComponentName} successfully created!`);
  return true;
}


// Helper Methods
function createDirectory(componentDirectory) {
  try {
    fs.mkdirSync(componentDirectory);
  } catch (err) {
    throw new Error(err);
  }

  return componentDirectory;
}

function buildJSTemplate(ComponentName) {
  // Not digging the break in indentation here,
  // but it's needed for the file to render correctly :(
  return `\
import React, { Component, PropTypes } from 'react';


const ${ComponentName} = () => {
  return (
    <div>Your Component Here!</div>
  );
};

${ComponentName}.propTypes = {

};

${ComponentName}.defaultProps = {

};

export default ${ComponentName};\n`;
}

function buildStoriesTemplate(ComponentName) {
  return `\
import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import ${ComponentName} from '../${ComponentName}';


storiesOf('${ComponentName}', module)
  .add('default', () => (
    <${ComponentName} />
  ))\n`;
}

function buildTestTemplate(ComponentName) {
  return `\
/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import ${ComponentName} from '../${ComponentName}';

const { describe, context, it } = global;

describe('${ComponentName}', () => {
  it('renders without incident', () => {
    const wrapper = shallow(<${ComponentName} />);

    expect(wrapper).to.be.ok;
  });
});\n`;
}

const ComponentName = process.argv[2];
run(ComponentName);
