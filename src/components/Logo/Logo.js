import React, {Component} from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import crown from './crown.png'

class Logo extends Component {
    render() {
        return (
            <div className='ma4 mt0'>
                <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 50, width: 50 }} >
                    <div className="Tilt-inner"><img style={{paddingTop: '5px'}} alt='logo' src={crown}/></div>
                </Tilt>
            </div>
            );
    }
}

export default Logo;