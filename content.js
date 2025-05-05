// // Get user preferred speed from storage (default to 1.5)
// chrome.storage.sync.get(['speed'], function(result) {
//     let speed = result.speed || 1.5;
  
//     function applySpeed() {
//       document.querySelectorAll('video').forEach(video => {
//         video.playbackRate = speed;
//       });
//     }
  
//     // Apply speed initially
//     applySpeed();
  
//     // Also listen for newly added videos
//     const observer = new MutationObserver(applySpeed);
//     observer.observe(document.body, { childList: true, subtree: true });
//   });
  

function applySpeed(speed) {
    document.querySelectorAll('video').forEach(video => {
      video.playbackRate = speed;
    });
  }
  
  // Load and apply saved speed initially
  chrome.storage.sync.get(['speed'], function(result) {
    applySpeed(result.speed || 1.5);
  });
  
  // Also apply to newly added videos
  const observer = new MutationObserver(() => {
    chrome.storage.sync.get(['speed'], function(result) {
      applySpeed(result.speed || 1.5);
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Listen for changes from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "update_speed") {
      applySpeed(message.speed);
      sendResponse({ status: "speed_updated" });
    }
  });
  