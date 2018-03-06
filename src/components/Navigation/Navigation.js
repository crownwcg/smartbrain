import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    return (
        isSignedIn ?
        <nav className="dt w-100 border-box pa3 ph5-ns">
          <div className="dtc v-mid w-75 tr">
            <p onClick={() => onRouteChange('signout')} className="link dim dark-gray f6 f5-ns dib white pa3">Sign Out</p>
          </div>
        </nav> :
        <nav className="dt w-100 border-box pa3 ph5-ns">
          <div className="dtc v-mid w-75 tr">
            <p onClick={() => onRouteChange('signin')} className="link dim dark-gray f6 f5-ns dib white pa3">Sign In</p>
            <p onClick={() => onRouteChange('register')} className="link dim dark-gray f6 f5-ns dib white pa3">Register</p>
          </div>
        </nav>
    );
}

export default Navigation;