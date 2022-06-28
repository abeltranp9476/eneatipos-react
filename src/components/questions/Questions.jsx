import React from 'react'
import { Table } from 'reactstrap';
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik';
import Mycheckbox from '../mycheckbox/Mycheckbox';

function Questions(props) {

    return (
        <Table className="mt-1">
            <thead>
                <tr>
                    <th>
                        Oración
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    props.questions.slice(props.pageStart, props.pageEnd).map((q, i) => (
                        <>
                            <tr key={i.toString()}>
                                <td scope="row">
                                    <Formik
                                        initialValues={{
                                            firstName: '',
                                            lastName: '',
                                            email: '',
                                            acceptedTerms: false, // added for our checkbox
                                            jobType: '', // added for our select
                                        }}>
                                        <Form>
                                            <Mycheckbox
                                                key={q.id.toString()}
                                                name={q.id}
                                                value={q.eneatipo}
                                                onClick={props.handleChange}
                                            >
                                                {q.pregunta}
                                            </Mycheckbox>
                                        </Form>
                                    </Formik>
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
