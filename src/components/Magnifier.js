import React from 'react';
import DragManager from '../manager/DragManager';
import styles from '../css/Magnifier.css';
import store from '../reducer/Store.js';

var MAGNIFIER_RADIUS = 190 / 2;

export default class Magnifier extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    calculatePosition(state, deltaX, deltaY) {

        var containerPosition = state.containerPosition;
        var maxHeight = state.actualImageHeight - MAGNIFIER_RADIUS * 2;
        var maxWidth = state.actualImageWidth - MAGNIFIER_RADIUS * 2;

        var originY = parseFloat(containerPosition.top);
        var originX = parseFloat(containerPosition.left);

        var actualY = (MAGNIFIER_RADIUS + originY) * state.verticalRatio - MAGNIFIER_RADIUS;
        var actualX = (MAGNIFIER_RADIUS + originX) * state.horizontalRatio - MAGNIFIER_RADIUS;

        if (actualY < -0.00001) {
            actualY = 0;
            originY = (actualY + MAGNIFIER_RADIUS) / state.verticalRatio - MAGNIFIER_RADIUS;
            deltaY = 0;
        } else if (actualY > maxHeight) {
            actualY = maxHeight;
            originY = (actualY + MAGNIFIER_RADIUS) / state.verticalRatio - MAGNIFIER_RADIUS;
            deltaY = 0;
        }

        if (actualX < -0.00001) {
            actualX = 0;
            originX = (actualX + MAGNIFIER_RADIUS) / state.horizontalRatio - MAGNIFIER_RADIUS;
            deltaX = 0;
        } else if (actualX > maxWidth) {
            actualX = maxWidth;
            originX = (actualX + MAGNIFIER_RADIUS) / state.horizontalRatio - MAGNIFIER_RADIUS;
            deltaX = 0;
        }

        return {
            containerPosition: {
                top: originY + (deltaY || 0) + 'px',
                left: originX + (deltaX || 0) + 'px'
            },
            imagePosition: {
                backgroundPosition: -actualX + 'px ' + -actualY + 'px',
                backgroundImage: state.actualImageUrl,
                backgroundSize: state.actualImageWidth + 'px ' + state.actualImageHeight + 'px'
            },
            verticalRatio: state.verticalRatio,
            horizontalRatio: state.horizontalRatio,
            actualImageHeight: state.actualImageHeight,
            actualImageWidth: state.actualImageWidth,
            actualImageUrl: state.actualImageUrl
        };
    }

    onComponentDragMove(param) {
        this.setState(this.calculatePosition(this.state, param.deltaX, param.deltaY));
    }

    mapStateToProps() {

        var storeState = store.getState();
        var imageInfo = storeState.selectedImage;

        if (imageInfo == null) {
            return;
        }

        this.setState(this.calculatePosition({
            containerPosition: {
                top: '0px',
                left: '0px'
            },
            verticalRatio: imageInfo.height / 768,
            horizontalRatio: imageInfo.width / 1024,
            actualImageUrl: imageInfo.path,
            actualImageHeight: imageInfo.height,
            actualImageWidth: imageInfo.width
        }));
    }

    componentDidMount() {
        store.subscribe(this.mapStateToProps.bind(this));
        DragManager.register(this.refs["container"], this.onComponentDragMove.bind(this));
    }

    componentWillUnmount() {
        store.unsubscribe(this.mapStateToProps.bind(this));
    }

    render() {
        return (
            <div ref="container" style={this.state.containerPosition} className={styles.magnifierOutterRange}>
                <div className={styles.magnifierInnerRange} style={this.state.imagePosition}></div>
                <div className={styles.magnifierBar}></div>
            </div>
        );
    }
}
