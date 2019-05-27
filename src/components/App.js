import React from 'react';
import {Provider} from 'react-redux';
import ControlPanel from './ControlPanel';
import store from '../reducer/Store.js';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ControlPanel/>
            </Provider>
        );
    }
}
