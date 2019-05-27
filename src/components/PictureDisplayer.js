
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import * as Actions from '../reducer/Actions.js';

import styles from '../css/ControlPanel.css';
import DragManager from '../manager/DragManager';
import ShetchManager from '../manager/ShetchManager';
import store from '../reducer/Store.js';

export default class PictureDisplayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenHeight: 768,
            screenWidth: 1024
        };
        this.tool = null;
        this.interval = null;
    }
    calculatePosition(state, deltaX, deltaY) {
        let translateX = state.translateX;
        let translateY = state.translateY;
        const screenHeight = state.screenHeight, screenWidth = state.screenWidth, 
        scaleInt = state.scaleInt;
        if(scaleInt > 1){
             translateX = translateX + deltaX ;
             translateY = translateY + deltaY;
             const maxTop = (scaleInt - 1)*screenHeight/2;
            if(translateY > maxTop){
                translateY = maxTop;
            } else if (translateY< -1*maxTop){
                translateY = -1*maxTop;
            }
            if(state.actualWidth*scaleInt > screenWidth){
                const maxLeft = (state.actualWidth*scaleInt - screenWidth)/scaleInt;
                if(translateX > maxLeft){
                    translateX = maxLeft;
                }else if(translateX < -1*maxLeft){
                    translateX = -1*maxLeft;
                }
            } else {
                translateX = 0;
            }
        }
        return {
            translateX: translateX ,
            translateY: translateY,
            scaleInt: state.scaleInt,
            selectedImage: state.selectedImage,
            actualImageWidth: state.actualImageWidth,
            actualImageHeight: state.actualImageHeight
        };
    }

    onComponentDragMove(param) {
        this.setState(this.calculatePosition(this.state, param.deltaX, param.deltaY));
    }

    onDrawing(){
        return this.state;
    }

    mapStateToProps() {
        var storeState = store.getState();
        var imageInfo = storeState.selectedImage;
        if (imageInfo == null) {
            return;
        }
        let actualWidth = this.state.screenHeight/imageInfo.height * imageInfo.width;
        this.setState({
            color: storeState.color,
            is_drawing: storeState.is_drawing,
            translateX: this.state.translateX ? this.state.translateX : 0,
            translateY: this.state.translateY ? this.state.translateY : 0,
            scaleInt: storeState.scaleInt,
            selectedImage: imageInfo,
            actualImageHeight: imageInfo.height,
            actualImageWidth: imageInfo.width,
            actualWidth: actualWidth
        });
    }
    componentDidMount() {
        store.subscribe(this.mapStateToProps.bind(this));
        DragManager.register(this.refs["container"], this.onComponentDragMove.bind(this), this.onDrawing.bind(this));
        ShetchManager.register(this.refs["canvas"], this.onDrawing.bind(this));
    }

    componentWillUnmount() {
        store.unsubscribe(this.mapStateToProps.bind(this));
    }

    render(){
        const height = this.state.screenHeight; 
        const selectedImage = this.state.selectedImage;
        let actualWidth= this.state.actualWidth; 
        let picStyle = {backgroundImage: this.state.selectedImage && this.state.selectedImage.path,
            transform: `translate(${this.state.translateX}px, ${this.state.translateY}px) scale(${this.state.scaleInt})`,
            width: `${actualWidth}px`
        };
        return (
            <div ref="container" className={styles.magnifierBackground} style={picStyle} >
                <canvas ref="canvas" width={actualWidth} height={height}/>
            </div>
        );
    }
}
