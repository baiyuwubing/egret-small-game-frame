// TypeScript file
module func {
    export function removeFromParent(obj: egret.DisplayObject) {
        if (obj && obj.parent) {
            obj.parent.removeChild(obj)
        }
    }

    export function sendHttpRequest(sendUrl: string, sendData: Object, success: Function, fail: Function, httpMethod = egret.HttpMethod.GET) {
        const request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        let sendParams = ``
        let first = true
        for (const key in sendData) {
            if (first) {
                first = false
            } else {
                sendParams += `&`
            }
            sendParams += `${key}=${sendData[key]}`
        }
        request.open((httpMethod == egret.HttpMethod.GET) ? `${sendUrl}?${sendParams}` : sendUrl, httpMethod);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if (httpMethod == egret.HttpMethod.GET)
            request.send();
        else
            request.send(sendParams);

        egret.log(`sendUrl:${sendUrl}  \nsendParams:${sendParams}`)
        request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            const request = <egret.HttpRequest>event.currentTarget;
            if (request && request.response) {
                const getData = JSON.parse(request.response)
                egret.log(`request.response:${request.response}`)
                const error_code = getData.error_code
                const error = getData.error || "ERROR"
                if (getData && error_code == 0) {
                    success(getData)
                } else {
                    fail(error_code, error)
                    // if (Main.ins.mainView) {
                    //     Main.ins.mainView.textTips.show(error)
                    // }
                }
            } else {
                fail(-2, "NO_REQUEST")
            }
        }, this);

        request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
            fail(-1, "IO_ERROR")
        }, this);
    }


    /**
     * 添加按钮点击回调 自带缩放
     */
    export function addButtonClickByEff(btn: egret.DisplayObject, clickCb: Function = function () { }, context: any) {
        btn.anchorOffsetX = btn.width / 2
        btn.anchorOffsetY = btn.height / 2
        btn.x += btn.width / 2
        btn.y += btn.height / 2
        btn.anchorOffsetY = btn.height / 2
        let _context = !context ? btn : context
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            egret.Tween.get(btn)
                .to({ scaleX: 0.85, scaleY: 0.85 }, 100)
        }, _context)
        btn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, function () {
            egret.Tween.get(btn)
                .to({ scaleX: 1, scaleY: 1 }, 100)
        }, _context)
        btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            egret.Tween.get(btn)
                .to({ scaleX: 1, scaleY: 1 }, 100)
        }, _context)
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            egret.Tween.get(btn)
                .to({ scaleX: 1, scaleY: 1 }, 100)
            clickCb && clickCb.call(_context)
        }, _context)
    }

    //设置缩放方式
    export function screenAdaptation(main: eui.UILayer): void {
        // 判断是否 iPhone 或者 iPod
        // if ((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))) {
        //     // 判断系统版本号是否大于 4
        //     console.log(navigator.userAgent);
        //     alert(navigator.userAgent.match(/OS [5-9]_\d[_\d]* like Mac OS X/i));
        // }
        // let canvas = document.createElement('canvas');
        // let gl = canvas.getContext('experimental-webgl');
        // let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        // let info = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        const root = main;
        let commomRatio = 460 / 800;
        let windowRatio = window.screen.width / window.screen.height;
        let scaleMode: string = egret.StageScaleMode.SHOW_ALL;
        //this.locationY = PublicData.bottom_y2;
        if (egret.Capabilities.isMobile) {
            //egret.log("windowRatio=======?",windowRatio)
            scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            if (windowRatio < 0.56 || windowRatio > 0.6) {
                scaleMode = egret.StageScaleMode.SHOW_ALL;
            } else if (windowRatio > 0.55) {
                //this.locationY = PublicData.bottom_y3;
            } else {
                //this.locationY = PublicData.bottom_y2;
            }
        }
        root.stage.scaleMode = scaleMode;

        // alert("图形设备型号:" + gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
        // alert("屏幕分辨率宽:" + window.screen.width + "；屏幕分辨率高:" + window.screen.height);
        // alert("显示宽度:" + this.screenWidth + "；显示高度:" + this.screenHeight);
        // alert("舞台宽度:" + this.stageWidth + "；舞台高度:" + this.stageHeight);
        // egret.log("屏幕分辨率宽高比:" + window.screen.width / window.screen.height);
        // egret.log("显示区域宽高比:" + this.screenWidth / this.screenHeight);
        // egret.log("设计宽高比:" + this.stageWidth / this.stageHeight);
        // if ((info.indexOf("Apple") > -1 && info.indexOf("A11") > -1) && (window.screen.width == 375 && window.screen.height == 812)) {
        //     //此设备为iphoneX
        // }
    }

    /**获取直线斜率 */
    export function getPonitSlope(pointA: egret.Point, pointB: egret.Point) {
        return (pointB.y - pointA.y) / (pointB.x - pointA.x)
    }



}