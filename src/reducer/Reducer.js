import * as ActionTypes from './ActionTypes.js';

export default (state, action) => {

    switch (action.type) {
        case ActionTypes.PICTURE_CHANGED:
            return {...state,
                selectedImage: action.value.pic
            };
        case ActionTypes.PICTURE_SCALE:
            return {...state,
                scaleInt: state.scaleInt +1
            }
        case ActionTypes.COLOR:
            return {...state,
                color: action.value.color
            };
        case ActionTypes.IS_DRAWING:
            return {...state,
                is_drawing: !state.is_drawing
            };
        default:
            return state;
    }
}