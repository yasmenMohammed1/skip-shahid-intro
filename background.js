const regex =
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/user\/\S+\/|youtube\.com\/attribution_link\?a=\S+&u=\S+&i=\S+|youtube\.com\/playlist\?list=)([a-zA-Z0-9_-]{11})/;
var activeTab;
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  let introTime;
  activeTab = tabId;
  await chrome.storage.local.get(["introTime"]).then((result) => {
    introTime = result.introTime;
  });
  if (changeInfo.status === "complete") {
    if (regex.test(tab.url) && introTime) {
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab },

          files: ["./youtube_skipper.js"],
        },
        () => {
          chrome.tabs.sendMessage(activeTab, {
            message: "get-intro-time",
            introTime: introTime,
          });
        }
      );
    } else {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["./foreground.js"],
      });
    }
  }
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  activeTab = activeInfo.tabId;
  if (!regex.test(activeInfo.url))
    chrome.scripting.executeScript({
      target: { tabId: activeTab },
      files: ["./foreground.js"],
    });
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "get-intro-time") {
    chrome.scripting.executeScript(
      {
        target: { tabId: activeTab },

        files: ["./youtube_skipper.js"],
      },
      async () => {
        chrome.tabs.sendMessage(activeTab, {
          message: "get-intro-time",
          introTime: request.introTime,
        });
        chrome.storage.local.set({ introTime: request.introTime }).then(() => {
          //
        });

        chrome.storage.local.get(["introTime"]).then((result) => {
          //
        });
      }
    );
    sendResponse({ message: "success" });
  }
});
