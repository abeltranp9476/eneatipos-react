import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import imagenEneagrama from '../../enneagram-personality-types-test-figure-600w-1820836163.webp';

function Welcome(props) {
    return (
        <div className="row mt-5 justify-content-md-center align-items-center">
            <div className="col-lg-8">
                <Card className="mt-3 mb-3"
                >
                    <CardBody>
                        <CardTitle tag="h5">
                            Eneagrama
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Descubra características de su personalidad según su eneatipo.
                        </CardSubtitle>
                        <CardText>
                            Se le mostrarán un total de 270 oraciones y usted deberá marcar sólo aquellas con las que se sienta identificado.
                            Para que el test funcione, es necesario que marque 100 oraciones mínimo. Si son más, no pasa nada.
                        </CardText>
                        <div className="col text-center">
                            <Button onClick={props.startButtonClick}>
                                Empezar test!
                            </Button>

                            <img className="img-fluid mt-3" alt="Enegrama" src={imagenEneagrama} />
                        </div>

                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

Welcome.propTypes = {}

export default Welcome