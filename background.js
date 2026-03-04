
chrome.alarms.onAlarm.addListener((alarm) => {
    if(alarm.name == arcReactorLevel) {
        chrome.action.openPopup();
    }

});
