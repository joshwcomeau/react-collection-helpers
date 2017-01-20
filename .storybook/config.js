import { configure } from '@kadira/storybook';

const components = require.context('../src/components', true, /.stories.js$/);

function loadStories() {
  components.keys().forEach(filename => components(filename));

  // Also learn our performance checks, which run in Storybook.
  require('../tools/performance-checks');
}

configure(loadStories, module);
