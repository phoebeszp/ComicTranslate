import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as Actions from '../reducer/Actions.js';
import ImageLoader from '../manager/ImageLoader';
import { Button } from 'react-bootstrap';

var imageResource, INITIAL_SELECTED_VALUE = "0";

export class PictureSelector extends React.Component{
    static propTypes = {
        onSelectChange: PropTypes.func.isRequired,
        onScale: PropTypes.func.isRequired,
        onSelectColor: PropTypes.func.isRequired,
        onShetch: PropTypes.func.isRequired
    };
    render(){
        const {onSelectChange, onScale, onSelectColor, onShetch} = this.props;
        return (
            <div>Switch Picture:
                <select defaultValue={INITIAL_SELECTED_VALUE} onChange={onSelectChange}>
                    <option value="0">A</option>
                    <option value="1">E</option>
                    <option value="2">F</option>
                </select>
                <input type='Button' value='+' onClick={onScale}/>
                <label htmlFor="">color: </label>
                <input type="color"  onChange={onSelectColor} />
                <Button variant="primary" onClick={onShetch}>Draw</Button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {

    ImageLoader.init((param)=>{
        imageResource = param;
        dispatch(Actions.changeImage({pic:imageResource[INITIAL_SELECTED_VALUE]}));
    });

    return {
        onSelectChange: (e) => {
            dispatch(Actions.changeImage({pic:imageResource[e.target.value]}));
        },
        onScale: () =>{
            dispatch(Actions.onScale());
        },
        onSelectColor: (e) => {
            dispatch(Actions.selectColor({color: e.target.value}));
        },
        onShetch: () =>{
            dispatch(Actions.isDrawing());
        }
    };
}


export default connect(null, mapDispatchToProps)(PictureSelector);