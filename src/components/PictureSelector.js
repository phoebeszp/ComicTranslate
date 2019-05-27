
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import * as Actions from '../reducer/Actions.js';
import ImageLoader from '../manager/ImageLoader';

var imageResource, INITIAL_SELECTED_VALUE = "0";

function PictureSelector({onSelectChange, onScale, onSelectColor, onShetch}) {
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
            <input type='Button' value='Draw' onClick={onShetch}/>
        </div>
    );
}

PictureSelector.propTypes = {
    onSelectChange: PropTypes.func.isRequired,
    onScale: PropTypes.func.isRequired,
    onSelectColor: PropTypes.func.isRequired,
    onShetch: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch, ownProps) {

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