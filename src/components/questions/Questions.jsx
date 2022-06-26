import React from 'react'
import { Table, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types'

function Questions(props) {
    return (
        <Table className="mt-1">
            <thead>
                <tr>
                    <th>

                    </th>
                    <th>
                        Oración
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    props.questions.slice(props.pageStart, props.pageEnd).map((q, i) => (
                        <>
                            <tr key={i}>
                                <th scope="row">
                                    <FormGroup check>
                                        <Input
                                            key={q.id}
                                            name={q.id}
                                            value={q.eneatipo}
                                            type="checkbox"
                                            checked={props.formState.checked[q.id]}
                                            onClick={(e) => props.handleChange(e)}
                                        />
                                    </FormGroup>
                                </th>
                                <td>
                                    {q.pregunta}
                                </td>
                            </tr>
                        </>
                    ))
                }
            </tbody>
        </Table >
    )
}

Questions.propTypes = {}

export default Questions
