export interface QuizQuestion {
  quizID: number;
  question: string;
  quiz: string[];
  answer: string;
  feedback: string;
}

export const lessons: QuizQuestion[] = [
  {
    quizID: 0,
    question: "Elements have default styling, given to them by the browser they are run in.  Which of the following selected responses organizes the heading tags in descending order?",
    quiz: ["h1, h4, h5", "h1, h4, h2", "h2, h4, h5"],
    answer: "a",
    feedback: "Correct! Great work!"
  },
  {
    quizID: 1,
    question: "If I wanted to add a image to an img tag I would use a certain image attribute.  What attribute would that be?",
    quiz: ["src", "width", "opacity"],
    answer: "a",
    feedback: "Correct! Fantastic!"
  },
  {
    quizID: 2,
    question: "Which of these elements would make for a good heading for a webpage?",
    quiz: ["<h1>Webpage</h1>", "<p>Webpage</p>", "<span> Webpage</span>"],
    answer: "a",
    feedback: "Correct! You are doing great!"
  },
  {
    quizID: 3,
    question: "When we are trying to find bugs in our code, what is this process is called?",
    quiz: ["coding", "debugging", "reading"],
    answer: "b",
    feedback: "Correct! That's right!"
  },
  {
    quizID: 4,
    question: "Business logic, UI design, and data storage are the chief components of a software program.  At what phase of the SDLC (software development lifecycle) are the business needs uncovered.",
    quiz: ["Implementation Phase", "Design Phase", "Requirements Phase"],
    answer: "c",
    feedback: "Correct! Keep it up!"
  },
  {
    quizID: 5,
    question: "Semi-colons are optional in a few langauges.  In which of the following languages/web tools are semi-colons optional.",
    quiz: ["CSS", "JavaScript", "C++"],
    answer: "b",
    feedback: "Correct! Good Job!"
  },
  {
    quizID: 6,
    question: "Which of the following is not a block element, by default?",
    quiz: ["span", "h2", "p"],
    answer: "a",
    feedback: "Correct! Nice work!"
  },
  {
    quizID: 7,
    question: "Which of the following pieces of code will display its contents next to each other (without starting each piece of content on a separate new line).",
    quiz: ["<span>1</span><span>2</span><span>3</span>", "<section>1</section><section>2</section><section>3</section>", "<p>1</p><p>2</p><p>3</p>"],
    answer: "a",
    feedback: "Correct! You got it!"
  },
  {
    quizID: 8,
    question: "Which of the following pieces of code will produce the following output: <i>HTML Beginner's Course</i>",
    quiz: ["<p>HTML Beginner's Course</p>", "<i>HTML Beginner's Course</i>", "<b>HTML Beginner's Course</b>"],
    answer: "b",
    feedback: "Correct! Awesome work!"
  },
  {
    quizID: 9,
    question: "Which of the following elements helps us when we want to place a webpage inside of our own webpage?",
    quiz: ["iframe", "br", "div"],
    answer: "a",
    feedback: "Correct! Great work!"
  }
];
