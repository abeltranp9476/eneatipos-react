import React from 'react'
import { Progress } from 'reactstrap';
import PropTypes from 'prop-types'

function ProgressBar(props) {
    const percent = props.percent;
    return (
        <div className="mt-5">
            <Progress className="mt-4"
                color={(percent === 100) ? 'success' : 'primary'}
                value={percent}
            >
                {Math.round(percent)} % Completado
            </Progress>
        </div>
    )
}

ProgressBar.propTypes = {}

export default ProgressBar
