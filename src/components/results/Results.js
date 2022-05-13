import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

function Results(props) {
    return (
        <div className="row mt-5 justify-content-md-center align-items-center">
            <div className="col-lg-8">
                <Card className="mt-3 mb-3"
                >
                    <CardBody>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Hemos determinado que usted es:
                        </CardSubtitle>
                        <CardText>
                            <b>Eneatipo:</b> {props.eneatipo}
                            <br />
                            <b>Ala:</b> {props.ala}
                        </CardText>
                        <div className="col text-center">
                            <Button href="/">
                                Volver a realizar
                            </Button>
                        </div>

                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

Results.propTypes = {}

export default Results
