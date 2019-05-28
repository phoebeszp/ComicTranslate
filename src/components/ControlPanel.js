import React, { PropTypes } from 'react';

import styles from '../css/ControlPanel.css';

import PictureSelector from './PictureSelector';
import PictureDisplayer from './PictureDisplayer';

export default function ControlPanel() {
    return (
        <div className={styles.magnifierTable}>
            <div className={styles.magnifierCell}>
                <PictureSelector />
                <div className={styles.magnifierContainer}>
                    <PictureDisplayer/>
                </div>
            </div>
        </div>
    );
}