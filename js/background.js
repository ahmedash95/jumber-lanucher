// Commands
chrome.commands.onCommand.addListener(function (command) {
    if(command === 'launch') {
        chrome.tabs.executeScript({
          code: 'runLanucher();'
        });
    }
});
