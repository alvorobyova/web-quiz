/* All answer options */

const option1 = document.querySelector(".option1"),
  option2 = document.querySelector(".option2"),
  option3 = document.querySelector(".option3"),
  option4 = document.querySelector(".option4");

/* All our options */
const optionElements = document.querySelectorAll(".option");

const question = document.getElementById("question"); // сам вопрос

const numberOfQuestion = document.getElementById("number-of-question"), // номер вопроса
  numberOfOllQuestions = document.getElementById("number-of-all-questions"); // количество всех вопросов

let indexOfQuestion, // индекс текущего вопроса
  indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById("answers-tracker"); // обертка для трекера
const btnNext = document.getElementById("btn-next"); // кнопка далее

let score = 0; // итоговый результаты квиза

const correctAnswer = document.getElementById("correct-answer"), // количество правильных ответов
  numberOfAllQuestions2 = document.getElementById("number-of-all-questions-2"), // количество всех вопросов в модальном окне
  btnTryAgain = document.getElementById("btn-try-again"); // кнопка "начать викторину заново"

const questions = [
  {
    question: "Что такое HTTP?",
    options: [
      "Это адрес сайта в интернете",
      "Это язык программирования для создания сайтов",
      "Это набор правил, который может быть использован для передачи котиков в текстовом виде по сети",
      "Это протокол, позволяющий устанавливать соединение между узлами сети",
    ],
    rightAnswer: 2,
  },
  {
    question: "Кто является владельцем торговой марки JavaScript?",
    options: [
      "Netscape Communications",
      "Sun Microsystems",
      "Netscape Communications",
      "Oracle Corporation",
    ],
    rightAnswer: 3,
  },
  {
    question: "DOM — это",
    options: [
      "Модель, структурирующая HTML-тэги и позволяющая обращаться к ним по уникальному адресу",
      "Модель, структурирующая элементы браузера и позволяющая обращаться к ним по уникальному адресу",
      "Библиотека JavaScript, упрощающая работу по взаимодействию JavaScript и HTML",
      "Нет верного ответа",
    ],
    rightAnswer: 0,
  },
  {
    question: "Что не относится к типу данных в JavaScript?",
    options: ["number", "boolean", "zero", "string"],
    rightAnswer: 2,
  },
  {
    question:
      "Выбрать правильный вариант объявления или инициализации переменных.",
    options: ["№ = 121", "var x = 12", "var = x", "Var x = 1%;"],
    rightAnswer: 1,
  },
];

numberOfOllQuestions.innerHTML = questions.length; // выводим количество вопросов

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; // cfv вопрос

  // мапим ответы
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
  indexOfPage++; // увеличение индекса страницы
};

let completedAnswers = []; // массив для уже заданных вопросов

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false; // якорь для проверки одинаковых вопросов

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

// удаление всех классов со всех ответов
const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

// создаем круги, которые будут заполняться цветов по мере того, как будем отвечать на вопросы

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};

// обновление кругов с учетом ответа на вопрос (добавление классов)

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

// проверяет, выбран ли вариант ответа. Если нет, то не дает идти дальше и показывает окно

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Вам нужно выбрать один из вариантов ответа");
  } else {
    randomQuestion();
    enableOptions();
  }
};

const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);

btnNext.addEventListener("click", () => {
  validate();
});

window.addEventListener("load", () => {
  randomQuestion();
  answerTracker();
});
