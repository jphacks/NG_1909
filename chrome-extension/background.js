'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ state: 'on' }, function() {
        console.log('now ON');
    });
    chrome.storage.sync.set({ showCamera: true }, function() {
        console.log('camera now on');
    })
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.method) {
        case 'getItem':
            sendResponse({ data: localStorage.getItem(request.key) });
            break;
        case 'getJSON':
            sendResponse({ data: JSON.parse(localStorage.getItem(request.key)) });
            break;
        case 'setItem':
            sendResponse({ data: localStorage.setItem(request.key, request.value) });
            break;
        case 'setJSON':
            sendResponse({ data: localStorage.setItem(request.key, JSON.stringify(request.value)) });
            break;
        case 'removeItem':
            sendResponse({ data: localStorage.removeItem[request.key] });
            break;
        case 'clearAll':
            sendResponse({ data: localStorage.clear() });
            break;
        default:
            console.log('no method');
            break;
    }
});