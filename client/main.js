import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
 
import App from '../imports/ui/App.js';
 
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
