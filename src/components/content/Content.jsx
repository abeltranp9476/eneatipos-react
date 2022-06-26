import React from 'react'
import PropTypes from 'prop-types'

function Content(props) {
    return (
        <div className="container">
            <div className="row">
                {props.children}
            </div>
        </div>
    )
}

Content.propTypes = {}

export default Content
