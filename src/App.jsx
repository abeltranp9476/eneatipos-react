import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './questions.json';
import './App.css';
import Navbar1 from './components/navbar/Navbar1';
import Welcome from './components/welcome/Welcome';
import Results from './components/results/Results';
import Questions from './components/questions/Questions';
import ProgressBar from './components/progressBar/ProgressBar';
import NavigationButons from './components/navigationButtons/NavigationButons';
import Footer from './components/footer/Footer';
import Content from './components/content/Content';
import { useFormik, useField } from 'formik';

function App() {
  const perPage = 30;
  const totalSteps = 9;
  const min = 100;
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(0);
  const [pageStart, setPageStart] = useState(1);
  const [pageEnd, setPageEnd] = useState(perPage);
  const questions = data[2].data;
  const [finish, setFinish] = useState(false);
  const [showResult, setShowResult] = useState(false);
  //const [desglose, setDesglose] = useState([]);
  const [eneatipo, setEneatipo] = useState(false);
  //const [alas, setAlas] = useState([]);
  const [ala, setAla] = useState(false);
  const [percent, setPercent] = useState(0);

  const [formState, setFormState] = useState({
    values: {},
    checked: {},
  });

  const formik = useFormik({
    initialValues: {},
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
  }, [finish, ala, eneatipo])


  const handleStart = () => {
    document.title = "Oraciones - Eneagrama";
    setStart(true);
    setStep(step + 1);
    calculatePercent('next');
    window.scrollTo(0, 0);
  }

  const handleNext = () => {
    if (step === totalSteps) return false;
    window.scrollTo(0, 0);
    setStep(step + 1);
    calculatePercent('next');
  }

  const handleBack = () => {
    if (step === 1) return false;
    window.scrollTo(0, 0);
    setStep(step - 1);
    calculatePercent('back');
  }

  const calculatePercent = (mode) => {
    let calc;
    if (mode === 'next') calc = (step + 1) / totalSteps * 100;
    if (mode === 'back') calc = (step - 1) / totalSteps * 100;
    setPercent(calc);
    //console.log(step);
  }

  const handleResult = () => {

    if (Object.keys(formState.values) < 1) return false;

    var array = [];

    Object.keys(formState.values).map((key, index) => {
      return array.push(formState.values[key]);
    })

    var repetidos = {};

    array.forEach(function (numero) {
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });

    //console.log(repetidos);
    //setDesglose(repetidos);
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
    } else if (data[alas[0]] === data[alas[1]]) {
      setAla('No definido');
    }

  }

  const determineEneatipoFromValue = (object, value) => {
    return Object.entries(object).find(i => i[1] === value)[0];
  }

  const isChecked = (keyCompare) => {
    return Object.entries(formState.values).find(i => i[0] === keyCompare);
  }

  const isCheckedBox = (keyCompare) => {
    return Object.entries(formState.checked).find(i => i[0] === keyCompare && i[1] === 'checked');
  }


  const determineAlasFromEneatipo = (eneatipo) => {
    if (eneatipo === 1) return [9, 2];
    if (eneatipo === 9) return [8, 1];
    return [eneatipo - 1, eneatipo + 1];
  }

  const stractSelectField = (field, value, files, name) => {
    if (isChecked(name)) {
      setFormState((state) => {
        delete state.values[name];
        delete state.checked[name];
        console.log(state);
        return state;
      });
    } else {
      return value;
    }
  }

  const detectState = (field, name, value) => {
    if (field === 'checkbox') {
      if (isCheckedBox(name)) {
        return '';
      }
      return 'checked';
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

  const handleRevisar = () => {
    setShowResult(false);
    setFinish(false);
  }

  return (
    <>
      <Navbar1
        title="Test Eneagrama"
        total={min}
        counter={Object.keys(formik.values).length}
        start={start}
      />

      <Routes>
        <Route path="*" element={<div className="mt-5">404</div>} />
        <Route path="/" element={
          <Content>
            {
              (start) ? (
                (showResult) ? (
                  <Results
                    eneatipo={eneatipo}
                    ala={ala}
                    handleRevisar={handleRevisar}
                  />
                ) : (
                  <>
                    <ProgressBar
                      percent={percent}
                    />

                    <Questions
                      questions={questions}
                      pageStart={pageStart}
                      pageEnd={pageEnd}
                      formState={formState}
                      useField={useField}
                      handleChange={formik.handleChange}
                    />

                    <NavigationButons
                      step={step}
                      totalSteps={totalSteps}
                      handleNext={handleNext}
                      handleBack={handleBack}
                      handleResult={handleResult}
                    />
                  </>
                )

              ) : (
                <Welcome startButtonClick={handleStart} />
              )
            }

          </Content>

        } />
      </Routes >

      <Footer />
    </>
  );
}

export default App;
