// @see https://storybook.js.org/docs/basics/writing-stories/#loading-stories-dynamically

import { configure } from '@storybook/react';

const req = require.context('../src/', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);


// Original - for stories included in /src/stories directory

// import { configure } from '@storybook/react';
// function loadStories() {
//   require('../src/stories');
// }
// configure(loadStories, module);
