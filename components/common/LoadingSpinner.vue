<template>
  <div class="loading-spinner">
    <div class="loading">
      <span class="visuallyhidden">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
.center-horizontal {
  display: flex;
  justify-content: center;
}

.center-vertical {
  display: flex;
  align-items: center;
}

.full-screen.loading-spinner {
  margin: 0;
}

.no-margin.loading-spinner {
  margin: 0;
}

.reduced-margin.loading-spinner {
  margin: 0;
}

.reduced-margin.loading-spinner .loading {
  margin-block: 1.2em;
}

.loading-spinner {
  width: 100%;
  height: 100%;
  margin-block: 1.2em;
}

.small.loading-spinner .loading {
  height: 20px;
  width: 20px;
  border-top: 1px solid #06c;
  border-right: 1px solid #06c;
  border-bottom: 1px solid #06c;
  border-left: 1px solid transparent;
}

.xsmall.loading-spinner .loading {
  height: 15px;
  width: 15px;
  border-top: 1px solid #06c;
  border-right: 1px solid #06c;
  border-bottom: 1px solid #06c;
  border-left: 1px solid transparent;
}

.medium.loading-spinner .loading {
  height: 30px;
  width: 30px;
  border-top: 1.5px solid #06c;
  border-right: 1.5px solid #06c;
  border-bottom: 1.5px solid #06c;
  border-left: 1.5px solid transparent;
}

.loading-spinner .loading,
.loading-spinner .loading:after {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.full-screen.loading-spinner .loading {
  margin: 216px auto;
}

.loading-spinner .loading {
  font-size: 10px;
  position: relative;
  /* text-indent: -99990px; */
  border-top: 2px solid #06c;
  border-right: 2px solid #06c;
  border-bottom: 2px solid #06c;
  border-left: 2px solid transparent;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: loading-spinner 0.8s infinite linear;
  animation: loading-spinner 0.8s infinite linear;
}

.visuallyhidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

@-webkit-keyframes loading-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loading-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
