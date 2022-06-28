import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'reactstrap'
import { useField } from 'formik'

function Mycheckbox({ children, ...props }) {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <Label>
                <input type="checkbox" className="form-check-input" {...field} {...props} />
                {' ' + children}
            </Label>
        </>
    )
}

Mycheckbox.propTypes = {}

export default Mycheckbox

