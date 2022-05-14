import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Label, FormGroup, Input, Progress } from 'reactstrap';
import logo from './logo.svg';
import data from './questions.json';
import './App.css';
import Navbar1 from './components/navbar/Navbar1';
import Welcome from './components/welcome/Welcome';
import Results from './components/results/Results';

function App() {
  const navigate = useNavigate();
  const perPage = 30;
  const totalSteps = 9;
  const min = 100;
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(1);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(perPage);
  const questions = data[2].data;
  const [finish, setFinish] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [desglose, setDesglose] = useState([]);
  const [eneatipo, setEneatipo] = useState(false);
  const [alas, setAlas] = useState([]);
  const [ala, setAla] = useState(false);
  const [percent, setPercent] = useState(0);

  const [formState, setFormState] = useState({
    values: {},
    checked: {},
  });

  useEffect(() => {
    setPageStart(perPage * (step - 1));
    setPageEnd(perPage * step);
  }, [pageStart, step])


  useEffect(() => {
    const answerTotal = Object.keys(formState.values).length;
    if (finish && answerTotal < 100) {
      alert('Debe seleccionar mínimo 100 oraciones.');
      setFinish(false);
    } else if (finish) {
      setShowResult(true);
      //alert('Tu eneatipo es: ' + eneatipo + ' y tu ala: ' + ala);
    }
  }, [finish, formState.values, ala, eneatipo])

  const handleStart = (e) => {
    setStart(true);
  }

  const handleRestart = (e) => {
    return navigate('/welcome');
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (step === totalSteps) return false;
    window.scrollTo(0, 0);
    setStep(step + 1);
    calculatePercent();
  }

  const handleBack = (e) => {
    e.preventDefault()
    if (step === 1) return false;
    window.scrollTo(0, 0);
    setStep(step - 1);
    calculatePercent();
  }

  const calculatePercent = () => {
    let calc = (step + 1) / totalSteps * 100;
    setPercent(calc);
  }

  const handleResult = (e) => {
    e.preventDefault()

    if (Object.keys(formState.values) < 1) return false;

    var array = [];

    Object.keys(formState.values).map((key, index) => {
      array.push(formState.values[key]);
    })

    var repetidos = {};

    array.forEach(function (numero) {
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });

    //console.log(repetidos);
    setDesglose(repetidos);
    analize(repetidos);
    setFinish(true);
  }

  const analize = (data) => {
    var resultsEneatipos = [];

    Object.keys(data).map((key) => {
      resultsEneatipos.push(data[key]);
      //console.log(data[key]);
    })

    resultsEneatipos.sort(function (a, b) {
      return a - b;
    });

    const eneatipoTmp = determineEneatipoFromValue(data, resultsEneatipos[resultsEneatipos.length - 1]);
    setEneatipo(eneatipoTmp);
    const alas = determineAlasFromEneatipo(parseInt(eneatipoTmp));

    if (data[alas[0]] > data[alas[1]]) {
      setAla(alas[0]);
    } else if (data[alas[0]] < data[alas[1]]) {
      setAla(alas[1]);
    } else if (data[alas[0]] == data[alas[1]]) {
      setAla('No definido');
    }

  }

  const determineEneatipoFromValue = (object, value) => {
    return Object.entries(object).find(i => i[1] == value)[0];
  }

  const isChecked = (keyCompare) => {
    return Object.entries(formState.values).find(i => i[0] == keyCompare);
  }

  const isCheckedBox = (keyCompare) => {
    return Object.entries(formState.checked).find(i => i[0] == keyCompare && i[1] == 'checked');
  }


  const determineAlasFromEneatipo = (eneatipo) => {
    if (eneatipo == 1) return [9, 2];
    if (eneatipo == 9) return [8, 1];
    return [eneatipo - 1, eneatipo + 1];
  }

  const stractSelectField = (field, value, files, name) => {
    if (isChecked(name)) {
      setFormState((state) => {
        let temp = state;
        delete temp.values[name];
        return temp;
      });
    } else {
      return value;
    }
  }

  const detectState = (field, name, value) => {
    if (field === 'checkbox') {
      if (isCheckedBox(name)) {
        return '';
      } else {
        return 'checked';
      }
    }
  }

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          stractSelectField(event.target.type, event.target.value, event.target.files, event.target.name)
      }
    }));

    setFormState(formState => ({
      ...formState,
      checked: {
        ...formState.checked,
        [event.target.name]:
          detectState(event.target.type, event.target.name, event.target.value)
      }
    }));
  };

  return (
    <div>
      <Navbar1 title="Test Eneagrama" total={min} counter={Object.keys(formState.values).length} />
      <Routes>
        <Route path="*" element={<div className="mt-5">404</div>} />
        <Route path="/" element={
          <div className="container">
            <div className="row">
              {
                (start) ? (
                  (showResult) ? (
                    <div className="mt-5">
                      <Results eneatipo={eneatipo} ala={ala} restartButtonClick={handleRestart} />
                    </div>
                  ) : (
                    <>
                      <div className="mt-5">
                        <Progress className="mt-4"
                          color={(percent === 100) ? 'success' : 'primary'}
                          value={percent}
                        />
                      </div>
                      <Table className="mt-1">
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
                            questions.slice(pageStart, pageEnd).map((q, i) => (
                              <>
                                <tr key={i}>
                                  <th scope="row">
                                    <FormGroup check>
                                      <Input
                                        key={q.id}
                                        name={q.id}
                                        value={q.eneatipo}
                                        type="checkbox"
                                        checked={formState.checked[q.id]}
                                        onClick={(e) => handleChange(e)}
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
                          <div className="col text-center">
                            {
                              (step === 1) ? (
                                <>
                                </>
                              ) : (
                                <Button color="primary" onClick={(e) => handleBack(e)} className="m-2">Anterior</Button>
                              )
                            }

                            {
                              (step === totalSteps) ? (
                                <Button className="btn-lg m-2" color="success" onClick={(e) => handleResult(e)}>Obtener eneatipo</Button>
                              ) : (
                                <Button color="primary" onClick={(e) => handleNext(e)} className="m-2">Siguiente</Button>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </>
                  )

                ) : (
                  <Welcome startButtonClick={handleStart} />
                )
              }
            </div >
          </div >


        } />
      </Routes>

    </div >

  );
}

export default App;
