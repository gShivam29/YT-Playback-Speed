// // Load saved speed
// chrome.storage.sync.get(['speed'], function(result) {
//     document.getElementById('speed').value = result.speed || 1.5;
//   });

//   // Save new speed
//   document.getElementById('save').addEventListener('click', function() {
//     let speed = parseFloat(document.getElementById('speed').value);
//     chrome.storage.sync.set({ speed }, function() {
//       alert('Speed saved!');
//     });
//   });

// Load saved speed
chrome.storage.sync.get(["speed"], function (result) {
  document.getElementById("speed").value = result.speed || 1.5;
});

// Save new speed
document.getElementById("save").addEventListener("click", function () {
  let speed = parseFloat(document.getElementById("speed").value);

  chrome.storage.sync.set({ speed }, function () {
    // Send message to content script to update immediately
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "update_speed", speed: speed },
        function (response) {
          console.log(response.status);
        }
      );
    });
  });
});
