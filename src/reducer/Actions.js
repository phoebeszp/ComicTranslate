import * as ActionTypes from './ActionTypes.js';

export const changeImage = (value) => {
    return {
        type: ActionTypes.PICTURE_CHANGED,
        value: value
    };
};

export const onScale = (value) => {
    return {
        type: ActionTypes.PICTURE_SCALE,
        value: value
    }
}
export const selectColor = (value) =>{
    return {
        type: ActionTypes.COLOR,
        value: value
    }
}
export const isDrawing = (value) =>{
    return {
        type: ActionTypes.IS_DRAWING,
        value: value
    }
}