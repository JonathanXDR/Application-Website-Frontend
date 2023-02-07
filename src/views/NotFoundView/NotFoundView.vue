<template>
  <div v-for="index in 40" :key="index">
    <span
      class="particle"
      :style="{
        // top: `${Math.floor(Math.random() * 100)}%`,
        // left: `${Math.floor(Math.random() * 100)}%`,
        // fontSize: `${Math.floor(Math.random() * 40 + 10)}px`,
        // filter: `blur(${Math.random() * 0.4}px)`,
        animation: `${Math.floor(Math.random() * 40 + 10)}s ${
          ['apparition', 'float', 'floatReverse', 'float2', 'floatReverse2'][
            Math.floor(Math.random() * 5)
          ]
        } infinite`,
      }"
      >4</span
    >
    <span
      class="particle"
      :style="{
        // top: `${Math.floor(Math.random() * 100)}%`,
        // left: `${Math.floor(Math.random() * 100)}%`,
        // fontSize: `${Math.floor(Math.random() * 40 + 10)}px`,
        // filter: `blur(${Math.random() * 0.4}px)`,
        // output is wrong: animation: 34s ease 0s infinite normal none running floatReverse;
        // should be: animation: 34s floatReverse infinite;
        // animation (output wrong): `${Math.floor(Math.random() * 40 + 10)}s ${
        //   ['apparition', 'float', 'floatReverse', 'float2', 'floatReverse2'][
        //     Math.floor(Math.random() * 5)
        //   ]
        // } infinite`,
      }"
      >0</span
    >
  </div>
  <article class="content">
    <p>Damnit stranger,</p>
    <p>You got lost in the <strong>404</strong> galaxy.</p>
    <p>
      <button>Go back to earth.</button>
    </p>
  </article>
</template>

<style scoped src="./NotFoundView.css"></style>
