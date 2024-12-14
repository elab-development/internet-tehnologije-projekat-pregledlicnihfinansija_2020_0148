import React, { useState } from "react";
import "./FinanceQuiz.css";

const questions = [
  {
    question:
      "Koje od navedenih opcija je najefikasniji način za uštedu novca?",
    answers: {
      a: "Štednja na kratkoročnoj štednji",
      b: "Investiranje u akcije i obveznice",
      c: "Korišćenje kreditnih kartica",
      d: "Kupovina luksuznih predmeta",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Koji od navedenih troškova bi trebalo najviše smanjiti da bi se uštedelo?",
    answers: {
      a: "Troškovi putovanja i odmora",
      b: "Troškovi telekomunikacija i interneta",
      c: "Troškovi odeće i obuće",
      d: "Troškovi za nepredviđene situacije",
    },
    correctAnswer: "c",
  },
  {
    question: "Koja je najvažnija stavka za praćenje u mesečnom budžetu?",
    answers: {
      a: "Prihodi i troškovi",
      b: "Prosečan trošak po danu",
      c: "Planiranje za neplanirane troškove",
      d: "Investicione mogućnosti za dodatni prihod",
    },
    correctAnswer: "a",
  },
  {
    question: "Koji je najbolji način za praćenje mesečnih troškova?",
    answers: {
      a: "Korišćenje papirne evidencije",
      b: "Korišćenje aplikacija za budžetiranje",
      c: "Oslanjanje na memoriju",
      d: "Korišćenje bankovnih izvoda",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Koji je preporučeni procenat prihoda koji treba uštedeti svaki mesec?",
    answers: {
      a: "5%",
      b: "10%",
      c: "15%",
      d: "20%",
    },
    correctAnswer: "d",
  },
];

const FinanceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      const isCorrect =
        selectedAnswer === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }
      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
  };

  return (
    <div className="finance-quiz-container">
      <h1 className="finance-quiz-title">Kviz o Finansijama</h1>
      <p className="quiz-instructions">
        Uputstvo: Prvo selektujte odgovor, a zatim kliknite "Potvrdi odgovor".
      </p>
      <div className="quiz-container">
        {quizCompleted ? (
          <div className="quiz-results">
            <h2>Kviz je završen!</h2>
            <p>
              Ukupno tačnih odgovora: {score}/{questions.length}
            </p>
            <button className="reset-button" onClick={handleResetQuiz}>
              Ponovi kviz
            </button>
          </div>
        ) : (
          <>
            <div className="question">
              {questions[currentQuestion].question}
            </div>
            <div className="answers">
              {Object.keys(questions[currentQuestion].answers).map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleAnswerClick(letter)}
                  className={`answer-button ${
                    selectedAnswer === letter
                      ? questions[currentQuestion].correctAnswer === letter
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {letter.toUpperCase()}:{" "}
                  {questions[currentQuestion].answers[letter]}
                </button>
              ))}
            </div>
            {showResult && (
              <div className="result">
                {selectedAnswer === questions[currentQuestion].correctAnswer
                  ? "Tačno!"
                  : "Netačno!"}
              </div>
            )}
            <div className="button-container">
              <button
                className="back-button"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0 || selectedAnswer !== null}
              >
                Nazad
              </button>
              <button
                className="submit-button"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Potvrdi odgovor
              </button>
              <button
                className="next-button"
                onClick={
                  currentQuestion === questions.length - 1
                    ? handleFinishQuiz
                    : handleNextQuestion
                }
                disabled={selectedAnswer === null}
              >
                {currentQuestion === questions.length - 1
                  ? "Završi kviz"
                  : "Sledeće pitanje"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FinanceQuiz;
