/* 

	Run webgazer

*/
exclude_paths = ["google.com", "www.yahoo.co.jp"];
calib_path = "";
appendLoop = '';
eyeData = [];
runs = 0;
URL_INI = 'https://51312073.ngrok.io/';
gazeObj = '';

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
            var ridge = '';
            var clmtrackr = '';
            chrome.runtime.sendMessage({ method: 'getJSON', key: 'redge' }, function(res) {
                if (res.data) {
                    ridge = res.data;
                } else {
                    ridge = 'ridge';
                }
                chrome.runtime.sendMessage({ method: 'getJSON', key: 'clmtrackr' }, function(response) {
                    if (response.data) {
                        clmtrackr = response.data;
                    } else {
                        clmtrackr = 'clmtrackr';
                    }

                    gazeObj = webgazer.setRegression(ridge) /* currently must set regression and tracker */
                        .setTracker(clmtrackr)
                        .setGazeListener(function(data, clock) {
                            //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
                            //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
                        })
                        .begin()
                        .showPredictionPoints(false); /* shows a square every 100 milliseconds where current prediction is */
                });
            });

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
                                document.getElementById('overlay').style.visibility = 'hidden';
                                document.getElementById('faceOverlay').hidden = false;
                                document.getElementById('webgazerVideoFeed').style.display = 'none';
                            } else if (request.toggleCamera == true) {
                                console.log('on');
                                sendResponse({ toggleCamera: true });
                                document.getElementById('faceOverlay').style.visibility = 'hidden';
                                document.getElementById('webgazerVideoFeed').style.display = 'none';
                                document.getElementById('overlay').hidden = false;
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

    video.style.display = 'none';
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
    /*
        chrome.storage.sync.get('showCamera', function(result) {
            var showCamera = result.showCamera;
            overlay.hidden = !showCamera;
            faceOverlay.hidden = !showCamera;
            video.style.display = showCamera ? 'block' : 'none';
        });*/
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

    chrome.runtime.sendMessage({ method: 'getItem', key: "page_url" }, function(res) {
        if (res.data) {
            console.log("local strage's page_url ", res.data);
            if (res.data !== '') {
                postData();
            } else {
                clearGazerData();
            }

            chrome.runtime.sendMessage({ method: 'setItem', key: "visit_time", value: String(new Date()) });
            runs = 0;
        }

        chrome.runtime.sendMessage({ method: 'setItem', key: "domain", value: location.origin });
        chrome.runtime.sendMessage({ method: 'setItem', key: "path", value: location.pathname });
        chrome.runtime.sendMessage({ method: 'setItem', key: "page_url", value: location.origin + location.pathname });
        if (exclude_path(location.origin)) {
            chrome.runtime.sendMessage({ method: 'setItem', key: "page_url", value: '' });
        } else {
            postPageData();
        }

        setTimeout(appendLoop = setInterval(appendData, 100), 5000);
        setInterval(getRedgeTrackData, 1000);

    });
}

function stopAppending() {
    clearInterval(appendLoop);
    console.log(eyeData);
}

function postPageData() {
    var url = 'chromex/start_session';
    chrome.runtime.sendMessage({ method: 'getItem', key: "domain" }, function(res) { if (res.data) console.log("local strage's domain", res) });
    chrome.runtime.sendMessage({ method: 'getItem', key: "path" }, function(res) { if (res.data) console.log("local strage's path", res) });

    chrome.runtime.sendMessage({ method: 'getItem', key: "token" }, function(res1) {
        chrome.runtime.sendMessage({ method: 'getItem', key: "domain" }, function(res2) {
            chrome.runtime.sendMessage({ method: 'getItem', key: "path" }, function(res3) {
                var postData = {
                    'token': res1.data,
                    'domain': res2.data,
                    'path': res3.data,
                };

                fetch(URL_INI + url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(postData),
                    }).then(res => res.json())
                    .then(function(response) {
                        chrome.runtime.sendMessage({ method: 'setItem', key: "session_id", value: response.data.session_id });
                        chrome.runtime.sendMessage({ method: 'setItem', key: "page_version_id", value: response.data.page_version_id });
                        if (response.data.) {
                            sendPageCapture();
                        }
                    });
            })
        })
    })

}

function sendPageCapture() {
    html2canvas(document.body, {
        onrendered: function(canvas) {
            var url = '';
            const imgData = canvas.toDataURL("image/png");
            var fd = new FormData();
            fd.append(location.origin + location.pathname, imgData);
            fetch(URL_INI + url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: fd,
            });
        }
    })
}

function exclude_path(str) {

    for (let path of exclude_paths) {
        if (str.indexOf(path) !== -1) {
            return true;
        }
    }

    return false;
}

function appendData() {
    var prediction = webgazer.getCurrentPrediction();
    console.log("prediction", prediction);
    if (prediction) {
        console.log('appending');
        gazes = String(new Date()) + ',' + String((prediction.x + document.documentElement.scrollLeft) / document.documentElement.scrollWidth) + ',' + String((prediction.y + document.documentElement.scrollTop) / document.documentElement.scrollHeight);
        chrome.runtime.sendMessage({ method: 'setItem', key: (String(runs)), value: gazes });
        runs++;
        if (runs > 50) {
            chrome.runtime.sendMessage({ method: 'setItem', key: "runs", value: String(runs) });
        }
    }
}

function clearGazerData() {
    chrome.runtime.sendMessage({ method: 'getItem', key: "runs" }, function(res) {
        for (var i = 0; i < Number(res.data); i++) {
            chrome.runtime.sendMessage({ method: 'removeItem', key: String(i) });
        }
    })
}

function postData() {
    var url = 'chromex/page_views';
    chrome.runtime.sendMessage({ method: 'getItem', key: "runs" }, function(res) { console.log("local strage's runs ", res.data) });
    chrome.runtime.sendMessage({ method: 'getItem', key: "runs" }, function(res) {
        for (var i = 0; i < Number(res.data); i++) {
            chrome.runtime.sendMessage({ method: 'getItem', key: String(i) }, function(res2) {
                if (res2.data) {
                    var strData = res2.data.split(',');
                    chrome.runtime.sendMessage({ method: 'removeItem', key: String(i) });
                    var json = {
                        'timeStamp': strData[0],
                        'x': strData[1],
                        'y': strData[2],
                    }
                    eyeData.push(json);
                    console.log('maked json[', i, "]", json);
                }
            });
        }
        chrome.runtime.sendMessage({ method: 'setItem', key: "runs", value: String(runs) });
    })

    chrome.runtime.sendMessage({ method: 'getItem', key: "token" }, function(res1) {
        chrome.runtime.sendMessage({ method: 'getItem', key: "visit_time" }, function(res2) {
            chrome.runtime.sendMessage({ method: 'getItem', key: "session_id" }, function(res3) {
                chrome.runtime.sendMessage({ method: 'getItem', key: "page_version_id" }, function(res4) {
                    var postMsg = {
                        'token': res1.data,
                        'visit_at': res2.data,
                        'session_id': res3.data,
                        'page_version_id': res4.data,
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
                })
            })
        })
    })
}

function getRedgeTrackData() {
    chrome.runtime.sendMessage({ method: 'getJSON', key: 'ridge' }, function(res) {
        if (res.data) {
            gazeObj.setRegression(res.data);
        }
    });
    chrome.runtime.sendMessage({ method: 'getJSON', key: 'clmtrackr' }, function(res) {
        if (res.data) {
            gazeObj.setTracker(res.data);
        }
    });
}