define(["log"], function(log) {

var HTTP_STATUS_OK = 200;

    var httpRequest;

    // private functions
    function onReadyStateChange (pCallback, pRunningLocal) {
    try {
        log.DEBUG("httpRequest.readyState, status= " +
                httpRequest.readyState + ", " + httpRequest.status);
        if (httpRequest.readyState === httpRequest.DONE) {
            if (httpRequest.status === HTTP_STATUS_OK || pRunningLocal) {
                log.DEBUG ("STATUS_OK received");
                pCallback(httpRequest.responseText);
            } else {
                log.ERROR ("no OK status received; bailing out");
            }
        }
    } catch (e) {
        log.ERROR(e);
    }
    }


    // public functions
    return {
        makeJSONRequest : function (pURL, pCallback, pRunningLocal) {
            if (window.XMLHttpRequest) {
                httpRequest = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                try {
                    httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                    try {
                        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    catch (activeXe) {}
                }
            }

            if (httpRequest) {
                httpRequest.onreadystatechange = function () {
                        onReadyStateChange(pCallback, pRunningLocal);
                    };
                httpRequest.overrideMimeType("text/json");
                httpRequest.open('GET',
                        pURL,
                        //pURL + "?ts=" + (new Date()).getTime(),
                        true);
                httpRequest.send(null);
            } else {
                log.ERROR("httpRequest not supported");
            }
        }
    };
}); // define
