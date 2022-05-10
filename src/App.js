import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Label, FormGroup, Input } from 'reactstrap';
import logo from './logo.svg';
import data from './questions.json';
import './App.css';
import Navbar1 from './components/navbar/Navbar1';


function App() {
  const perPage = 30;
  const totalSteps = 9;
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(null);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(perPage);
  const questions = data[2].data;

  useEffect(() => {
    setPageStart(perPage * (step - 1));
    setPageEnd(perPage * step);
  }, [pageStart, step])

  const handleNext = () => {
    if (step === totalSteps) return false;
    setStep(step + 1);
  }

  const handleBack = () => {
    if (step === 1) return false;
    setStep(step - 1);
  }


  const handleResult = () => {
    alert('Resultados');
  }

  return (
    <div>
      <Navbar1 title="Test Eneagrama" />
      <div className="container">
        <div className="row">
          <Table className="mt-5">
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  Pregunta
                </th>
              </tr>
            </thead>
            <tbody>
              {
                questions.slice(pageStart, pageEnd).map((q) => (
                  <>
                    <tr>
                      <th scope="row">
                        <FormGroup check>
                          <Input
                            id={q.id}
                            name="check"
                            type="checkbox"
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
          <div className="row">
            <div className="col-lg-12">
              {
                (step === 1) ? (
                  <>
                  </>
                ) : (
                  <Button color="primary" onClick={handleBack} className="m-2">Anterior</Button>
                )
              }

              {
                (step === totalSteps) ? (
                  <Button color="success" onClick={handleResult}>Obtener eneatipo</Button>
                ) : (
                  <Button color="primary" onClick={handleNext} className="m-2">Siguiente</Button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div >

  );
}

export default App;
