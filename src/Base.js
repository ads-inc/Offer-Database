import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
// import UrlList from './UrlList';
// import style from './style';
import Auth from './modules/Auth';

const Base = ({ children }) => (
  <div>
    <div className='top-bar'>
      <div className='top-bar-left'>
        <IndexLink to='/'>Offer Database</IndexLink>
      </div>
      {Auth.isUserAuthenticated() ? (
        <div className='top-bar-right'>
          <Link to='/logout'>Log out</Link>
        </div>
      ) : (
      <div className='top-bar-right'>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign Up</Link>
      </div>
    )}
    </div>
    {children}
  </div>
)

Base.propTypes = {
  children: PropTypes.object.isRequired
}

export default Base
