var element = document.getElementsByClassName("Skip-IntroText")[0];
var video = document.getElementsByTagName("video")[0];
var timeOut;
var flag = 0;
function CheckDOMChange() {
  moviePlayer = document.getElementsByClassName("Skip-IntroText")[0];

  if (moviePlayer !== undefined && flag < 2) {
    console.log("skipper");
    moviePlayer.click();
    clearInterval(timeOut);
    flag++;
  }
}

timeOut = setInterval(CheckDOMChange, 1000);
