import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory, Router } from 'react-router';
import routes from './routes/routes';
// import BottleHome from './BottleHome';



// url='http://localhost:8081/api/bottles'

// ReactDOM.render(
//   <Router history={browserHistory} routes={routes} />,
//   document.getElementById('root')
// );

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

injectTapEventPlugin();

// ReactDOM.render(
//   <BottleHome />,
//   document.getElementById('root')
// );


ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme()} >
      <Router history={ browserHistory } routes={ routes }/>
  </MuiThemeProvider>),
  document.getElementById('root')
);
