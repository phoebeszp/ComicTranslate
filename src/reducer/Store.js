import {createStore} from 'redux';
import reducer from './Reducer.js';

const initValues = {
    selectedImage: null,
    scaleInt: 1,
    is_drawing: false
};

const store = createStore(reducer, initValues);

export default store;