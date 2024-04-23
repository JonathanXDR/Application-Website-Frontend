<template>
  <div class="text-center">
    <div class="loading-dots">
      <span style="display: inherit">
        <span
          v-for="index in 3"
          :key="index"
          class="dot"
        />
      </span>
    </div>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}
.dot {
  background-color: var(--color-fill-gray-secondary);
  width: 8px;
  height: 8px;
  margin: 2px;
  border-radius: 100%;
  display: inline-block;
}
.dot:nth-child(1) {
  animation: 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0.12s infinite normal
    both running loading-dots;
}
.dot:nth-child(2) {
  animation: 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0.24s infinite normal
    both running loading-dots;
}
.dot:nth-child(3) {
  animation: 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0.36s infinite normal
    both running loading-dots;
}
@keyframes loading-dots {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  45% {
    transform: scale(0.1);
    opacity: 0.7;
  }
  80% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
