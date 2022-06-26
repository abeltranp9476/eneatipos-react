import React from 'react'
import { Button } from 'reactstrap';
import PropTypes from 'prop-types'

function NavigationButons(props) {
    const step = props.step;
    const totalSteps = props.totalSteps;
    const handleNext = props.handleNext;
    const handleBack = props.handleBack;
    const handleResult = props.handleResult;

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="col text-center">
                    {
                        (step === 1) ? (
                            <>
                            </>
                        ) : (
                            <Button color="primary" onClick={(e) => handleBack(e)} className="m-2 mb-3">Anterior</Button>
                        )
                    }

                    {
                        (step === totalSteps) ? (
                            <Button className="btn-lg m-2 mb-3" color="success" onClick={(e) => handleResult(e)}>Obtener eneatipo</Button>
                        ) : (
                            <Button color="primary" onClick={(e) => handleNext(e)} className="m-2 mb-3">Siguiente</Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

NavigationButons.propTypes = {}

export default NavigationButons
