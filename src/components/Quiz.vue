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
  if (currentQuizIndex.value < totalQuestions - 1) {
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

function resetState() {
  selectedAnswer.value = null;
  feedback.value = null;
  isCorrect.value = false;
}
</script>

<template>
  <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center py-md-5 w-100">
    <div class="card bg-dark text-white shadow-lg border-secondary w-100 flex-grow-1 flex-md-grow-0" v-if="currentQuestion">
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
          :disabled="currentQuizIndex === totalQuestions - 1"
        >
          Next &raquo;
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
</style>
