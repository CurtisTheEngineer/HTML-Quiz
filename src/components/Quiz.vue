<script setup lang="ts">
import { ref, computed } from 'vue';
import { lessons } from '../data/quiz';

const currentQuizIndex = ref(0);
const score = ref(0);
const selectedAnswer = ref<string | null>(null);
const feedback = ref<string | null>(null);
const isCorrect = ref(false);
const answeredQuestions = ref<boolean[]>(new Array(lessons.length).fill(false));

const currentQuestion = computed(() => lessons[currentQuizIndex.value]);

const totalQuestions = lessons.length;
const showScore = computed(() => currentQuizIndex.value >= totalQuestions);

const scorePercentage = computed(() => (score.value / totalQuestions) * 100);

const quirkyMessage = computed(() => {
  if (scorePercentage.value >= 100) {
    return "🫶🏿 **You Did It! 100% Perfection!** 🌟 👩🏾‍🦱 🌟 You truly shine—a coding superstar! Keep making magic!";
  } else if (scorePercentage.value >= 80) {
    return "✨ **Amazing Work!** ✨ You've got this down! Your skills are soaring! Keep up the brilliant effort!";
  } else if (scorePercentage.value >= 50) {
    return "👍🏿 **Fantastic Progress!** 👍🏿 You've built a strong foundation. Every step forward is a victory—you're getting closer!";
  } else {
    return "🌱 **Keep Growing!** 🌱 Learning takes time and practice, and every mistake is a chance to learn something new. You've got the spark—don't give up!";
  }
});

function checkAnswer(index: number) {
  const answerKey = String.fromCharCode(97 + index); // 'a', 'b', 'c'
  selectedAnswer.value = answerKey;

  if (currentQuestion.value) {
    if (answerKey === currentQuestion.value.answer) {
      isCorrect.value = true;
      feedback.value = currentQuestion.value.feedback;

      if (!answeredQuestions.value[currentQuizIndex.value]) {
        score.value++;
        answeredQuestions.value[currentQuizIndex.value] = true;
      }
    } else {
      isCorrect.value = false;
      feedback.value = "Incorrect. Please try again.";

      if (answeredQuestions.value[currentQuizIndex.value]) {
        score.value--;
        answeredQuestions.value[currentQuizIndex.value] = false;
      }
    }
  }
}

function nextQuestion() {
  if (currentQuizIndex.value < totalQuestions) {
    currentQuizIndex.value++;
    resetState();
  }
}

function prevQuestion() {
  if (currentQuizIndex.value > 0) {
    currentQuizIndex.value--;
    resetState();
  }
}

function restartQuiz() {
  currentQuizIndex.value = 0;
  score.value = 0;
  answeredQuestions.value.fill(false);
  resetState();
}

function resetState() {
  selectedAnswer.value = null;
  feedback.value = null;
  isCorrect.value = false;
}
</script>

<template>
  <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center py-md-5 w-100">
    <!-- Quiz Card -->
    <div class="card bg-dark text-white shadow-lg border-secondary w-100 flex-grow-1 flex-md-grow-0" v-if="!showScore && currentQuestion">
      <div class="card-header border-secondary d-flex justify-content-between align-items-center sticky-top bg-dark z-1">
        <h4 class="mb-0 fs-5 fs-md-4">Plan2Code <span class="text-info">HTML Quiz</span></h4>
        <div class="h5 mb-0"><span class="badge bg-secondary">Score: {{ score }}/{{ totalQuestions }}</span></div>
      </div>
      <div class="card-body overflow-auto">
        <div class="mb-4">
          <span class="badge bg-primary mb-2">Question #{{ currentQuestion.quizID + 1 }}</span>
          <h5 class="card-title" v-html="currentQuestion.question"></h5>
        </div>

        <div class="d-grid gap-3">
          <button
            v-for="(option, index) in currentQuestion.quiz"
            :key="index"
            class="btn text-start p-3 position-relative"
            :class="{
              'btn-outline-light': selectedAnswer !== String.fromCharCode(97 + index),
              'btn-success': selectedAnswer === String.fromCharCode(97 + index) && isCorrect,
              'btn-danger': selectedAnswer === String.fromCharCode(97 + index) && !isCorrect
            }"
            @click="checkAnswer(index)"
          >
            <div class="d-flex align-items-center">
               <strong class="me-2">{{ String.fromCharCode(97 + index).toUpperCase() }}.</strong>
               <span v-html="option"></span>
            </div>
          </button>
        </div>

        <div v-if="feedback" class="mt-4 alert" :class="isCorrect ? 'alert-success' : 'alert-danger'">
          {{ feedback }}
        </div>
      </div>
      <div class="card-footer border-secondary d-flex justify-content-between p-3 mt-auto sticky-bottom bg-dark z-1">
        <button
          class="btn btn-outline-light flex-grow-1 me-2 py-3"
          @click="prevQuestion"
          :disabled="currentQuizIndex === 0"
        >
          &laquo; Previous
        </button>
        <button
          class="btn btn-outline-light flex-grow-1 ms-2 py-3"
          @click="nextQuestion"
        >
          {{ currentQuizIndex === totalQuestions - 1 ? 'Finish' : 'Next &raquo;' }}
        </button>
      </div>
    </div>

    <!-- Score Card -->
    <div class="card bg-dark text-white shadow-lg border-secondary w-100 flex-grow-1 flex-md-grow-0 text-center p-5 scale-in" v-else-if="showScore">
      <div class="card-body d-flex flex-column justify-content-center align-items-center">
        <h2 class="display-4 mb-4">Quiz Completed!</h2>

        <div class="score-circle mb-4">
          <span class="display-1 text-info fw-bold">{{ score }}</span>
          <span class="h2 text-white-50">/ {{ totalQuestions }}</span>
        </div>

        <div class="message-box mb-5 p-3 rounded border border-info bg-dark bg-opacity-50 shadow-sm">
           <p class="lead mb-0 fst-italic text-light">"{{ quirkyMessage }}"</p>
        </div>

        <button class="btn btn-primary btn-lg px-5 py-3 pulse-button" @click="restartQuiz">
          Try Again 🔄
        </button>
      </div>
    </div>

    <footer class="text-center mt-3 mb-3 text-muted d-none d-md-block">
      <p class="small mb-1">
        <strong>Author:</strong> Curtis A. Warren |
        <strong>Published</strong> Jan 1st, 2019 |
        <strong>Refactored</strong> {{ new Date().getFullYear() }}
      </p>
      <p class="small">&copy; 2018 Curtis A. Warren. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
/* Mobile specific adjustments */
.card {
  max-width: 800px;
}

@media (max-width: 767.98px) {
  .card {
    max-width: 100%;
    border: none;
    border-radius: 0;
  }

  .card-header, .card-footer {
    border-radius: 0;
  }
}

/* Ensure sticky elements work */
.sticky-top {
  top: 0;
}
.sticky-bottom {
  bottom: 0;
}

/* Make buttons easier to tap on mobile */
button.btn {
  touch-action: manipulation;
}

/* Animations */
@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.scale-in {
  animation: scaleIn 0.5s ease-out forwards;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
  }
}

.pulse-button {
  animation: pulse 2s infinite;
}

.score-circle {
  display: inline-flex;
  justify-content: center;
  align-items: baseline;
  padding: 2rem;
  border-radius: 50%;
  border: 5px solid #0dcaf0; /* Info color */
  background: rgba(13, 202, 240, 0.1);
  box-shadow: 0 0 20px rgba(13, 202, 240, 0.3);
}
</style>
