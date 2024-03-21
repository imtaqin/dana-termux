
Java.perform(function () {
    var res2 = Java.use('com.android.okhttp.Response$Builder');
    res2.build.implementation = function () {

        var response = this.build();


        //console.log(response.message())
        var rBody = response.body();
        //console.log(rBody.source())
        var requestUrl = response.request().url().toString();
        var resheader = response.request().headers().toString();
        if (resheader.includes("ALIPAYJSESSIONID")) {
            console.log(requestUrl);
            console.log(resheader);
        }

        return response;
    };
    var base64 = Java.use('android.util.Base64');
    var RealResponseBody = Java.use('com.android.okhttp.internal.http.RealResponseBody');
    RealResponseBody.$init.overload('com.android.okhttp.Headers', 'com.android.okhttp.okio.BufferedSource').implementation = function (par1, par2) {
        console.log("ResponseBody");

        var body = par2.readByteArray();
        console.log(base64.encodeToString(body, 0));
        var buffer = par2.buffer();
        buffer.clear();
        buffer.write(body);

        this.$init(par1, par2);
    }

});


function printStacks(androidLogClz, exceptionClz, methodName) {
    var stackInfo = androidLogClz.getStackTraceString(exceptionClz.$new());
    console.log(new Date().getTime()+":"+methodName);
    console.log(stackInfo.substring(20));
};

Java.perform(function() {
    var androidLogClz = Java.use("android.util.Log");
    var exceptionClz = Java.use("java.lang.Exception");
    var WebView = Java.use("android.webkit.WebView");
    var WebSettings = Java.use("android.webkit.WebSettings");

    if (WebView.loadUrl) {
        //Ref: https://developer.android.com/reference/android/webkit/WebView.html#loadUrl(java.lang.String)
        WebView.loadUrl.overloads[0].implementation = function(url) {
            //checkSettings(this);
            printStacks(androidLogClz, exceptionClz, 'android.webkit.WebView.loadUrl(java.lang.String:' + url + ')');
            return this.loadUrl.overloads[0].apply(this, arguments);
        };

        //Ref: https://developer.android.com/reference/android/webkit/WebView.html#loadUrl(java.lang.String, java.util.Map<java.lang.String, java.lang.String>)
        WebView.loadUrl.overloads[1].implementation = function(url, additionalHttpHeaders) {
            //checkSettings(this);
            console.log("WebView Navigation: " + url.toString());
            console.log("WebView Headers: " + additionalHttpHeaders);
            printStacks(androidLogClz, exceptionClz, 'android.webkit.WebView.loadUrl(java.lang.String, java.util.Map<java.lang.String, java.lang.String>)');
            return this.loadUrl.overloads[1].apply(this, arguments);
        }
    }

    if (WebView.loadData) {
        //Ref: https://developer.android.com/reference/android/webkit/WebView.html#loadData(java.lang.String, java.lang.String, java.lang.String)
        WebView.loadData.implementation = function(data, mimeType, encoding) {
            //checkSettings(this);
            console.log("WebView loadData data: " + data);
            console.log("WebView loadData mimeType: " + mimeType);
            console.log("WebView loadData encoding: " + encoding);
            printStacks(androidLogClz, exceptionClz, 'android.webkit.WebView.loadData(java.lang.String, java.lang.String, java.lang.String)');
            return this.loadData.apply(this, arguments);
        }
    }


    if (WebView.postUrl) {
        //Ref: https://developer.android.com/reference/android/webkit/WebView.html#postUrl(java.lang.String, byte[])
        WebView.postUrl.implementation = function(url, postData) {
            //checkSettings(this);
            console.log("WebView postUrl URL: " + url);
            console.log("WebView postUrl postData: " + postData);
            printStacks(androidLogClz, exceptionClz, 'android.webkit.WebView.postUrl(java.lang.String, byte[])');
            return this.postUrl.apply(this, arguments);
        }
    }

    if (WebView.postWebMessage) {
        //Ref: https://developer.android.com/reference/android/webkit/WebView.html#postWebMessage(android.webkit.WebMessage, android.net.Uri)
        WebView.postWebMessage.implementation = function(message, targetOrigin) {
            console.log("WebView postWebMessage message: " + message.getData());
            console.log("WebView postWebMessage targetOrigin: " + targetOrigin.toString());
            printStacks(androidLogClz, exceptionClz, 'android.webkit.WebView.postWebMessage(android.webkit.WebMessage, android.net.Uri)');
            return this.postWebMessage.apply(this, arguments);
        }
    }


});