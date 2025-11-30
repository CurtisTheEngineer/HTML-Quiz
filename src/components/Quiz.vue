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
  <div class="container py-5">
    <div class="card bg-dark text-white shadow-lg border-secondary" v-if="currentQuestion">
      <div class="card-header border-secondary d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Plan2Code <span class="text-info">HTML Quiz</span></h4>
        <div class="h5 mb-0"><span class="badge bg-secondary">Score: {{ score }}/{{ totalQuestions }}</span></div>
      </div>
      <div class="card-body">
        <div class="mb-4">
          <span class="badge bg-primary mb-2">Question #{{ currentQuestion.quizID + 1 }}</span>
          <h5 class="card-title" v-html="currentQuestion.question"></h5>
        </div>

        <div class="d-grid gap-2">
          <button
            v-for="(option, index) in currentQuestion.quiz"
            :key="index"
            class="btn text-start p-3"
            :class="{
              'btn-outline-light': selectedAnswer !== String.fromCharCode(97 + index),
              'btn-success': selectedAnswer === String.fromCharCode(97 + index) && isCorrect,
              'btn-danger': selectedAnswer === String.fromCharCode(97 + index) && !isCorrect
            }"
            @click="checkAnswer(index)"
          >
            <strong>{{ String.fromCharCode(97 + index) }}.</strong> <span v-html="option"></span>
          </button>
        </div>

        <div v-if="feedback" class="mt-4 alert" :class="isCorrect ? 'alert-success' : 'alert-danger'">
          {{ feedback }}
        </div>
      </div>
      <div class="card-footer border-secondary d-flex justify-content-between">
        <button
          class="btn btn-outline-light"
          @click="prevQuestion"
          :disabled="currentQuizIndex === 0"
        >
          &laquo; Previous
        </button>
        <button
          class="btn btn-outline-light"
          @click="nextQuestion"
          :disabled="currentQuizIndex === totalQuestions - 1"
        >
          Next &raquo;
        </button>
      </div>
    </div>

    <footer class="text-center mt-5 text-muted">
      <p>
        <strong>Author:</strong> Curtis A. Warren<br>
        <strong>Published</strong> January 1st, 2019<br>
        <strong>Refactored</strong> {{ new Date().getFullYear() }}
      </p>
      <p>&copy; 2018 Curtis A. Warren. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
/* Custom styles to enhance dark mode if needed, but Bootstrap dark mode classes cover most */
.card {
  max-width: 800px;
  margin: 0 auto;
}
</style>
