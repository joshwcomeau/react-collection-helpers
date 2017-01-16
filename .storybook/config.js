import { configure } from '@kadira/storybook';

const components = require.context('../src/components', true, /.stories.js$/);

function loadStories() {
  components.keys().forEach(filename => components(filename));
}

configure(loadStories, module);
