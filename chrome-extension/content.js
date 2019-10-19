/* 

	Run webgazer

*/
appendLoop = '';
eyeData = [];
runs = 0;
page_url = '';
token = '';
session_id = 0;
page_version_id = 0;
visit_time = new Date();
URL_INI = 'https://51312073.ngrok.io/';

setTimeout(function() {
    initGazer();
}, 50);

function initGazer() {
    var compatible = webgazer.detectCompatibility();
    chrome.storage.sync.get('state', function(result) {
        console.log(result.state);
        var on = (result.state == 'on');
        console.log(on);
        if (compatible && on) {
            //start the webgazer tracker
            webgazer.setRegression('ridge') /* currently must set regression and tracker */
                .setTracker('clmtrackr')
                .setGazeListener(function(data, clock) {
                    //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
                    //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
                })
                .begin()
                .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
            function checkIfReady() {
                if (webgazer.isReady()) {
                    console.log('ready');

                    chrome.runtime.onMessage.addListener(
                        function(request, sender, sendResponse) {
                            console.log(sender.tab ?
                                "from a content script:" + sender.tab.url :
                                "from the extension");
                            if (request.toggleCamera == false) {
                                sendResponse({ toggleCamera: false });
                                console.log('off');
                                document.getElementById('overlay').style.display = 'none';
                                document.getElementById('faceOverlay').style.display = 'none';
                                document.getElementById('webgazerVideoFeed').style.display = 'none';
                            } else if (request.toggleCamera == true) {
                                console.log('on');
                                sendResponse({ toggleCamera: true });
                                document.getElementById('faceOverlay').style.display = 'none';
                                document.getElementById('webgazerVideoFeed').style.display = 'none';
                                document.getElementById('overlay').style.display = 'none';
                                setup();
                            }

                            if (request.state) {

                            } else if (!request.state) {
                                //stopAppending();
                            }
                        });

                    setup();
                } else {
                    setTimeout(checkIfReady, 100);
                }
            }
            setTimeout(checkIfReady, 100);
        }
    });
}
var width = 300;
var height = 230;
var topDist = '0px';
var leftDist = '0px';

//Set up the webgazer video feedback.
var setup = function() {

    //Set up video variable to store the camera feedback
    video = document.getElementById('webgazerVideoFeed');


    console.log(showCamera);
    //Position the camera feedback to the top left corner.
    video.style.position = 'fixed';
    video.style.top = topDist;
    video.style.left = leftDist;

    //Set up the video feedback box size
    video.width = width;
    video.height = height;
    video.style.margin = '0px';
    video.style.background = '#222222';
    webgazer.params.imgWidth = width;
    webgazer.params.imgHeight = height;

    //Set up the main canvas. The main canvas is used to calibrate the webgazer.
    overlay = document.createElement('canvas');
    overlay.id = 'overlay';

    //Setup the size of canvas
    overlay.style.position = 'fixed';
    overlay.width = width;
    overlay.height = height;
    overlay.style.top = topDist;
    overlay.style.left = leftDist;
    overlay.style.margin = '0px';
    overlay.style.display = 'none';

    //Draw the face overlay on the camera video feedback
    faceOverlay = document.createElement('face_overlay');
    faceOverlay.id = 'faceOverlay';
    faceOverlay.style.position = 'fixed';
    faceOverlay.style.top = '59px';
    faceOverlay.style.left = '107px';
    faceOverlay.style.border = 'solid';

    document.body.appendChild(overlay);
    document.body.appendChild(faceOverlay);

    /*
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    */
    var showCamera;
    chrome.storage.sync.get('showCamera', function(result) {
        var showCamera = result.showCamera;
        overlay.hidden = !showCamera;
        faceOverlay.hidden = !showCamera;
        //video.style.display = showCamera ? 'block' : 'none';
    });
    var cl = webgazer.getTracker().clm;

    //This function draw the face of the user frame.
    function drawLoop() {
        requestAnimFrame(drawLoop);
        overlay.getContext('2d').clearRect(0, 0, width, height);
        if (cl.getCurrentPosition()) {
            cl.draw(overlay);
        }
    }
    //drawLoop();
    console.log(width, height);
    if (appendLoop) stopAppending();
    localStorage.setItem("visit_time", String(new Date()));

    if (localStorage.getItem("page_url") !== '') {
        stopAppending();
        postData();
    }
    eyeData = [];
    localStorage.clear();
    localStorage.setItem("page_url", location.origin + location.pathname);
    postPageData();
    if (exclude_path(location.origin)) {
        localStorage.setItem("page_url", '');
    }
    visit_time = new Date();
    runs = 0;
    localStorage.setItem("domain", location.origin);
    localStorage.setItem("path", location.pathname);

    setTimeout(appendLoop = setInterval(appendData, 100), 5000);

}

function stopAppending() {
    clearInterval(appendLoop);
    console.log(eyeData);
}

function postPageData() {
    var url = 'chromex/start_session';
    var postData = {
        'token': token,
        'domain': localStorage.getItem("domain"),
        'path': localStorage.getItem("path"),
    };

    fetch(URL_INI + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
        }).then(res => res.json())
        .then(function(response) {
            localStorage.setItem("session_id", response.data.session_id);
            localStorage.setItem("page_version_id", response.data.page_version_id);
        });
}

function exclude_path(str) {
    var paths = [];
    var file = 'exclude.json';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL(file), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            paths = JSON.parse(xhr.responseText).data.paths;
        }
    };
    xhr.send();


    for (let path of paths) {
        if (str.indexOf(path) !== -1) {
            return true;
        }
    }

    return false;
}

function appendData() {
    console.log('appending');

    var prediction = webgazer.getCurrentPrediction();
    if (prediction) {
        gazes = String(new Date()) + ',' + String((prediction.x + document.documentElement.scrollLeft) / document.documentElement.scrollWidth) + ',' + String((prediction.y + document.documentElement.scrollTop) / document.documentElement.scrollHeight);
        localStorage.setItem(String(runs), gazes);
        runs++;
    }
}

function postData() {
    var url = 'chromex/page_views';
    for (var i = 0; i < runs; i++) {
        var strData = localStorage.getItem(String(i)).split(',');
        var json = {
            'timeStamp': strData[0],
            'x': strData[1],
            'y': strData[2],
        }
        eyeData.push(json);
        console.log('push ' + i);
    }

    var postMsg = {
        'token': token,
        'visit_time': visit_time,
        'session_id': localStorage.getItem("session_id"),
        'page_version_id': localStorage.getItem("page_version_id"),
        'gazes': eyeData,
    };
    console.log('Send ', eyeData.length, ' datas.');
    fetch(URL_INI + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postMsg),
    });


}