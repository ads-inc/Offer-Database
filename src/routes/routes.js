import Base from '../Base';
import Home from '../Home';
import SignupContainer from '../components/SignupContainer';
import LoginContainer from '../components/LoginContainer';
import BottleHome from '../BottleHome';
import OfferIdsContainer from '../OfferIdsContainer';
import FileEditorContainer from '../FileEditorContainer';
import Auth from '../modules/Auth';


const routes = {
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, FileEditorContainer);
        } else {
          callback(null, Home)
        }
      }
    },
    {
      path: '/offerids',
      getComponent: (location, callback) => {
        if(Auth.isUserAuthenticated()) {
          callback(null, OfferIdsContainer);
        } else {
          callback(null, Home);
        }
      }
    },
    {
      path: '/signup',
      component: SignupContainer
    },
    {
      path: '/login',
      component: LoginContainer
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        replace('/');
      }
    },
    {
      path: '/productupload',
      getComponent: (location, callback) => {
        if(Auth.isUserAuthenticated()) {
          callback(null, BottleHome);
        } else {
          callback(null, Home);
        }
      }
    }
  ]
}

export default routes;
