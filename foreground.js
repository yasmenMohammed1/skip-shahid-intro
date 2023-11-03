var element = document.getElementsByClassName("Skip-IntroText")[0];
if (element) {
  element.click();
}
var skippedValue = 0;
var startingValue = document.getElementsByClassName("min-w-[2em]")[0];
var endingValue = document.getElementsByClassName("min-w-[2em] mr-[12px]")[0];

var observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    // for (let addedNode of mutation.attributeName) {
    //   console.log("mutation", addedNode);
    if (mutation.target.id === "theoplayer-container") {
      if (startingValue < skippedValue) {
        element.click();
        skippedValue = startingValue;
      }
    }
    // }
  }
});
observer.observe(document, { childList: true, subtree: true });
