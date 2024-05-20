<template>
  <div class="popup">
    <div v-if="!isShipstationDomain">Please switch to shipstation.com</div>
    <div v-else>
      <p>Hello World</p>
      <p v-if="ctrlCPressed">Ctrl+C pressed</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShipstationDomain: false,
      ctrlCPressed: false,
    };
  },
  mounted() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url);
      this.isShipstationDomain = url.hostname.includes('shipstation.com');

      if (this.isShipstationDomain) {
        chrome.runtime.sendMessage({ type: 'GET_CTRL_C_STATUS' }, (response) => {
          if (response && response.ctrlCPressed) {
            this.ctrlCPressed = true;
          }
        });
      }
    });
  }
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
