let element = window.document.getElementsByClassName("skipper")[0];
let introEstematedTime =
  window.document.getElementsByClassName("intro-time")[0];

let checkInput = window.document.getElementsByClassName("checkStatus")[0];

checkInput.addEventListener("click", () => {
  let body = window.document.getElementsByTagName("body")[0];
  let youtubeSection =
    window.document.getElementsByClassName("youtube-input")[0];
  if (checkInput.checked) {
    youtubeSection.style.display = "block";

    const newGradient =
      "linear-gradient(5deg, #621313,white, #cc0000, #c21414,#621313, black)";
    body.style.backgroundImage = newGradient;
  } else {
    youtubeSection.style.display = "none";

    const newGradient = "linear-gradient(5deg,#00d356,#00ca9b,#0098ff)";

    body.style.background = newGradient;
  }
});

element.addEventListener("click", async () => {
  chrome.runtime.sendMessage({
    message: "get-intro-time",
    introTime: introEstematedTime.value,
  });
});
