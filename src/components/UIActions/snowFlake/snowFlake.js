import React from 'react';
import './snowFlake.css';

const SnowFlake = () => {
    const generateSnowFlake = () => {
        return (
            <div className='snowflakes'>
                {Array.from({length: 50}, () => <div className='snowflake'></div>)}
            </div>
        )
    }

    return (
        <div>{generateSnowFlake()}</div>
    )
}

export default SnowFlake;