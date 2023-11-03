chrome.runtime.onMessage.addListener((message) => {
  if (message) {
    document.getElementsByClassName(
      "video-stream html5-main-video"
    )[0].currentTime = message.introTime;

    //here you can access message.myVar
  }
});
