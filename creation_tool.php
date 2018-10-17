<?php
 header("Access-Control-Allow-Origin: *");
?>
<script>
    window.injectHtmlfile = function (url, done, doc) {
        doc = doc || document;
        window.loadUrl(url).onload = function () {
            var r = parseCodeBlocks(this.response);
            var DIV = doc.createElement('div');
            DIV.innerHTML = r;
            var initScript = DIV.querySelector(".codeBlock");
            if (initScript) {
                doc.body.appendChild(DIV);
                DIV.style.display = "none";
                eval(initScript.innerHTML.replace("<" + "!--", "").replace("--" + ">", ""));
                initScript.parentNode.removeChild(initScript);
                if (done) done(DIV);
            }
        };
    };

    window.animobile = {
        serverUrl: "http://mad.aniparti.com",/* http://pixi.aniparti.pk http://mad.aniparti.com */
        appUrl: "http://blmani.com/aniparti_fan/com/",
        components: {},
        defaultStateObjects: [],
        defineComponent: function (uuid, comp) {
            this.components[uuid] = comp;
            if (comp.init) comp.init();
        },

        compileStateAttributes: function (attributes) {
            var stateAttributesCompiled = {};

            attributes.forEach(function (att, index) {
                var funcGet, funcSet;

                var getValue = 'return(this.' + att + '); ',
                    setValue = 'this.' + att + '=value; ';

                if (att.indexOf("##") == 0) {
                    att = att.replace("##", "");
                    getValue = 'return parseFloat(this.' + att + '); '
                    setValue = 'this.' + att + '=parseFloat(value); ';
                }
                else if (att.indexOf("#") == 0) {
                    att = att.replace("#", "");
                    getValue = 'return parseInt(this.' + att + '); '
                    setValue = 'this.' + att + '=parseInt(value); ';
                }



                eval('funcGet=function(){' + getValue + '}');
                eval('funcSet=function(value){' + setValue + '}');
                stateAttributesCompiled[att] = [funcGet, funcSet];
            });
            return (stateAttributesCompiled);
        }
    };
    animobile.api = function (api, data, success, failed, binary) {
        var request = {
            url: "http://blmani.com/aniparti_fan/wp-json/aniparti/" + api, method: "POST", dataType: "json",
            success: function (res) {
                success(res);
            },
            error: function (err) {
                if (failed) failed(err.responseJSON);
                else console.error(err);
            },
        };
        if (api.indexOf('http')>-1) {
            request.url = api;
        }
        if (!binary) {
            request.data = data;
        }
        else {
            request.contentType = false;
            request.processData = false;
            delete request.dataType;
            request.data = data;
        }
        $.ajax(request);
    };
    animobile.saveRepo = function (repo, type, scope, path, done, compressContent) {
        repo.type = type;
        repo.scope = scope;
        repo.repo_path = repo.repo_path || path;
        repo.tags = repo.tags || "";
        repo.ref_key = repo.ref_key || "";
        repo.status = repo.status || 0;
        repo.description = repo.description || "";
        if (compressContent) {
            repo.content = LZString.compressToEncodedURIComponent(repo.content);
        }
        console.log("save repo", repo);
        animobile.api('save_repo', repo, function (res) {
            if (res.id) repo.id = res.id;
            done(repo);
        });

    };

   //animobile.serverUrl = "http://pixi.aniparti.pk";
   //animobile.appUrl = "http://pixi.aniparti.pk";

    animobile.getRepo = function (id, done, decompressContent) {
        animobile.api('get_repo', {
            id: id
        }, function (res) {

            var repo = res;
            repo.content = LZString.decompressFromEncodedURIComponent(repo.content);

            done(repo);
        });
    };

    animobile.deleteRepo = function (id, done) {
        animobile.api('delete_repo', {
            id: id
        }, function (res) {
            done(res);
        });
    };
    
    animobile.defaultStateAttributes = animobile.compileStateAttributes("anipartiTemplateObject,#curveSmooth,objectType,playEffect,hideOnCreated,uuid,title,name,componentId,alphaValue,blurValue,cssAngle,tintValueRGBA,#left,#top,width,height,#angle,#fullAngle,##scaleX,##scaleY,#objectOpacity,#objectBlur,objectLock,objectHide,objectDock,repoType,repoId".split(","));
    animobile.defaultKeyframeAttributes = "left,top,scaleX,scaleY,fullAngle,objectOpacity,objectBlur".split(",");
    
    animobile.showProcessing = function (elm) {
        elm = elm || document.body;
        if (!elm.showProcessing) {
            elm.showProcessing = document.createElement('div');
            elm.showProcessing.innerHTML = '<div class="spinner"></div>';
            elm.showProcessing.classList.add('spinner-overlay');
            elm.appendChild(elm.showProcessing);
        }

    };
    animobile.hideProcessing = function (elm) {
        elm = elm || document.body;
        if (elm.showProcessing) {
            elm.showProcessing.parentNode.removeChild(elm.showProcessing);
            elm.showProcessing = null;
        }
    };
    

    animobile["languages"] = {};
    animobile.currentLanguage = "en";

    animobile["addLanguage"] = function (code, phrases, words) {

        var lng = {
            phrases: {},
            words: {}
        };
        //var ss = new Array();
        for (key in phrases) {

            // ss.push(phrases[key]);
            lng.phrases[key] = {
                rg: new RegExp(key, "g"),
                value: phrases[key],
                apply: function (content) {
                    content = content.replace(this.rg, this.value);
                    return (content);
                }
            };
        }

        for (key in words) {
            //   ss.push(words[key]);
            lng.words[key] = {
                rg: new RegExp(key, "g"),
                value: words[key],
                apply: function (content) {
                    content = content.replace(this.rg, this.value);
                    return (content);
                }
            };
        }

        animobile.languages[code] = lng;

        // console.log(ss.join("\r\n"));




    }

    animobile.setCurrentLanguage = function (key) {

        animobile.lng = animobile.languages[key];
        animobile.currentLanguage = key;
        if (!animobile.lng) animobile.currentLanguage = "EN";

    }
    animobile["applyLanguageToTitle"] = function (title) {
        if (animobile.currentLanguage == "en") return (title);

        if (animobile.lng.phrases[title])
            return animobile.lng.phrases[title].value;
        else if (animobile.lng.words[title])
            return animobile.lng.words[title].value;
        else
            return (title);

    };

    animobile["applyLanguageToSource"] = function (content, keys) {

        if (animobile.currentLanguage == "en") return (content);

        if (content == null) return (content);



        if (keys) {
            for (var i = 0; i < keys.length; i++) {
                content = content.replace(animobile.lng[keys[i]].rg, animobile.lng[keys[i]].value);
            }
        } else {
            try {
                for (key in animobile.lng.phrases) {

                    content = content.replace(animobile.lng.phrases[key].rg, animobile.lng.phrases[key].value);
                }

                for (key in animobile.lng.words) {

                    content = content.replace(animobile.lng.words[key].rg, animobile.lng.words[key].value);
                }
            } catch (ex) {
                console.log(ex.message);
                console.log(content);
            }

        }

        // console.log(content);
        return (content);




    }
    animobile.begin = function () {

        animobile.hideProcessing();
        ani.bindElements($(document), document);

        document.body.appendChild(document.animobileViews);

        document.body.appendChild(document.previewFrameArea);

        animobile.soundManager = new ani.soundManager();

        animobile.soundManager.loadBuffer = animobile.soundManagerLoadBuffer;

        animobile.prepareTimeline();
        animobile.registerComponents();
        animobile.initNewUI();
        animobile.setupCanvasZoomer = function () {
            document.canvasZoomer.ontouchstart = function () {
                this.currentZoom = animobile.canvas.currentZoom;

            };
            document.canvasZoomer.ontouchend = function () {
                this.value = 0;
            };
            document.canvasZoomer.oninput = function () {
                var z = ((parseInt(this.value)) / 80) + this.currentZoom;
                if (z < 0.02) z = 0.02;
                if (z > 10) z = 10;
                animobile.canvas.currentZoom = z;
                animobile.canvas.zoomToPoint(new ani.fabric.Point(
                    animobile.canvas.width * 0.5,
                     animobile.canvas.height * 0.5

                    ), animobile.canvas.currentZoom);
                animobile.canvas.absolutePan(animobile.canvas.pan);


            };
        };
        animobile.setupCanvasZoomer();

   
    };

    animobile.createCanvasArea = function (completed) {
        
        document.canvasFrame.onload = function () {
            var doc = this.contentDocument || this.contentWindow.document;
           

            doc.window.$ = jQuery;
            doc.window.LZString = LZString;
            doc.window.ani = window.ani;
            window.canvPIXI = doc.window.PIXI;
            doc.window.ani.initFabric(doc.window.fabric, doc.window.PIXI);
            doc.window.eval(animobile.pixiSpineCode);

            var canv = doc.createElement("canvas");
            canv.setAttribute("id", "animobile_stage");
            doc.body.appendChild(canv);
            doc.window.animobileCanvas = new doc.window.ani.canvas({ fabricCanvas: new doc.window.fabric.Canvas("animobile_stage") });
            animobile.canvas = doc.window.animobileCanvas;

            animobile.canvas.enablePIXI({
                antialias: true,
                transparent: true,
                resolution: 1
            });

            //animobile.canvas.pixiRenderer.backgroundColor = 0xff00ff;

            animobile.canvas.events("OnMouseDown", function (e) {
                if (animobile.canvas._activeObject && animobile.canvas._activeObject.ani) {
                    animobile.selectNode(animobile.canvas._activeObject.ani);

                }
            });

            animobile.canvas.events("DrageCanvas", function (e) {
                if (Math.abs(e.dx) > 50 || Math.abs(e.dy) > 50) return;
                animobile.canvas.changePan(animobile.canvas.pan.x - e.dx, animobile.canvas.pan.y - e.dy);

            });


            animobile.canvas.renderAll = function () {
                this.currentZoom = this.getZoom();
                var canvasToDrawOn = this.contextContainer;
                this.renderCanvas(canvasToDrawOn, this._objects);
                this.renderPIXI();
                return this;
            };

            animobile.canvas._renderBackground = function (ctx) {
                var x = -this.pan.x;
                var y = -this.pan.y;
                var z = this.currentZoom;
                var ww = 2500;
                ctx.lineWidth = 1; // / z;

                ctx.strokeStyle = "#ececec";
                ctx.beginPath();
                ctx.moveTo(x, -ww);
                ctx.lineTo(x, ww);
                ctx.moveTo(-ww, y);
                ctx.lineTo(ww, y);
                ctx.stroke();

                if (!animobile.canvas._activeObject) {
                    document.schemaDisplay.$.hide(true);
                }


            };

            animobile.canvas._renderObjects = function (ctx, objects) {
                var i, len;
                for (i = 0, len = objects.length; i < len; ++i) {
                    if (objects[i]) {
                        if (!objects[i].silented) objects[i].evented = !objects[i].objectLock;
                        objects[i].preRender(ctx);
                        objects[i].render(ctx);

                    }
                }
            };

            animobile.canvas.on("object:selected", function (e) {
                if (e.target.ani) animobile.displayObjectSchemas(e.target.ani);

            });


            animobile.canvas.on("object:modified", function (e) {
                if (e.target.ani) animobile.displayObjectSchemas(e.target.ani);
            });


           


            doc.window.onresize = function () {
                this.animobileCanvas.setViewport(this.$(this).width(), this.$(this).height());

                animobile.canvas.changePan(-animobile.canvas.width * 0.5, -animobile.canvas.height * 0.5);
            };
            doc.window.onresize();
            animobile.canvas.renderAll();

            animobile.events("CanvasCreated", []);
            if (completed) completed();

        };
       document.canvasFrame.src = "ani_canvas/ani_canvas.html?" + Date.now();

    };
    
    animobile.prepareTimeline = function () {
        animobile.timelineCanvas = ani.createCanvasObject($(window).width() - 0, 30);
        animobile.timelineCanvas.style.marginLeft = "0px";
        document.animobile_timeline.$.prepend(animobile.timelineCanvas);

        (function () {
            var easingFn = {};
            easingFn['dummy'] = function (t) { return t; };
            easingFn.linear = function (t) { return t; };
            easingFn.easingSinusoidalIn = function (t) { return -Math.cos(t * Math.PI / 2) + 1; };
            easingFn.easingSinusoidalOut = function (t) { return Math.sin(t * Math.PI / 2); };
            easingFn.easingSinusoidalInOut = function (t) { return -0.5 * (Math.cos(Math.PI * t) - 1); };
            easingFn.easingQuadraticIn = function (t) { return t * t; };
            easingFn.easingQuadraticOut = function (t) { return t * (2 - t); };
            easingFn.easingQuadraticInOut = function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; };
            easingFn.easingCubicIn = function (t) { return t * t * t; };
            easingFn.easingCubicOut = function (t) { return (--t) * t * t + 1; };
            easingFn.easingCubicInOut = function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; };
            easingFn.easingQuarticIn = function (t) { return t * t * t * t; };
            easingFn.easingQuarticOut = function (t) { return 1 - (--t) * t * t * t; };
            easingFn.easingQuarticInOut = function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; };
            easingFn.easingQuinticIn = function (t) { return t * t * t * t * t; };
            easingFn.easingQuinticOut = function (t) { return 1 + (--t) * t * t * t * t; };
            easingFn.easingQuinticInOut = function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; };
            easingFn.easingCircularIn = function (t) { return -(Math.sqrt(1 - (t * t)) - 1); };
            easingFn.easingCircularOut = function (t) { return Math.sqrt(1 - (t = t - 1) * t); };
            easingFn.easingCircularInOut = function (t) { return ((t *= 2) < 1) ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1); };
            easingFn.easingExponentialIn = function (t) { return Math.pow(2, 10 * (t - 1)) - 0.001; };
            easingFn.easingExponentialOut = function (t) { return 1 - Math.pow(2, -10 * t); };
            easingFn.easingExponentialInOut = function (t) { return (t *= 2) < 1 ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))); };
            easingFn.easingBackIn = function (t) { var s = 1.70158; return t * t * ((s + 1) * t - s); };
            easingFn.easingBackOut = function (t) { var s = 1.70158; return --t * t * ((s + 1) * t + s) + 1; };
            easingFn.easingBackInOut = function (t) { var s = 1.70158 * 1.525; if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s)); return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2); };
            easingFn.easingElasticIn = function (t) {
                var s, _kea = 0.1, _kep = 0.4;
                if (t === 0) return 0; if (t === 1) return 1;
                if (!_kea || _kea < 1) { _kea = 1; s = _kep / 4; } else s = _kep * Math.asin(1 / _kea) / Math.PI * 2;
                return -(_kea * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * Math.PI * 2 / _kep));
            };
            easingFn.easingElasticOut = function (t) {
                var s, _kea = 0.1, _kep = 0.4;
                if (t === 0) return 0; if (t === 1) return 1;
                if (!_kea || _kea < 1) { _kea = 1; s = _kep / 4; } else s = _kep * Math.asin(1 / _kea) / Math.PI * 2;
                return (_kea * Math.pow(2, -10 * t) * Math.sin((t - s) * Math.PI * 2 / _kep) + 1);
            };
            easingFn.easingElasticInOut = function (t) {
                var s, _kea = 0.1, _kep = 0.4;
                if (t === 0) return 0; if (t === 1) return 1;
                if (!_kea || _kea < 1) { _kea = 1; s = _kep / 4; } else s = _kep * Math.asin(1 / _kea) / Math.PI * 2;
                if ((t *= 2) < 1) return -0.5 * (_kea * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * Math.PI * 2 / _kep));
                return _kea * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * Math.PI * 2 / _kep) * 0.5 + 1;
            };
            easingFn.easingBounceIn = function (t) { return 1 - easingFn.easingBounceOut(1 - t); };
            easingFn.easingBounceOut = function (t) {
                if (t < (1 / 2.75)) { return 7.5625 * t * t; }
                else if (t < (2 / 2.75)) { return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75; }
                else if (t < (2.5 / 2.75)) { return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375; }
                else { return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375; }
            };
            easingFn.easingBounceInOut = function (t) { if (t < 0.5) return easingFn.easingBounceIn(t * 2) * 0.5; return easingFn.easingBounceOut(t * 2 - 1) * 0.5 + 0.5; };

            animobile.timelineCanvas.easingFn = easingFn;
            animobile.timelineCanvas.easingNames = [];
            
            for (var k in easingFn) {
                animobile.timelineCanvas.easingNames.push(k);
            }
          //  console.log(animobile.timelineCanvas.easingNames.join('\n'));
                
        })();


        ani.extend(animobile.timelineCanvas, {
            timelineSpan: 0, timelineUnitSize: 8, timelineTracker: 0,
            timelineSnapValue: 50,
            updateTimelineTimeDisplay: function () {
                var secs = this.timelineTracker / 1000;

                document.playTimeMili.$.html(ani.padString(parseInt(this.timelineTracker % 1000) + '', '000'));

                document.playTimeSec.$.html(ani.padString(parseInt(secs % 60) + '', '00'));
                secs /= 60;
                document.playTimeMin.$.html(ani.padString(parseInt(secs % 60) + '', '00'));
                secs /= 60;
                document.playTimeHour.$.html(ani.padString(parseInt(secs % 24) + '', '00'));
            },
            setTimelineTrackerValue: function (ms) {
                if (ms < 0) ms = 0;
                animobile.timelineCanvas.timelineTracker = ms;
                document.timelineTracker.style.left = (((animobile.timelineCanvas.timelineTracker / 100) * animobile.timelineCanvas.timelineUnitSize) - animobile.timelineCanvas.timelineSpan) + "px";
                document.timelineTrackerTime.$.text((ms / 1000).toFixed(2));

                this.updateTimelineTimeDisplay();

            }
        });


        animobile.timelineCanvas.render = function () {
            if (this.timelineSpan < 0) this.timelineSpan = 0;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, this.width, this.height);
            var miliSecond = this.timelineUnitSize;
            var seconds = miliSecond * 10;
            ctx.lineWidth = 1;
            ctx.strokeStyle = "gray";
            ctx.beginPath();

            var pan = this.timelineSpan;
            var w = this.width;
            var x = 0;


            var _miliSecond = miliSecond;


            if (_miliSecond < 4) _miliSecond = _miliSecond * 2;

            var xmStart = (-(pan % _miliSecond));


            for (x = xmStart; x < w; x += _miliSecond) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 10);
            }
            ctx.stroke();


            ctx.beginPath();
            ctx.strokeStyle = "silver";
            var xsStart = (-(pan % seconds));
            secStart = parseInt(pan / seconds);
            ctx.fillStyle = "#707070";

            for (x = xsStart; x < w; x += seconds) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 17);
                ctx.fillText(secStart, x - 5, 25);
                secStart += 1;
            }
            ctx.stroke();


            this.setTimelineTrackerValue(this.timelineTracker);

        };

        animobile.timelineCanvas.render();

        animobile.scrollNodeTimelines = function () {
            document.timelineNodesArea.$.find(".layerNode").each(function () {
                this.timeline[0].style.left = (-animobile.timelineCanvas.timelineSpan) + "px";
            });

        };

        document.timelineScroller.$.on("touchstart", function (e) {
            if (e.touches && e.touches.length == 1) {
                e.target.lastTouch = e.touches[0];
            }
        }).on("touchmove", function (e) {
            if (e.touches && e.touches.length == 1) {
                var touch = e.touches[0];

                var dx = touch.pageX - e.target.lastTouch.pageX;

                animobile.timelineCanvas.timelineSpan -= dx;
                e.target.lastTouch = touch;
                animobile.timelineCanvas.render();
                animobile.scrollNodeTimelines();

            }
        });

        $(animobile.timelineCanvas).on("touchmove", function (e) {
            if (e.touches && e.touches.length == 1) {
                var touch = e.touches[0];
                var x = (touch.pageX - 0) + animobile.timelineCanvas.timelineSpan;
                var v = animobile.timelineCanvas.timelineUnitSize / 128;
                animobile.timelineCanvas.setTimelineTrackerValue(parseInt(parseInt((x / v)) * (100 / 128)));

                animobile.playTimeline(animobile.timelineCanvas.timelineTracker);
                animobile.canvas.renderAll();

                e.target.lastTouchX = touch.pageX;
            }

        });





        document.timelineNodesArea.dragable = true;
        document.timelineNodesArea.wholeArea = true;
        document.timelineNodesArea.$.touchDragingArea({
            drageEnd: function (elm) {
                if (!elm) return;
                if (elm.frame) {
                    elm.block$.orderKeyframes();

                }
                else if (elm.isBlock) {
                   
                    elm.updateChildBlocks();
                }
                else if (elm.isBlockResizer) {
                    
                    elm.block$.updateChildBlocks();
                    elm.block$.blockSizeChanged();
                }
            },
            drageStart: function (elm) {

                animobile.timelineCanvas.currentKeyframe = false;

                if (elm.isFrame) {

                    animobile.selectKeyframe(elm);

                    animobile.timelineCanvas.setTimelineTrackerValue(elm.block$.data.time + elm.data.time);

                    animobile.selectTimelineBlock(elm.block$, false, true);
                }
                else if (elm.isBlock) {
                    animobile.selectTimelineBlock(elm, true);

                }
              


            },
            drageElement: function (elm, x, y, dx, dy) {


                if (elm.isNode || elm.wholeArea) {

                    animobile.timelineCanvas.timelineSpan -= dx;
                    animobile.timelineCanvas.render();
                    animobile.scrollNodeTimelines();
                    return;
                }

                var time = parseInt((x / (animobile.timelineCanvas.timelineUnitSize / (100 / animobile.timelineCanvas.timelineSnapValue)))) * animobile.timelineCanvas.timelineSnapValue;
                if (time < 0) time = 0;
                

                if (elm.isFrame || elm.isBlockResizer) {
                   
                    if (elm.isFrame && elm.data.isFixed) return;
                    
                    if (elm.isFrame && elm.parentNode.data.restrictKeyframes) {
                        if (time > elm.parentNode.data.timeSize) time = elm.parentNode.data.timeSize;
                    }
                    elm.data.time = time;
                    elm.style.left = (((elm.data.time / 100) * animobile.timelineCanvas.timelineUnitSize)) + "px";
                    if (elm.isFrame) {
                        animobile.timelineCanvas.setTimelineTrackerValue(elm.parentNode.data.time + elm.data.time);
                        elm.parentNode.adjustSize();
                        animobile.playTimeline(elm.parentNode.data.time + elm.data.time);

                    }
                    else {
                        elm.block$.data.timeSize = time;
                        animobile.timelineCanvas.setTimelineTrackerValue(elm.block$.data.time + elm.block$.data.timeSize);
                        elm.block$.applyBlockSize();
                    }
                   
                }
                else if (elm.isBlock) {
                    elm.data.time = time;
                    elm.adjustPosition();
                    animobile.timelineCanvas.setTimelineTrackerValue(elm.data.time);

                }

            }
        });


        document.timelineNodes.$.handleTap({
            singleTap: function (e) {

                var dataAction = e.getAttribute("data-action");

                if (dataAction) {
                    setTimeout(function (dataAction) { eval(dataAction); }, 100, dataAction);
                    return;
                }

                if (e.parentNode.fabric) {
                    if (animobile.displayObjectSchemas.currentObject) return;

                    if (e.parentNode.fabric.timelineBlock) animobile.selectTimelineBlock(e.parentNode.fabric.timelineBlock);


                    animobile.canvas.setActiveObject(e.parentNode.fabric);
                    setTimeout(function (e) {

                        //   document.timelineNodes.$.find(".layerNode").hide();
                        animobile.selectNode(e.parentNode);

                        e.parentNode.fabric.hasControls = false;
                  
                        animobile.displayObjectSchemas(e.parentNode);
                    
                        //e.parentNode.$.show();
                        animobile.silentCanvasObjects();
                        animobile.canvas.renderAll();

                    }, 100, e);

                    document.schemaDisplayExitButton.onclick = function () {
                        //document.timelineNodes.$.find(".layerNode").show();
                  
                        animobile.displayObjectSchemas.currentObject.hasControls = true;
                        animobile.displayObjectSchemas.currentObject = false;
                        animobile.unSilentCanvasObjects();
                    };
                }



            }

        })

        animobile.unSelectTimelineBlocks = function () {
            document.timelineNodes.$.find(".timeline-block.selected").removeClass("selected");

        };
        animobile.selectTimelineBlock = function (block$, selectFabric, skipKeyframeSelection) {

            if (animobile.timelineCanvas.currentBlock$ && animobile.timelineCanvas.currentBlock$.uuid == block$.uuid) return;

            document.timelineNodes.$.find(".timeline-block.selected").removeClass("selected");
            block$.$.addClass("selected");
            block$.parentNode.appendChild(block$);
            animobile.timelineCanvas.currentBlock$ = block$;
          

            if (block$.data.parentId) {
                block$.parentNode.$.addClass("selected");
            }

            if (!skipKeyframeSelection) {
                animobile.timelineCanvas.setTimelineTrackerValue(block$.data.time);
                if (block$.frames$ && block$.frames$.length > 0) {


                }
            }


            animobile.events("TimelineBlockSelected", [block$]);

        };

        animobile.selectKeyframe = function (frame$, selectFabric) {
            document.timelineNodes.$.find(".timeline-frame.selected").removeClass("selected");
            frame$.$.addClass("selected");
            animobile.timelineCanvas.currentKeyframe$ = frame$;
            animobile.playTimeline.lastCoordsTime = -100;
            animobile.playTimeline(frame$.block$.data.time + frame$.data.time - 1);
            animobile.playTimeline(frame$.block$.data.time + frame$.data.time + 1);
            frame$.node$.fabric.setCoords();
            console.log("frame", frame$.data);
            if (selectFabric) {

                //if (!frame$.owner.fabric.silented) vidlay.canvas.setActiveObject(frame$.owner.fabric);

                animobile.canvas.renderAll();
            }

            animobile.events("TimelineBlockFrameSelected", [frame$]);
        };

        document.timelineButtons.$.find("span").click(function () {
            if ($(this).hasClass("playTimelineButton")) {


                animobile.playingTimeline.playing = true;

                document.timelineButtons.$.addClass("playing");

                animobile.playingTimeline.timer = Date.now();

                animobile.timelineCanvas.timelineTracker = 0;

                animobile.timelineBlocks$.each(function () {
                    this.data.hasStarted = 0;
                    this.data.hasEnded = 0;
                    this.data.handleEnding = 0;
                });

                animobile.playingTimeline();
            }
            else {
                animobile.stopAllSounds();

                animobile.playingTimeline.playing = false;

                document.timelineButtons.$.removeClass("playing");
            }


        });

        animobile.stopTimelinePlaying = function () {
            if (animobile.playingTimeline.playing) {
                animobile.stopAllSounds();

                animobile.playingTimeline.playing = false;

                document.timelineButtons.$.removeClass("playing");
            }
        }

    };
    
    animobile.silentCanvasObjects = function () {
        animobile.canvas.forEachObject(function (obj, index) {
            obj.evented = false;
            obj.silented = true;
        });
        animobile.canvas.renderAll();
    };

    animobile.unSilentCanvasObjects = function () {
        animobile.canvas.forEachObject(function (obj, index) {
            obj.evented = !obj.objectLock;
            obj.silented = false;
        });
        animobile.canvas.renderAll();
    };



  
    animobile.error = function (title, message) {
        var md = ani.modals.open({ element: $(animobile.errorModal) });
        md.ready = function () {
            var md = this;
            this.$.find(".errorTitle").html(title);
            this.$.find(".errorMessage").html(message);
            md.onclick = function () {
                md.close();
            }

        };
        return (md);
    };


    animobile.success = function (title, message) {
        var md = ani.modals.open({ element: $(animobile.successModal) });
        md.ready = function () {
            var md = this;
            this.$.find(".successTitle").html(title);
            this.$.find(".successMessage").html(message);
            md.onclick = function () {
                md.close();
            }

        };
        return (md);
    };

    animobile.expandCurrentNode = function () {

        if (animobile.currentNode) animobile.currentNode.classList.toggle('expanded');
    };

   
    animobile.playTimeline = function (clockTime) {
        if (animobile.playTimeline.playingTrack || !animobile.timelineBlocks$) return;
        var lt, pi, _time1, _time2, frame, frame1, frame2, f1x, f1y, f2x, f2y, k, f, blockTime, frame$1, frame$2;
        var blockTimeWidth, refTime, setBlockTime, blockLifeTime, blockRepeat, blockBeginEnd, easing, keyState;

        animobile.playTimeline.playingTrack = true;

        animobile.timelineBlocks$.each(function () {
            blockBeginEnd = 0;
            var block = this.data;
            var block$ = this;
            blockRepeat = block.repeat;

            if (blockRepeat == 0) blockRepeat = 1000000;
            blockTimeSize = block.timeSize;
            blockTime = block.time;

            if (clockTime < blockTime) {
                block.hasStarted = 0;
                block.hasEnded = 0;
            }
            refTime = blockTime - clockTime;

            blockLifeTime = blockTimeSize * blockRepeat;

            if (refTime < -blockTimeSize) {
                setBlockTime = true;
                if (refTime <= -blockLifeTime) {
                    if (block.hasEnded == 0) {
                        block.hasEnded = 1;
                        block.hasStarted = 0;
                        if (block.handleEnding == 1) {
                            return;
                        }
                        else {
                            clockTime = blockTime + blockLifeTime;
                            setBlockTime = false;
                        }
                    }
                    else return;
                }
                // console.log("setBlockTime", setBlockTime);
                if (setBlockTime) blockTime = block.time + Math.abs((parseInt(refTime / blockTimeSize)) * blockTimeSize);
            }

          //  console.log(clockTime + " | " +blockTime+ " | " + blockTimeSize);



            if (block.hasStarted == 0 && clockTime >= blockTime) {
                if (block.hasEnded == 1 && block.handleEnding == 0) {
                    block.handleEnding = 1;
                    console.log("block.hasEnded");
                    blockBeginEnd = 2;
                }
                else {
                    block.handleEnding = 0;
                    block.hasEnded = 0;
                    block.hasStarted = 1;
                    console.log("block.hasStarted");
                    blockBeginEnd = 1;
                    if (animobile.playingTimeline.playing) {
                        if (block.actionBlock) {
                            console.log("block.actionData", block.actionData)
                            if (block.actionData.actionName == "PlaySound") {
                                var source = animobile.___soundSources[block.actionData.SoundName];
                                if (!source) {
                                    animobile.___soundSources[block.actionData.SoundName] =new animobile.soundManager.createSource();
                                    source = animobile.___soundSources[block.actionData.SoundName]
                                }
                                source.startBuffer(block.actionData.SoundName, block.actionData.Speed / 50, block.actionData.Repeat);
                                source.setVolume(block.actionData.Volume);
                               


                            }
                            return;
                        }
                    }

                }
            }
           

            if (block.actionBlock) {
                if (block.actionData.actionName == "TimeTick") {

                    block$.node$.fabric.timeTick(block, 0, clockTime, blockTime, blockTimeSize);

                }
            }

            if (block.noKeyframes) return;

            // console.log(clockTime, blockTime + blockTimeSize);
            if (blockRepeat > 1) {
                blockBeginEnd = 0;
            }

            if (clockTime >= blockTime && clockTime <= blockTime + blockTimeSize && this.frames$.length>1) {
                pi = 0;
                for (f = 0; f < this.frames$.length; f++) {
                    frame = this.frames$[f].data;
                    _time1 = (frame.time) + blockTime;
                    if (f > 0) {
                        if (clockTime >= lt && clockTime <= _time1) pi = f;
                    }
                    lt = _time1;
                }
                
                if (blockBeginEnd == 1) {
                    pi = 1;
                }
                else if (blockBeginEnd == 2) {
                    pi = this.frames$.length - 1;
                }
                
                if (pi > 0) {
                    frame$1 = this.frames$[pi - 1];
                    frame$2 = this.frames$[pi];
                    try {
                        frame1 = frame$1.data;
                        frame2 = frame$2.data;

                    } catch (ee) {
                        console.log("pi ", pi + " | " + this.frames$.length);
                        throw ee;
                    }
                  
                    _time1 = (frame1.time) + blockTime;
                    _time2 = (frame2.time) + blockTime;

                    j = (clockTime - _time1) / (_time2 - _time1);
                    dt = (1 - j);


                    if (frame$1.node$.fabric) {
                        for (k in frame1.keys) {

                            var key1 = frame1.keys[k];
                            var key2 = frame2.keys[k];
                            
                            if (key2.easing)
                                j = animobile.timelineCanvas.easingFn[key2.easing](j);


                            frame$1.node$.fabric.class.stateAttributes[k][1].apply(frame$1.node$.fabric,
                               [parseFloat(key1.value) + (parseFloat((key2.value) - parseFloat(key1.value)) * j)]
                               );



                        }
                    }


                }
            }





        });


        if (animobile.canvas._activeObject) {
            if (clockTime - animobile.playTimeline.lastCoordsTime > 100) {
                animobile.playTimeline.lastCoordsTime = clockTime;
                animobile.canvas._activeObject.setCoords();

            }
            if (!animobile.playingTimeline.playing) {
                animobile.events("OnTimeline", [clockTime]);
            }
        }
        animobile.playTimeline.playingTrack = false;



    };
    animobile.playTimeline.lastCoordsTime = 0;

    animobile.playingTimeline = function () {

        var timer = Date.now();
        var diff = timer - animobile.playingTimeline.timer;

        animobile.timelineCanvas.timelineTracker += diff;
        animobile.timelineCanvas.setTimelineTrackerValue(animobile.timelineCanvas.timelineTracker);
        animobile.playTimeline(animobile.timelineCanvas.timelineTracker);
        animobile.canvas.renderAll();

        animobile.playingTimeline.timer = timer;
        if (animobile.playingTimeline.playing) requestAnimationFrame(animobile.playingTimeline);

    }
    animobile.playingTimeline.playing = false;

    animobile.___soundSources = {};
    animobile.stopAllSounds = function () {
        for (var s in this.___soundSources)
            this.___soundSources[s].stopBuffer();

    };

    animobile.pauseAllSounds = function () {
        for (var s in this.___soundSources)
            this.___soundSources[s].pauseBuffer();
    };

    animobile.resumeAllSounds = function () {
        for (var s in this.___soundSources)
            this.___soundSources[s].resumeBuffer();
    };
    animobile.playSoundBlock = function (block) {
        var source = this.___soundSources[block.soundGroup];
        if (!source) {
            this.___soundSources[block.soundGroup] = new this.soundManager.createSource();
            source = this.___soundSources[block.soundGroup]
        }
        source.startBuffer(block.soundName, block.speed / 50, block.repeat);
        source.setVolume(block.volume);

    };
    
    animobile.selectNode = function (node) {
        animobile.currentNode = node;
        document.timelineNodes.$.find(".layerNode").removeClass("selected");
        if (node.toolsOptions) {
            node.$.find(".nodeToolsOptions")[0].appendChild(node.toolsOptions);
        }
        node.$.addClass("selected");
        if (node.fabric) {
            animobile.canvas.setActiveObject(node.fabric);
            animobile.displayObjectSchemas(node);
            animobile.canvas.renderAll();
        }
    };
    
    animobile.newNode = function (node, parent$) {

        node.iconUrl = node.iconUrl || "ani_canvas/images/node.jpg";
        node.uuid = node.uuid || ani.guid();

        var node$ = $(ani.parseItemTags(animobile.nodeTemplate, function (k) { return (eval(k)) }));

        node$[0].$ = node$;
        parent$ = parent$ || document.timelineNodes.$;
        node$ = node$[0];
        node$.children$ = node$.$.find(".children:first");
        parent$.prepend(node$);




        node$.onclick = function (e) {
            animobile.selectNode(this);
            e.stopPropagation();
            e.preventDefault();
            return (false);
        };

        node$.setIcon = function (icon) {
            this.$.find(".nodeIcon:first")[0].src = icon;
        };
        node$.setTitle = function (title) {
            this.$.find(".nodeTitle:first").html(title);
        };

        node$.deleteNode = function () {
            if (this.onDeleting)
                if (!this.onDeleting()) return;

            this.$.remove();



        };

        if (node.title) node$.setTitle(node.title);

        node$.data = node;
        node$.$.attr("id", node.uuid);

        node$.timeline = node$.$.find(".timeline:first");
        node$.isNode = true;
        node$.dragable = true;

        node$.addTimelineBlock = function (block) {
            block = block || {};
            var node$ = this;
            var block$ = $('<div class="timeline-block"></div>');
            block$[0].$ = block$;
            block$ = block$[0];
            block$.data = block;
            block$.uuid = block.uuid || ani.guid();
            ani.extend(block$.data, {
                hasStarted: 0, hasEnded: 0, handleEnding: 0,
                repeat: block.repeat || 0, time: block.time || 0,
                timeSize: block.timeSize || (block.timeWidth || 1000),
                uuid: block$.uuid
            });

            block$.data.keyframeColor = block$.data.keyframeColor || "#ffffff";
            if (block$.data.cssClass) block$.$.addClass(block$.data.cssClass);

            block$.$.attr("id", block$.uuid);
            block$.isBlock = true;
            block$.node$ = this;
            block$.dragable = true;
            block$.style.width = (((block$.data.timeSize / 100) * animobile.timelineCanvas.timelineUnitSize)) + "px";
            block$.refreshKeyframes = function (adjustPosition) {
                var block$ = this;
                block$.frames$ = [];
                block$.$.find(".timeline-frame").each(function () {
                    if (adjustPosition) {
                        this.style.left = (((this.data.time / 100) * animobile.timelineCanvas.timelineUnitSize)) + "px";

                    }
                    block$.frames$.push(this);
                });
                block$.orderKeyframes();
            };
            block$.frames$ = [];
            block$.clearKeyframes = function () {
                var block$ = this;
                block$.frames$ = [];
                block$.$.find(".timeline-frame").remove();
            };

            block$.updateChildBlocks = function () {
                var self = this;
                console.log("updating child blocks");
                this.$.find(".timeline-block-child").each(function () {
                    this.data.time = self.data.time;
                    this.data.timeSize = self.data.timeSize;
                    
                    this.adjustPosition(true);
                    this.applyBlockSize();
                    this.restrictKeyframes();
                 

                });

            };
            block$.adjustPosition = function (dontMove) {
                if(!dontMove)  this.style.left = (((this.data.time / 100) * animobile.timelineCanvas.timelineUnitSize)) + "px";
                this.$.attr("time", this.data.time);
               
                this.blockTimeChanged();
            };
            block$.getSize = function () {
                var maxTime = -1;
                this.$.find(".timeline-frame").each(function () {
                    if (this.data.time > maxTime) maxTime = this.data.time;
                });
                return (maxTime);
            };

            block$.blockSizeChanged = function () { };
            block$.blockTimeChanged = function () { };
            block$.applyBlockSize = function () {
                this.style.width = ((((this.data.timeSize) / 100) * animobile.timelineCanvas.timelineUnitSize)) + "px";

                this.$.attr("time-size", this.data.timeSize);
            };
            block$.restrictKeyframes = function () {
                if (!this.data.restrictKeyframes) return;
                var timeSize=this.data.timeSize;
                this.frames$.forEach(function (frame$) {
                    if (frame$.data.time > timeSize) {
                        frame$.data.time = timeSize;
                        frame$.style.left = (((frame$.data.time / 100) * animobile.timelineCanvas.timelineUnitSize)) + "px";

                    }

                });
            };
            block$.updateKeyframePositions = function () {
                this.frames$.forEach(function (frame$) {
                    frame$.style.left = (((frame$.data.time / 100) * animobile.timelineCanvas.timelineUnitSize)) + "px";
                });
            };

            block$.adjustSize = function () {
                if (!this.frames$ || this.data.restrictKeyframes) return;
                var minTime = 99999, maxTime = 0;
                this.$.find(".timeline-frame").each(function () {
                    if (this.data.time < minTime) minTime = this.data.time;
                    if (this.data.time > maxTime) maxTime = this.data.time;
                });
                this.data.timeSize = maxTime;
                this.applyBlockSize();
            };

            block$.orderKeyframes = function () {
                if (!this.frames$) return;
                this.frames$.sort(function (a, b) {
                    a.style.marginLeft = "0px";
                    b.style.marginLeft = "0px";
                    return a.data.time - b.data.time
                });
                this.frames$[this.frames$.length - 1].style.marginLeft = "-8px";
            };
            block$.adjustPosition();
            block$.delete = function () {
                this.$.remove();
                animobile.timelineBlocks$ =animobile.currentSlide$.$.find(".timeline-block");
            };

            node$.timeline.append(block$);

            block$.addKeyframe = function (frame) {
                var block$ = this;
                var frame$ = $('<div class="timeline-frame"></div>');
                frame$.css("background-color", block$.data.keyframeColor);
                frame$[0].$ = frame$;
                frame$ = frame$[0];
                frame$.data = frame || {};
                frame$.isFrame = true;
                frame$.node$ = this.node$;
                var maxTime = block$.getSize();
                if (maxTime < 0) maxTime = 0; else maxTime += 1000;
                frame$.data.time = frame$.data.time || maxTime;

                block$.$.append(frame$);
                frame$.block$ = block$;
                frame$.dragable =  true;


                frame$.style.left = (((frame$.data.time / 100) * animobile.timelineCanvas.timelineUnitSize)) + "px";
                block$.refreshKeyframes();


                if (frame$.node$.fabric && !frame$.data.keys) {
                    frame$.data.keys = {};
                    frame$.node$.fabric.getKeyframeState(frame$.data.keys);
                }
                return (frame$);

            };

            animobile.timelineBlocks$ = animobile.currentSlide$.$.find(".timeline-block");
            block$.compileToAniparti = function () {
                if (this.data.anipartiBlockData) {
                    return (this.data.anipartiBlockData);
                }
                else if (this.data.anipartiBlock) {
                    return (this.data);
                }
              


                var block = { time: this.data.time, timeWidth: this.data.timeSize, repeat: this.data.repeat };
                if (this.data.actionBlock) {
                    block.actionBlock = true;
                    if (this.data.actionData) {
                        block.actionData = JSON.parse(JSON.stringify(this.data.actionData));
                    }
                    else block.actionData = JSON.parse(JSON.stringify(this.data));
                    block.timeWidth = this.data.timeSize;
                    block.cssClass = this.data.cssClass;
                    block.active = true;
                } else if (this.data.info) {
                    block = JSON.parse(JSON.stringify(this.data));
                    block.timeWidth = this.data.timeWidth || this.data.timeSize
                    block.repeat = this.data.repeat;
                    block.time = this.data.time;
                   
                }
                else {
                    block = JSON.parse(JSON.stringify(this.data));
                    block.timeWidth = this.data.timeSize;
                    block.frames = [];
                    block.active = true;
                    block.speed = 1;
                    block.cssClass = this.data.cssClass;
                    block.blockStartShowObject = true;

                    var animobileBockFrameNames = "transformBlur,transformDepth,transformLookX,transformLookY,transformOpacity,transformPosX,transformPosY,transformRotation,transformScaleX,transformScaleY,transformTint,transformZoom".split(",");

                    var keyFrameEasingMapping = {
                        left: { e: "transformPosX", v: "x" },
                        top: { e: "transformPosY", v: "y" },
                        scaleX: { e: "transformScaleX", v: "scaleX" },
                        scaleY: { e: "transformScaleY", v: "scaleY" },
                        cssAngle: { e: "transformRotation", v: "cssAngle" },
                        fullAngle: { e: "transformRotation", v: "cssAngle" },
                        objectOpacity: { e: "transformOpacity", v: "alphaValue" }
                    };
                    animobileBockFrameNames.forEach(function (name) {
                        block[name] = false;
                    });
                    this.frames$.forEach(function (frame$) {
                        var frame = JSON.parse(JSON.stringify(frame$.data));
                        frame.curvePoint = { x: 0, y: 0, scaleX: 1, scaleY: 1, alphaValue: 100, angle: 1, cssAngle: 0, blurValue: 0, cx1: 0, cy1: 0, cx2: 0, cy2: 0, easingFunctions: {} };
                        animobileBockFrameNames.forEach(function (name) {
                           frame.curvePoint.easingFunctions[name] = "linear";
                        });
                        for (var k in frame.keys) {
                            var key = frame.keys[k];
                            var kf = keyFrameEasingMapping[k];
                            if (kf) {
                                block[kf.e] = true;
                                frame.curvePoint.easingFunctions[kf.e] = key.easing || "linear";
                                frame.curvePoint[kf.v] = key.value;
                            }
                        }
                        block.frames.push(frame);
                    });
                }

                if (this.node$.fabric) block.ani = this.node$.fabric.uuid;

            


                return (block);
            };

            if (block$.data.resizeable) {
                block$.$.addClass("resizeable");
                var resizer$ = $('<div class="block-resizer bmico bmico-top-arrow"></div>');
                resizer$[0].isBlockResizer = true;
                block$.$.append(resizer$);
                resizer$[0].block$ = block$;
                resizer$[0].dragable = true;
                resizer$[0].data = { time: block$.data.timeSize };
                resizer$[0].style.left = (((( block$.data.timeSize) / 100) * animobile.timelineCanvas.timelineUnitSize)) + "px";

            }
       

            if (block$.data.parentId) {
                var p$ = $("#" + block$.data.parentId);
                if (p$) {
                    p$.append(block$);
                    block$.$.addClass("timeline-block-child");
                    block$.style.left = "0px";

                }
            }


            if (block$.data.keyframes) {
                block$.data.keyframes.forEach(function (frame) {
                    block$.addKeyframe(frame);
                });
            }


            if (block$.data.actionData) {
                block$.data.blockTitle = block$.data.blockTitle || block$.data.actionData.actionName;
                block$.$.append('<div class="timeline-block-title"><label>' + (block$.data.blockTitle) + '</label></div>');
            }

            animobile.events("TimelineBlockCreated", [block$]);
            return (block$);


        };


        return (node$);
    };
  

    animobile.newSlide = function (slide) {
        var newSlide = false;
     

        slide = slide || {};
        slide.title = slide.title || "Slide " + document.timelineNodes.$.find(".ani-slide").length;

        if (!slide.uuid) {
            newSlide = true;
        }
        var slide$ = animobile.newNode(slide);
        document.timelineNodes.$.append(slide$);


        slide$.setTitle('<i class="fa fa-list"></i>');

        slide$.data.slidePlayTime = slide$.data.slidePlayTime || 3.00;

      

        slide$.$.addClass("ani-slide expanded");
        animobile.currentSlide$ = slide$;
        slide$.orderLayers = function (skipObjects) {

            var slide$ = this;
            slide$.layers.forEach(function (layer$, index) {

                slide$.pixiContainer.addChildAt(layer$.pixiContainer, 0);


                if (!skipObjects) {
                    var orderIndex = 0;

                    layer$.children$.find('.ani-object').each(function () {
                        if (this.fabric) {
                            this.fabric.sendToBack();
                            if (this.fabric.pixiObject) {
                                this.parentNode.parentNode.pixiContainer.addChildAt(this.fabric.pixiObject, 0);

                            }
                            if (this.orderChilds) this.orderChilds();
                        }
                    });
                }

            });
        };
        slide$.orderChilds = function () {
            var slide$ = this;
            slide$.layers = [];
            slide$._layers = {};
            this.children$.find('.ani-layer').each(function () {
                slide$.layers.push(this);
                slide$._layers[this.data.uuid] = this;
            });


            this.orderLayers();
            setTimeout(function () { animobile.canvas.renderAll(); }, 100);
            this.children$.find('.ani-camera').each(function () {
                //slide$.children$.prepend(this);
            });



        };

        slide$.pixiContainer = animobile.canvas.createPIXIContainer();

        animobile.canvas.pixiDisplayStage.addChild(slide$.pixiContainer);

        Sortable.create(slide$.children$[0], {
            group: {
                name: 'ani-slide',
            },
            handle: ".sort-handle",
            onEnd: function (evt) {
                animobile.currentSlide$.orderChilds();
            }
        });

        slide$.deleteNode = function (silent) {
            animobile.hideOptionTools();

            delete this.cameras;
            delete this.layers;
            delete this._layers;
            this.$.find(".ani-layer,.ani-timeline,.ani-camera").each(function () {
                this.deleteNode(silent);
            });
            animobile.canvas.pixiDisplayStage.removeChild(this.pixiContainer);

            this.$.remove();

            animobile.allSlides$ = document.timelineNodes.$.find(".ani-slide");
            document.currentSlideIndex.value--;
            if (document.currentSlideIndex.value < 0) document.currentSlideIndex.value = 0;

            setTimeout(function () { animobile.moveSlideIndex(document.currentSlideIndex.value); }, 100);
            if (!silent) {
                animobile.canvas.renderAll();
            }
        };


        slide$.$.find(".titleArea:first").attr("data-action", "animobile.showSlideSelection()");

        slide$.hideObjects = function () {
            this.children$.find('.ani-object').each(function () {
                this.fabric.setVisible(false);
            });
        };

        slide$.showObjects = function () {
            this.children$.find('.ani-object').each(function () {
                if (!this.fabric.objectHide) this.fabric.setVisible(true);

            });

        };

        slide$.activate = function () {

            document.timelineNodes.$.find(".ani-slide").each(function () {
                this.$.hide();
                this.hideObjects();
            });

            this.$.show();
            animobile.currentSlide$ = this;
            animobile.currentLayer$ = this.$.find(".ani-layer")[0];
            this.showObjects();
            animobile.timelineBlocks$ = animobile.currentSlide$.$.find(".timeline-block");
            animobile.canvas._discardActiveObject();
            if(this.currentCamera$)  animobile.canvas.renderAll();

        };

        slide$.compileData = function () {
            var slide$ = this;
            var data = {
                uuid: this.data.uuid,
                name: this.data.name,
                title: this.data.title,
                actionTimelines: [{blocks:[]}],
                cameras: [],
                layers: [],
                timelineBlocks: [],
                activeCameraId: this.currentCamera$.fabric.uuid,
                preloading: [],
                mappingNames: {},
                donotPublishSlide: this.data.donotPublishSlide,
                resetOnActivate: this.data.resetOnActivate,
                resetAfterSeconds: this.data.resetAfterSeconds,
                timelineSet: this.data.timelineSet,
                timelineSets: this.data.timelineSets,
                dataKey: this.data.dataKey,
                dataTitle: this.data.dataTitle,
                setForAds: this.data.setForAds,
                playMode: this.data.playMode,
                slidePlayTime: this.data.slidePlayTime

            };
            slide$.timeline.find('.timeline-block').each(function () {
                var block = this.compileToAniparti();
                data.actionTimelines[0].blocks.push(block);
                if (block.actionBlock && block.actionData.actionName == "PlaySound") {
                    data.preloading.push({ soundBuffer: block.actionData.SoundName });
                }
               
            });
            return (data);
            
        };

        slide$.compileState = function () {
            
            var slideData = this.compileData();
           

            slideData.layers = [];
            slideData.cameras = [];

            this.children$.find('.ani-camera').each(function () {
                var obj = this.fabric.compileStateData(slideData.preloading);
                slideData.cameras.push(obj);
            });

            this.children$.find('.ani-layer').each(function () {
                var layer = JSON.parse(JSON.stringify(this.data));
                layer.objects = [];
                this.children$.find(".ani-object").each(function () {
                    if (this.fabric.class) {
                        var obj = this.fabric.compileStateData(slideData.preloading);
                        layer.objects.push(obj);
                    }


                });
                layer.objects.reverse();
                slideData.layers.push(layer);
            });

            slideData.layers.reverse();



            return (JSON.parse(JSON.stringify(slideData)));
        };

        slide$.createSwitchSlideBlock = function () {
            this.addTimelineBlock({ actionBlock: true,resizeable:true, actionData: { actionName: "SwitchToNextSlide" }, time: 3000, repeat: 1,timeSize:1500 });
        };
        if (newSlide) {
            slide$.createSwitchSlideBlock();
        }


        return (slide$);

    };

    animobile.newLayer = function (layer) {
        layer = layer || {};

        layer.title = layer.title || "Layer" + animobile.currentSlide$.$.find(".ani-layer").length;



        var layer$ = animobile.newNode(layer, animobile.currentSlide$.children$);

        layer$.setTitle('<i class="fa fa-copy"></i>');
        layer$.$.addClass("ani-layer expanded");
        animobile.currentLayer$ = layer$;
        layer$.pixiContainer = animobile.canvas.createPIXIContainer();
        animobile.currentSlide$.pixiContainer.addChild(layer$.pixiContainer);
        layer$.toolsOptions = document.layerToolsOptions;
        layer$.$.addClass("ani-layer");

        layer$.deleteNode = function (silent) {
            animobile.hideOptionTools();
            this.$.find(".ani-object").each(function () {
                animobile.canvas.deleteObject(this.fabric);
            });

            animobile.currentSlide$.pixiContainer.removeChild(this.pixiContainer);
            this.$.remove();
            if (!silent) {
                animobile.unSelectObject();
                animobile.canvas.renderAll();
            }

        };
        Sortable.create(layer$.children$[0], {
            group: {
                name: 'ani-layer',
            },
            handle: ".sort-handle",
            onEnd: function (evt) {
                animobile.currentSlide$.orderChilds();
            }
        });

        return (layer$);

    };

    animobile.newObject = function (obj, done, parent$) {
        obj = obj || {};

        obj.title = obj.title || "Object " + animobile.currentLayer$.$.find(".ani-object").length;
        parent$ = parent$ || animobile.currentLayer$.children$;
        var obj$ = animobile.newNode(obj, parent$);

        obj$.$.find(".nodeTitle:first").hide();

        obj$.$.addClass("ani-object");

        obj$.$.find(".bmico-eye-icon:first")[0].onclick = function () {
            this.parentNode.parentNode.$.toggleClass("hidden");
            var fabr = this.parentNode.parentNode.fabric;
            fabr.objectHide = this.parentNode.parentNode.$.hasClass("hidden");
            
            fabr.setVisible(!fabr.objectHide);
            animobile.canvas.renderAll();
        };
        obj.objectDock = obj.objectDock || 0;
        obj.repoType = obj.repoType || 0;
        ani.extend(obj, {
            originX: "center", originY: "center", centeredScaling: true,
            objectBlur: obj.blurValue, objectOpacity: obj.alphaValue, fullAngle: obj.cssAngle, angle: obj.cssAngle,
            preRender: function (ctx) {
                if (this.pixiObject) {
                    this.pixiObject.alpha = this.objectOpacity / 100;

                }


                this.angle = this.fullAngle;
            },
            onDeleting: function () {
                if (this.pixiObject) {
                    this.pixiObject.parent.removeChild(this.pixiObject);
                    this.pixiObject.destroy();
                }
            },
            showOnFront:function(){
                if (this.pixiObject) {
                    this.pixiObject.parent.addChild(this.pixiObject);
                   
                }

            },
            compileState: function () {
                var state = {};
                for (var a in this.class.stateAttributes) {
                    state[a] = this.class.stateAttributes[a][0].apply(this, []);
                }

                return (state);
            }
        });
        

        obj$.fabric = animobile.canvas.newObject(obj);
        obj$.fabric.fullAngle = obj.fullAngle;
        obj$.fabric.schemas = [animobile.defaultObjectSchema];
       


        //console.log("obj$.fabric", obj$.fabric);

        obj$.fabric.ani = obj$;

        obj$.fabric.objectLock = false;

        obj$.fabric.getKeyframeState = function (keys) {
            for (var i = 0; i < this.class.keyframeAttributes.length; i++) {
                keys[this.class.keyframeAttributes[i]] = this.class.stateAttributes[this.class.keyframeAttributes[i]][0].apply(this, []);
            }
        };


        obj$.fabric.saveStateAttributes = function () {
            this.setVisible(!this.objectHide);
        };
        obj$.fabric.preserveStateData = function () {
            var data = new Object();
            if (this.component) data.component = {};

            for (var k in this.class.stateAttributes) {
                var value = this.class.stateAttributes[k][0].apply(this, []);
                this.class.stateAttributes[k][1].apply(data, [value]);
            }
        };

        obj$.fabric.getStateData = function (preloadings) {
            var self = this;
            var data = new Object();
            if (this.component) data.component = {};
            

           
            data.timelines = [{blocks:[]}]; data.events = {};
            data.filters = { blur: false, opacity: true };
          

            for (var k in this.class.stateAttributes) {
                var value = this.class.stateAttributes[k][0].apply(this, []);
                this.class.stateAttributes[k][1].apply(data, [value]);
            }
           


            this.ani.timeline.find(".timeline-block").each(function () {
                var block = this.compileToAniparti();
                data.timelines[0].blocks.push(block);
                if (block.actionBlock && block.actionData.actionName == "TimeTick") {
                    console.log("timeline-block compile ", block);
                    console.log(self);
                }
               
                if (block.actionBlock && block.actionData.actionName == "PlaySound") {
                    preloadings.push({ soundBuffer: block.actionData.SoundName });
                }
            });

            data.cssAngle = data.fullAngle;
            data.alphaValue = data.objectOpacity;
            return (data);
        };
        obj$.fabric.compileStateData = function (preloadings) {
            return (this.getStateData(preloadings));
        }
        var componentId = obj.componentId;

        obj$.fabric.objectType = obj.objectType;
        obj$.fabric.tintValueRGBA = obj.tintValueRGBA || [];
        if (obj.objectType == "image") {
            componentId = "imageLayer1.0";
        }
        if (componentId) {
            var _Component = animobile.components[componentId];
            if (_Component) {
                _Component.create(obj$, function () {

                    if (obj$.fabric.pixiObject) {
                        animobile.currentLayer$.pixiContainer.addChild(obj$.fabric.pixiObject);
                    }
                    done(obj$);
                });
            }
            else {
                console.log("unknown component ", obj$.fabric.component);
                done(false);
                animobile.canvas.deleteObject(obj$.fabric);
                obj$.$.remove();

            }
            obj$.fabric.componentId = obj$.fabric.componentId || componentId;

            if (obj$.fabric.anipartiTemplateObject) {
                animobile.isAnipartiProject = true;
                obj$.fabric.lockMovementX = true;
                obj$.fabric.lockMovementY = true;
                obj$.fabric.lockRotation = true;
                obj$.fabric.lockScalingX = true;
                obj$.fabric.lockScalingY = true;
                obj$.fabric.lockUniScaling = true;
                obj$.fabric.hasControls = false;
                
            }



        }
       
        return (obj$);

    };

    animobile.deleteSlide = function () {

        if (animobile.allSlides$.length < 2) {

            animobile.error("Creations", "Cannot delete last slide");
            return;
        }
        console.log("confirm delete");

        animobile.confirm("Delete Slide", "Are you sure you want to <br/>delete current slide", function () {
            console.log("yes delete");

            animobile.currentSlide$.deleteNode();

        },"Delete","Cancel");

    };

    animobile.loadTimelines = function (node$, timelines) {
        timelines.forEach(function (timeline) {
            timeline.blocks.forEach(function (block) {

                if (animobile.loadTimelines.anipartiBlocks) {
                    var data = { time: block.time, timeSize: block.timeWidth || block.timeSize };
                    block.anipartiBlock = true;
                    data.anipartiBlockData = block;


                    var block$ = node$.addTimelineBlock(data);
                    
                }
                else {
                    console.log("load block", block);
                    node$.addTimelineBlock(block);
                }

               

               


            });
        });

    };
    animobile.loadTimelines.anipartiBlocks = false;

    animobile.loadSlide = function (slide, done) {
        var slide$ = animobile.newSlide(slide)
        slide$.activate();
        slide.cameras.forEach(function (camera) {
            camera.componentId = "camera1.0";
            slide$.currentCamera$ = animobile.newObject(camera, function () { }, slide$.children$);

            animobile.loadTimelines(slide$.currentCamera$, camera.timelines);
        });

        animobile.loadTimelines(slide$, slide.actionTimelines);
            
        eachItem(slide.layers, function (layer, nextLayer) {
            animobile.newLayer(layer);
            eachItem(layer.objects, function (obj, nextObject) {
                animobile.newObject(obj, function (obj$) {
                    if (obj$) {
                        animobile.loadTimelines(obj$, obj.timelines);
                    }
                   
                    nextObject.call();
                });
            }, function () { nextLayer.call(); });

        }, function () { done(slide$) });

        animobile.allSlides$ = document.timelineNodes.$.find(".ani-slide");
        document.currentSlideIndex.value = animobile.allSlides$.length - 1;
        document.currentSlideIndex.$.html(document.currentSlideIndex.value + 1);
    };
   
    animobile.sourceLoaders = [];
       
    animobile.loadProject = function (project, done) {


        var beginLoadProject = function (project) {
            animobile.isAnipartiProject = false;
            animobile.currentProject.projectSettings = project.projectSettings || {};

           

           
            console.log(project);
            document.timelineNodes.$.html("");
            animobile.showProcessing();

            if (project.slides.length == 0) {
                animobile.defaultProjectSettings({ cameraWidth: 720, cameraHeight: 1280 });
            }
            eachItem(project.slides, function (slide, nextSlide) {
                
                animobile.loadSlide(slide, function (slide$) {
                   
                    slide$.orderChilds();
                    setTimeout(function () { nextSlide.call(); }, 200);
                });
            }, function () {
                if (done) done();
                setTimeout(function () {
                    animobile.hideProcessing();
                    animobile.applyCameraSizeToSlides();
                    animobile.canvas.renderAll();
                    if (animobile.currentSlide$) animobile.currentSlide$.currentCamera$.fitScreen();
                    
                }, 500);
            });
        };
        eachItem(animobile.sourceLoaders, function (loader, next) {

            loader(project, function () {
                next.call();
            });
        }, function () { beginLoadProject(project); })


    }

    animobile.defaultProjectSettings = function (camera) {
        var set = animobile.currentProject.projectSettings;
        set.canvasWidth = set.canvasWidth || camera.cameraWidth;
        set.canvasHeight = set.canvasHeight || camera.cameraHeight;
        set.canvasSize = set.canvasSize || set.canvasWidth + 'x' + set.canvasHeight;
        set.videoRenderQuality = set.videoRenderQuality || "Medium";
        

    };

    animobile.createNewSlide = function (done) {
        var cameraWidth = animobile.currentProject.projectSettings.canvasWidth;
        var cameraHeight = animobile.currentProject.projectSettings.canvasHeight;

        var slideId = ani.guid();
        var slide = {
            "uuid": slideId, "name": "slide", "title": "slide", "actionTimelines": [{ "blocks": [], "name": "timeline.1", "title": "slide-timeline.1" }],
            "cameras": [{ "uuid": slideId + "-camera", noMasking: true, "lookX": 0, "lookY": 0, "zoomValue": 50, "cameraWidth": cameraWidth, "cameraHeight": cameraHeight, "cameraDepth": false, "left": 0, "top": 0, "width": cameraWidth, "height": cameraHeight, "scaleX": 1, "scaleY": 1, "angle": 0, "originX": "center", "originY": "center", "alphaValue": 100, "blurValue": 0, "cssAngle": 0, "tintValueRGBA": [255, 255, 255, 1], "nodeLock": false, "nodeVisible": true, "title": "camera.1", "name": "camera.1", "nodeExpended": true, "timelines": [{ "blocks": [] }] }],
            "layers": [
              {
                  "objects": []
                , "nodeLock": false, "nodeVisible": true, uuid: "MainSlideLayer", "title": "layer.1", "name": "layer.1", "nodeExpended": true
              }], "timelineBlocks": [], "activeCameraId": slideId + "-camera", "preloading": []
        };
        animobile.loadSlide(slide, function (slide$) {
            slide$.activate();
            animobile.canvas.renderAll();
            slide$.currentCamera$.fitScreen();
            slide$.createSwitchSlideBlock();
            if (done) done(slide$);
        });

    }
    animobile.loadSource = function (sourceStr) {
        var project = JSON.parse(LZString.decompressFromEncodedURIComponent(sourceStr));
        console.log(project);

        project = { slides: [] };
 
        animobile.loadProject(project, function () {
            animobile.createNewSlide(function (slide$) {
             //   slide$.setSoundBlock("/assets/5b3e26815c0619RC3Np", 3000, 3);
              //  slide$.setSoundBlock("/assets/5b3e3e749fe59Xoc6dh", 3000, 3);
                ///assets/
            });

                
        });
      // animobile.createNewSlide();
      //  animobile.compileProject();


    };
    
    animobile.spriteSheets = {};
    animobile.sourceCompilers = [];
   
    animobile.compileProject = function (noCompressString) {

        ani.extend(animobile.currentProject.projectSettings, {
            dataCollectionUrl: "http://analytics.aniparti.com/index.php?module=API&method=Aniparti.submit&"
          , dataKey: animobile.currentProject.projectSettings.dataKey || ani.guid()
          , dataTitle: animobile.currentProject.name
       , enableDataCollection: true
        });
        var project = {
            slides: [], components: {}, instantEffects: {}, loadedAmios: {},
            loadedEffects: {}, objectNameCounters: {}, plugins: {},
            projectSettings: animobile.currentProject.projectSettings || {},
            publishedFromServer: animobile.serverUrl.replace("http://", ""),
            spineAnimations: {}, spriteSheets: animobile.spriteSheets
        };
       

        document.timelineNodes.$.find(".ani-slide").each(function () {
            var slide = this.compileState();
            project.slides.push(slide);

        });

        animobile.sourceCompilers.forEach(function (compiler) {
            compiler(project);
        });
        console.log("compile", project);

        if (noCompressString) return (project);
      
        return (LZString.compressToEncodedURIComponent(JSON.stringify(project)));
    };

    animobile.registerComponents = function () {

        ani.editPages.events("OnUpdate", function (field, value, object, stateAttributes) {
            if (!object.saveStateAttributes) return;
            animobile.canvas.renderAll();
            if (animobile.savingObjectState) return;
            animobile.savingObjectState = true;
            object.saveStateAttributes()
            animobile.savingObjectState = false;
        });

        document.schemaDisplay.$._hide = document.schemaDisplay.$.hide;


        animobile.focusCanvasToObject = function (obj, paddings) {
            paddings = paddings || [20, 50, 20, 150];
            var cam = animobile.currentSlide$.currentCamera$.fabric;
            var ow = obj.width * obj.scaleX;
            var oh = obj.height * obj.scaleY;
            var ox = obj.left - ow * 0.5;
            var oy = obj.top - oh * 0.5;
            animobile.canvas.zoomFit(ox, oy, ow, oh, paddings);

        };
        


        document.schemaDisplay.$.hide = function () {
            animobile.displayObjectSchemas.events("OnHide", []);
            if(!animobile.displayObjectSchemas.preventHide)  document.schemaDisplay.$._hide();
        };
        animobile.displayObjectSchemas = function (node$,schemas) {

            animobile.displayObjectSchemas.preventHide = false;
            if (node$.fabric.class.resolveSchemas) node$.fabric.class.resolveSchemas(node$.fabric);


            document.schemaDisplay.$.find(".editPages").hide();
            animobile.displayObjectSchemas.currentObject = node$.fabric;


            schemas = schemas || node$.fabric.schemas;
            animobile.displayObjectSchemas.currentSchemas = schemas;

            schemas.forEach(function (sch) {
                sch.show();

                document.schemaDisplay.$.append(ani.editPages.run(sch, node$.fabric, node$.fabric.class.stateAttributes));
            });
            document.schemaDisplay.$.show();

        };

        animobile.displayObjectSchemas.events = new ani.eventSystem();

        animobile.displayObjectSchemas.refresh = function () {
            var self = this;
            if (self.currentObject) {

                animobile.displayObjectSchemas.currentSchemas.forEach(function (sch) {
                    ani.editPages.run(sch, self.currentObject, self.currentObject.class.stateAttributes);
                    
                });
            }

        };

        animobile.deleteObjectButton = function () {

            animobile.confirm("Delete Object", "Are you sure you want to <br/>delete current object", function () {
              
                if (animobile.displayObjectSchemas.currentObject) {
                    animobile.displayObjectSchemas.currentObject.ani.$.remove();
                    animobile.canvas.deleteObject(animobile.displayObjectSchemas.currentObject);

                    animobile.timelineBlocks$ = animobile.currentSlide$.$.find(".timeline-block");
                }

                animobile.displayObjectSchemas.currentObject = false;
                animobile.canvas.renderAll();


            }, "Delete", "Cancel");
           
        };

        animobile.duplicateObjectButton = function () {
            if (animobile.displayObjectSchemas.currentObject) {

                var obj = animobile.displayObjectSchemas.currentObject.compileStateData([]);
                obj.uuid = ani.guid();
                animobile.newObject(obj, function (obj$) {

                    setTimeout(function (obj$) {

                        animobile.selectNode(obj$);
                        animobile.displayObjectSchemas(obj$);
                    }, 100, obj$);

                }, $(animobile.displayObjectSchemas.currentObject.ani.parentNode));


            }

        };

    


        animobile.defaultObjectSchema = ani.editPages({
            items: [{
                title: animobile.defaultObjectSchemaTemplate, field: "generalObjectOptions",
                inputSettings: {
                    setValue: function () {
                        var compClass = "." + this.currentObject.componentId.replace(/\./g, '_');

                        $(this).find(".component").hide();
                        $(this).find(compClass).show();
                       


                         if (this.currentObject.objectLock) {
                             $(this).find(".lockButton").addClass("locked");
                         }
                         else $(this).find(".lockButton").removeClass("locked");

                         if (animobile.displayObjectSchemas.currentObject.anipartiTemplateObject) {
                             $(this).find(".advancedButton,.effectsButton").hide();
                         }
                         else {
                             $(this).find(".advancedButton,.effectsButton").show();
                         }

                         $(this).find(".effectsButton").hide();


                         $(this).find(".setImageButton,.setCharacterPos").hide();
                         if (animobile.displayObjectSchemas.currentObject.repoType == 14120) {
                             $(this).find(".setCharacterPos").show();
                         }
                         else if (animobile.displayObjectSchemas.currentObject.repoType == 14100 || animobile.displayObjectSchemas.currentObject.repoType == 14140) {
                             $(this).find(".setImageButton").show();
                         }

                    }
                },
                onInit: function (item$) {

                    item$.find(".lockButton")[0].onclick = function () {

                        animobile.displayObjectSchemas.currentObject.objectLock = !animobile.displayObjectSchemas.currentObject.objectLock;
                        $(this).toggleClass('locked');
                        animobile.canvas.renderAll();

                    }
                    item$.find(".advancedButton")[0].onclick = function () {

                        document.objectLayers.hideLayers();
                        animobile.displayObjectSchemas(animobile.displayObjectSchemas.currentObject.ani,
                            [animobile.objectManipulationSchema]);

                       // animobile.focusCanvasToObject(animobile.displayObjectSchemas.currentObject);

                    }
                    item$.find(".amioButton")[0].onclick = function () {
                        document.objectLayers.hideLayers();
                        animobile.displayObjectSchemas(animobile.displayObjectSchemas.currentObject.ani,
                            [animobile.components["amioImage1.0"].schema]);

                    }
                    item$.find(".textButton")[0].onclick = function () {
                        document.objectLayers.hideLayers();
                        animobile.displayObjectSchemas(animobile.displayObjectSchemas.currentObject.ani,
                            [animobile.components["masterText1.0"].schema]);

                    }
                    item$.find(".textEditButton")[0].onclick = function () {

                        document.objectLayers.hideLayers();
                        document.textEditArea.showEdit(animobile.displayObjectSchemas.currentObject.component.text, function (text) {
                            animobile.displayObjectSchemas.currentObject.component.text = text;
                            animobile.displayObjectSchemas.currentObject.updateTextBox();
                            animobile.canvas.renderAll();
                        });

                    }


                    /*
                    item$.find(".setImageButton").fileUploadButtonEx({
                        accept: "image/*", dataType: "arraybuffer",
                        onFileInput: function (files) {
                            animobile.components["imageLayer1.0"].setImage(animobile.displayObjectSchemas.currentObject, files[0]);
                          
                        }
                    });
                    */

                    item$.find(".pathEffectButton")[0].onclick = function () {
                        document.objectLayers.hideLayers();
                        animobile.OpenPathCurveEffect(animobile.displayObjectSchemas.currentObject.ani);

                    }

                    item$.find(".setCharacterPos")[0].onclick = function () {
                        animobile.components["imageLayer1.0"].setCharacterPos(animobile.displayObjectSchemas.currentObject);
                    };

                    item$.find(".setImageButton")[0].onclick = function () {

                        animobile.components["imageLayer1.0"].setImageFromLibrary(animobile.displayObjectSchemas.currentObject);

                       
                    };

                    item$.find(".soundButton")[0].onclick = function () {
                        document.objectLayers.hideLayers();
                        animobile.OpenPathCurveEffect(animobile.displayObjectSchemas.currentObject.ani,true);

                    }

                }
            }]
        });

        animobile.objectManipulationSchema = ani.editPages({
            items: [
                {
                     cssClass: "positionSchemaArea childSchemaAreas", items: [
                          { input: "text", touchControl: true, field: "#left", width: "50%", title: "Position X" },
                          { input: "text", touchControl: true, field: "#top", width: "50%", title: "Position Y" },
                     ]
                },
                 {
                     cssClass: "scaleSchemaArea childSchemaAreas", items: [
                              { input: "text", touchControlSpeed: 50, touchControl: true, field: "##scaleX", width: "50%", title: "Scale X" },
                             { input: "text", touchControlSpeed: 50, touchControl: true, field: "##scaleY", width: "50%", title: "Scale Y" },
                     ]
                 },
                {
                    cssClass: "rotateSchemaArea childSchemaAreas", items: [
                         { input: "slider", cssClass: "inputTitle20", title: "Rotate", field: "#fullAngle", max: 360 },
                    ]
                },
                 {
                     cssClass: "opacitySchemaArea childSchemaAreas", items: [
                          { input: "slider", cssClass: "inputTitle20", title: "Opacity", field: "#objectOpacity"},
                     ]
                 },

                {
                title: animobile.objectManipulationSchemaTemplate,
                onInit: function (item$) {
                    item$.find(".iconText").click(function () {
                        var schm = $(this).attr("schema-name");
                        if (schm == "duplicateButton") {
                            animobile.duplicateObjectButton();
                            return;
                        }
                        else if (schm == "closeButton") {
                          
                            animobile.displayObjectSchemas(animobile.displayObjectSchemas.currentObject.ani);
                            return;
                        }

                        item$.find(".iconText.selected").removeClass("selected");
                        $(this).addClass("selected");

                        item$.parent().find(".childSchemaAreas").hide();
                        item$.parent().find(schm).show();
                        


                    });



                    setTimeout(function (item$) {
                        item$.parent().find(".childSchemaAreas").hide();
                    }, 100, item$);
                    
                }
            }
           ]
        });



        animobile.addComponentLink = function (title, icon) {

            var a$ = $('<a href="#" class="shareToMail"><i class="mail-color fa ' + icon + '"></i><em>' + title + '</em></a>');
           

            return (a$);
        };

       
        animobile.defineComponent("imageLayer1.0", {
            resizeCanvas: ani.createCanvasObject(10, 10),
            resizeImage: new Image(),
            resize: function (image, size, done) {

                var self = this;
                
                if (image.width > size) {
                    image.height *= size / image.width;
                    image.width = size;
                }

                self.resizeCanvas.width = image.width;
                self.resizeCanvas.height = image.height;
                self.resizeCanvas.ctx.drawImage(image, 0, 0, image.width, image.height);


                self.resizeCanvas.toBlob(function (blob) {
                    self.resizeImage.onload = function () {
                        done(this);
                    };
                    self.resizeImage.src = window.URL.createObjectURL(blob);

                }, "image/png");


            },
            thumbnail: function (image, w,h, done) {
                ratio_orig = image.width / image.height;
                var nw = w, nh = h;
                if (w / h > ratio_orig) {
                    w = h * ratio_orig;
                } else {
                    h = w / ratio_orig;
                }
                var self = this;


                self.resizeCanvas.width = nw;
                self.resizeCanvas.height = nh;
              

                var x = (nw / 2) - (w / 2);
                var y = (nh / 2) - (h / 2);



                self.resizeCanvas.ctx.drawImage(image, 0, 0, image.width, image.height,x,y,w,h);

              

                self.resizeCanvas.toBlob(function (blob) {
                    self.resizeImage.onload = function () {
                        done(this);
                    };
                    self.resizeImage.src = window.URL.createObjectURL(blob);

                }, "image/png");


            },
            init: function () {
                this.stateAttributes = animobile.compileStateAttributes("imageUrl".split(","));
                ani.extend(this.stateAttributes, animobile.defaultStateAttributes);
                this.keyframeAttributes = animobile.defaultKeyframeAttributes.concat([]);

                animobile.addComponentLink("Image", "fa-image").fileUploadButtonEx({
                    accept: "image/*", dataType: "arraybuffer", multi: true,
                    onFileInput: function (file) {
                        animobile.components["imageLayer1.0"].addImageFromFiles(file);
                    }

                }).find("input").css("z-index", "99999");



            },
            resolveSchemas: function (fabric$) {


            },
            setImage: function (obj, file) {
                var _this = this;


                var showEditOptions = function (obj, img) {
                    if (!_this.setImagePopup) {
                        _this.setImagePopup = ani.modals.open({ element: animobile.confirmModal });
                        _this.setImagePopup.ready = function () {
                            var md = this;
                            md.setWidth("95%");

                            var height = ($(window).height() * 0.75) + "px";

                            md.setImageCanvasZoomer = $('<div class="range-slider  range-slider-icons" style="opacity:0.5;position:absolute;left:50%;top:0px;margin-left:-130px"><input class="ios-slider" style="width:200px" type="range" value="0" min="-20" max="20"></div>');


                            var iframe = $('<iframe style="width:100%;height:calc(100% - 20px);margin-top:20px"></iframe>');
                            md.$.find(".confirmMessage").css("display", "inline-block").
                                         css("height", height).css("max-height", height).css("vertical-align", "top").css("text-align", "left")
                                        .append(md.setImageCanvasZoomer).append(iframe);

                            md.$.find(".confirmModal").css("padding", "0").find(".confirmTitle").html("").css("border", "none");


                            md.$.find(".ani-modal-ok-button").html('Apply').css("margin-right", "25px").css("bottom", "-25px");
                            md.$.find(".ani-modal-cancel-button").html('Cancel').css("margin-left", "25px").css("bottom", "-25px");


                            iframe[0].onload = function () {
                                console.log("iframe onload", md.setImageCanvas);
                                if (md.setImageCanvas) return;
                                var doc = this.contentDocument || this.contentWindow.document;
                                doc.window.$ = jQuery;
                                doc.window.LZString = LZString;
                                doc.window.ani = window.ani;
                                var canv = doc.createElement("canvas");
                                canv.setAttribute("id", "imageLayer1_setImageCanvas");
                                doc.body.appendChild(canv);
                                doc.window.setImageCanvas = new doc.window.ani.canvas({ fabricCanvas: new doc.window.fabric.Canvas("imageLayer1_setImageCanvas") });
                                md.setImageCanvas = doc.window.setImageCanvas;




                                md.setImageCanvas.events("DrageCanvas", function (e) {
                                    if (Math.abs(e.dx) > 50 || Math.abs(e.dy) > 50) return;
                                    md.setImageCanvas.changePan(md.setImageCanvas.pan.x - e.dx, md.setImageCanvas.pan.y - e.dy);

                                });


                                doc.window.onresize = function () {
                                    md.setImageCanvas.setViewport(this.$(this).width(), this.$(this).height());

                                    md.setImageCanvas.changePan(-md.setImageCanvas.width * 0.5, -md.setImageCanvas.height * 0.5);
                                };
                                doc.window.onresize();
                                md.setImageCanvas.renderAll();
                                this.window = doc.window;
                                md.showEdit(obj, img);
                            };



                            iframe[0].src = "ani_canvas/ani_canvas.html?" + Date.now();

                            md.setImageCanvasIframe = iframe;
                            md.setImageCanvasZoomer = md.setImageCanvasZoomer.find("input")[0];
                            md.setImageCanvasZoomer.ontouchstart = function () {
                                this.currentZoom = md.setImageCanvas.currentZoom;

                            };
                            md.setImageCanvasZoomer.ontouchend = function () {
                                this.value = 0;
                            };
                            md.setImageCanvasZoomer.oninput = function () {
                                var z = ((parseInt(this.value)) / 80) + this.currentZoom;
                                if (z < 0.02) z = 0.02;
                                if (z > 10) z = 10;
                                md.setImageCanvas.currentZoom = z;
                                md.setImageCanvas.zoomToPoint(new ani.fabric.Point(
                                    md.setImageCanvas.width * 0.5,
                                     md.setImageCanvas.height * 0.5

                                    ), md.setImageCanvas.currentZoom);
                                md.setImageCanvas.absolutePan(md.setImageCanvas.pan);


                            };
                          

                            md.showEdit = function (obj, img) {
                                 var md = this;
                                md.obj = obj;
                                md.setImageCanvasIframe[0].window.onresize();
                            

                                if (!md.img$) {
                                    md.img$ = md.setImageCanvas.newObject({
                                        objWidth: obj.width, objHeight: obj.height, objImage: obj.nodeIconImage,
                                        width: img.width, height: img.height, img: img
                                    })
                                    md.img$.extend({
                                        originX: "center", originY: "center", centeredScaling: true,lockRotation1:true,hasRotatingPoint1:false,
                                            
                                        render: function (ctx) {

                                            if (!this.saveImage) {
                                                //ctx.drawImage(this.objImage, -this.objWidth * 0.5, -this.objHeight * 0.5);
                                            }
                                            
                                            ctx.save();
                                            this.transform(ctx);
                                            ctx.drawImage(this.img, -this.width * 0.5, -this.height * 0.5);
                                            ctx.restore();
                                            if (!this.saveImage) {
                                                ctx.fillStyle = "rgba(10,10,10,0.3)";
                                                var x = -this.objWidth * 0.5;
                                                var y = -this.objHeight * 0.5;
                                                ctx.fillRect(x - 2000, y - 2000, 4000, 2000);
                                                ctx.fillRect(x - 2000, y + this.objHeight, 4000, 2000);
                                                ctx.fillRect(x - 4000, y, 4000, this.objHeight);
                                                ctx.fillRect(x + this.objWidth, y, 4000, this.objHeight);
                                                ctx.strokeStyle = "silver";
                                                ctx.strokeRect(x, y, this.objWidth, this.objHeight);
                                            }
                                            
                                        }
                                    });
                                } else {
                                    md.img$.left = 0;
                                    md.img$.top = 0;
                                    md.img$.scaleX = 1;
                                    md.img$.scaleY = 1;
                                    md.img$.angle = 0;
                                    md.img$.img = img;
                                    md.img$.width = img.width;
                                    md.img$.height = img.height;
                                    md.img$.objWidth = obj.width;
                                    md.img$.objHeight = obj.height;
                                    md.img$.objImage = obj.nodeIconImage
                                    md.img$.setCoords();
                                }
                                md.img$.saveImage = false;


                                var imSize1 = Math.sqrt((img.width * img.width) + (img.height * img.height));
                                var imSize2 = Math.sqrt((obj.width * obj.width) + (obj.height * obj.height));
                                if (imSize1 > imSize2) {
                                    md.setImageCanvas.zoomFit(-img.width * 0.5, -img.height * 0.5, img.width, img.height, [10, 10, 10, 10]);

                                }
                                else {
                                    md.setImageCanvas.zoomFit(-obj.width * 0.5, -obj.height * 0.5, obj.width, obj.height, [10, 10, 10, 10]);

                                }
                              
                                md.closing = function (res) {
                                    
                                    if (res) {
                                        var obj = md.obj;
                                        //md.setImageCanvasIframe.css("position", "absolute").css("width", obj.width + "px").css("height", obj.height + "px");
                                        md.setImageCanvas.setViewport(obj.width, obj.height);
                                        md.setImageCanvas.zoomFit(-obj.width * 0.5, -obj.height * 0.5, obj.width, obj.height, [0, 0, 0, 0]);
                                        md.setImageCanvas.changePan(-md.setImageCanvas.width * 0.5, -md.setImageCanvas.height * 0.5);
                                        setTimeout(function (md) {
                                            md.setImageCanvas._discardActiveObject();
                                            md.img$.saveImage = true;
                                            md.setImageCanvas.renderAll();
                                            console.log(md.setImageCanvas.contextContainer.canvas.width + "x" + md.setImageCanvas.contextContainer.canvas.height);
                                            _this.resizeCanvas.setSize(obj.width, obj.height);
                                            _this.resizeCanvas.ctx.drawImage(md.setImageCanvas.contextContainer.canvas, 0, 0, obj.width, obj.height);
                                            _this.resizeCanvas.toBlob(function (blob) {
                                               // window.open(window.URL.createObjectURL(blob), "_blank");
                                                obj.setImage(window.URL.createObjectURL(blob));
                                                md.hide();
                                            }, "image/png");
                                        }, 100,md);
                                       

                                        return (false);
                                        
                                        _this.resizeCanvas.setSize(obj.width, obj.height);

                                        var x = md.img$.left;
                                        var y = md.img$.top;
                                        var center = md.img$.getCenterPoint();


                                        x = -((md.img$.img.width * 0.5) * md.img$.scaleX);
                                        y = -((md.img$.img.height * 0.5) * md.img$.scaleY);

                                        x += obj.width * 0.5;
                                        y += obj.height * 0.5;


                                        x += center.x;
                                        y += center.y;




                                        _this.resizeCanvas.ctx.fillStyle = "red";
                                        // _this.resizeCanvas.ctx.fillRect(0, 0, _this.resizeCanvas.width, _this.resizeCanvas.height);


                                        _this.resizeCanvas.ctx.save();


                                        // _this.resizeCanvas.ctx.translate(obj.width * 0.5, obj.height * 0.5);


                                        _this.resizeCanvas.ctx.rotate(md.img$.angle * Math.PI / 180);


                                        //md.img$.transform(_this.resizeCanvas.ctx);
                                        // _this.resizeCanvas.ctx.drawImage(md.img$.img, 0, 0);


                                      


                                        _this.resizeCanvas.ctx.restore();

                                       
                                        return (false);
                                    }
                                    md.hide();
                                    return (false);
                                };
                            };

                            

                           

                        }
                    }
                    else {
                        _this.setImagePopup.show();
                        _this.setImagePopup.showEdit(obj, img);
                    }
                };


                var img = new Image();
                img.onload = function () {
                    animobile.components["imageLayer1.0"].resize(this, 1024, function (img) {
                        showEditOptions(obj, img);
                    });
                }
                img.src = window.URL.createObjectURL(file);
            },

            addImagesFromUrls:function(urls){

                animobile.showProcessing();
                var img = new Image();
                eachItem(urls, function (f, next) {
                    img.onload = function () {
                        console.log(img.width + "x" + img.height);
                        animobile.components["imageLayer1.0"].resize(this, 1024, function (img) {
                            console.log(img.width + "x" + img.height);
                            var scale = animobile.currentSlide$.currentCamera$.fabric.cameraWidth / img.width;
                            if (img.width < animobile.currentSlide$.currentCamera$.fabric.cameraWidth) scale = 1;


                            var obj$ = animobile.newObject({
                                componentId: "imageLayer1.0", iconUrl: img.src, imageUrl: img.src, cssAngle: 0,
                                width: img.width, height: img.height, left: 0, top: 0, alphaValue: 100, blurValue: 0,
                                scaleX: scale, scaleY: scale,

                            }, function () {
                                next.call();
                            });
                            

                        });


                    };
                    img.src = f.src;
                }, function () {
                    animobile.hideProcessing();
                    animobile.canvas.renderAll();
                    setTimeout(function () { animobile.canvas.renderAll(); }, 1000);
                    
                });

            },
            addImageFromFiles: function (file) {



                var urls = [];
                for (var i = 0; i < file.length; i++) {
                    urls.push({ src: window.URL.createObjectURL(file[i]) });
                }
              

                animobile.components["imageLayer1.0"].addImagesFromUrls(urls);
                
            },
            characterPosSchema: ani.editPages({
                showList:function(obj){
                    var itemsList = this.find(".itemList");
                    itemsList.html("");
                    animobile.showProcessing();
                    var q = { limit: { start: 0, count: 20 }, fetchContent: true, filter: { ref_key: obj.repoId } };
                    animobile.api('search_repo', q, function (res) {
                        res.data.forEach(function (item) {
                            item.content = JSON.parse(item.content);
                            item.thumbUrl = "http://blmani.com/aniparti_fan/thumb.php?s=aniparti_fan/com/" + item.content.url + "&w=92&h=92";
                            var item$ = $(ani.parseItemTags('<td class="repo-item repo-{{item.id}}"><img src="{{item.thumbUrl}}" /></td>', function (k) { return (eval(k)) }));
                            itemsList.append(item$);
                            item$[0].repoItem = item;
                        });
                        if (res.data.length < 1) {
                            itemsList.append('<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>');
                        }
                        else if (res.data.length < 2) {
                            itemsList.append('<td>&nbsp;</td><td>&nbsp;</td>');
                        }
                        else if (res.data.length <3) {
                            itemsList.append('<td>&nbsp;</td>');
                        }
                        animobile.hideProcessing();
                    });
                },
                items: [
                    {
                        title: animobile.characterPosSchemaTemplate,
                        style: "height:200px;margin-bottom:-50px;z-index:1000",
                        onInit: function (item$) {
                            item$.find(".itemList")[0].onclick = function (e) {
                                if (e.target.repoItem) {
                                    var parent$ = $(e.target.parentNode);
                                    parent$.find(".selected").removeClass("selected");
                                    $(e.target).addClass("selected");

                                }
                            };

                            item$.find(".applyButton")[0].onclick = function () {
                                var selectItem$ = item$.find(".repo-item.selected");
                                if (selectItem$.length > 0) {
                                    var obj = animobile.displayObjectSchemas.currentObject;
                                    var img = animobile.components["imageLayer1.0"].resizeImage;
                                    var item = selectItem$[0].repoItem;
                                    img.onload = function () {
                                        obj.setImage(item.content.url);
                                        obj.width = this.width;
                                        obj.height = this.height;
                                        animobile.canvas.renderAll();
                                        setTimeout(function () { animobile.canvas.renderAll(); }, 1000);
                                        document.schemaDisplay.$.find(".editPages").hide();

                                    };
                                    img.src = animobile.appUrl + item.content.url;
                                }
                            };

                            item$.find(".cancelButton")[0].onclick = function () {
                                document.schemaDisplay.$.find(".editPages").hide();
                            };
                        }
                    },

                ]
            }),
            setCharacterPos:function(obj){

                document.objectLayers.hideLayers();
                animobile.focusCanvasToObject(obj, [0, 0, 0,200]);
                animobile.displayObjectSchemas(obj.ani, [this.characterPosSchema]);
                this.characterPosSchema.showList(obj);


            },
            setImageFromLibrary:function(obj){
                animobile.showSearchRepo(function (items) {
                    if (items.length > 0) {
                        animobile.showProcessing();
                        var img = animobile.components["imageLayer1.0"].resizeImage;
                        img.onload = function () {
                            obj.setImage(items[0].content.url);
                            obj.width = this.width;
                            obj.height = this.height;
                            animobile.canvas.renderAll();
                            setTimeout(function () { animobile.canvas.renderAll(); }, 1000);
                            animobile.hideProcessing();

                        };
                        img.src = animobile.appUrl + items[0].content.url;
                    }


                }, true);
                animobile.repoTypeSelected = animobile.displayObjectSchemas.currentObject.repoType;
                animobile.search_repo.loadItems(true);
            },
            create: function (node$, complete, appUrl) {

                var self = this;
                node$.fabric.createPIXI();
                node$.fabric.extend({

                    render: function (ctx) {
                        this.transformPIXI();
                    }
                });
                appUrl = appUrl || animobile.appUrl;
                node$.fabric.imageUrl = node$.fabric.imageUrl || "/assets/wait-icon.png";
                node$.fabric.objectType = "image";
                var url = appUrl + node$.fabric.imageUrl;

                if (node$.fabric.imageUrl.indexOf('blob:') == 0) url = node$.fabric.imageUrl;
                
                node$.fabric.class = this;
                node$.fabric.pixiObject.frameImage = animobile.canvas.createPIXISprite();
                node$.fabric.pixiObject.frameImage._texture = window.canvPIXI.Texture.fromImage(url);

                node$.fabric.pixiObject.frameImage._textureID = -1;
                node$.fabric.pixiObject.addChild(node$.fabric.pixiObject.frameImage);
                node$.fabric.pixiObject.frameImage.anchor.set(0.5);

                node$.fabric.nodeIconImage = node$.$.find(".nodeIcon:first")[0];
                
                node$.fabric.nodeIconImage.onload = function () {
                    this.style.marginTop = -((this.height * (45 / this.width)) * 0.5) + "px";
                };
                node$.setIcon(url);

                if (!node$.fabric.timeline) {

                }
                node$.fabric.compileStateData = function (preloadings) {
                    preloadings.push({ imageUrl: this.imageUrl });
                    return (this.getStateData(preloadings));
                };
              
                node$.fabric.setImage = function (url) {
                    this.imageUrl = url;

                    url = animobile.appUrl + node$.fabric.imageUrl;

                    if (this.imageUrl.indexOf('blob:') == 0) url = this.imageUrl;

                    this.pixiObject.frameImage._texture = window.canvPIXI.Texture.fromImage(url);

                    this.pixiObject.frameImage._textureID = -1;
                    this.ani.setIcon(url);
                    setTimeout(function () { animobile.canvas.renderAll(); }, 500);

                };

                complete(node$);

            }
        });

        animobile.defineComponent("ImageSlides1.0", {
            init: function () {
                this.stateAttributes = animobile.compileStateAttributes("imageUrl".split(","));
                ani.extend(this.stateAttributes, animobile.defaultStateAttributes);
                this.keyframeAttributes = animobile.defaultKeyframeAttributes.concat([]);

                animobile.addComponentLink("Images Slides", "fa-film").fileUploadButtonEx({
                    accept: "image/*", dataType: "arraybuffer", multi: true,
                    onFileInput: function (files) { animobile.components["ImageSlides1.0"].loadImageSlides(files); }
                }).find("input").css("z-index", "99999");

                //
                Sortable.create(document.slidesImagesList, { group: { name: 'slidesImagesList' }, });
                document.addMoreFilesToSlideImages.$.fileUploadButtonEx({
                    accept: "image/*", dataType: "arraybuffer", multi: true,
                    onFileInput: function (files) {
                        setTimeout(function (files) { animobile.components["ImageSlides1.0"].loadImageSlides(files); }, 100, files);

                    }
                });

                document.cancelSlideToImagesButton.onclick = function () {
                    animobile.components["ImageSlides1.0"].imageSlidesPopup.close();
                    delete animobile.components["ImageSlides1.0"].imageSlidesPopup;
                };



                this.startImportSlides = function () {
                    animobile.showProcessing();

                    var currentIndex = 0

                    if (animobile.allSlides$) currentIndex = animobile.allSlides$.length;
                    var urls = [];
                    document.slidesImagesList.$.find("li").each(function () {
                        urls.push({ u: this.url, effect: this.getAttribute("effect"), effectTime: parseInt(this.getAttribute("effect-time")) });
                    });


                    console.log("urls", urls);
                    eachItem(urls, function (f, next) {
                        var img = new Image();
                        img.onload = function () {
                            animobile.createNewSlide(function (slide$) {


                                console.log(img.width + " x " + img.height);
                                animobile.components["imageLayer1.0"].resize(img, 1024, function (img) {
                                    console.log(img.width + "x" + img.height);
                                    var scale = slide$.currentCamera$.fabric.cameraWidth / img.width;
                                    if (img.width < slide$.currentCamera$.fabric.cameraWidth) scale = 1;


                                    var obj$ = animobile.newObject({
                                        componentId: "imageLayer1.0", iconUrl: img.src, imageUrl: img.src, cssAngle: 0,
                                        width: img.width, height: img.height, left: 0, top: 0, alphaValue: 100, blurValue: 0,
                                        scaleX: scale, scaleY: scale
                                    }, function () {
                                        next.call();
                                    });
                                    

                                });




                            });

                        };
                        img.src = f.u;
                    }, function () {
                        animobile.hideProcessing();
                        animobile.canvas.renderAll();
                        animobile.components["ImageSlides1.0"].imageSlidesPopup.close();
                        delete animobile.components["ImageSlides1.0"].imageSlidesPopup;
                        
                        setTimeout(function () { animobile.canvas.renderAll(); animobile.moveSlideIndex(currentIndex); }, 1000);

                    });
                }
                document.confirmSlideToImagesButton.onclick = function () {
                    animobile.components["ImageSlides1.0"].startImportSlides();
                   
                   
                };
            },
            loadImageSlides: function (files) {

                if (!this.imageSlidesPopup) {

                    this.imageSlidesPopup = ani.modals.open({ element: document.imagesToSlideModal });
                    this.imageSlidesPopup.ready = function () { };
                    document.slidesImagesList.$.html("");
                }

                document.confirmSlideToImagesButton.$.html("Confirm");


                for (var i = 0; i < files.length; i++) {
                    var url = window.URL.createObjectURL(files[i]);
                    var li$ = $('<li><img src="' + url + '" /><i class="fa fa-times"></i></li>');
                    li$[0].url = url;
                    li$.find("i")[0].onclick = function () {
                        $(this.parentNode).remove();
                    };
                    document.slidesImagesList.$.append(li$);
                }



            },
            create: function (node$, complete) {
                complete(node$);
            }
        });

        animobile.defineComponent("smartText1.0", {
            init: function () {
                var attrs = 'align,textId,enableTextWrap,fontColor,fontColorRGB,fontFamily,fontSize,text,textBubble,textBubblePosLeft,textBubblePosTop,textBubbleRotate,textBubbleScale,textHeight,textLineHeight,textLinePadding,textWidth,textWrapWidth,valign,fontWeight,_textBubblePosLeft,_textBubblePosTop'.split(",");
                attrs.forEach(function (att, index) {
                    attrs[index] = "component." + att;
                });
                this.stateAttributes = animobile.compileStateAttributes(attrs);
                ani.extend(this.stateAttributes, animobile.defaultStateAttributes);
                this.keyframeAttributes = animobile.defaultKeyframeAttributes.concat([]);
                animobile.addComponentLink("Smart Text", "fa-font")[0].onclick = function () {

                    animobile.components["smartText1.0"].createObject();

                };
            },
            createObject:function(text,doneCreate){


                var createTextObject = function (text, effect, effectTime) {

                   return  animobile.newObject({
                        name: "smartText1.0",
                        width: animobile.currentSlide$.currentCamera$.fabric.cameraWidth - 50, height: 64, scaleX: 1.0, scaleY: 1.0, fullAngle: 0, cssAngle: 0, angle: 0,
                        componentId: "smartText1.0", objectOpacity: 100, objectBlur: 100, alphaValue: 100, blurValue: 100,
                        component: {
                            text: text || "Use smart text object to display text", fontSize: 32, strokeWidth: 0, strokeColor: [0, 0, 0, 1], strokeColorRGBA: "rgba(0,0,0,0)",
                            fontColor: [0, 0, 0, 1], fontFamily: 'Trebuchet MS', fontColorRGB: "rgb(0,0,0)", textId: "",
                            backColorRGBA: "rgba(0,0,0,0)", textId: "", applyTextId: false, enableTextWrap: true, textLineHeight: 50, textLinePadding: 10, textWrapWidth: animobile.currentSlide$.currentCamera$.fabric.cameraWidth - 50,
                            fontWeight: "normal", align: "center", valign: "top",
                            textBubble: "", textBubbleScale: 50, textBubblePosLeft: 0, textBubblePosTop: 0, textBubbleRotate: 0, _textBubblePosLeft: 0, _textBubblePosTop: 0,
                            textWidth: 200, textHeight: 80

                        }
                    }, function (obj$) {
                        animobile.canvas.setActiveObject(obj$.fabric);
                        if (doneCreate) doneCreate(obj$);

                        obj$.fabric.setCoords();
                        animobile.canvas.renderAll();
                        setTimeout(function () {
                            animobile.canvas.renderAll();
                        }, 400);
                        
                    });
                };
                

                return createTextObject(text);


            },
            
            schema: ani.editPages({
                items: [
                     {
                         cssClass: "fontSizeSchemaArea childSchemaAreas", items: [
                              { input: "slider", cssClass: "inputTitle20",title:"Size", field: "#component.fontSize", min: 10, max: 132 },
                         ]
                     },
                       {
                           cssClass: "lineHeightSchemaArea childSchemaAreas",items: [
                                { input: "slider", cssClass: "inputTitle25", title: "Line Height", field: "#component.textLineHeight", min: 10, max: 132 },
                           ]
                       },
                       {
                           cssClass: "fontColorSchemaArea childSchemaAreas", style: "padding:0", items: [
                                { input: "color", cssClass: "smartTextColorSelection pull-right",width:"80px",style:"margin:4px", field: "component.fontColor" },
                           ]
                       },
                     {
                         cssClass: "fontFamilySchemaArea childSchemaAreas", items: [
                          {
                              title: animobile.objectTextFontFamilySchemaTemplate, field: "component.fontFamily",
                              inputSettings: {
                                  setValue: function (v) {
                                      this.$.find("a.selected").removeClass("selected");
                                      this.$.find("[font='" + v + "']").addClass("selected");
                                      

                                  }
                              },
                              onInit: function (item$) {
                                  
                                  item$.find("a").click(function () {
                                      console.log(this);
                                      if (animobile.displayObjectSchemas.currentObject) {
                                         
                                          animobile.displayObjectSchemas.currentObject.component.fontFamily = this.getAttribute("font");
                                          animobile.displayObjectSchemas.refresh();
                                          animobile.displayObjectSchemas.currentObject.updateText();
                                          animobile.canvas.renderAll();
                                      }

                                  });
                              }

                          },
                         ]
                     },
                      {
                          cssClass: "alignmentSchemaArea childSchemaAreas",style:"padding:0", items: [
                           {
                               title: animobile.objectTextAlignSchemaTemplate, field: "component.align",
                               inputSettings: {
                                   setValue: function (v) {
                                       this.$.find("a.selected").removeClass("selected");
                                       this.$.find("[align='" + v + "']").addClass("selected");
                                   }
                               },
                               onInit: function (item$) {

                                   item$.find("a").click(function () {
                                 
                                       if (animobile.displayObjectSchemas.currentObject) {

                                           animobile.displayObjectSchemas.currentObject.component.align = this.getAttribute("align");
                                           animobile.displayObjectSchemas.refresh();
                                           animobile.displayObjectSchemas.currentObject.updateText();
                                           animobile.canvas.renderAll();
                                       }

                                   });
                               }

                           },
                          ]
                      },
                    {
                        title: animobile.objectTextSchemaTemplate,
                        onInit: function (item$) {
                            item$.find(".iconText").click(function () {

                                var schm = $(this).attr("schema-name");
                                if (schm == "closeButton") {

                                    animobile.displayObjectSchemas(animobile.displayObjectSchemas.currentObject.ani);
                                    return;
                                }

                                item$.find(".iconText.selected").removeClass("selected");
                                $(this).addClass("selected");
                                item$.parent().find(".childSchemaAreas").hide();
                                item$.parent().find(schm).show();
                            });
                            setTimeout(function (item$) {
                                item$.parent().find(".childSchemaAreas").hide();
                            }, 100, item$);

                        }
                    }
                ]
            }),

            create: function (node$, complete) {

                var self = this;
               // node$.fabric.anipartiTemplateObject = true;


                /*

                if (node$.fabric.anipartiTemplateObject) {
                    
                
                }

                else {
                    node$.fabric.extend({
                        lockScalingY: true, scaleX: 1, scaleY: 1, centeredScaling1: false,
                        render: function (ctx) {
                            this.width = this.textCanvas.width;
                            this.height = this.textCanvas.height;                           
                            this.transformPIXI();
                        }
                    });

                    
                } */


                node$.fabric.extend({
                    lockScalingY: true, scaleX: 1, scaleY: 1, centeredScaling1: false,
                    render: function (ctx) {
                        this.width = this.textCanvas.width;
                        this.height = this.textCanvas.height;
                        this.transformPIXI();
                    }
                });
                node$.fabric.events("scaling", function () {

                    this.component.textWrapWidth = this.scaleX * this.width;
                    if (this.component.textWrapWidth < 50) this.component.textWrapWidth = 50;
                    this.scaleX = 1;
                    this.width = this.component.textWrapWidth;
                    this.setCoords();
                    this.updateText();
                });

                if (node$.fabric.component.fontFamily == "Arial") node$.fabric.component.fontFamily = "Trebuchet MS";

                
                node$.fabric.setControlVisible("bl", false);
                node$.fabric.setControlVisible("br", false);
                node$.fabric.setControlVisible("tl", false);
                node$.fabric.setControlVisible("tr", false);
                node$.fabric.setControlVisible("mt", false);
                node$.fabric.setControlVisible("mb", false);

                node$.fabric.saveStateAttributes = function () {


                    this.setVisible(!this.objectHide);
                    this.component.fontColorRGB = ani.arrayToRGBA(this.component.fontColor);
                    if (this.updatingText) return;
                    this.updatingText = true;
                    this.updateText();


                    this.setCoords();
                    animobile.canvas.renderAll();
                    setTimeout(function (this$) { this$.updatingText = false; }, 50, this);



                }

               

                node$.fabric.class = this;


                node$.fabric.createPIXI();

                node$.fabric.textCanvas = ani.createCanvasObject(10, 10);

                node$.fabric.pixiObject.pixiText = animobile.canvas.createPIXISprite();
                node$.fabric.pixiObject.pixiText.texture = animobile.canvas.PIXI().Texture.fromCanvas(node$.fabric.textCanvas);
                node$.fabric.pixiObject.addChild(node$.fabric.pixiObject.pixiText);
                node$.fabric.pixiObject.pixiText.anchor.set(0.5);
                node$.fabric.updateWrapText20 = function () {
                    var canvas = this.textCanvas;
                    var ctx = canvas.ctx;

                    this.component.textLinePadding = parseInt(this.component.textLinePadding);
                    this.component.fontSize = parseInt(this.component.fontSize);
                    this.component.textWrapWidth = parseInt(this.component.textWrapWidth);
                    this.component.textLineHeight = parseInt(this.component.textLineHeight);


                    var fontString = this.component.fontWeight + " " + (this.component.fontSize) + "px " + this.component.fontFamily;

                    ctx.font = fontString;
                    var textWidth = this.component.textWrapWidth - this.component.textLinePadding;
                    var chars = this.component.text.split("");
                    var c, cw, tw = this.component.textLinePadding * 0.5, ln = "";

                    var lines = [], widths = [];
                    for (var i = 0; i < chars.length; i++) {
                        c = chars[i];
                        cw = ctx.measureText(c).width;
                        tw += cw;
                        if (tw > textWidth) {
                            widths.push(tw);
                            tw = this.component.textLinePadding * 0.5;
                            lines.push(ln);
                            ln = "";

                        }
                        ln += c;
                    }
                    lines.push(ln);
                    widths.push(tw + cw * 2);

                    var textLineHeight = (this.component.textLineHeight / 100) + 0.5;
                    var characterHeight = this.component.fontSize * textLineHeight;

                    var numlines = lines.length;


                    canvas.width = this.component.textWrapWidth;
                    canvas.height = (numlines + 1) * characterHeight;


                    /*
                    ctx.fillStyle = this.component.backColorRGBA;

                    var pd = this.component.textLinePadding * 0.25
                    for (var i = 0; i < numlines; i++) {
                        ctx.fillRect(0, ((i + 1) * characterHeight) - this.component.fontSize, widths[i], this.component.fontSize * 1.3);

                    }
                    */
                    ctx.textBaseline = "alphabetic";
                    ctx.fillStyle = this.component.fontColorRGB;

                    ctx.font = fontString;
                    for (var i = 0; i < numlines; i++) {
                        ctx.fillText(lines[i], this.component.textLinePadding * 0.5, (i + 1) * characterHeight);
                    }

                    this.pixiObject.pixiText._texture.baseTexture.hasLoaded = true;

                    this.pixiObject.pixiText._texture.baseTexture.realWidth = canvas.width;
                    this.pixiObject.pixiText._texture.baseTexture.realHeight = canvas.height;
                    this.pixiObject.pixiText._texture.baseTexture.width = canvas.width;
                    this.pixiObject.pixiText._texture.baseTexture.height = canvas.height;


                    this.pixiObject.pixiText._texture.baseTexture.emit('update', this.pixiObject.pixiText._texture.baseTexture);
                    this.pixiObject.pixiText._onTextureUpdate();


                };
                node$.fabric.updateWrapText = function () {
                    return (this.updateWrapText20());
                    if (this.anipartiTemplateObject) return (this.updateWrapText20());
                    var canvas = this.textCanvas;
                    var ctx = canvas.ctx;
                    var fontString = this.component.fontWeight + " " + (this.component.fontSize) + "px " + this.component.fontFamily;

                    ctx.font = fontString;
                    this.component.textLinePadding = this.component.fontSize;

                    var textWidth = parseInt(this.component.textWrapWidth) - parseInt(this.component.textLinePadding);
                    var textAlign = this.component.align;
                    var words = this.component.text.split(' ');
                    var lines = [];
                    var cw, tw;
                    var lineWidth = 0, lineText = "";
                    //this.component.textLineHeigh = this.component.fontSize * 1.3;

                    words.forEach(function (word) {
                        cw = ctx.measureText(word).width;
                        lineWidth += cw;
                        if (lineWidth > textWidth) {
                            lines.push(lineText);
                            lineWidth = cw;

                            lineText = word;
                        }
                        else {
                            if (lineText == "") lineText = word; else lineText += ' ' + word;
                        }

                    });
                    if (lineText != "") lines.push(lineText);
                    var textLineHeight = parseInt(this.component.textLineHeight);


                    canvas.width = parseInt(this.component.textWrapWidth);
                    canvas.height = (lines.length * textLineHeight) + textLineHeight;
                    var x = 0, y = textLineHeight;
                    ctx.textBaseline = "alphabetic";
                    ctx.fillStyle = this.component.fontColorRGB;
                    ctx.font = fontString;

                    lines.forEach(function (line) {

                        if (textAlign == "center") {
                            lineWidth = ctx.measureText(line).width;
                            x = (canvas.width * 0.5) - (lineWidth * 0.5);
                        }
                        else if (textAlign == "right") {
                            lineWidth = ctx.measureText(line).width;
                            x = (canvas.width) - (lineWidth);
                        }

                        ctx.fillText(line, x, y);

                        y += textLineHeight;

                    });


                    this.pixiObject.pixiText._texture.baseTexture.hasLoaded = true;

                    this.pixiObject.pixiText._texture.baseTexture.realWidth = canvas.width;
                    this.pixiObject.pixiText._texture.baseTexture.realHeight = canvas.height;
                    this.pixiObject.pixiText._texture.baseTexture.width = canvas.width;
                    this.pixiObject.pixiText._texture.baseTexture.height = canvas.height;


                    this.pixiObject.pixiText._texture.baseTexture.emit('update', this.pixiObject.pixiText._texture.baseTexture);
                    this.pixiObject.pixiText._onTextureUpdate();




                };
                node$.fabric.updateText = function () {
                    this.component.fontWeight = this.component.fontWeight || "normal";
                    if (this.component.enableTextWrap) return (this.updateWrapText());
                    var canvas = this.textCanvas;


                    canvas.setSize(parseInt(this.component.textWidth), parseInt(this.component.textHeight));


                    var ctx = canvas.ctx;
                    // ctx.clearRect(0, 0, canvas.width, canvas.height);
                    var texts = this.component.text.split(/(?:\r\n|\r|\n)/);
                    ctx.fillStyle = "red";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    var width = parseInt(this.component.textWidth);
                    var height = parseInt(this.component.textHeight);

                    var textAlign = this.component.align;
                    var textAlignVertical = this.component.valign;
                    var x = 0, y = 0;

                    var lineHeight = (height - 10) / texts.length;



                    var tws = [];

                    var fontString = this.component.fontWeight + " " + (lineHeight) + "px " + this.component.fontFamily;

                    ctx.font = fontString;
                    var maxWidth = 0;
                    for (var i = 0; i < texts.length; i++) {
                        var ww = ctx.measureText(texts[i]).width;
                        if (ww > maxWidth) maxWidth = ww;
                        tws.push(ww);
                    }


                    var wp = canvas.width / maxWidth;
                    if (wp < 1) {
                        lineHeight *= wp;
                        fontString = this.component.fontWeight + " " + (lineHeight) + "px " + this.component.fontFamily;

                        ctx.font = fontString;
                        tws.length = 0;
                        for (var i = 0; i < texts.length; i++) {
                            tws.push(ctx.measureText(texts[i]).width);
                        }

                    }
                    var backColor = this.component.backColorRGBA;

                    var fontColor = this.component.fontColorRGB;
                    var _printText = function (x, y, i) {
                        ctx.fillStyle = backColor;
                        //ctx.fillRect(x, y - lineHeight, tws[i], lineHeight * 1.2);
                        ctx.fillStyle = fontColor;
                        ctx.fillText(texts[i], x, y);



                    };







                    var printText = function (x, y, i) {
                        _printText(x, y, i);

                    };

                    if (textAlign == "center")
                        printText = function (x, y, i) {
                            _printText(x + ((width * 0.5) - (tws[i] * 0.5)), y, i);
                        }
                    else if (textAlign == "right")
                        printText = function (x, y, i) {
                            _printText(x + (width - tws[i]), y, i);
                        }

                    ctx.fillStyle = fontColor;

                    if (textAlignVertical == "top") {
                        for (var i = 0; i < texts.length; i++)
                            printText(0, lineHeight * (i + 1), i);
                    }
                    else if (textAlignVertical == "center") {
                        for (var i = 0; i < texts.length; i++)
                            printText(0, ((height * 0.5) - ((lineHeight * texts.length) * 0.5)) + lineHeight * (i + 1), i);

                    }
                    else if (textAlignVertical == "bottom") {
                        for (var i = 0; i < texts.length; i++)
                            printText(0,
                                ((height - 10) - ((lineHeight * texts.length))) + lineHeight * (i + 1)
                                , i);
                    }




                    this.pixiObject.pixiText._texture.baseTexture.hasLoaded = true;

                    this.pixiObject.pixiText._texture.baseTexture.realWidth = canvas.width;
                    this.pixiObject.pixiText._texture.baseTexture.realHeight = canvas.height;
                    this.pixiObject.pixiText._texture.baseTexture.width = canvas.width;
                    this.pixiObject.pixiText._texture.baseTexture.height = canvas.height;


                    this.pixiObject.pixiText._texture.baseTexture.emit('update', this.pixiObject.pixiText._texture.baseTexture);
                    this.pixiObject.pixiText._onTextureUpdate();



                };

                node$.fabric.updateText();

                if (node$.fabric.component.textBubble && node$.fabric.component.textBubble != "") {
                    if (!node$.fabric.textBubblePixi) {
                        var url = animobile.appUrl + node$.fabric.component.textBubble;
                        if (node$.fabric.component.textBubble.indexOf("blob:http") == 0) url = node$.fabric.component.textBubble;

                        var img = new Image();
                        img.onload = function () {

                            node$.fabric.textBubblePixi = new window.canvPIXI.Sprite(window.canvPIXI.Texture.fromImage(this.src));
                            node$.fabric.pixiObject.addChild(node$.fabric.textBubblePixi);
                            node$.fabric.pixiObject.addChild(node$.fabric.pixiObject.pixiText);

                            node$.fabric.textBubblePixi.anchor.set(0.5);
                            var s = 1 * ((parseInt(node$.fabric.component.textBubbleScale)) / 50);
                            node$.fabric.textBubblePixi.scale.x = s;
                            node$.fabric.textBubblePixi.scale.y = s;

                            node$.fabric.textBubblePixi.rotation = parseInt(node$.fabric.component.textBubbleRotate) * ani.DEG_TO_RAD_HELP;


                            node$.fabric.textBubblePixi.anchor.set(0.5);
                            node$.fabric.textBubblePixi.x = this.width * (parseFloat(node$.fabric.component.textBubblePosLeft) / 100);
                            node$.fabric.textBubblePixi.y = this.height * (parseFloat(node$.fabric.component.textBubblePosTop) / 100);
                            node$.fabric.component._textBubblePosLeft = node$.fabric.textBubblePixi.x;
                            node$.fabric.component._textBubblePosTop = node$.fabric.textBubblePixi.y;

                        };
                        img.src = url;

                    }
                   

                }



                if (!node$.fabric.timeline) {

                }

                //node$.$.addClass("ani-noicon").find(".nodeTitle:first").show();
                node$.$.find(".nodeIcon:first").remove();
                node$.$.find(".titleArea:first").append('<i class="bmico bmico-font-font-family"></i>');
                //titleArea 
                //node$.setTitle('<i class="fa fa-font"></i>');
               
              




                complete(node$);

            }
        });

        animobile.defineComponent("masterText1.0", {
            init: function () {
                var attrs = 'align,textId,fontColor,fontColorRGB,fontFamily,fontSize,text,textLineHeight,textLinePadding,textWrapWidth,fontWeight,markerPlacement,markerPos'.split(",");
                attrs.forEach(function (att, index) {
                    attrs[index] = "component." + att;
                });
                this.stateAttributes = animobile.compileStateAttributes(attrs);
                ani.extend(this.stateAttributes, animobile.defaultStateAttributes);
                this.keyframeAttributes = animobile.defaultKeyframeAttributes.concat([]);
     
                animobile.sourceCompilers.push(function (project) {

                    if (document.timelineNodes.$.find(".ani-master-text").length == 0) return;

                    project.plugins["masterTextBoxPlugin"] = function (viewer) {
                        viewer.components["masterText1.0"] = function (obj, slide, completed) {
                            obj.textCanvas = window.ui.createCanvasObject(10, 10);
                            obj.pixi = new PIXI.Sprite(PIXI.Texture.WHITE);
                            obj.pixi.texture = PIXI.Texture.fromCanvas(obj.textCanvas);
                            obj.pixi.anchor.set(0.5);
                            eval('obj.updateTextBox=' + window.LZString.decompressFromEncodedURIComponent('_updateTextBox'));
                            obj.updateTextBox();
                            completed(obj, slide);
                        };
                    }.toString().replace('_updateTextBox',
                    LZString.compressToEncodedURIComponent(animobile.components["masterText1.0"].updateTextBox.toString()))
                        .replace(/\t/g, '').replace(/\n/g, '');

                });
            },
          
            schema: ani.editPages({
                onValueUpdate: function (field,v) {
                    animobile.displayObjectSchemas.currentObject.updateObject();

                },
                items: [
                     {
                         cssClass: "fontSizeSchemaArea childSchemaAreas", items: [
                              { input: "slider", cssClass: "inputTitle20", title: "Size", field: "#component.fontSize", min: 10, max: 132 },
                         ]
                     },
                       {
                           cssClass: "lineHeightSchemaArea childSchemaAreas", items: [
                                { input: "slider", cssClass: "inputTitle25", title: "Line Height", field: "#component.textLineHeight", min: 10, max: 132 },
                           ]
                       },
                        {
                            cssClass: "markerPositionSchemaArea childSchemaAreas", items: [
                                 { input: "slider", cssClass: "inputTitle25", title: "Marker", field: "#component.markerPos", min: 5, max: 90 },
                            ]
                        },
                       {
                           cssClass: "fontColorSchemaArea childSchemaAreas", style: "padding:0", items: [
                                { input: "color", cssClass: "smartTextColorSelection pull-right", width: "80px", style: "margin:4px", field: "component.fontColor" },
                           ]
                       },
                     {
                         cssClass: "fontFamilySchemaArea childSchemaAreas", items: [
                          {
                              title: animobile.objectTextFontFamilySchemaTemplate, field: "component.fontFamily",
                              inputSettings: {
                                  setValue: function (v) {
                                      this.$.find("a.selected").removeClass("selected");
                                      this.$.find("[font='" + v + "']").addClass("selected");


                                  }
                              },
                              onInit: function (item$) {

                                  item$.find("a").click(function () {
                                      console.log(this);
                                      if (animobile.displayObjectSchemas.currentObject) {

                                          animobile.displayObjectSchemas.currentObject.component.fontFamily = this.getAttribute("font");
                                          animobile.displayObjectSchemas.refresh();
                                          animobile.displayObjectSchemas.currentObject.updateObject();
                                          animobile.canvas.renderAll();
                                      }

                                  });
                              }

                          },
                         ]
                     },
                      {
                          cssClass: "alignmentSchemaArea childSchemaAreas", style: "padding:0", items: [
                           {
                               title: animobile.objectTextAlignSchemaTemplate, field: "component.align",
                               inputSettings: {
                                   setValue: function (v) {
                                       this.$.find("a.selected").removeClass("selected");
                                       this.$.find("[align='" + v + "']").addClass("selected");
                                   }
                               },
                               onInit: function (item$) {

                                   item$.find("a").click(function () {

                                       if (animobile.displayObjectSchemas.currentObject) {

                                           animobile.displayObjectSchemas.currentObject.component.align = this.getAttribute("align");
                                           animobile.displayObjectSchemas.refresh();
                                           animobile.displayObjectSchemas.currentObject.updateObject();
                                           animobile.canvas.renderAll();
                                       }

                                   });
                               }

                           },
                          ]
                      },

                    
                    {
                        title: animobile.objectMasterTextSchemaTemplate,
                        style1:"height:100px",
                        onInit: function (item$) {
                            item$.find(".iconText").click(function () {
                                var schm = $(this).attr("schema-name");   
                                item$.find(".iconText.selected").removeClass("selected");
                                $(this).addClass("selected");
                                item$.parent().find(".childSchemaAreas").hide();
                                console.log("schm", schm);
                                if (schm == ".editTextValue") {
                                    document.textEditArea.showEdit(animobile.displayObjectSchemas.currentObject.component.text, function (text) {
                                        animobile.displayObjectSchemas.currentObject.component.text = text;
                                        animobile.displayObjectSchemas.currentObject.updateTextBox();
                                       
                                        animobile.canvas.renderAll();
                                        setTimeout(function () { animobile.focusCanvasToObject(animobile.displayObjectSchemas.currentObject, [0, 0, 0, -50]); }, 200);
                                    });
                                }
                                else {
                                    
                                    item$.parent().find(schm).show();
                                }
                                

                               
                            });
                            setTimeout(function (item$) {
                                item$.parent().find(".childSchemaAreas").hide();
                                item$.parent().find(".fontSizeSchemaArea").show();
                            }, 100, item$);

                        }
                    },
                    /*
                      {
                          input: "textarea", field: "component.text", style: "position:absolute;top:100px;",
                          onInit: function (item$) {
                              var textInputBox = item$.find("textarea").addClass('no-border')[0];
                              textInputBox.style.height = "50px";
                              textInputBox.style.border = "none !important";
                              textInputBox.onkeypress = function (e) { if (e.keyCode == 13) { e.stopPropagation(); e.preventDefault(); return (false); } };


                          },
                      },
                      */
                ]
            }),
            displaySchema:function(){
                document.objectLayers.hideLayers();

                var obj = animobile.displayObjectSchemas.currentObject;

                animobile.displayObjectSchemas(obj.ani, [this.schema]);


                obj.updateObject = function () {
                    this.updateTextBox();
                };
                animobile.focusCanvasToObject(obj, [0, 0, 0, -50]);
                

            },
            createObject: function (text, doneCreate) {
                var createTextObject = function (text, effect, effectTime) {
                    
                    return animobile.newObject({
                        name: "masterText1.0",objectDock:0,
                        width: animobile.currentSlide$.currentCamera$.fabric.cameraWidth - 50, height: 64, scaleX: 1.0, scaleY: 1.0, fullAngle: 0, cssAngle: 0, angle: 0,
                        componentId: "masterText1.0", objectOpacity: 100, objectBlur: 100, alphaValue: 100, blurValue: 100,
                        component: {
                            text: text || "Use master text object to display text Use master text object to display text", fontSize: 32, strokeWidth: 0, strokeColor: [0, 0, 0, 1], strokeColorRGBA: "rgba(0,0,0,0)",
                            fontColor: [0, 0, 0, 1], fontFamily: 'Trebuchet MS', fontColorRGB: "rgb(0,0,0)", textId: "",
                            backColorRGBA: "rgba(0,0,0,0)", textId: "", applyTextId: false, textLineHeight: 40, textLinePadding: 10, textWrapWidth: animobile.currentSlide$.currentCamera$.fabric.cameraWidth - 100,
                            fontWeight: "normal", align: "center", valign: "top", markerPlacement: 1, markerPos: 20

                        }
                    }, function (obj$) {
                        animobile.canvas.setActiveObject(obj$.fabric);
                        if (doneCreate) doneCreate(obj$);

                        obj$.fabric.setCoords();
                        animobile.canvas.renderAll();
                        setTimeout(function () {
                            animobile.canvas.renderAll();
                        }, 400);

                    });
                };


                return createTextObject(text);
            },

            updateTextBox:function(){
                var canvas = this.textCanvas;
                var ctx = canvas.ctx;
                var fontSize = parseInt(this.component.fontSize);
                this.component.markerPlacement = parseInt(this.component.markerPlacement);


                var fontString = this.component.fontWeight + " " + (this.component.fontSize) + "px " + this.component.fontFamily;

                ctx.font = fontString;
                this.component.textLinePadding = this.component.fontSize;

                var textWidth = parseInt(this.component.textWrapWidth) - parseInt(this.component.textLinePadding);
                var textAlign = this.component.align;
                var words = this.component.text.split(' ');
                var lines = [];
                var cw, tw;
                var lineWidth = 0, lineText = "";


                words.forEach(function (word) {
                    cw = ctx.measureText(word).width;
                    lineWidth += cw;
                    if (lineWidth > textWidth) {
                        lines.push(lineText);
                        lineWidth = cw;

                        lineText = word;
                    }
                    else {
                        if (lineText == "") lineText = word; else lineText += ' ' + word;
                    }

                });
                if (lineText != "") lines.push(lineText);
                var textLineHeight = parseInt(this.component.textLineHeight);

                var widthText = parseInt(this.component.textWrapWidth);
                var heightText = (lines.length * textLineHeight) + textLineHeight;

                var bubblePadding = 130;
                canvas.width = widthText + bubblePadding;
                canvas.height = heightText + bubblePadding;


                ctx.strokeStyle = "rgb(20,20,20)";
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.lineWidth = 4;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 16;
                ctx.shadowColor = "rgba(10,10,10,0.4)";
                ctx.shadowBlur = 15;

                var bbx = bubblePadding * 0.25;
                var bby = bubblePadding * 0.25;
                var bbWidth = canvas.width - bubblePadding * 0.5;
                var bbHeight = canvas.height - bubblePadding * 0.5;

                var radius = [20, 20, 20, 20];


                var markerPos = (this.component.markerPos / 100) * bbWidth;




                ctx.beginPath();
                ctx.moveTo(bbx + radius[0], bby);


                if (this.component.markerPlacement == 1) {
                    ctx.lineTo(bbx + markerPos - 15, bby);
                    ctx.lineTo(bbx + markerPos, bby - 30);
                    ctx.lineTo(bbx + markerPos + 15, bby);
                }

                ctx.lineTo(bbx + bbWidth - radius[1], bby);
                ctx.quadraticCurveTo(bbx + bbWidth, bby, bbx + bbWidth, bby + radius[1]);

                ctx.lineTo(bbx + bbWidth, bby + bbHeight - radius[2]);
                ctx.quadraticCurveTo(bbx + bbWidth, bby + bbHeight, bbx + bbWidth - radius[3], bby + bbHeight);


                if (this.component.markerPlacement == 2) {
                    ctx.lineTo(markerPos + 15, bby + bbHeight);
                    ctx.lineTo(markerPos, bby + bbHeight + 30);
                    ctx.lineTo(markerPos - 15, bby + bbHeight);
                }

                ctx.lineTo(bbx + radius[2], bby + bbHeight);



                ctx.quadraticCurveTo(bbx, bby + bbHeight, bbx, bby + bbHeight - radius[2]);




                ctx.lineTo(bbx, bby + radius[1]);

                ctx.quadraticCurveTo(bbx, bby, bbx + radius[0], bby);
                //ctx.closePath();



                ctx.fill();
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 0;
                ctx.stroke();

                var x = bubblePadding * 0.5, y = textLineHeight;
                ctx.textBaseline = "alphabetic";
                ctx.fillStyle = this.component.fontColorRGB;
                ctx.font = fontString;

                lines.forEach(function (line) {

                    if (textAlign == "center") {
                        lineWidth = ctx.measureText(line).width;
                        x = (canvas.width * 0.5) - (lineWidth * 0.5);
                    }
                    else if (textAlign == "right") {
                        lineWidth = ctx.measureText(line).width;
                        x = (widthText + bubblePadding * 0.5) - (lineWidth);
                    }

                    ctx.fillText(line, x, (canvas.height * 0.5) - (heightText * 0.5) + y + (textLineHeight * 0.25));

                    y += textLineHeight;

                });

                var pixi;
                if (this.pixiObject) pixi = this.pixiObject.pixiText; else pixi = this.pixi;
                pixi._texture.baseTexture.hasLoaded = true;

                pixi._texture.baseTexture.realWidth = canvas.width;
                pixi._texture.baseTexture.realHeight = canvas.height;
                pixi._texture.baseTexture.width = canvas.width;
                pixi._texture.baseTexture.height = canvas.height;
                pixi._texture.baseTexture.emit('update', pixi._texture.baseTexture);
                pixi._onTextureUpdate();

                this.width = canvas.width;
                this.height = canvas.height;
            },
            create: function (node$, complete) {

                node$.$.addClass("ani-master-text");

                var self = this;
                node$.fabric.createPIXI();

                node$.fabric.extend({
                    

                    render: function (ctx) {
                        this.width = this.textCanvas.width;
                        this.height = this.textCanvas.height;
                        this.transformPIXI();

                        var markerPlacement = this.component.markerPlacement;

                        if (this.top < 0) {
                            markerPlacement = 2;
                        }
                        else {
                            markerPlacement = 1;

                        }

                        if (markerPlacement != this.component.markerPlacement) {
                            this.component.markerPlacement = markerPlacement;
                            this.updateTextBox();
                        }
                        if (animobile.currentSlide$.currentCamera$) {
                            if (this.objectDock != 0) {
                                this.hasControls = false;
                                this.lockMovementX = true;
                                this.lockMovementY = true;

                                if (this.objectDock == 1) {
                                    this.top = (-animobile.currentSlide$.currentCamera$.fabric.cameraHeight * 0.5) + (this.height * 0.5);
                                }
                                else if (this.objectDock == 2) {
                                    this.top = (animobile.currentSlide$.currentCamera$.fabric.cameraHeight * 0.5) - (this.height * 0.5);
                                }
                            }
                            else {
                                this.hasControls = true;
                                this.lockMovementX = false;
                                this.lockMovementY = false;
                            }
                        }
                        


                    }
                });

               
                node$.fabric.class = this;
                node$.fabric.textCanvas = ani.createCanvasObject(10, 10);
                node$.fabric.pixiObject.pixiText = animobile.canvas.createPIXISprite();
                node$.fabric.pixiObject.pixiText.texture = animobile.canvas.PIXI().Texture.fromCanvas(node$.fabric.textCanvas);
                node$.fabric.pixiObject.addChild(node$.fabric.pixiObject.pixiText);
                node$.fabric.pixiObject.pixiText.anchor.set(0.5);

              


                node$.fabric.updateTextBox = animobile.components["masterText1.0"].updateTextBox;

                node$.fabric.updateTextBox();

                node$.fabric.saveStateAttributes = function () {


                    this.setVisible(!this.objectHide);
                    this.component.fontColorRGB = ani.arrayToRGBA(this.component.fontColor);
                    if (this.updatingText) return;
                    this.updatingText = true;
                    this.updateTextBox();


                    this.setCoords();
                    animobile.canvas.renderAll();
                    setTimeout(function (this$) { this$.updatingText = false; }, 50, this);

                    

                }

                node$.$.find(".nodeIcon:first").remove();
                node$.$.find(".titleArea:first").append('<i class="bmico bmico-font-font-family"></i>');

                complete(node$);

            }

        });

        animobile.defineComponent("camera1.0", {
            init: function () {
                this.stateAttributes = animobile.compileStateAttributes("#cameraWidth,#cameraHeight,cameraDepth,#depthField,#depth,#lookX,#lookY,#viewDistance,#zoomValue".split(","));
                ani.extend(this.stateAttributes, animobile.defaultStateAttributes);
                this.keyframeAttributes = animobile.defaultKeyframeAttributes.concat([]);
            },
            schema: ani.editPages({
                items: [
                  {
                      type: "collapsable", title: "Camera",
                      items: [
                          {
                              input: "text", touchControl: true, field: "#cameraWidth", title: "Width", width: "50%",
                              inputSettings: {
                                  setStateValue: function (v) {
                                      this.currentObject.cameraWidth = v;
                                      this.currentObject.scaleX = this.currentObject.cameraWidth / this.currentObject.width;

                                  }
                              }

                          },
                          {
                              input: "text", touchControl: true, field: "#cameraHeight", title: "Height", width: "50%",
                              inputSettings: {
                                  setStateValue: function (v) {
                                      this.currentObject.cameraHeight = v;
                                      this.currentObject.scaleX = this.currentObject.cameraHeight / this.currentObject.height;
                                  }
                              }

                          },
                      ]
                  },


                ]
            }),
            create: function (node$, complete) {

                node$.$.addClass("ani-camera ani-noicon");
                node$.$.find(".sort-handle").removeClass('sort-handle');
                node$.$.find(".nodeTitle:first").show();
                var self = this;
                node$.fabric.schemas.push(this.schema);
                node$.fabric.extend({
                    evented: false, objectLock: true,
                    render: function (ctx) {

                        if (this.visible) {
                            ctx.save();
                            ctx.lineWidth = 3;
                            this.transform(ctx);
                            var x = -this.width / 2;
                            var y = -this.height / 2;
                            ctx.strokeStyle = "rbga(10,10,10,0.8)";
                            ctx.strokeRect(x, y, this.width, this.height);
                            ctx.restore();
                        }


                    }
                });

                node$.fabric.class = this;

                node$.fabric.saveStateAttributes = function () {
                    this.setVisible(!this.objectHide);
                    this.cameraWidth = (this.width * this.scaleX);
                    this.cameraHeight = (this.height * this.scaleY);

                }

                if (!node$.fabric.timeline) {

                }
                node$.setTitle('<i class="fa fa-camera"></i>');
                node$.fabric.events("scaling", function () {

                    this.saveStateAttributes();
                });


                node$.fitScreen = function () {
                    animobile.canvas.zoomFit(-this.fabric.cameraWidth * 0.5, -this.fabric.cameraHeight * 0.5, this.fabric.cameraWidth, this.fabric.cameraHeight, [10, 10, 10, 10]);

                };

                animobile.defaultProjectSettings(node$.fabric);
                complete(node$);

            }
        });

        animobile.defineComponent("spriteSheet1.0", {
            init: function () {
                this.stateAttributes = animobile.compileStateAttributes("component.sheetName,component.currentSet,component.timeSize".split(","));
                ani.extend(this.stateAttributes, animobile.defaultStateAttributes);
                this.keyframeAttributes = animobile.defaultKeyframeAttributes.concat([]);

                animobile.sourceCompilers.push(function (project) {                

                    project.spriteSheets = {};
                    $(".ani-sprite-sheet").each(function () {
                        var obj = this.fabric;
                        var spr = animobile.components["spriteSheet1.0"].sheets[obj.component.sheetName];

                        project.spriteSheets[obj.component.sheetName] = spr;

                    });

                    
                });

                animobile.sourceLoaders.push(function (project, completed) {
                    var sheets = [];
                    for (var s in project.spriteSheets) {                        
                        sheets.push(project.spriteSheets[s]);
                    }
                    eachItem(sheets, function (sheet, next) {
                        animobile.components["spriteSheet1.0"].prepareSheetTextures(sheet, function (sheet) {
                            animobile.components["spriteSheet1.0"].sheets[sheet.uuid] = sheet;
                            next.call();
                        })

                    }, completed);

                });



                animobile.peristsCompilers.push(function (addItem) {

                    var sheets = animobile.components["spriteSheet1.0"].sheets;
                    for (var s in sheets) {
                        var sheet = sheets[s];
                        addItem(sheet, sheet.imageUrl, function (v) {
                            this.imageUrl = v;
                           

                        });
                    }

                });
            },
            sheets: {}, textures: {},
            timeTick: function (block, diff, clockTime, blockTime, blockTimeWidth) {
                var p = ((clockTime) - blockTime) / (blockTimeWidth);             

                if (p > 1 || p < 0) return;
                var index = Math.round((this.sheetTextures.length - 1) * p);


                if (this.frameIndex != index) {
                    this.frameIndex = index;
                    this.updateRequired = true;

                }
            },
            prepareSheetTextures:function(sheet,completed){

                var img = new Image();
                img.onload = function () {
                    var mw = this.width;
                    var mh = this.height;
                    var texture = { texture: window.canvPIXI.Texture.fromImage(this.src), frames: [] };
                    for (var r = 0; r < sheet.rows; r++) {
                        for (var c = 0; c < sheet.cols; c++) {
                            var x = c * sheet.cellWidth;
                            var y = r * sheet.cellHeight
                            var index = c + (r * sheet.cols);
                            var frameId = sheet.id + "-" + index;


                            try {
                                texture.frames[index] = new window.canvPIXI.Texture(
                                                                            texture.texture.baseTexture,
                                                                            new window.canvPIXI.Rectangle(x, y, sheet.cellWidth, sheet.cellHeight),
                                                                           new window.canvPIXI.Rectangle(0, 0, sheet.cellWidth, sheet.cellHeight),
                                                                           null,  0
                                                                        );
                            }
                            catch (ee) {
                                console.log(ee);
                            }
                        }
                    }

                    animobile.components["spriteSheet1.0"].textures[sheet.uuid] = texture;
                    completed(sheet);
                };
                var url = animobile.appUrl + sheet.imageUrl;
                if (sheet.imageUrl.indexOf("blob:http") == 0) url = sheet.imageUrl;
                img.src = url;
            },
            prepareSheetFromImage: function (url, done) {

                var sheet = this.sheets[url];
                if (sheet) {
                    done(sheet);
                    return;
                }


         
                var img = new Image();
                img.onload = function () {
                    var sheet = {
                        uuid: url, id: ani.guid(),
                        cols: parseInt(this.width / this.height), rows: 1, currentSet: "Default", imageUrl: url, sets: ["Default"],
                        cellWidth: this.height, cellHeight: this.height, Default: [],

                    };

                    animobile.components["spriteSheet1.0"].sheets[sheet.uuid] = sheet;
                    for (var i = 0; i < sheet.cols; i++) {
                        sheet.Default.push(i);
                    }
                    animobile.components["spriteSheet1.0"].prepareSheetTextures(sheet, function (sheet) {
                        done(sheet);
                    });
                   
                };
                img.src = animobile.appUrl + url;
                

            },
            schema: ani.editPages({
                items: []
            }),
            create: function (node$, complete) {

                node$.$.addClass("ani-sprite-sheet");
                
                var self = this;
                node$.fabric.createPIXI();
                //node$.fabric.schemas.push(this.schema);
                node$.fabric.extend({
                    frameIndex:-1,
                    render: function (ctx) {
                        this.transformPIXI();
                        if (this.updateRequired) {
                            this.pixiObject.frameImage._texture = this.sheetTextures[this.frameIndex];
                            this.pixiObject.frameImage._textureID = -1;
                            this.updateRequired = false;
                        }
                    }
                });

                node$.fabric.class = this;
                node$.fabric.pixiObject.frameImage = animobile.canvas.createPIXISprite();

                node$.fabric.sheetTextures = animobile.components["spriteSheet1.0"].textures[node$.fabric.component.sheetName].frames;

                node$.fabric.pixiObject.frameImage._texture = node$.fabric.sheetTextures[0];


                node$.fabric.pixiObject.addChild(node$.fabric.pixiObject.frameImage);
                node$.fabric.pixiObject.frameImage.anchor.set(0.5);
                node$.fabric.timeTick = animobile.components["spriteSheet1.0"].timeTick;

                var animationBlock;
                if (node$.fabric.timelines) {
                    node$.fabric.timelines.forEach(function (timeline) {
                        timeline.blocks.forEach(function (block) {
                            if (block.cssClass == "sprite-sheet-animation-block") {
                                animationBlock = block;
                            }
                        });

                    });
                }
               

                if (!animationBlock) {
                    node$.addTimelineBlock({
                        noKeyframes: true,  actionBlock: true,
                        cssClass: "sprite-sheet-animation-block",blockTitle:"Sprite Animation",
                        actionData: { actionName: "TimeTick", setName: "Default", repeat: 0 },
                        time: 0, timeSize: node$.fabric.component.timeSize,repeat:0,resizeable:true,
                    });
                }
                
              

               
           
                
               node$.$.find(".nodeIcon:first").remove();
               node$.$.find(".titleArea:first").append('<i class="bmico bmico-emoji-icon"></i>');

                complete(node$);

            }
        });

        animobile.defineComponent("amioImage1.0", {
            init: function () {
                this.stateAttributes = animobile.compileStateAttributes("imageUrl,component.amioId,component.onTouchHyperlink".split(","));
                ani.extend(this.stateAttributes, animobile.defaultStateAttributes);
                this.keyframeAttributes = animobile.defaultKeyframeAttributes.concat([]);
            },
            schema: ani.editPages({
                items: [{ title: "On Touch Hyperlink", input: "text", field: "component.onTouchHyperlink", style: "padding-top:20px" }]
            }),
            createObject: function () {
                var md = ani.modals.open({ element: $(animobile.confirmModal) });
                md.ready = function () {
                  
                    this.overlay[0].onclick = function () {
                       md.close();
                    };
                    var q = {

                        filter: { type: 5000 }
                    };
                    md.$.addClass('infoModal');
                    this.$.find(".confirmTitle").html('Select an advertising panel');
                  
                    this.$.find(".ani-modal-ok-button").html('Select')[0].onclick = function () {

                        var useAmio = function (effect,effectTime) {
                            var amio = animobile.components["amioImage1.0"].selectedAmio;
                            if (!amio) return;
                            var img = animobile.components["imageLayer1.0"].resizeImage;
                            img.onload = function () {
                                animobile.newObject({
                                    componentId: "amioImage1.0", iconUrl: amio.repo_path, imageUrl: amio.repo_path, cssAngle: 0,
                                    width: this.width, height: this.height, left: 0, top: 0, alphaValue: 100, blurValue: 0,
                                    component: { amioId: amio.id, onTouchHyperlink: "" },

                                }, function (obj$) {
                                    

                                    md.close();
                                    setTimeout(function () { animobile.canvas.renderAll(); }, 1000);
                                });

                            };
                            img.src = animobile.serverUrl + amio.repo_path;
                        };

                        useAmio(text);
                       

                       

                    };

                    md.$.find(".confirmMessage").css("height", "330px").css("max-height", "330px")
                            .css("overflow-y", "auto").css("display", "block")
                        .parent().addClass('videos-rendered-table');

                    animobile.api(animobile.serverUrl + "/aniparti/search_repo_public", q, function (res) {
                        
                        var ul$ = $('<ul class="savedWorkList" style="margin:0;padding:0"></ul>');
                        res.data.forEach(function (item) {
                            var item$ = $(ani.parseItemTags(animobile.savedWorkListItemTemplate, function (k) { return (eval(k)); }));
                            ul$.append(item$);

                            item$.find('.iconText').html('<img src="' + animobile.serverUrl + item.repo_path + '" width="64" />');
                            item$[0].item = item;
                            item$[0].onclick = function () {
                                animobile.components["amioImage1.0"].selectedAmio = this.item;
                                console.log(this.item);
                            };

                        });
                        md.$.find(".confirmMessage").append(ul$);
                        console.log(res);
                    });

                };
                
            },
            create: function (node$, complete) {
                animobile.components["imageLayer1.0"].create(node$, complete, animobile.serverUrl);
                node$.fabric.class = this;
                node$.fabric.compileStateData = function (preloadings) {
                    var data = this.getStateData(preloadings);

                    if (data.component.onTouchHyperlink != "") {
                        if (data.component.onTouchHyperlink.indexOf("://") < 0) data.component.onTouchHyperlink = "http://" + data.component.onTouchHyperlink;
                        data.events["onTouch"] = [{ actionName: "OpenHyperlink", linkSameWindow: false, Link: data.component.onTouchHyperlink }];
                    }
                    return data;
                };

            }
        });



        animobile.defineComponent("spineAnimation1.0", {
            init: function () {
                var component = this;
                this.stateAttributes = animobile.compileStateAttributes("component.currentAnimation,component.currentSkin,component.width,component.height,component.spineId".split(","));
                ani.extend(this.stateAttributes, animobile.defaultStateAttributes);
                this.keyframeAttributes = animobile.defaultKeyframeAttributes.concat([]);

                animobile.sourceCompilers.push(function (project) {                   
             

                    project.spineAnimations = {};
                    $(".ani-spine-animation").each(function () {
                        var obj = this.fabric;
                        var spn = animobile.components["spineAnimation1.0"].spineAnimations[obj.component.spineId];
                        if (spn) {
                            project.spineAnimations[obj.component.spineId] = spn;
                           
                        }


                    });

                });

                animobile.sourceLoaders.push(function (project, completed) {                   
                    animobile.components["spineAnimation1.0"].spineAnimations = project.spineAnimations;

                    var spines = [];
                    for (var id in project.spineAnimations)
                        spines.push(project.spineAnimations[id]);

                    var img = new Image();
                    eachItem(spines, function (spine, next) {
                       

                        var spineAtlas = new window.canvPIXI.spine.core.TextureAtlas(spine.atlas, function (line, callback) {
                            img.onload = function () {
                                callback(window.canvPIXI.BaseTexture.fromImage(this.src));

                            };

                            var url = animobile.appUrl + spine.image;

                            if (spine.image.indexOf('blob:') == 0) url = spine.image;
                            img.src = url;


                        }, function () {
                           
                            var spineAtlasLoader = new window.canvPIXI.spine.core.AtlasAttachmentLoader(spineAtlas);
                            var spineJsonParser = new window.canvPIXI.spine.core.SkeletonJson(spineAtlasLoader);
                            spineData = spineJsonParser.readSkeletonData(spine.json);
                            var spineObject = new window.canvPIXI.spine.Spine(spineData);
                            var localRect = spineObject.getLocalBounds();
                            spineData.localRect = localRect;
                            spineData.spineId = spine.id;
                            spineData.spineName = spine.name;
                            spineData.spineWidth = localRect.width;
                            spineData.spineHeight = localRect.height;

                            if (spineData.spineWidth == 0 || spineData.spineHeight == 0) {
                                spineData.spineWidth = parseInt(spineData.width);
                                spineData.spineHeight = parseInt(spineData.height);
                            }

                            spineData.animationNames = [];
                            spineData.animations.forEach(function (anim) {
                                spineData.animationNames.push(anim.name);

                            });

                            spineData.skinNames = [];
                            spineData.skins.forEach(function (skin) {
                                spineData.skinNames.push(skin.name);

                            });
                            

                            component.spinesData[spine.id] = spineData;
                            console.log("spine loaded", spine);
                            next.call();
                        });


                    }, completed);



                });


                animobile.peristsCompilers.push(function (addItem) {

                    var spines = animobile.components["spineAnimation1.0"].spineAnimations;
                    for (var s in spines) {
                        var spine = spines[s];
                        addItem(spine, spine.image, function (v) {
                            this.image = v;
                            console.log(this);
                        });
                    }

                });
            },spinesData:{},
            create: function (node$, complete) {

                node$.$.addClass("ani-spine-animation");

                var self = this;
                node$.fabric.createPIXI();

                node$.fabric.extend({
                    render: function (ctx) {
                        this.transformPIXI();
                    }
                });
                var spine = animobile.components["spineAnimation1.0"].spineAnimations[node$.fabric.component.spineId];
                node$.fabric.class = this;
                
              

                node$.fabric.class = this;
                node$.fabric.pixiObject = new window.canvPIXI.Container();
                var spineData = this.spinesData[spine.id];
                node$.fabric.pixiSpine = new window.canvPIXI.spine.Spine(spineData);
                node$.fabric.pixiObject.addChild(node$.fabric.pixiSpine);
                node$.fabric.pixiSpine.skeleton.setToSetupPose();
              
                node$.fabric.pixiSpine.autoUpdate = false;
                node$.fabric.pixiSpine.y = spineData.spineHeight / 2;


                node$.fabric.pixiSpine.state.setAnimation(0, node$.fabric.component.currentAnimation, true);
                node$.fabric.pixiSpine.update(0);
               
                complete(node$);

            }

        });

    };
    animobile.peristsCompilers = [];
    animobile.peristsBlobKeys = {};
    animobile.persistProject = function (completed) {

        var uploadings = [], uploadingsMapping = {};
        document.timelineNodes.$.find(".ani-object").each(function () {

            for (var a in this.fabric.class.stateAttributes) {
                var value = "" + this.fabric.class.stateAttributes[a][0].apply(this.fabric, []);
                if (value.indexOf("blob:") == 0) {
                    uploadings.push({ obj: this.fabric, value: value, set: this.fabric.class.stateAttributes[a][1] });
                }
            }


        });

        document.timelineNodes.$.find(".timeline-block").each(function () {
            var block = this.compileToAniparti();
            if (block.actionBlock) {                
               
                for (var p in block.actionData) {
                    var value = block.actionData[p];
                   

                    if (value.indexOf && value.indexOf("blob:") == 0) {
                        uploadings.push({
                            prop:p,
                            obj: block.actionData, value: value, set: function (value, upload) {
                                upload.obj[upload.prop] = value;
                            }
                        });
                    }
                }
            }

        });
        console.log("uploadings", uploadings);


        animobile.peristsCompilers.forEach(function (compile) {
            compile(function (obj,value, setfunc) {
                if (value.indexOf("blob:") == 0) {
                    uploadings.push({ obj: obj, value: value, set: setfunc });
                }
            });

        });


        console.log(animobile.peristsBlobKeys);
        /*
        eachItem(uploadings, function (upload, next) {
            console.log(upload);
            var blobKey = animobile.peristsBlobKeys[upload.value];
            var apiUrl = "upload_asset";
            if (blobKey) apiUrl += '?key=' + blobKey;
            upload.set.apply(upload.obj, [apiUrl, upload]);
            next.call();
        });

        return;
        */
        var errros = [];
        eachItem(uploadings, function (upload, next) {
            if (uploadingsMapping[upload.value]) {
                upload.set.apply(upload.obj, [uploadingsMapping[upload.value], upload]);
                next.call();
            }
            else {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', upload.value, true);
                xhr.responseType = 'blob';
                xhr.onload = function (e) {
                    if (this.status == 200) {
                        var blob = this.response;
                        var fd = new FormData();
                        fd.append("file", blob);
                        console.log("upload", upload);

                        var blobKey = animobile.peristsBlobKeys[upload.value];
                        var apiUrl = "upload_asset";
                        if (blobKey) apiUrl += '?key=' + blobKey;
                        animobile.api(apiUrl, fd, function (res) {
                            console.log("res", res);
                            if (!res) {
                                errors.push("Error");
                            }
                            else {
                                uploadingsMapping[upload.value] = res;
                                upload.set.apply(upload.obj, [res, upload]);
                            }

                            next.call();

                        }, function () {
                            errros.push('Error');
                        }, true);

                    }
                };
                xhr.send();
            }

            
           


        }, function () {
            console.log(uploadingsMapping);
            if (errros.length > 0) {
                animobile.error("Creations", errros.length + " image(s) could not be uploaded<br/> Please try again");
                animobile.hideProcessing();
                if (completed) completed(false);
            }
            else {
                if (completed) completed(true);
            }
            
        });

    };
      
    animobile.openProjectFromRepo = function (repo, done) {
        
        var content = JSON.parse(repo.content);
        console.log(content);
        delete repo.content;
        animobile.currentProject = JSON.parse(JSON.stringify(repo));
        animobile.createCanvasArea(function () {
            animobile.loadProject(content, function () { if (done) done(); });
        });

    };
    animobile.openProjectById = function (id) {
        animobile.showProcessing();
        animobile.getRepo(id, function (repo) {
            animobile.hideProcessing();
            animobile.openProjectFromRepo(repo);

        }, true);
    };
    animobile.openProject = function () {

        animobile.showProcessing();

        animobile.openProject.modal = ani.modals.open({ element: document.projectsListModal });
        animobile.openProject.modal.ready = function () {
            this.overlay[0].onclick = function () {
                animobile.openProject.modal.close();
            };

            document.projectsList.$.html("");

            animobile.api('search_repo', { user_id: animobile.userId, filter: { type: 100 }, search1: { name: "%creation%" } }, function (res) {

                console.log(res);
                var data = res.data;
                if (!data) {
                    data = [];
                    for (var i = 0; i < 10; i++) {
                        data.push({ id: "1bktofq6859674dcd739d0", name: "creation-" + i, modified_date: Date.now() });
                    }
                }
                data.forEach(function (item) {
                    var item$ = $(ani.parseItemTags('<li><a href="#"><i class="fa fa-angle-right"></i><i class="font-16 fa fa-server color-green-dark"></i><span>{{item.name}}</span></a></li>', function (k) { return (eval(k)); }));
                    document.projectsList.$.append(item$);
                    item$[0].item = item;
                    item$[0].onclick = function () {

                        animobile.showProcessing();
                        animobile.getRepo(this.item.id, function (repo) {
                            animobile.hideProcessing();

                            animobile.openProjectFromRepo(repo);
                            animobile.openProject.modal.close();
                        }, true);
                    }
                })

                animobile.hideProcessing();
            });
        };

    };
    animobile.currentProject = { name: "new creation", description: "new creation" };
    animobile.saveProject = function (completed, silent) {



        if (!animobile.saveProject.schema$) {
            animobile.saveProject.schema$ = ani.editPages({
                items: [
                    { tag: "h2", title: "Save Project" }, { cssClass: "decoration deco-3" },
                    { input: "text", field: "name", title: "Name", cssClass: "top-title text-align-left" },
                    { input: "textarea", field: "description", title: "Description", style: "min-height:50px" },
                   { input: "checkbox", field: "saveAs", title: "Save Copy" },
                    {
                        items: [
                             {
                                 width: "45%",
                                 onClick: function () {
                                     animobile.saveProject.modal.close();
                                 }, cssClass: "button button-rounded button-dark2", type: "button", title: 'Cancel'
                             },
                    {
                        width: "45%",
                        onClick: function () {
                            console.log(animobile.saveProject.schema$.object);
                            animobile.currentProject.name = animobile.saveProject.schema$.object.name;
                            animobile.currentProject.description = animobile.saveProject.schema$.object.description;
                            animobile.showProcessing();
                            animobile.persistProject(function (success) {

                                if (!success) {
                                    animobile.saveProject.modal.close();
                                    return;
                                }
                                var source$ = animobile.compileProject();
                                var repo = JSON.parse(JSON.stringify(animobile.currentProject));
                                repo.name = animobile.currentProject.name;
                                repo.description = animobile.saveProject.schema$.object.name;
                                repo.content = source$;


                                if (animobile.saveProject.schema$.object.saveAs) delete repo.id;

                                repo.user_id = repo.user_id || animobile.userId;
                                animobile.saveRepo(repo, 100, 100, "Projects", function (repo) {
                                    delete repo.content;
                                    animobile.currentProject = repo;
                                    animobile.hideProcessing();
                                    console.log("animobile.currentProject", repo);
                                    if (completed) completed();
                                    animobile.saveProject.modal.close();

                                });

                            });






                        }, cssClass: "button button-rounded button-green pull-right", style: "float:right", type: "button", title: 'Save'
                    }
                        ]
                    }

                ]
            });
            document.hiddenElements.$.append(animobile.saveProject.schema$);
          
            animobile.saveProject.schema$.state = animobile.compileStateAttributes(["name", "description", "saveAs"]);

        }
        if (!silent) {
            animobile.saveProject.modal = ani.modals.open({ element: animobile.saveProject.schema$ });
            animobile.saveProject.modal.ready = function () {
                animobile.saveProject.schema$.css("display", "inline-block").css("margin", "30px").css("width", "auto");

                animobile.saveProject.schema$.object = { name: animobile.currentProject.name, description: animobile.currentProject.description, saveAs: false };
                ani.editPages.run(animobile.saveProject.schema$, animobile.saveProject.schema$.object, animobile.saveProject.schema$.state);
            };
        }
        else {
            animobile.showProcessing();
            animobile.persistProject(function (success) {

                if (!success) {
                    return;
                }
                var source$ = animobile.compileProject();
                var repo = JSON.parse(JSON.stringify(animobile.currentProject));
                repo.name = animobile.currentProject.name;
                repo.description = animobile.currentProject.description;
                repo.content = source$;
                repo.user_id = repo.user_id || animobile.userId;
                animobile.saveRepo(repo, 100, 100, "Projects", function (repo) {
                    delete repo.content;
                    animobile.currentProject = repo;
                    animobile.hideProcessing();
                    console.log("animobile.currentProject", repo);
                    if (completed) completed();


                });

            });
        }
       



    };


    animobile.soundManagerLoadBuffer = function (name, done, error) {
        var sm = this;
        if (sm.buffers[name]) {
            done(sm.buffers[name]);
            return;
        }
        var url = animobile.appUrl + name;

        if (name.indexOf('blob:') == 0) {
            url = name;
        }
        console.log("viewer sound manager ", url);
        window.loadUrl(url, "arraybuffer").onload = function () {
            var responseArray = new Uint8Array(this.response);
            var asset = AV.Asset.fromBuffer(responseArray);
            asset.on("error", function (ee) {
                console.log("av error ", ee);
               if(error) error(ee);
            });
            asset.decodeToBuffer(function (buffer) {
                var format = asset.format;

                sm.buffers[name] = {
                    channelsPerFrame: format.channelsPerFrame, sampleRate: format.sampleRate, buffer: buffer,
                    setup: function () {
                        this.bufferTime = Math.round((((this.buffer.length * parseFloat(this.channelsPerFrame))) / this.sampleRate) * 1000);
                        var channelCount = this.channelsPerFrame;
                        this.ab = sm.context.createBuffer(channelCount, this.buffer.length / channelCount, this.sampleRate);

                        var i, j;


                        for (i = _j = 0, _ref = this.buffer.length - 4; _j < _ref; i = _j += 4) {
                            for (n = _k = 0; _k < channelCount; n = _k += 1) {
                                var channel = this.ab.getChannelData(n);
                                channel[(i + 0)] = this.buffer[(i + 0) * channelCount + n];
                                channel[(i + 1)] = this.buffer[(i + 1) * channelCount + n];
                                channel[(i + 2)] = this.buffer[(i + 2) * channelCount + n];
                                channel[(i + 3)] = this.buffer[(i + 3) * channelCount + n];

                            }

                        }



                        this.bufferTime = this.ab.duration * 1000;




                    },

                }
                sm.buffers[name].setup();
                done(sm.buffers[name]);



            });
        }

    };
   
    animobile.previewProject = function (project) {
        if (!animobile.webglEngineSource) {
            animobile.error("Preview", "Webgl Viewer was not loaded properly");
            return;
        }


        document.exitPreviewFrameButton.onclick = function () {

            document.previewFrame.src = "about:blank";
            document.previewFrameArea.$.hide();
        };

        var beginPreview = function (project) {
            document.previewFrame.onload = function () {
                var doc = this.contentDocument || this.contentWindow.document;
                if (!doc.window) return;
                doc.window.$ = jQuery;
                doc.window.LZString = LZString;
                doc.window.eval(animobile.webglEngineSource);

                doc.window.eval(animobile.webglViewerSource);

                var v$ = doc.window.$('<div style="position:relative;width:100%;height:100%;"></div>');

                var ww = doc.window.innerWidth;
                var hh = doc.window.innerHeight;

                doc.body.style.backgroundColor = "white";
                doc.body.style.width = "100%";
                doc.body.style.height = hh + "px";
                doc.body.appendChild(v$[0]);
                doc.window.aniparti.loadImageURL = function (src, success, failed) {
                    var img = new Image();
                    img.onload = success;
                    img.onerror = failed;
                    if (src.indexOf("blob:http") > -1) {
                        src = src.replace(animobile.appUrl + "/", "");
                    }
                    console.log("loadImageURL hack ", src);
                    img.src = src;
                };
                doc.window.ui.utils.checkImageSource = function (src, onerror, onload) {
                    doc.window.ui.utils.checkImageSourceImage.onerror = onerror;
                    doc.window.ui.utils.checkImageSourceImage.onload = onload;
                    if (src.indexOf("blob:http") > -1) {
                        src = src.replace(animobile.appUrl+"/", "");
                    }
                    console.log("checkImageSource hack ", src);
                    doc.window.ui.utils.checkImageSourceImage.src = src;
                };

                doc.window.anipartiMainURL = animobile.serverUrl+"/";
                v$.anipartiViewer({ baseUrl: animobile.appUrl }).onLoad = function (viewer) {
                    viewer.actions["SwitchToNextSlide"] = function (slide, action) {
                        console.log("SwitchToNextSlide", action);
                    };
                    viewer.soundManager.loadBuffer = animobile.soundManagerLoadBuffer;
                    if (window.cordova && window.cordova.InAppBrowser) {

                        viewer.actions["OpenHyperlink"] = function (slide, action) {
                            cordova.InAppBrowser.open(action.Link, '_blank', 'location=no');
                        };
                    }
                 

                    //viewer.noSound = true;
                    viewer.textureDisplayScale = 1;
                    project = JSON.parse(LZString.decompressFromEncodedURIComponent(project));

                    viewer.events("AfterProcessSlide", function (slide) {
                        console.log("viewer process slide ", slide);
                        slide.pageNavigation = true;
                        slide.loadBlock = function (block) {
                            if (!block.actionBlock) {
                                block.effectId =ani.guid();

                                viewer.globalEffects[block.effectId] = block;
                                var blockRepeat = block.repeat;
                                block = {
                                    active: block.active, effect: viewer.globalEffects[block.effectId], effectSpeed: 1 / block.speed, timeTick: false,
                                    effectId: block.effectId, repeat: (blockRepeat < 1 ? 10000000 : blockRepeat), time: block.time, ani: block.ani
                                };
                                block.lifeTime = (block.effect.timeWidth * block.effectSpeed) * (blockRepeat < 1 ? 1 : blockRepeat);
                                if (block.time + block.lifeTime > this.maxTimelineTime) this.maxTimelineTime = block.time + block.lifeTime;
                                console.log("slide block ", block);
                            }
                            else {

                                if (block.actionData.actionName == "TimeTick") {
                                    var blockRepeat = block.actionData.repeat;
                                    block = {
                                        ani: block.ani, active: block.active, repeat: (blockRepeat < 1 ? 10000000 : blockRepeat),
                                        time: block.time, timeWidth: block.timeWidth, timeTick: true, data: block.actionData
                                    };


                                    block.lifeTime = block.timeWidth * (blockRepeat < 1 ? 1 : blockRepeat);
                                    if (block.time + block.lifeTime > this.maxTimelineTime) this.maxTimelineTime = block.time + block.lifeTime;

                                }
                                else {
                                    block.actionData.time = block.time;
                                    block.actionData.lastActionTime = block.time + 5000;
                                    block.actionData.timeWidth = block.timeWidth;
                                    var blockActive = block.active;
                                    block = block.actionData;
                                    block.actionBlock = true;
                                    block.active = blockActive;
                                }



                            }
                            this.pushTimeblock(block);

                        };

                    });

                    viewer.showAnipartiTouch = function (done) {

                        var div = $('<div class="showAnipartiTouch" style="position:absolute;left:0;top:0;right:0;bottom:0;background-color:#af0000;"><img src="'+animobile.serverUrl+'/logo-aniparti-white.png" style="position:absolute;left:50%;top:50%;margin-left:-100px;margin-top:-122px" width="200" /><h3 style="text-align:center;left:0;right:0; top:50%;position:absolute;margin-top:140px;line-height:40px;color:white"><< Click to play >> <br/><< 点击 >>  </h3></div>');
                        viewer.append(div);
                        div.click(function () {
                            if (viewer.soundManager.handleIOS()) {
                                viewer.events("IOSHandle");
                            }

                            done();
                            div.remove();
                        });
                        div[0].addEventListener('touchend', function (e) {
                            if (viewer.soundManager.handleIOS()) {
                                viewer.events("IOSHandle");
                            }
                            done();
                            div.remove();
                        });

                    };

                    viewer.portraitDisplay(project, ww, hh, true);
                    viewer.slideTransition = function () {
                        if (viewer.activeSlide) {
                            var tweenEffect = "linear";


                            var posY = viewer.activeSlide.scrollY;
                            var tw = {
                                ObjectName: "MainCamera", actionName: "TweenEffect",
                                Speed: 50, Delay: 0, Repeat: 1, EffectTime: 500,
                                "PosX": 0, "PosY": posY, "Rotation": 0,
                                "ScaleX": 1, "ScaleY": 1, Relative: false,
                                TweenProperties: {
                                    "PosX": [false, tweenEffect],
                                    "PosY": [true, tweenEffect], "ScaleX": [false, "linear"], "ScaleY": [false, "linear"], "Rotation": [false, "linear"]
                                }
                            };
                            viewer.actions.TweenEffect(viewer.MainSlide, tw);



                            if (viewer.currentViewSlide + 3 > viewer.totalBatchSlidesLoaded) {
                                viewer.batchLoadSlides(3);
                            }
                        }
                    };

                    viewer.append('<style>.pageNavigationPanel{background-image: url('+animobile.serverUrl+'/paginationPanel.png)}</style>');
                    viewer.pageNavigationDiv.show();
                };
                


            };

           

            document.previewFrame.$.css("width", $(window).width() + "px").css("height", $(window).height() + "px");
            document.previewFrame.src = "ani_canvas/ani_canvas.html?" + Date.now();
            document.previewFrameArea.parentNode.appendChild(document.previewFrameArea);
            document.previewFrameArea.$.show();
        };

        if (project) beginPreview(project);
        else {

            beginPreview(animobile.compileProject());
        }

    };
    animobile.publishProject = function () {
        animobile.saveWork(function () {
            console.log("publish " + animobile.currentProject.id);
            window.location.replace("publish.html#" + animobile.currentProject.id);
        }, animobile.currentProject.id ? true : false);

    };


    window.loadUrl(animobile.serverUrl + "/pixi-spine_new.js?" + Date.now(), "string").onload = function () {
        animobile.pixiSpineCode = this.response;
        console.log("pixi spine loaded");

    };

    window.loadJSFile(document,"ani_canvas/lame.min.js").onload = function () {
     
        console.log("lamejs loaded");

    };
    if (!window.audioinput) {
        
         window.loadJSFile(document, animobile.serverUrl + "/audioInputCapture.js").onload = function () {
            console.log("define window.audioinput", audioinput);
            audioinput._initWebAudio();
        };
        
    }

    window.loadJSFile(document, "scripts/session.js").onload = function () {

        try {
            animobile.session = Blmani.Session.getInstance().get();
            animobile.userId = animobile.session.uid;

            var langid = Blmani.Language.getInstance().get();


            animobile.currentLanguage = (langid == 1 || langid == null) ? "en" : (langid == 2 ? "kr" : "ch");

            animobile.setCurrentLanguage(animobile.currentLanguage);
        } catch (ee) {
            console.error("session error", ee.message);
        }

    };
    animobile.userId = 191;
    
    animobile.exitTool = function () {
        animobile.hideProcessing();
        animobile.confirm("Creations", "Do you want to exit creation tool", function () {
            
            navigator.app.exitApp();
        });
    };
    
    if (!window.ani) {
        animobile.showProcessing();
        window.loadJSFile(document, "ani_canvas/ani_canvas.js?" + Date.now()).onload = function () {
            animobile.events = new ani.eventSystem();
            animobile.begin();
            document.addEventListener("backbutton", function () {
                animobile.exitTool();
            }, false);
            eval(soundJS);

           injectHtmlfile("http://blmani.com/aniparti_fan/creation_tool_repo.html?"+Date.now());
            //injectHtmlfile("creation_tool_repo.html");

            window.loadUrl(animobile.serverUrl + "/isolated-engine-min.js", "arraybuffer").onload = function () {
                JSZip.loadAsync(this.response).then(function (zip) {
                    zip.file("isolated-engine.js").async("string").then(function (data) {
                        animobile.webglEngineSource = data;
                        zip.file("aniparti-viewer.min.js").async("string").then(function (data) {
                            data = data.replace('var m = \'<img src="\' + url + \'" texture="\' + textureKey + \'" />\';',
                                'if(item.imageUrl.indexOf("blob:")==0) url=item.imageUrl; var m = \'<img src="\' + url + \'" texture="\' + textureKey + \'" />\';'
                                );


                            data = data.replace('callback(PIXI.BaseTexture.fromImage(viewer.resourceUrl+spine.image))',
                                'var url=viewer.resourceUrl+spine.image;if(spine.image.indexOf("blob:http")==0) url=spine.image;callback(PIXI.BaseTexture.fromImage(url))'
                                );

                            data = data.replace('aniparti.loadImageURL(viewer.resourceUrl+sheet.imageUrl', 'ui.utils.checkImageSource(viewer.resourceUrl+sheet.imageUrl,function(){}');
                            data = data.replace('var texture = { texture: PIXI.Texture.from(this), frames: [] };', 'var texture = { texture: PIXI.Texture.fromImage(this.src), frames: [] };')

                            data = data.replace('var tex = PIXI.Texture.fromImage(slide.viewer.resourceUrl + this.component.textBubble);',
                                'var url=slide.viewer.resourceUrl + this.component.textBubble;if(this.component.textBubble.indexOf("blob:http")==0) url=this.component.textBubble; var tex = PIXI.Texture.fromImage(url);console.log("text bubble ",tex)');

                            data = data.replace('var tex = PIXI.Texture.fromImage(slide.viewer.resourceUrl + this.textBubble)',
                               'var url=slide.viewer.resourceUrl + this.textBubble;if(this.textBubble.indexOf("blob:http")==0) url=this.textBubble; var tex = PIXI.Texture.fromImage(url)');

                            data = data.replace(/paginationPanel.png/g, animobile.serverUrl + '/paginationPanel.png');

                            animobile.webglViewerSource = data;
                            //console.log("animobile.webglViewerSource", animobile.webglViewerSource);
                            console.log("webgl viewer loaded");

                        });

                    });

                });
            };

            
        };
    };

    
    animobile.dubbAudioData = [];
    window.addEventListener("audioinput", function (evt) {
        animobile.dubbAudioData.push(evt.data);
    }, false);

    window.addEventListener("audioinputerror", function (error) {
        alert("onAudioInputError event recieved: " + JSON.stringify(error));
    }, false);
  


    animobile.addEmoj = function () {

        //document.emojImagesList
        if (!document.emojModal.modal) {
            for (var i = 1; i < 12; i++) {
                document.emojImagesList.$.append('<li  ><img url="/assets/emoj_' + i + '.png" src="' + animobile.appUrl + '/assets/emoj_' + i + '.png" /></li>');

                document.emojImagesList.playEmoj = function () {

                    document.emojImagesList.timer = Date.now();
                    var clockTime = document.emojImagesList.timer - document.emojImagesList.lasTimer;
                    var img = document.emojImagesList.playingEmoj;
                    if (!img) return;

                    img.totalFrames = img.width / img.height;


                    var timeWidth = 1000 * (2 - (parseFloat(document.emojImageSpeed.value) / 100));

                    if (timeWidth < 100) timeWidth = 100;
                    var index = Math.round((img.totalFrames - 1) * (clockTime / timeWidth));
                    img.style.marginLeft = (-index * img.height) + "px";
                  //  console.log(timeWidth, clockTime);
                    if (clockTime > timeWidth) {
                        document.emojImagesList.lasTimer = document.emojImagesList.timer;
                    }

                   
                  


                   
                      requestAnimationFrame(document.emojImagesList.playEmoj);
                };
                document.emojImagesList.lasTimer = 0;
                document.emojImagesList.$.find("li").click(function () {

                    this.firstChild.frameIndex = 0;
                    var startEmoj = document.emojImagesList.playingEmoj ? false : true;
                    document.emojImagesList.playingEmoj = this.firstChild;
                    if (startEmoj)document.emojImagesList.playEmoj();                    

                });
                document.applyEmojButton.onclick = function () {
                    
                    if (document.emojImagesList.playingEmoj) {

                        var useEmoj = function (effect, effectTime) {
                            animobile.showProcessing();

                            animobile.components["spriteSheet1.0"].prepareSheetFromImage(document.emojImagesList.playingEmoj.getAttribute("url"), function (sheet) {

                                console.log(sheet);
                                var timeSize = 1000 * (2 - (parseFloat(document.emojImageSpeed.value) / 100));
                                animobile.newObject({
                                    componentId: "spriteSheet1.0", cssAngle: 0, width: sheet.cellWidth, height: sheet.cellHeight, left: 0, top: 0, alphaValue: 100, blurValue: 0,
                                    component: { sheetName: sheet.uuid, currentSet: "Default", timeSize: timeSize }

                                }, function (obj$) {


                                    setTimeout(function () {
                                        document.emojModal.modal.close();
                                        animobile.hideProcessing();
                                        animobile.canvas.renderAll();
                                    }, 100);


                                });



                            });

                        };
                     
                        useEmoj();
                    }
                    else document.emojModal.modal.close();
                    

                   
                };
            }
        }
       
       

        document.emojModal.modal = ani.modals.open({ element: document.emojModal });
        document.emojModal.modal.ready = function () {
            document.newUIArea.blurUI(true);
            this.closing = function () {
                document.emojImagesList.playingEmoj = false;
                document.newUIArea.blurUI();
                return (true);
            }
            this.overlay[0].onclick = function () {

                document.emojModal.modal.close();
            }
        };


    };
    
   


    /* new ui *****************************/

    animobile.processUltraFeatures = function (div$) {
        div$.find('a[data-tab]').on("click", function () {
            var tab_number = $(this).data('tab');
            $(this).parent().find('[data-tab]').removeClass('active-tab-button');
            $(this).parent().parent().find('.tab-titles a').removeClass('active-tab-button');
            $(this).addClass('active-tab-button');
            $(this).parent().parent().find('.tab-item').slideUp(200);
            $('#' + tab_number).slideDown(200);
        });

        div$.find('a[data-accordion]').on("click", function () {

            var accordion_number = $(this).data('accordion');
            $('.accordion-content').slideUp(200);
            $('.accordion i').removeClass('rotate-180');
            if ($('#' + accordion_number).is(":visible")) {
                $('#' + accordion_number).slideUp(200);
                $(this).find('i:last-child').removeClass('rotate-180');
            } else {
                $('#' + accordion_number).slideDown(200);
                $(this).find('i:last-child').addClass('rotate-180');
            }
        });

        div$.find('.toggle-trigger, .toggle-title').on('click', function () {
            $(this).parent().toggleClass('toggle-active');
            $(this).parent().find('.toggle-content').slideToggle(250);
        });
    };
    $.fn.blurDrop = function (blur) {
        if (blur) {
            this.addClass("backdrop-box");
        }
        else
            this.removeClass("backdrop-box");

    };
    animobile.initNewUI = function () {
        
        animobile.confirm = function (title, message, yes, yesButton, noButton) {
            yesButton = yesButton || "Ok";
            noButton = noButton || "Cancel";
            var md = ani.modals.open({ element: $(animobile.confirmModal) });
            md.ready = function () {

                document.newUIArea.blurUI(true);
                this.$.find(".confirmTitle").html(title);
                this.$.find(".confirmMessage").html(message);

                this.$.find(".ani-modal-ok-button").html(yesButton);
                this.$.find(".ani-modal-cancel-button").html(noButton);
                md.showMessage();
               
            };

            md.showMessage = function () {
                this.closing = function (res) {
                    if (res) yes();
                    document.newUIArea.blurUI();
                    return (true);
                }
            };
           
            return (md);
        };

        animobile.newProject = function (created) {
            animobile.createCanvasArea(function () {
                animobile.loadProject({ slides: [] }, function () {
                    animobile.currentProject.projectSettings = animobile.currentProject.projectSettings || {};

                    animobile.createNewSlide(created);
                    document.publishProjectLink.$.hide();
                });

            });
        };

        document.newUIArea.blurUI = function (blur) {
            document.newUIArea.$.blurDrop(blur);
        };


        animobile.prepareCanvasScreen = function () {
            animobile.prepareTimeline();
            animobile.registerComponents();
            animobile.createCanvasArea(function () {
                var savedId = document.location.hash.replace("#", "");
                if (savedId && savedId != "") {
                    animobile.openProjectById(savedId);
                } else {
                    animobile.createCanvasArea(function () {
                        animobile.loadSource("");

                    });
                }



            });
        };
        



        animobile.exitStage = function () {
            animobile.confirm("Alert", "Are you sure you want to<br/>discard changes?", function () {
                document.canvasScreen.$.hide();
                delete animobile.canvas;
                animobile.currentSlide$ = false;
               
            },"Discard");

        };
        animobile.showStage = function () {
            document.objectLayers.hideLayers();
            document.canvasScreen.$.show();
            document.newUIArea.blurUI(false);
            document.startNewCreationScreen.$.hide();

           
        };

        animobile.moveSlideIndex = function (index) {
            document.objectLayers.hideLayers();
            if (index > animobile.allSlides$.length - 1) index = animobile.allSlides$.length - 1
            if (index < 0) index = 0;

            animobile.allSlides$[index].activate();
            document.currentSlideIndex.value = index;
            document.currentSlideIndex.$.html(document.currentSlideIndex.value + 1);
            animobile.audioRecordingSchema.hide();
        };
        animobile.addNewSlide = function () {
            document.newSlideModal.modal = ani.modals.open({ element: document.newSlideModal });
            document.newSlideModal.modal.ready = function () {
                this.setWidth("70%");
                document.newUIArea.blurUI(true);
                this.closing = function () {                   
                    document.newUIArea.blurUI();
                    return (true);
                }
                this.overlay[0].onclick = function () {
                    document.newSlideModal.modal.close();
                }
            };
        };

        animobile.startEmptyProject = function (completed) {
            animobile.createCanvasArea(function () {
                animobile.loadProject({ slides: [] }, function () {
                    animobile.currentProject.projectSettings = animobile.currentProject.projectSettings || {};


                    completed();
                   document.publishProjectLink.$.show();
                    animobile.showStage();
                    
                });

            });
        }

        document.addEmptySlide.onclick = function () {
            animobile.createNewSlide(function () {
                document.newSlideModal.modal.close();
            });
        }
        document.addSlideWithImage.$.fileUploadButtonEx({
            accept: "image/*", dataType: "arraybuffer", multi: true,
            onFileInput: function (files) {
                animobile.components["ImageSlides1.0"].loadImageSlides(files);
                document.newSlideModal.modal.close();
            }
        }).find("input").css("z-index", "99999");


        document.startCreationWithImage.$.fileUploadButtonEx({
            accept: "image/*", dataType: "arraybuffer", multi: true,
            onFileInput: function (file) {
                if (!animobile.currentSlide$) {
                    animobile.newProject(function () {
                        animobile.components["imageLayer1.0"].addImageFromFiles(file);
                        animobile.showStage();
                    });
                }
                              
            }

        });

        document.startCreationWithImageSlides.$.fileUploadButtonEx({
            accept: "image/*", dataType: "arraybuffer", multi: true,
            onFileInput: function (files) {
                animobile.createCanvasArea(function () {
                    animobile.loadProject({ slides: [] }, function () {
                        animobile.currentProject.projectSettings = animobile.currentProject.projectSettings || {};

                        animobile.components["ImageSlides1.0"].loadImageSlides(files);
                        animobile.showStage();
                    });

                });


               
            }
        }).find("input").css("z-index", "99999");


        document.addImageOnCanvasButton.$.fileUploadButtonEx({
            accept: "image/*", dataType: "arraybuffer", multi: true,
            onFileInput: function (file) {
                animobile.components["imageLayer1.0"].addImageFromFiles(file);
                setTimeout(function () { animobile.canvas.renderAll(); }, 1000);

            }

        });

        document.startCreationWithText.onclick = function () {

          
            document.startNewCreationScreen.$.blurDrop(true);
            document.textEditArea.showEdit("This is the text", function (text) {

                if (!animobile.currentSlide$) {
                    animobile.showProcessing();
                    animobile.newProject(function () {
                        animobile.components["smartText1.0"].createObject(text);

                        animobile.showStage();
                        animobile.hideProcessing();
                       
                    });
                }
                document.startNewCreationScreen.$.blurDrop();
            }, function () { document.startNewCreationScreen.$.blurDrop();});
            return;

          
        };
        document.addTextOnCanvasButton.onclick = function () {

            document.textEditArea.showEdit("This is the text", function (text) {
                animobile.components["smartText1.0"].createObject(text);
            });
            
        };

        document.addEmojOnCanvasButton.onclick = function () {
            animobile.addEmoj();
        }
        //

        document.textEditArea.showEdit = function (text, apply, cancel) {
            document.objectLayers.hideLayers();
            document.textEditAreaTextbox.value = text;
            document.textEditAreaTextbox.oninput();
           
            this.$.show();
            document.newUIArea.blurUI(true);
            document.textEditAreaTextbox.$.focus();
            document.textEditAreaTextbox.$.select();
            
            document.textEditAreaApplyButton.onclick = function () {

                apply(document.textEditAreaTextbox.value);
                document.newUIArea.blurUI();
                document.textEditArea.$.hide();
            };
            document.textEditAreaCancelButton.onclick = function () {
                if (cancel) cancel();
                document.newUIArea.blurUI();
                document.textEditArea.$.hide();
            };

        };
        document.textEditAreaTextbox.szCanvas = ani.createCanvasObject();
        document.textEditAreaTextbox.onkeypress = function (e) {
            if (e.keyCode == 13) {

                e.stopPropagation();
                e.preventDefault();
                return (false);
            }

        };
        document.textEditAreaTextbox.oninput = function () {

            var text = this.value;

            

            var w = parseInt(this.style.width);
            var s = this.szCanvas.ctx.measureText(text).width;
            //console.log(s);
            var h = (parseInt(s / w)+2) * 60;
            
            this.style.height = h + "px";
            this.style.marginTop = -(h * 0.5) + "px";
            
        };
        document.textEditAreaTextbox.szCanvas.ctx.font= document.textEditAreaTextbox.style.fontSize +' '+ document.textEditAreaTextbox.style.fontFamily;
        setTimeout(function () {
            var ww = document.textEditArea.$.width() * 0.9;
            document.textEditAreaTextbox.style.width = (ww) + "px";
            document.textEditAreaTextbox.style.marginLeft = -(ww * 0.5)+"px";

        }, 100);

        animobile.createFromTemplate = function (loadDone) {
            animobile.loadFromWork(function () {
                delete animobile.currentProject.id;
                animobile.currentProject.repo_type = 100;
                animobile.currentProject.user_id = animobile.userId;

                console.log("template ", animobile.currentProject);
                if (loadDone) loadDone();
                

            }, 111, "CREATE FROM TEMPLATE",true);
        }
        animobile.loadFromWork = function (loadDone, repo_type, title,noUserCheck) {
            title = title || "LOAD FROM SAVED WORK";
            document.loadSavedWorkTitle.$.html(title);
            repo_type = repo_type || 100;
            document.loadSavedWork.$.show()

            document.savedWorkList.$.html("");
            animobile.showProcessing();
            var qr={
                user_id: animobile.userId, filter: { type: repo_type }, 
            };
            if (noUserCheck) delete qr.user_id;
            animobile.api('search_repo', qr, function (res) {

                console.log(res);
                var data = res.data;

                data.forEach(function (item) {
                    var item$ = $(ani.parseItemTags(animobile.savedWorkListItemTemplate, function (k) { return (eval(k)); }));
                    document.savedWorkList.$.append(item$);
                    item$[0].item = item;
                    item$[0].onclick = function () {

                        animobile.showProcessing();
                        animobile.getRepo(this.item.id, function (repo) {
                            animobile.hideProcessing();
                            document.loadSavedWork.$.hide()
                            animobile.openProjectFromRepo(repo, function () {
                                if (loadDone) loadDone();

                                if (animobile.isAnipartiProject) {
                                    document.publishProjectLink.$.hide();
                                }
                                else {
                                    document.publishProjectLink.$.show();
                                }

                            });
                            animobile.showStage();
                        }, true);
                    }
                })

                animobile.hideProcessing();
            });

        }

        animobile.saveWork = function (completed, silent) {
            //animobile.persistProject(function (success) { });return;

            if (silent) {
                animobile.showProcessing();
                animobile.persistProject(function (success) {

                    if (!success) {
                        return;
                    }
                    var source$ = animobile.compileProject();
                    var repo = JSON.parse(JSON.stringify(animobile.currentProject));
                    repo.name = animobile.currentProject.name;
                    repo.description = animobile.currentProject.description;
                    repo.content = source$;
                    repo.user_id = repo.user_id || animobile.userId;
                    animobile.saveRepo(repo, 100, 100, "Projects", function (repo) {
                        delete repo.content;
                        animobile.currentProject = repo;
                        animobile.hideProcessing();
                        console.log("animobile.currentProject", repo);
                        if (completed) completed();


                    });

                });
                return;
            }
            document.saveWorkModal.modal = ani.modals.open({ element: document.saveWorkModal });
            document.saveWorkModal.modal.ready = function () {
                document.newUIArea.blurUI(true);
                this.closing = function () {
                    document.newUIArea.blurUI();
                    return (true);
                }
                this.overlay[0].onclick = function () {
                    document.saveWorkModal.modal.close();
                }
            };

            document.saveWorkName.$.val(animobile.currentProject.name);
            document.saveWorkDescription.$.val(animobile.currentProject.description);

            document.saveWorkButton.onclick = function () {
                var saveAs = false;
                animobile.currentProject.name = document.saveWorkName.$.val();
                animobile.currentProject.description = document.saveWorkDescription.$.val();
                animobile.showProcessing();
                animobile.persistProject(function (success) {

                    if (!success) {
                        document.saveWorkModal.modal.close();
                        return;
                    }
                    var source$ = animobile.compileProject();
                    var repo = JSON.parse(JSON.stringify(animobile.currentProject));
                    repo.name = animobile.currentProject.name;
                    repo.description = animobile.currentProject.description;
                    repo.content = source$;


                    if (saveAs) delete repo.id;

                    repo.user_id = repo.user_id || animobile.userId;
                    animobile.saveRepo(repo, 100, 100, "Projects", function (repo) {
                        delete repo.content;
                        animobile.currentProject = repo;
                        animobile.hideProcessing();
                        console.log("animobile.currentProject", repo);
                        if (completed) completed(source$);
                        document.saveWorkModal.modal.close();

                    });

                });

               

            };

        };

        document.topMenuBar.showBar = function () {
            document.objectLayers.hideLayers();
            document.topMenuBar.$.show();
            document.topMenuBarOverlay.$.show();

        };

        document.topMenuBar.hideBar = function () {
            document.topMenuBar.$.hide();
            document.topMenuBarOverlay.$.hide();
            document.objectLayers.hideLayers();
        };

        document.objectLayers.showLayers = function (location) {
            location = location || "bottom";
            document.objectLayersArea.appendChild(document.timelineNodes);


            if (location == "top") {
                document.objectLayers.$.addClass("top").removeClass("bottom");
                document.objectLayers.$.find(".ani-object").show();
                document.objectLayers.$.find(".ani-camera").hide();
            }
            else {
                document.objectLayers.$.addClass("bottom").removeClass("top");
                var currentComponent = animobile.displayObjectSchemas.currentObject.componentId;
                document.objectLayers.$.find(".ani-object").each(function () {
                    this.$.hide();
                    if (this.fabric) {
                        if (this.fabric.componentId == currentComponent) {
                            this.$.show();
                        }
                    }
                });

            }

           
            document.objectLayers.$.toggleClass("show");






        };
       

        document.objectLayers.hideLayers = function () {
            document.objectLayers.$.removeClass("show");
        };

        animobile.addNewObject = function () {
            document.addObjectsModal.modal = ani.modals.open({ element: document.addObjectsModal });
            document.addObjectsModal.modal.ready = function () {
                document.newUIArea.blurUI(true);
                this.closing = function () {
                    document.newUIArea.blurUI();
                    return (true);
                }
                this.overlay[0].onclick = function () {
                    document.addObjectsModal.modal.close();
                }
            };
        };

        document.addObjectsModal_addSingleImage.$.fileUploadButtonEx({
            accept: "image/*", dataType: "arraybuffer", multi: true,
            onFileInput: function (file) {
                animobile.components["imageLayer1.0"].addImageFromFiles(file);
                setTimeout(function () { animobile.canvas.renderAll(); }, 1000);
                document.addObjectsModal.modal.close();

            }

        });

        document.addObjectsModal_addSlideWithImage.$.fileUploadButtonEx({
            accept: "image/*", dataType: "arraybuffer", multi: true,
            onFileInput: function (files) {
                animobile.components["ImageSlides1.0"].loadImageSlides(files);
                document.addObjectsModal.modal.close();

            }
        }).find("input").css("z-index", "99999");


        animobile.audioRecordingSchema = ani.editPages({
            items: [
                 { input: "text", cssClass: "recordingSettingsUI delaySettings inputTitle20", touchControlSpeed: 50, touchControl: true, field: "##delay", width: "60%", title: "Delay&nbsp;" },
                 { input: "slider", cssClass: "recordingSettingsUI repeatSettings inputTitle20", field: "repeat", width: "80%", title: "Repeat" },
                 { input: "slider", cssClass: "recordingSettingsUI volumeSettings inputTitle20", field: "volume", width: "80%", title: "Volume",max:600 },

                {
                title: animobile.audioRecordingSchemaTemplate,
                onInit: function (item$) {
                    item$.find(".recordingSettingsAttributtes .iconText").click(function () {
                        var sche = this.getAttribute("schema-name");
                        console.log(sche);
                        animobile.audioRecordingSchema.find(".recordingSettingsUI").hide();
                        animobile.audioRecordingSchema.find(sche).show();
                    });

                }
            },
            ],
            data: { volume: 100, repeat: 1, delay: 0 },
            init: function () {
                var self = animobile.audioRecordingSchema;
                ani.bindElements(animobile.audioRecordingSchema, animobile.audioRecordingSchema);
                document.schemaDisplay.$.append(animobile.audioRecordingSchema);
                self.hide();

                self.hideAll = function () {
                    self.find(".audioRecordingSchemaUI,.recordingSettingsUI").hide();
                }
                self.settingsButton.onclick = function () {
                    self.hideAll();
                    self.recordingSettings.$.show();
                    self.recordingSettingsAttributtes.$.show();
                };

                self.updateRecordButton.onclick = function () {
                    self.beginRecording();
                };
                self.beginBecordingButton.onclick = function () {
                    self.beginRecording();
                };

                self.beginRecording = function () {
                    self.hideAll();
                    self.recordingScreen.$.show();
                    self.startRecording();
                };

                self.stopRecordingButton.ontouchstart = function () {
                    self.isRecording = false;
                    audioinput.stop();
                    
                    animobile.showProcessing();
                };

                self.recordingDone = function () {
                    self.recordingTimePreview.$.html(self.recordingTimeDisplay.str);

                   
                    var concatenatedData = [];
                    while (animobile.dubbAudioData.length !== 0) {
                        if (animobile.dubbAudioData.length === 0) {
                            break;
                        }
                        concatenatedData = concatenatedData.concat(animobile.dubbAudioData.shift());
                    }
                    
                   

                    var mp3Data = [];
                    var mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128);
                    var mp3Tmp = mp3encoder.encodeBuffer(animobile.soundManager.convertoFloat32ToInt16(concatenatedData));
                    mp3Data.push(mp3Tmp);
                    var mp3buf = mp3encoder.flush();
                    if (mp3buf.length > 0) {
                        mp3Data.push(new Int8Array(mp3buf));
                    }
                    var blob = new Blob(mp3Data, { type: 'audio/mp3' });

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        animobile.soundManager.buffers["testbuffer"] = false;
                        self.checkSoundButton.loadSound("testbuffer", blob, e.target.result);
                        animobile.hideProcessing();

                        self.hideAll();
                        self.recordingSettings.$.show();
                    };
                    reader.readAsArrayBuffer(blob);







                }

                self.startRecording = function () {
                    self.recordingStartTime = Date.now();

                    ani.timer(200, function () {
                        self.recordingTime = (12000 - (Date.now() - self.recordingStartTime)) / 1000;

                        if (self.recordingTime < 0) {
                            audioinput.stop();
                            self.isRecording = false;

                        }
                        else {

                            self.recordingTimeDisplay.str = ani.padString(parseInt((self.recordingTime / 60) % 60) + '', '00') + ":"
                           + ani.padString(parseInt((self.recordingTime) % 60) + '', '00');
                            self.recordingTimeDisplay.$.html(self.recordingTimeDisplay.str);

                        }
                       
                        if (!self.isRecording) self.recordingDone();
                        return (self.isRecording);
                    });
                    animobile.dubbAudioData = [];
                    audioinput.start({
                        sampleRate: audioinput.SAMPLERATE.CD_AUDIO_44100Hz,
                        bufferSize: 1024 * 8,
                        channels: audioinput.CHANNELS.MONO,
                        format: audioinput.FORMAT.PCM_16BIT,
                        normalize: true,
                        normalizationFactor: 32767.0,
                        audioSourceType: audioinput.AUDIOSOURCE_TYPE.DEFAULT
                    });
                    self.isRecording = true;



                };



                self.checkSoundButton.source = new animobile.soundManager.createSource();

                self.checkSoundButton.loadSound = function (soundName, file, data) {
                    animobile.showProcessing();
                    animobile.soundManager.loadBuffer(soundName, function (buff) {

                        self.checkSoundButton.soundItem = { file: file, buffer: buff };
                        console.log("self.checkSoundButton.soundItem", self.checkSoundButton.soundItem);
                        self.checkSoundButton.readySourceBuffer = function () {

                            this.sourceBuffer = this.source.readySource(this.soundItem.buffer.ab, false, 1);
                            this.source.setVolume(parseInt(self.data.volume));
                            return (this.sourceBuffer);
                        };
                        self.checkSoundButton.destroySourceBuffer = function () {
                            if (!this.sourceBuffer) return;
                            this.sourceBuffer.stop();
                            this.sourceBuffer.disconnect(0);
                            delete this.sourceBuffer;

                        };

                        self.updateBufferTimeDisplay(buff.bufferTime);
                        animobile.hideProcessing();
                        


                    }, function () { }, data);


                };
                self.updateBufferTimeDisplay = function (time) {
                    time = time / 1000;
                    self.recordingTimeDisplay.str = ani.padString(parseInt((time / 60) % 60) + '', '00') + ":"
                               + ani.padString(parseInt((time) % 60) + '', '00');
                    self.recordingTimePreview.$.html(self.recordingTimeDisplay.str);
                }
                self.checkSoundButton.onclick = function () {
                    var stopSound = self.checkSoundButton.$.hasClass("playing");

                    if (stopSound) {

                        self.checkSoundButton.destroySourceBuffer();
                        self.updateBufferTimeDisplay(self.checkSoundButton.soundItem.buffer.bufferTime);
                    }
                    else {
                        self.recordingStartTime = Date.now();
                        //self.checkSoundButton.soundItem
                        ani.timer(1000, function () {
                            var continueTimer = self.checkSoundButton.$.hasClass("playing");
                            var time = (self.checkSoundButton.soundItem.buffer.bufferTime - (Date.now() - self.recordingStartTime));
                            if (time > 0 && continueTimer) {
                                self.updateBufferTimeDisplay(time);

                            }
                           
                            return (continueTimer && time>0);
                        });

                        self.checkSoundButton.readySourceBuffer().start();
                        self.checkSoundButton.sourceBuffer.onended = function () {
                            self.checkSoundButton.destroySourceBuffer();
                            self.checkSoundButton.$.removeClass("playing");
                            self.updateBufferTimeDisplay(self.checkSoundButton.soundItem.buffer.bufferTime);
                        };
                    }
                    self.checkSoundButton.$.toggleClass("playing");

                };


                self.showRecording = function () {

                    /*
                    if (self[0].style.display != "none") {
                        self.hide();
                        document.schemaDisplay.$.hide();
                        return;
                    }
                    */
                    animobile.displayObjectSchemas.preventHide = true;
                    document.schemaDisplay.$.find(".editPages").hide();
                    animobile.displayObjectSchemas.currentSchemas = [self];


                    delete self.checkSoundButton.soundItem;
                    self.data = { repeat: 1, delay: 0, volume: 100 };
                    self.checkSoundButton.destroySourceBuffer = function () {

                    };
                    if (animobile.currentSlide$.soundBlock$) {
                        self.data = {
                            repeat: animobile.currentSlide$.soundBlock$.data.Repeat,
                            delay: animobile.currentSlide$.soundBlock$.data.time / 1000,
                            volume: animobile.currentSlide$.soundBlock$.data.Volume || 100
                        };
                        self.checkSoundButton.loadSound(animobile.appUrl + animobile.currentSlide$.soundBlock$.data.SoundName);
                        self.hideAll();
                        self.recordingSettings.$.show();
                    }
                    else {
                        self.hideAll();
                        self.beginBecordingScreen.$.show();
                    }
                    document.schemaDisplay.$.append(ani.editPages.run(self, self.data));
                    self.show();
                    document.schemaDisplay.$.show();
                   

                }

                self._hide = self.hide;
                self.hide = function () {
                   
                    if(self.checkSoundButton.destroySourceBuffer)  self.checkSoundButton.destroySourceBuffer();
                    self.checkSoundButton.$.removeClass("playing");
                    self.isRecording = false;
                    self._hide();
                };
                self.closeRecording = function () {
                    animobile.displayObjectSchemas.preventHide = false;
                    self.hide();
                }


               

                self.recordingSettingsApplyButton.onclick = function () {
                    console.log(self.data);
                    if (self.checkSoundButton.soundItem) {

                        var file = self.checkSoundButton.soundItem.file;
                        if (file) {
                            animobile.showProcessing();
                            var fd = new FormData();
                            fd.append("file", file);
                            animobile.api('upload_asset', fd, function (res) {
                                console.log("res", res);
                                self.checkSoundButton.destroySourceBuffer();

                                animobile.currentSlide$.setSoundBlock(res, parseInt(self.data.delay * 1000), parseInt(self.data.repeat), parseInt(self.data.volume));

                                self.closeRecording();
                                animobile.hideProcessing();
                            }, false, true);
                        }
                        else {
                            self.checkSoundButton.destroySourceBuffer();
                            animobile.currentSlide$.setSoundBlock(animobile.currentSlide$.soundBlock$.data.SoundName,
                                parseInt(self.data.delay * 1000),
                                parseInt(self.data.repeat),
                                parseInt(self.data.volume)
                                );
                            self.closeRecording();
                        }
                    }

                };
            },

            
        });

        $.fn.convertToPlainDropdown = function (cls) {

            var select$ = this.find('select');
            var selectBox$ = this.find('.select-box');

            selectBox$.removeClass('select-box').removeClass('select-box-2');
            select$.addClass('default-select');
            if (cls) select$.addClass(cls);
            selectBox$.find(".sp-dd").remove();
            return (this);
        };

        animobile.applyCameraSizeToSlides = function () {
            $('.ani-slide').each(function () {
                this.currentCamera$.fabric.cameraWidth = parseInt(animobile.currentProject.projectSettings.canvasWidth);
                this.currentCamera$.fabric.cameraHeight = parseInt(animobile.currentProject.projectSettings.canvasHeight);

                this.currentCamera$.fabric.width = this.currentCamera$.fabric.cameraWidth;
                this.currentCamera$.fabric.height = this.currentCamera$.fabric.cameraHeight;



            });

        };
        animobile.projectSettingSchema = ani.editPages({
            items: [
                {
                    title: "Project Setting", style: "padding:5px", cssClass: "workSettings", type: "collapsable",
                    items: [
                         
                    ]
                },
                {
                    title: 'Canvas Setting', style: "padding:5px", cssClass: "workSettings", type: "collapsable",
                    items: [
                        {
                            input: "dropdown",field: "canvasSize", options: [
                              ["640x480", "Landscape - Standard Definition (SD) - 4:3 aspect ratio - 640 x 480"],
                              ["640x360", "Landscape - Standard Definition (SD) - 16:9 aspect ratio - 640 x 360"],
                              ["1280x720", "Landscape - 720p HD - 16:9 aspect ratio - 1280 x 720"],
                              ["1920x1080", "Landscape - 1080p HD - 16:9 aspect ratio - 1920 x 1080"],
                              ["2560x1440", "Landscape - 2K 16:9 aspect ratio - 2560 x 1440"],
                              ["3840x2160", "Landscape - 4K UHD - 16:9 aspect ratio - 3840 x 2160"],
                              ["480x640", "Portrait - Standard Definition (SD) - 4:3 aspect ratio - 480 x 640"],
                              ["360x640", "Portrait - Standard Definition (SD) - 16:9 aspect ratio - 360 x 640"],
                              ["720x1280", "Portrait - 720p HD - 16:9 aspect ratio - 720 x 1280"],
                              ["1080x1920", "Portrait - 1080p HD - 16:9 aspect ratio - 1080 x 1920"],
                              ["1440x2560", "Portrait - 2K 16:9 aspect ratio - 1440 x 2560"],
                              ["2160x3840", "Portrait - 4K UHD - 16:9 aspect ratio - 2160 x 3840"]
                            ],
                            inputSettings: {
                                setStateValue: function (value) {
                                    this.currentObject.canvasSize = value;
                                    value = value.split("x");
                                    this.currentObject.canvasWidth = parseInt(value[0]);
                                    this.currentObject.canvasHeight = parseInt(value[1]);
                                    animobile.projectSettingSchema.refreshSchema();
                                }
                            },
                            onInit: function (item$) { item$.convertToPlainDropdown();}
                        },
                        { title: "Width", input: "text", field: "canvasWidth", width: "50%" },
                        { title: "height", input: "text", field: "canvasHeight", width: "50%" }
                    ]
                },
              
                {
                    title: 'Video Rendering', style: "padding:10px", cssClass: "renderSettings", type: "collapsable",
                    items: [
                        {
                            input: "dropdown", cssClass: "inputTitle40", options: ["Low", "Medium", "High", "Best"], title: "Quality", field: "videoRenderQuality",
                            onInit: function (item$) { item$.convertToPlainDropdown('default-select-60'); }
                        },

                     
                         {
                             input: "dropdown",cssClass:"inputTitle40", options: ["7", "15", "30", "60", "90", "120"], title: "Frames per/sec", field: "videoFps",
                             onInit: function (item$) { item$.convertToPlainDropdown('default-select-60'); }
                         }

                    ]
                }
            ],
            refreshSchema:function(){
                ani.editPages.run(this, this.data);
            },
            showSettings: function (title, applyButtonTitle,applied,hideWorkSettings) {
                applyButtonTitle = applyButtonTitle || "Apply";
                title = title || "WORK SETTING";

                document.workSettingArea.$.find("h4").html(title);
                document.workSettingApplyButton.$.html(applyButtonTitle);
                document.newUIArea.blurUI(true);


                if (hideWorkSettings) {
                    document.workSettingArea.$.find(".workSettings").hide();
                }
                else {
                    document.workSettingArea.$.find(".workSettings").show();
                }
                document.workSettingArea.$.show();
                animobile.currentProject.projectSettings.videoRenderQuality =
                    animobile.currentProject.projectSettings.videoRenderQuality || "Low";

                animobile.currentProject.projectSettings.videoFps =
                    animobile.currentProject.projectSettings.videoFps || "15";

                //videoFps
                this.data = JSON.parse(JSON.stringify(animobile.currentProject.projectSettings));
               
                this.refreshSchema();
                console.log(this.data);
                ani.editPages.run(this, this.data);
                document.workSettingArea.$.hide = function () {
                    document.newUIArea.blurUI();
                    this._hide();
                };

                document.workSettingApplyButton.onclick = function () {
                    animobile.projectSettingSchema.data.canvasSize = animobile.projectSettingSchema.data.canvasWidth + 'x' + animobile.projectSettingSchema.data.canvasHeight;
                    animobile.currentProject.projectSettings = JSON.parse(JSON.stringify(animobile.projectSettingSchema.data));
                  

                    animobile.applyCameraSizeToSlides();
                   
                    document.workSettingArea.$.hide();
                    animobile.currentSlide$.currentCamera$.fitScreen();
                    animobile.canvas.renderAll();
                    if (applied) applied();
                };


            }
        });
        animobile.projectSettingSchema.css('position', 'absolute').css('top', '80px').css('left', '10px').css('right', '10px').css('width', 'auto');
        document.workSettingArea.$._hide = document.workSettingArea.$.hide;
        document.workSettingArea.$.append(animobile.projectSettingSchema);
        
        ani.formatSizeUnits = function (bytes) {
            if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + ' GB'; } else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + ' MB'; } else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + ' KB'; } else if (bytes > 1) { bytes = bytes + ' bytes'; } else if (bytes == 1) { bytes = bytes + ' byte'; } else { bytes = '0 byte'; }
            return bytes;
        };


        animobile.showRenderedVideos = function (host) {
            var md = ani.modals.open({ element: $(animobile.confirmModal) });
            md.ready = function () {
                this.$.addClass('infoModal getRenderedVideos');
                this.$.find(".confirmTitle").html('Rendered Videos');
                this.$.find(".confirmMessage").css("display", "inline-block").
                 css("max-height", "300px").css("vertical-align", "top").css("text-align", "left");

                this.$.find(".ani-modal-ok-button").html('Close');
                md.videoList = $('<table class="videos-rendered-table no-border" style="min-height:auto"></table>');
                

                this.$.find(".confirmMessage").append(md.videoList);
                md.showList = function (clicked) {
                    animobile.showProcessing(md);
                   
                    animobile.api(animobile.serverUrl + "/" + host + "?act=get_render_status&id=" + animobile.currentProject.id, {}, function (res) {

                        var isRendering = false;
                        md.videoList.html("");
                        res.forEach(function (item) {
                            if (item.file) {
                                item.time = parseInt(item.file.replace(".mp4", "").split('_')[1]);
                            } else {
                                item.time = Date.now() + Date.now();
                            }
                        });



                        res.sort(function (a, b) {
                            return (parseInt(b.time) - parseInt(a.time));
                        });

                        res.forEach(function (item) {
                            var item$;

                            if (item.working) {
                                isRendering = true;
                                item.working = item.working.split("_");
                                item.per = parseInt(item.working[item.working.length - 1]) + '%';
                                item$ = $(ani.parseItemTags('<tr><td><a href="#" class="list-group-item blink_me">Video is rendering {{item.per}}</a></td></tr>', function (k) {
                                    return (eval(k));
                                }));
                            }
                            else if (item.waiting) {
                                isRendering = true;
                                item$ = $(ani.parseItemTags('<tr><td><a href="#" class="list-group-item blink_me">Video is waiting..</a></td></tr>', function (k) {
                                    return (eval(k));
                                }));
                            }
                            else {
                                                               
                                item.filename = Date.fromatFromTime(item.time, 'dd-mm-yyyy  HH:mm:ss');
                                item.url = animobile.serverUrl + '/render_jobs_files/' + item.file;
                                item.sizeName = ani.formatSizeUnits(item.size);
                                item$ = $(ani.parseItemTags('<tr><td><a href="{{item.url}}" target="_blank" class="list-group-item video-item"> {{item.filename}}&nbsp; {{item.sizeName}}</a></td></tr>', function (k) {
                                    return (eval(k));
                                }));
                            }


                            item$[0].item = item;
                            md.videoList.append(item$);



                        });

                        animobile.hideProcessing(md);

                        if (!md.isClosed && isRendering && !clicked) {
                            setTimeout(function (md) { md.showList(); }, 5000, md);
                        }


                    });

                }
                md.closed = function () {
                    md.isClosed = true;
                };
                md.showList();


            };

        };
        animobile.videoRendering = function () {
           
            var project = animobile.compileProject(true);
            var videoTime = 0;
            project.slides.forEach(function (slide) {
                var switchSlideFound = false;
                var maxSwitchTime = 0;
                slide.actionTimelines.forEach(function (timeline) {

                    timeline.blocks.forEach(function (block) {
                        if (block.time > maxSwitchTime) maxSwitchTime = block.time;
                        if (block.actionData && block.actionData.actionName == "MoveToNextSlide") {
                            block.actionData.actionName = "SwitchToNextSlide";
                            switchSlideFound = true;

                        }
                    });
                });

                if (!switchSlideFound) {
                    var block = { actionData: { actionName: "SwitchToNextSlide", repeat: 1 }, actionBlock: true, active: true, blockType: 2, timeWidth: 1000, time: 3000, timelineSet: "Set1", timelineSetActive: true };
                    slide.actionTimelines[0].blocks.push(block);
                    if (block.time > maxSwitchTime) maxSwitchTime = block.time;
                }

                videoTime += maxSwitchTime;
            });
            animobile.videoRendering.host = "render_agent_webgl.php";

            animobile.projectSettingSchema.showSettings('Video Rendering &nbsp;&nbsp;<a href="#" onclick="animobile.showRenderedVideos(animobile.videoRendering.host)" class="button button-round _08x newui-red ">Rendered Videos</a>', "Submit Rendering",
                function () {

                    var beginRenderingSubmit = function (host) {
                        animobile.videoRendering.host = host;
                        animobile.showProcessing();
                        animobile.persistProject(function (success) {
                            animobile.hideProcessing();
                            var source$ = animobile.compileProject();
                            animobile.showProcessing();
                            var req = {
                                content: source$,
                                width: animobile.currentProject.projectSettings.canvasWidth,
                                height: animobile.currentProject.projectSettings.canvasHeight,
                                quality: animobile.currentProject.projectSettings.videoRenderQuality,
                                fps: animobile.currentProject.projectSettings.videoFps,
                                id: animobile.currentProject.id,
                                user_id: animobile.userId,
                                appUrl: animobile.appUrl,
                                videoTime: videoTime,
                                email_notify: "true",
                            };
                            req.totalFrames = parseInt((req.videoTime / 1000) * req.fps);
                            animobile.api(animobile.serverUrl + "/"+host+"?act=register_job&id=" + animobile.currentProject.id, JSON.stringify(req), function (res) {


                                animobile.showRenderedVideos(host);
                                animobile.hideProcessing();

                            });


                        });
                    };
                   


                    if (!animobile.currentProject.id) {
                        animobile.saveWork(function () {
                            beginRenderingSubmit(animobile.videoRendering.host);
                        });
                    }
                    else { beginRenderingSubmit(animobile.videoRendering.host); }


            },true);

        };
        animobile.slideTimeSettings = function () {


            animobile.currentSlide$.checkSlidePlayTime(1, function (requiredTime) {

                animobile.confirm("Set Play time for slide", 'play time for slide is <input /> sec', null,
               'Apply', 'Cancel').showMessage = function () {
                   var md = this;
                   
                   md.$.addClass('lowHeight');
                   md.timeInput = md.$.find("input");
                   md.timeInput.val(animobile.currentSlide$.data.slidePlayTime.toFixed("2"));
                   md.closing = function (res) {
                       if (res) {
                           var val = parseFloat(md.timeInput.val());



                           if (val < requiredTime) {
                               animobile.error('Slide play time', 'Slide play time cannot be less than ' + requiredTime.toFixed(2) + ' sec');
                               return (false);

                           }
                           animobile.currentSlide$.data.slidePlayTime = val;
                       }
                       document.newUIArea.blurUI();
                       return (true);
                   }
               };
            });


           

        };
      
        animobile.audioRecordingSchema.init();
        animobile.displayObjectSchemas.events("OnHide", function () {
         

        });

        document.displaySlideList.showList = function () {
            var slidesCount = $('.ani-slide').length;
            var ul$ = this.$.find('ul');
            ul$.html('');
            for (var i = 0; i < slidesCount; i++) {
                li$ = $('<li slide-index="' + (i + 1) + '">Slide ' + (i + 1) + '</li>');
                ul$.append(li$);
                if (i == document.currentSlideIndex.value) {
                    li$.addClass('newui-red-color');
                }
            }
            document.topMenuBarOverlay.$.show();
            document.displaySlideList.$.show();
            ul$[0].onclick = function (e) {
                var i = parseInt(e.target.getAttribute('slide-index'));
                if (i > 0) {
                    document.topMenuBarOverlay.$.hide();
                    document.displaySlideList.$.hide();
                    animobile.moveSlideIndex(i - 1);
                }

            }
        };

    

        var savedId = document.location.hash.replace("#", "");
        if (savedId && savedId != "") {        
            animobile.showProcessing();
            animobile.getRepo(savedId, function (repo) {
                animobile.hideProcessing();
                animobile.openProjectFromRepo(repo);
                animobile.showStage();

            }, true);


        }
      
        setTimeout(function () { animobile.events("AnimobileBegin", []); }, 100);

        animobile.events("CanvasCreated", function () {
        

            if (animobile.closePathCurveEffect) animobile.closePathCurveEffect();

            animobile.canvas.movingPath = animobile.canvas.newObject({
                currentPoints: [], pathPoints: [], path: [], evented: false,
                getCurvePoints: function (pts, tension, isClosed, numOfSegments, smoothness) {
                    tension = (typeof tension != 'undefined') ? tension : 0.5;
                    isClosed = isClosed ? isClosed : false;
                    numOfSegments = numOfSegments || 8;
                    var _pts = [], res = [], x, y, t1x, t2x, t1y, t2y, c1, c2, c3, c4, st, t, i;
                    var lx = pts[0], ly = pts[1], laa = 7, aa = 0, ll = 0;
                    res.push([pts[0], pts[1], ll, aa]);
                    _pts = pts.slice(0);
                    if (isClosed) {
                        _pts.unshift(pts[pts.length - 1]); _pts.unshift(pts[pts.length - 2]); _pts.unshift(pts[pts.length - 1]); _pts.unshift(pts[pts.length - 2]); _pts.push(pts[0]); _pts.push(pts[1]);
                    }
                    else {
                        _pts.unshift(pts[1]); _pts.unshift(pts[0]); _pts.push(pts[pts.length - 2]); _pts.push(pts[pts.length - 1]);
                    }
                    for (i = 2; i < (_pts.length - 4) ; i += 2) {
                        for (t = 0; t <= numOfSegments; t++) {
                            t1x = (_pts[i + 2] - _pts[i - 2]) * tension; t2x = (_pts[i + 4] - _pts[i]) * tension;
                            t1y = (_pts[i + 3] - _pts[i - 1]) * tension; t2y = (_pts[i + 5] - _pts[i + 1]) * tension;
                            st = t / numOfSegments;
                            c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
                            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
                            c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
                            c4 = Math.pow(st, 3) - Math.pow(st, 2);
                            x = c1 * _pts[i] + c2 * _pts[i + 2] + c3 * t1x + c4 * t2x;
                            y = c1 * _pts[i + 1] + c2 * _pts[i + 3] + c3 * t1y + c4 * t2y;
                            aa = Math.atan2(ly - y, lx - x);
                            if (aa < 0) aa += 2 * Math.PI;
                            if (Math.abs(aa - laa) > smoothness) {
                                ll = Math.abs(Math.sqrt(((x - lx) * (x - lx)) + ((y - ly) * (y - ly))));
                                if (ll > 4) res.push([x, y, ll, aa]);
                                laa = aa;
                                lx = x; ly = y;
                            }
                        }
                    }
                    x = pts[pts.length - 2];
                    y = pts[pts.length - 1];
                    aa = Math.atan2(ly - y, lx - x);
                    if (aa < 0) aa += 2 * Math.PI;
                    ll = Math.abs(Math.sqrt(((x - lx) * (x - lx)) + ((y - ly) * (y - ly))));
                    res.push([x, y, ll, aa]);
                    return res;
                },
                ready: function () {
                    this.render = function (ctx) {
                        if (!this.pathBlock$) return;
                        if (!this.path || this.path.length < 1) return;
                        ctx.lineWidth = 6;
                        ctx.strokeStyle = "silver";
                        ctx.beginPath();


                        ctx.moveTo(this.path[0][0], this.path[0][1]);
                        for (var i = 0; i < this.path.length; i++) {
                            ctx.lineTo(this.path[i][0], this.path[i][1]);
                        }
                        ctx.stroke();

                        ctx.fillStyle = "red";
                        for (var i = 0; i < this.path.length; i++) {
                            ctx.fillRect(this.path[i][0] - 4, this.path[i][1] - 4, 8, 8);
                        }


                    };
                    this.preRender = function () { };
                },
                buildCurve: function (block$) {
                    block$ = block$ || this.pathBlock$;
                    if (!block$) return;
                    var pathPoints = this.pathPoints;
                    var tension = 0.6;
                    var segments = 2;
                    var smoothness = parseFloat(block$.data.info.curveSmooth) / 100;
                    this.path = this.getCurvePoints(pathPoints, tension, false, segments, smoothness);
                    this.curveLength = 0;
                    if (this.path.length == 2) {
                        if (this.path[0][0] == this.path[1][0] && this.path[0][1] == this.path[1][1]) {
                            this.path[1][2] = 1;
                        }
                    }
                    for (var i = 0; i < this.path.length; i++) {
                        this.curveLength += this.path[i][2];
                    }
                    console.log("this.path", this.path);
                    block$.data.info.pathPoints = this.pathPoints;

                    this.updateBlock(block$);


                    animobile.canvas.renderAll();

                },


                updateBlock: function (block$) {
                    block$ = block$ || this.pathBlock$;
                    if (!block$) return;
                    var self = this;
                    block$.curveData = self.path;
                    var curveLength = self.curveLength;
                    block$.frames$ = [];
                    var time = 0, lastTime = -1;
                    var timeSize = block$.data.timeSize;
                    curveLength = curveLength == 0 ? 1 : curveLength;
                    console.log("curveLength", curveLength);
                    block$.frames$ = [];
                    block$.curveData.forEach(function (p, index) {
                        time += (timeSize * (p[2] / curveLength));


                        if (parseInt(time) != parseInt(lastTime)) {
                            var frame$ = {
                                data: {
                                    time: parseInt(time), length: p[2],
                                    keys: { left: { value: parseInt(p[0]) }, top: { value: parseInt(p[1]) } }
                                }
                            };
                            frame$.node$ = block$.node$;
                            block$.frames$.push(frame$);
                            lastTime = time;
                        }
                    });

                    console.log("block$.frames$", block$.frames$);
                },

                createNewSoundBlock: function (soundName) {
                    if (!this.currentObject$) return;
                    var self = this;

                    animobile.showProcessing();
                    animobile.soundManager.loadBuffer(soundName, function (buff) {
                        console.log("buff", buff)
                        self.soundBlock$ = self.currentObject$.addTimelineBlock({
                            cssClass: "timeline-sound-block", resizeable: true,
                            time: animobile.timelineCanvas.timelineTracker,
                            timeSize:parseInt(buff.bufferTime), repeat: 1, actionBlock: true,
                            actionData: {
                                actionName:"PlaySound",
                                Repeat: 1, SoundName: soundName, Speed: 50, Volume: 100, actualTime: parseInt(buff.bufferTime)
                            }
                        });


                        animobile.hideProcessing();

                    });



                    

                },
                createNewPathBlock: function () {
                    if (!this.currentObject$) return;

                    var left = this.currentObject$.fabric.left;
                    var top = this.currentObject$.fabric.top;
                    var scaleX = this.currentObject$.fabric.scaleX;
                    var scaleY = this.currentObject$.fabric.scaleY;
                    var fullAngle = this.currentObject$.fabric.fullAngle;
                    var objectOpacity = this.currentObject$.fabric.objectOpacity;

                    this.pathPoints = [left, top, left, top];
                    this.path = [];

                    console.log("createNewPathBlock");
                    this.pathBlock$ = this.currentObject$.addTimelineBlock({
                        cssClass: "timeline-path-block",
                        resizeable: true, time: animobile.timelineCanvas.timelineTracker,
                        timeSize: 1000, repeat: 1, info: {
                            type: "pathCurve", pathPoints: this.pathPoints, curveSmooth: 14,
                        }
                    });



                    this.currentObject$.addTimelineBlock({
                        parentId: this.pathBlock$.data.uuid, cssClass: "advanced-block", keyframeColor: "green",
                        time: this.pathBlock$.data.time, timeSize: this.pathBlock$.data.timeSize,
                        repeat: this.pathBlock$.data.repeat, restrictKeyframes: true,
                        keyframes: [
                            {
                                time: 0, isFixed: true, keys: {
                                    scaleX: { value: scaleX }, scaleY: { value: scaleY },
                                    fullAngle: { value: fullAngle }, objectOpacity: { value: objectOpacity }
                                }
                            },
                            {
                                time: this.pathBlock$.data.timeSize, isFixed: true, keys: {
                                    scaleX: { value: scaleX }, scaleY: { value: scaleY },
                                    fullAngle: { value: fullAngle }, objectOpacity: { value: objectOpacity }
                                }
                            }
                        ]
                    });


                    this.pathBlock$.$.find(".timeline-block-child").hide();

                    //   this.updateBlock(this.pathBlock$);

                    animobile.selectTimelineBlock(animobile.canvas.movingPath.pathBlock$);

                },
                unSelectObject$: function () {
                    animobile.currentSlide$.$.find(".ani-object").each(function () {
                        if (this.fabric.pathEffect) {
                            for (var k in this.fabric.pathEffect) {
                                this.fabric[k] = this.fabric.pathEffect[k];
                            }
                            this.fabric.objectOpacity = 100;
                            this.fabric.setCoords();
                            this.$.show();
                        }

                    });
                    var obj$ = this.currentObject$;


                    for (var k in obj$.fabric.pathEffect) {
                        obj$.fabric[k] = obj$.fabric.pathEffect[k];
                    }
                    obj$.fabric.objectOpacity = 100;
                    animobile.currentSlide$.orderChilds();
                    obj$.fabric.setCoords();
                    animobile.canvas.renderAll();
                    this.currentObject$ = false;
                    this.pathBlock$ = false;
                    this.pathPoints = [];
                    this.path = [];

                },
                selectObject$: function (obj$, soundMode) {
                    this.pathBlock$ = false;

                    this.soundBlock$ = false;
                    animobile.currentSlide$.$.find(".ani-object").each(function () {
                        if (!this.$.hasClass("ani-camera")) {
                            this.fabric.pathEffect = {
                                left: this.fabric.left, top: this.fabric.top,
                                scaleX: this.fabric.scaleX, scaleY: this.fabric.scaleY, objectLock: this.fabric.objectLock,
                                fullAngle: this.fabric.fullAngle, objectOpacity: this.fabric.objectOpacity,
                            };
                            this.fabric.objectLock = true;
                            this.fabric.objectOpacity = 50;
                            this.$.hide();
                        }

                    });
                    obj$.$.show();
                    

                    obj$.$.find(".timeline-block").hide();

                    obj$.fabric.pathEffect = {
                        left: obj$.fabric.left, top: obj$.fabric.top,
                        scaleX: obj$.fabric.scaleX, scaleY: obj$.fabric.scaleY,
                        fullAngle: obj$.fabric.fullAngle, objectOpacity: obj$.fabric.objectOpacity,
                        lockMovementX: obj$.fabric.lockMovementX, lockMovementY: obj$.fabric.lockMovementY,
                        lockScalingX: obj$.fabric.lockScalingX, lockScalingY: obj$.fabric.lockScalingY,
                        hasRotatingPoint: obj$.fabric.hasRotatingPoint, lockRotation: obj$.fabric.lockRotation,
                        hasControls: obj$.fabric.hasControls
                    };
                    obj$.fabric.objectLock = false;
                    obj$.fabric.objectOpacity = 100;
                    obj$.fabric.curveSmooth = 14;
                    obj$.fabric.showOnFront();

                    this.currentObject$ = obj$;
                    animobile.pathEffects.soundMode = soundMode;
                    if (soundMode) {
                        animobile.pathEffects.tabs.hide();
                        $(".curveSmoothInput,.addNewPath").hide();
                        $(".soundModeButtons").show();
                        
                        obj$.$.find(".timeline-sound-block").each(function () {
                            this.$.show();
                        });

                        var blocks$ = obj$.$.find(".timeline-sound-block:first");
                        if (blocks$.length > 0) {
                            animobile.selectTimelineBlock(blocks$[0]);                            
                        }
                        else {
                            animobile.timelineCanvas.setTimelineTrackerValue(0);
                        }

                        
                        var fb = obj$.fabric;
                        fb.hasControls = false;
                        fb.lockMovementX = fb.lockMovementY = fb.lockRotation = fb.lockScalingX = fb.lockScalingY = true;
                        
                    }
                    else {
                        $(".soundModeButtons").hide();
                        $(".curveSmoothInput,.addNewPath").show();

                        //obj$.$.find(".timeline-sound-block").css("opacity", "0.5").css("pointer-events", "none").show();
                        obj$.$.find(".timeline-path-block").show();
                     
                        this.refreshObjectSchema$();
                        var blocks$ = obj$.$.find(".timeline-path-block:first");
                        if (blocks$.length > 0) {
                            animobile.selectTimelineBlock(blocks$[0]);
                            this.selectObjectSchema$('.positionSchemaArea');
                        }
                        else {
                            animobile.timelineCanvas.setTimelineTrackerValue(0);
                        }
                    }
                   
                    animobile.canvas.renderAll();
                },
                refreshObjectSchema$: function () {
                    if (!this.currentObject$) return;
                    var obj$ = this.currentObject$;
                    ani.editPages.run(document.pathCurveEffect.schema, obj$.fabric, obj$.fabric.class.stateAttributes);
                    obj$.fabric.setCoords();

                },
                selectObjectSchema$: function (schm) {
                    if (!this.currentObject$ && this.pathBlock$) return;
                    var fb = this.currentObject$.fabric;
                    fb.lockMovementX = fb.lockMovementY = fb.lockRotation = fb.lockScalingX = fb.lockScalingY = true;

                    fb.hasRotatingPoint = false;
                    fb.hasControls = true;
                    this.pathBlock$.$.find(".timeline-block-child").hide();
                    this.currentObject$.$.find(".timeline-path-block").show().css("pointer-events", "none");
                    if (schm == ".positionSchemaArea") {
                        fb.hasControls = false;
                        fb.lockMovementX = fb.lockMovementY = false;
                        this.currentObject$.$.find(".timeline-block").hide();
                        this.currentObject$.$.find(".timeline-path-block").show().css("pointer-events", "fill");
                        animobile.playTimeline(this.pathBlock$.data.time);
                        animobile.timelineCanvas.setTimelineTrackerValue(this.pathBlock$.data.time);
                    }
                    else if (schm == ".scaleSchemaArea") {
                        fb.lockScalingX = fb.lockScalingY = false;
                    }
                    else if (schm == ".rotateSchemaArea") {
                        fb.lockRotation = false;
                        fb.hasRotatingPoint = true;
                    }

                    else if (schm == ".opacitySchemaArea") {
                        fb.hasControls = false;
                    }
                    if (schm != ".positionSchemaArea") {
                        this.pathBlock$.$.find(".advanced-block").show();
                        this.pathBlock$.$.css("pointer-events", "fill");
                    }

                    fb.setCoords();

                    animobile.canvas.renderAll();
                },

                beginNew: function (obj$) {
                    this.selectObject$(obj$);
                    this.pathIsActive = true;
                    this.currentObjectPos = { left: obj$.fabric.left, top: obj$.fabric.top };
                    this.currentObject$ = obj$;

                },
                setAdvanvedKeyframe: function () {
                    var block$ = this.pathBlock$.$.find(".advanced-block")[0];
                    var time = animobile.timelineCanvas.timelineTracker - block$.data.time;
                    var obj$ = this.currentObject$;
                    var keys = {
                        scaleX: { value: obj$.fabric.scaleX },
                        scaleY: { value: obj$.fabric.scaleY },
                        fullAngle: { value: obj$.fabric.fullAngle },
                        objectOpacity: { value: obj$.fabric.objectOpacity }
                    };

                    for (var i = 0; i < block$.frames$.length; i++) {
                        var frame$ = block$.frames$[i];
                        if (frame$.data.time == time) {
                            frame$.data.keys = keys
                            return;
                        }
                    }
                    block$.data.keyframes.push(
                         block$.addKeyframe({ time: time, keys: keys }).data
                        );


                },
            });

            animobile.canvas.on("object:moving", function (e) {
                if (animobile.canvas.movingPath.pathBlock$)
                    animobile.canvas.movingPath.currentPoints.push([parseInt(e.target.left), parseInt(e.target.top)]);
            });

            animobile.canvas.on("object:rotated", function (e) {
                if (animobile.canvas.movingPath.pathBlock$) {
                    animobile.canvas.movingPath.refreshObjectSchema$();
                    animobile.canvas.movingPath.setAdvanvedKeyframe();
                }
            });

            animobile.canvas.on("object:scaled", function (e) {
                if (animobile.canvas.movingPath.pathBlock$) {
                    animobile.canvas.movingPath.refreshObjectSchema$();
                    animobile.canvas.movingPath.setAdvanvedKeyframe();
                }
            });

            animobile.canvas.on("object:moved", function (e) {
                if (!animobile.canvas.movingPath.pathBlock$) return;
                if (animobile.canvas.movingPath.currentPoints.length < 1) return;
                var lp = animobile.canvas.movingPath.currentPoints[0];
                animobile.canvas.movingPath.pathPoints = [];
                animobile.canvas.movingPath.pathPoints.push(lp[0], lp[1]);
                animobile.canvas.movingPath.currentPoints.forEach(function (p) {
                    var l = Math.abs(Math.sqrt(((p[0] - lp[0]) * (p[0] - lp[0])) + ((p[1] - lp[1]) * (p[1] - lp[1]))));
                    if (l > 10) {
                        animobile.canvas.movingPath.pathPoints.push(p[0], p[1]);
                        lp = p;
                    }
                });

                animobile.canvas.movingPath.buildCurve();
                animobile.canvas.movingPath.currentPoints = [];

            });

            if (animobile.pathEffects) return;


            document.timelineScrollerBar.oninput = function () {
                animobile.timelineCanvas.timelineSpan = (this.timelineSpan - this.value);
                animobile.timelineCanvas.render();
                animobile.scrollNodeTimelines();

            };

            document.timelineScrollerBar.ontouchstart = function () {
                this.timelineSpan = animobile.timelineCanvas.timelineSpan

            };
            document.timelineScrollerBar.ontouchend = function () {
                this.value = 0;
            };

            animobile.pathEffects = {};

            animobile.OpenPathCurveEffect = function (obj$,soundMode) {
                document.pathCurveEffect.$.show();
                document.slideTopBar.$.hide();
                document.timelineLayers.appendChild(document.fullTimelineArea);
                document.timelineNodesArea.appendChild(document.timelineNodes);
                animobile.canvas.movingPath.selectObject$(obj$, soundMode);
                $(".pathCurveEffectSchemaContainer").show();
                $(".closeSlideTimelineButton").hide();
                document.canvasScreen.$.addClass("timelineActivated");
                
           };

            $(".closeSlideTimelineButton").click(function () {
                animobile.closeSlideTimeline();
                document.canvasScreen.$.removeClass("timelineActivated");
            });
            animobile.openSlideTimeline = function (obj$) {
                if(animobile.canvas._activeObject) obj$ = animobile.canvas._activeObject.ani;
                document.pathCurveEffect.$.show();
                document.slideTopBar.$.hide();
                document.timelineLayers.appendChild(document.fullTimelineArea);
                document.timelineNodesArea.appendChild(document.timelineNodes);
                $(".pathCurveEffectSchemaContainer").hide();
                animobile.pathEffects.tabs.hide();
                $(".closeSlideTimelineButton").show();

                document.canvasScreen.$.addClass("timelineActivated");
                animobile.currentSlide$.$.find(".ani-object").each(function () {
                    if (!this.$.hasClass("ani-camera")) {
                        this.fabric.pathEffect = {
                            left: this.fabric.left, top: this.fabric.top,
                            scaleX: this.fabric.scaleX, scaleY: this.fabric.scaleY, objectLock: this.fabric.objectLock,
                            fullAngle: this.fabric.fullAngle, objectOpacity: this.fabric.objectOpacity,
                        };
                        this.fabric.objectLock = true;
                        this.$.hide();
                        
                    }

                });

                if (!obj$) {
                    animobile.currentSlide$.$.addClass("showTimeline");
                    animobile.canvas._discardActiveObject();
                }
                else {
                    obj$.$.show();
                    obj$.$.find(".timeline-block").show();
                    obj$.$.find(".timeline-path-block,.timeline-sound-block,.timeline-block-child").hide();
                }
                animobile.unSelectTimelineBlocks();
                animobile.timelineCanvas.setTimelineTrackerValue(0);
                animobile.canvas.renderAll();
            };
            animobile.closeSlideTimeline = function () {
                animobile.stopTimelinePlaying();
                document.canvasScreen.$.removeClass("timelineActivated");
                setTimeout(function () {
                    animobile.currentSlide$.$.find(".ani-object").each(function () {
                        if (this.fabric.pathEffect) {
                            for (var k in this.fabric.pathEffect) {
                                this.fabric[k] = this.fabric.pathEffect[k];
                            }
                            this.fabric.objectOpacity = 100;
                            this.fabric.setCoords();

                        }

                    });

                    animobile.currentSlide$.$.removeClass("showTimeline");
                    document.pathCurveEffect.$.hide(); document.slideTopBar.$.show();
                    animobile.canvas._discardActiveObject();

                    animobile.canvas.renderAll();
                }, 200);
                


            };


            animobile.closePathCurveEffect = function () {

                document.canvasScreen.$.removeClass("timelineActivated");
                animobile.stopTimelinePlaying();
                setTimeout(function () {
                    document.pathCurveEffect.$.hide(); document.slideTopBar.$.show();
                    animobile.canvas._discardActiveObject();
                    if (!animobile.canvas.movingPath) return;
                    if (animobile.canvas.movingPath.currentObject$) {
                        animobile.canvas.movingPath.unSelectObject$();

                    }

                    document.timelineNodes.$.find(".timeline-block.selected").removeClass("selected");
                    animobile.timelineCanvas.currentBlock$ = false;
                }, 200);
               
            };

            animobile.events("TimelineBlockSelected", function (block$) {
               
                if (animobile.canvas.movingPath.currentObject$) {

                    if (block$.$.hasClass("timeline-path-block")) {

                        animobile.pathEffects.tabs.show();
                        console.log("timeline-path-block", block$.data);
                        animobile.canvas.movingPath.pathBlock$ = block$;

                        animobile.canvas.movingPath.path = block$.curveData;
                        animobile.canvas.movingPath.pathPoints = block$.data.info.pathPoints;
                        animobile.canvas.movingPath.currentObject$.fabric.curveSmooth = block$.data.info.curveSmooth;
                        block$.blockSizeChanged = function () {


                            var timeSize = this.data.timeSize;
                            this.$.find(".timeline-block-child").each(function () {
                                this.style.left = "0";
                                this.frames$[0].data.time = 0;
                                this.frames$[this.frames$.length - 1].data.time = timeSize;
                                this.updateKeyframePositions();


                            });
                            animobile.canvas.movingPath.updateBlock();
                        };


                        if (!animobile.canvas.movingPath.path) {
                            animobile.canvas.movingPath.buildCurve();
                        }

                        console.log("block$.frames$", block$.frames$);
                    }
                    else if (block$.$.hasClass("timeline-sound-block")) {
                        animobile.pathEffects.tabs.hide();
                        animobile.canvas.movingPath.soundBlock$ = block$;
                        block$.blockSizeChanged = function () {
                            console.log(this.data);
                            this.data.actionData.Speed = parseInt((this.data.actionData.actualTime / this.data.timeSize) * 50);
                        };

                    }

                    

                    animobile.playTimeline(block$.data.time);
                    animobile.timelineCanvas.setTimelineTrackerValue(block$.data.time);

                    animobile.canvas.movingPath.refreshObjectSchema$();
                    animobile.canvas.renderAll();
                                        
                }


            });

            animobile.events("TimelineBlockCreated", function (block$) {
                if (block$.$.hasClass("timeline-path-block")) {

                    animobile.canvas.movingPath.pathPoints = block$.data.info.pathPoints;
                    animobile.canvas.movingPath.buildCurve(block$);

                }
                else if (block$.$.hasClass("timeline-sound-block")) {

                }
                
            });

            animobile.events("OnTimeline", function (clockTime) {              
                animobile.canvas.movingPath.refreshObjectSchema$();
            });

            animobile.sourceCompilers.push(function (project) {
                project.plugins["pathCurveEffect"] = (function (viewer) {
                    viewer.createSplineCurve = function (B, g, o, m, a) { g = (typeof g != "undefined") ? g : 0.5; o = o ? o : false; m = m || 8; var b = [], C = [], j, h, f, r, e, p, u, s, q, n, v, l, z; var d = B[0], c = B[1], w = 7, A = 0, k = 0; C.push([B[0], B[1], k, A]); b = B.slice(0); if (o) { b.unshift(B[B.length - 1]); b.unshift(B[B.length - 2]); b.unshift(B[B.length - 1]); b.unshift(B[B.length - 2]); b.push(B[0]); b.push(B[1]) } else { b.unshift(B[1]); b.unshift(B[0]); b.push(B[B.length - 2]); b.push(B[B.length - 1]) } for (z = 2; z < (b.length - 4) ; z += 2) { for (l = 0; l <= m; l++) { f = (b[z + 2] - b[z - 2]) * g; r = (b[z + 4] - b[z]) * g; e = (b[z + 3] - b[z - 1]) * g; p = (b[z + 5] - b[z + 1]) * g; v = l / m; u = 2 * Math.pow(v, 3) - 3 * Math.pow(v, 2) + 1; s = -(2 * Math.pow(v, 3)) + 3 * Math.pow(v, 2); q = Math.pow(v, 3) - 2 * Math.pow(v, 2) + v; n = Math.pow(v, 3) - Math.pow(v, 2); j = u * b[z] + s * b[z + 2] + q * f + n * r; h = u * b[z + 1] + s * b[z + 3] + q * e + n * p; A = Math.atan2(c - h, d - j); if (A < 0) { A += 2 * Math.PI } if (Math.abs(A - w) > a) { k = Math.abs(Math.sqrt(((j - d) * (j - d)) + ((h - c) * (h - c)))); if (k > 4) { C.push([j, h, k, A]) } w = A; d = j; c = h } } } j = B[B.length - 2]; h = B[B.length - 1]; A = Math.atan2(c - h, d - j); if (A < 0) { A += 2 * Math.PI } k = Math.abs(Math.sqrt(((j - d) * (j - d)) + ((h - c) * (h - c)))); C.push([j, h, k, A]); return C };
                    easingFn['dummy'] = function (t) { return t; };
                    viewer.content.slides.forEach(function (slide) {
                        slide.layers.forEach(function (layer) {
                            layer.objects.forEach(function (obj) {
                                obj.timelines.forEach(function (timeline) {
                                    timeline.blocks.forEach(function (block) {
                                        if (block.info) {
                                            block.transformPosX = true; block.transformPosY = true; block.speed = 1; block.frames = []; block.active = true; block.blockStartShowObject = true;
                                            var curveLength = 0, tension = 0.6, segments = 2, smoothness = parseFloat(block.info.curveSmooth) / 100;
                                            var curve = viewer.createSplineCurve(block.info.pathPoints, tension, false, segments, smoothness);
                                            for (var i = 0; i < curve.length; i++) { curveLength += curve[i][2]; }
                                            var timeSize = block.timeSize;
                                            block.timeWidth = block.timeSize;
                                            var time = 0, lastTime = -1;
                                            curve.forEach(function (p) {
                                                time += (timeSize * (p[2] / curveLength));
                                                if (parseInt(time) != parseInt(lastTime)) {
                                                    var frame = { time: parseInt(time) }
                                                    frame.curvePoint = {
                                                        x: parseInt(p[0]),
                                                        y: parseInt(p[1]),

                                                        cx1: 0, cy1: 0, cx2: 0, cy2: 0,
                                                        easingFunctions: { "transformPosX": "dummy", "transformPosY": "dummy" }
                                                    };
                                                    block.frames.push(frame); lastTime = time;
                                                }
                                            });
                                            console.log("path block", block);
                                        }
                                    });
                                });
                            });
                        });
                    });
                }).toString().replace(/\t/g, '');



            });

            animobile.pathEffects.tabs = document.pathCurveEffect.$.find(".tab-titles").find("a");

            animobile.pathEffects.tabs.click(function () {
                var schm = $(this).attr("schema-name");

                document.pathCurveEffect.schema.find(".childSchemaAreas").hide();
                document.pathCurveEffect.schema.find(schm).show();

                animobile.canvas.movingPath.selectObjectSchema$(schm);



            });

            //

            document.pathEffectSchemaButtons.$.find(".deletePath").click(function () {

                if (animobile.canvas.movingPath.pathBlock$) {
                    animobile.confirm("Delete Path", "Do you want to delete current path", function () {
                        console.log("Delete Path", animobile.canvas.movingPath.pathBlock$.data);
                        animobile.canvas.movingPath.pathBlock$.delete();
                        animobile.timelineCanvas.currentBlock$ = false;
                        animobile.canvas.movingPath.pathBlock$ = false;
                        animobile.canvas.movingPath.path = false;
                        animobile.canvas.movingPath.pathPoints = false;

                        animobile.pathEffects.tabs.hide();
                        animobile.canvas.renderAll();


                    }, "Yes", "No");
                }
                else if (animobile.canvas.movingPath.soundBlock$) {
                    animobile.confirm("Delete Sound", "Do you want to delete current sound", function () {

                        animobile.canvas.movingPath.soundBlock$.delete();
                        animobile.timelineCanvas.currentBlock$ = false;
                        animobile.canvas.movingPath.soundBlock$ = false;

                        animobile.canvas.renderAll();


                    }, "Yes", "No");
                }


            });

            document.pathEffectSchemaButtons.$.find(".addNewPath").click(function () {
                animobile.canvas.movingPath.createNewPathBlock();
                animobile.canvas.movingPath.selectObjectSchema$(".positionSchemaArea");

            });

            document.pathEffectSchemaButtons.$.find(".sendBlockToBack").click(function () {
                var block$ = animobile.canvas.movingPath.pathBlock$ || animobile.canvas.movingPath.soundBlock$;
                if (block$) {
                    $(block$.parentNode).prepend(block$.$);

                }
                

            });


            //var md = ani.modals.open({ element: $(animobile.confirmModal) });

        

            document.pathEffectSchemaButtons.$.find(".recordSoundButton").click(function () {
               
                if (!animobile.pathEffects.recordSoundPopup) {
                    animobile.pathEffects.recordSoundPopup = ani.modals.open({ element: '<a class="iconText large roundButton no-title stopRecordingButton" style="background-color:silver;color:red;position:absolute;right:20px;top:20px"><i class="bmico bmico-pause-effect-icon"></i></a><h2 class="recordingTimeDisplay" style="position:absolute;left:40px;top:40px;font-size:50px">00:00</h2>' });

                    animobile.pathEffects.recordSoundPopup.ready = function () {
                        var md = this;
                        md.setWidth("280px");
                        var body$ = md.$.find(".ani-modal-body");
                        body$.css("height", "90px");
                        md.stopRecordingButton = md.$.find(".stopRecordingButton");
                        md.recordingTimeDisplay = md.$.find(".recordingTimeDisplay");

                        md.startRecording = function (showPopup) {

                            md.recordingStartTime = Date.now();

                            ani.timer(200, function () {
                                md.recordingTime = (12000 - (Date.now() - md.recordingStartTime)) / 1000;

                                if (md.recordingTime < 0) {
                                    md.stopRecording();
                                    return (false);
                                }
                                else {

                                    md.recordingTimeDisplay.str = ani.padString(parseInt((md.recordingTime / 60) % 60) + '', '00') + ":"
                                   + ani.padString(parseInt((md.recordingTime) % 60) + '', '00');
                                    md.recordingTimeDisplay.html(md.recordingTimeDisplay.str);

                                }

                               
                                return (md.isRecording);
                            });
                            animobile.dubbAudioData = [];

                            md.isRecording = true;

                            if (showPopup) md.show();


                            audioinput.start({
                                sampleRate: audioinput.SAMPLERATE.CD_AUDIO_44100Hz,
                                bufferSize: 1024 * 4,
                                channels: audioinput.CHANNELS.MONO,
                                format: audioinput.FORMAT.PCM_16BIT,
                                normalize: true,
                                normalizationFactor: 32767.0,
                                audioSourceType: audioinput.AUDIOSOURCE_TYPE.DEFAULT
                            });
                           
                        };

                        md.stopRecording = function () {
                            audioinput.stop();
                            md.isRecording = false;
                            console.log(animobile.dubbAudioData);

                            animobile.showProcessing();
                            var submitAudio = function () {
                                var concatenatedData = [];
                                while (animobile.dubbAudioData.length !== 0) {
                                    if (animobile.dubbAudioData.length === 0) {
                                        break;
                                    }
                                    concatenatedData = concatenatedData.concat(animobile.dubbAudioData.shift());
                                }



                                var mp3Data = [];
                                var mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128);
                                var mp3Tmp = mp3encoder.encodeBuffer(animobile.soundManager.convertoFloat32ToInt16(concatenatedData));
                                mp3Data.push(mp3Tmp);
                                var mp3buf = mp3encoder.flush();
                                if (mp3buf.length > 0) {
                                    mp3Data.push(new Int8Array(mp3buf));
                                }
                                var blob = new Blob(mp3Data, { type: 'audio/mp3' });
                                animobile.hideProcessing();
                              
                                animobile.canvas.movingPath.createNewSoundBlock(window.URL.createObjectURL(blob));
                               
                            };
                            setTimeout(submitAudio, 100);

                            md.hide();

                        };
                        md.stopRecordingButton.click(function () {
                            md.stopRecording();
                        });

                        setTimeout(function (md) { md.startRecording(); }, 100,md);
                    };
                }
               else animobile.pathEffects.recordSoundPopup.startRecording(true);



            });
            //

            document.pathEffectSchemaButtons.$.find(".uploadSoundButton").fileUploadButtonEx({
                accept: ".mp3", dataType: "arraybuffer",
                onFileData: function (data, index, file) {

                    animobile.canvas.movingPath.createNewSoundBlock(window.URL.createObjectURL(file));

                }
            });

            document.pathCurveEffect.schema = ani.editPages({
                items: [
                   
                    {
                       
                        items: [
                                 {
                                     cssClass: "positionSchemaArea childSchemaAreas", items: [
                                         {
                                             width: "15%", style: "margin-top:-10px", title: '<a class="iconText exitButton"><i class="bmico bmico-back-to-home-icon"></i><em>Exit</em></a>',

                                             onInit: function (item$) {
                                                 item$.find(".exitButton").click(function () {
                                                     animobile.closePathCurveEffect();
                                                 });




                                             }
                                         },
                                          { input: "slider", width: "40%", cssClass: "inputTitle5 curveSmoothInput", title: "", field: "#curveSmooth", min: 2, max: 50 },
                                          {
                                              width: "auto", style: "margin-top:-10px", cssClass: 'pull-right', title: '',
                                              onInit: function (item$) { item$.append(document.pathEffectSchemaButtons.$) }
                                          }
                                     ]
                                 },
                                 {
                                     cssClass: "scaleSchemaArea childSchemaAreas", items: [
                                              { input: "text", touchControlSpeed: 50, touchControl: true, field: "##scaleX", width: "50%", title: "Scale X" },
                                             { input: "text", touchControlSpeed: 50, touchControl: true, field: "##scaleY", width: "50%", title: "Scale Y" },
                                     ]
                                 },
                                {
                                    cssClass: "rotateSchemaArea childSchemaAreas", items: [
                                          { input: "text", touchControlSpeed: 150, touchControl: true, field: "#fullAngle", width: "50%", title: "Rotate" },
                                    ]
                                },
                                {
                                    cssClass: "opacitySchemaArea childSchemaAreas", items: [
                                         { input: "slider", cssClass: "inputTitle20", title: "Opacity", field: "#objectOpacity" },
                                    ]
                                },
                        ]
                    },
                  

                   
                   

                ]
            });

            document.pathCurveEffect.schema.onValueUpdate = function (field, value) {

                if (animobile.canvas.movingPath.pathBlock$) {
        


                    if (field.fieldName == "curveSmooth") {
                        animobile.canvas.movingPath.pathBlock$.data.info.curveSmooth = parseInt(value);
                        animobile.canvas.movingPath.buildCurve();
                    }
                    else if (field.fieldName == "scaleX" || field.fieldName == "scaleY") {
                        animobile.canvas.movingPath.setAdvanvedKeyframe();

                    }
                    else if (field.fieldName == "fullAngle") {
                        animobile.canvas.movingPath.setAdvanvedKeyframe();

                    }
                    else if (field.fieldName == "objectOpacity") {
                        animobile.canvas.movingPath.setAdvanvedKeyframe();

                    }
                    
                }
                
            };

            document.pathCurveEffect.schema.find(".childSchemaAreas").hide();
            document.pathCurveEffect.schema.find(".positionSchemaArea").show();
            document.pathCurveEffectSchemaContainer.$.append(document.pathCurveEffect.schema);
            animobile.processUltraFeatures(document.pathCurveEffect.$);

            animobile.pathEffects.tabs.hide();

        });
      

        //library support changes;
        // { "14200": "Sound", "14120": "Character", "14110": "Bubble", "14140": "Image", "14130": "Emoj", "14100": "Background" };

        (function () {

            animobile.loadRepoItems = function (items,doneRepoItems) {
                var backgroundObjects = [];
                console.log("items", items);
                animobile.showProcessing();
                eachItem(items,
                    function (item, next) {

                        if (item.type == 14130) {
                            animobile.components["spriteSheet1.0"].prepareSheetFromImage(
                                item.content.url, function (sheet) {
                                    var timeSize = 1000 * (2 - (50 / 100));
                                    animobile.newObject({
                                        componentId: "spriteSheet1.0", cssAngle: 0, width: sheet.cellWidth, height: sheet.cellHeight, left: 0, top: 0, alphaValue: 100, blurValue: 0,
                                        repoType: item.type, repoId: item.id,
                                        component: { sheetName: sheet.uuid, currentSet: "Default", timeSize: timeSize }
                                    }, function (obj$) { next.call(); });
                                });
                        }
                        else if (item.type == 14100 || item.type == 14110 || item.type == 14120 || item.type == 14140) {
                            var img = animobile.components["imageLayer1.0"].resizeImage;
                            img.onload = function () {

                                var scale = animobile.currentSlide$.currentCamera$.fabric.cameraWidth / this.width;
                                if (this.width < animobile.currentSlide$.currentCamera$.fabric.cameraWidth) scale = 1;

                                animobile.newObject({
                                    repoType: item.type, repoId: item.id,
                                    componentId: "imageLayer1.0", iconUrl: item.content.url, imageUrl: item.content.url, cssAngle: 0,
                                    width: this.width, height: this.height, left: 0, top: 0, alphaValue: 100, blurValue: 0,
                                    scaleX: scale, scaleY: scale,
                                }, function (obj$) {

                                    next.call();
                                    animobile.canvas.renderAll();
                                    if (item.type == 14100) {
                                        obj$.fabric.objectLock = true;
                                        backgroundObjects.push(obj$);
                                    }
                                });
                            };
                            var url = animobile.appUrl + item.content.url;
                            if (item.content.url.indexOf('blob:') == 0) url = item.content.url;
                            img.src = url;

                        }
                        else if (item.type == 14110) {
                            var obj$ = animobile.components["smartText1.0"].createObject('Text bubble');
                            next.call();
                        }

                    },
                    function () {

                        backgroundObjects.forEach(function (obj$) {
                            obj$.parentNode.appendChild(obj$);
                        });
                        animobile.currentSlide$.orderChilds();
                        animobile.hideProcessing();

                        animobile.canvas.renderAll();
                        setTimeout(function () { animobile.canvas.renderAll(); }, 1000);
                        if (doneRepoItems) doneRepoItems();
                    });
            };
            animobile.addNewObject = function () {
                
                animobile.showSearchRepo(function (items) {
                    console.log(items);
                    animobile.loadRepoItems(items);
                    
                });
            };

        })();

        
        
        
       
       


        animobile.createFullScreenPopup = function (title) {
            var popup = $(animobile.fullScreenPopupTemplate);
            popup[0].$ = popup;
            popup = popup[0];
            popup.$.find(".popupTitle").html(title);
            popup.contentArea = popup.$.find(".contentArea");
            document.body.appendChild(popup);
            return (popup);
        };

        animobile.showCreationWizard = function () {
            var wizardScreen = animobile.createFullScreenPopup("Creation Wizard");
            wizardScreen.$._remove = wizardScreen.$.remove;
            wizardScreen.$.remove = function () {
                document.hiddenElements.appendChild(document.creationWizardElement);
                this._remove();

            };
            wizardScreen.contentArea[0].appendChild(document.creationWizardElement);
          
            if (!document.creationWizardElement.initialized) {

               

               var wizard = document.creationWizardElement;
                wizard.$.click(function (e) {
                    if (e.target.repoItem) {
                        var parent$ = $(e.target.parentNode);
                        if (parent$.hasClass("single-selection")) {
                            parent$.find(".selected").removeClass("selected");
                            $(e.target).addClass("selected");
                        }
                        else {

                            $(e.target).toggleClass("selected");
                        }

                    }
                });
                wizard.$.find(".masterTextBubbles").find("td").each(function () {
                    this.repoItem = true;
                });

                wizard.backgroundList = wizard.$.find(".backgroundList");
                wizard.characterList = wizard.$.find(".characterList");

                wizard.$.find(".getBackgroundsButton").click(function () {
                    animobile.showSearchRepo(function (items) {
                        items.forEach(function (item) {
                            if (wizard.backgroundList.find(".repo-" + item.id).length == 0) {
                                var item$ = $(ani.parseItemTags('<td class="repo-item repo-{{item.id}}"><img src="{{item.thumbUrl}}" /></td>', function (k) { return (eval(k)) }));
                                wizard.backgroundList.prepend(item$);
                                item$[0].repoItem = item;
                            }
                        });

                    }, true);
                    animobile.repoTypeSelected = 14100;
                    animobile.search_repo.loadItems(true);
                });


                wizard.$.find(".getCharactersButton").click(function () {
                    animobile.showSearchRepo(function (items) {
                        console.log("items", items);
                        items.forEach(function (item) {
                            if (wizard.characterList.find(".repo-" + item.id).length == 0) {
                                var item$ = $(ani.parseItemTags('<td class="repo-item repo-{{item.id}}"><img src="{{item.thumbUrl}}" /></td>', function (k) { return (eval(k)) }));
                                wizard.characterList.prepend(item$);
                                item$[0].repoItem = item;
                            }
                        });

                    }, true);
                    animobile.repoTypeSelected = 14120;
                    animobile.search_repo.loadItems(true);
                });

                var q = { limit: { start: 0, count: 5 }, fetchContent: true, filter: { type: 14100 } };

                animobile.showProcessing();
                animobile.api('search_repo', q, function (res) {
                    res.data.forEach(function (item) {
                        item.content = JSON.parse(item.content);
                        item.thumbUrl = "http://blmani.com/aniparti_fan/thumb.php?s=aniparti_fan/com/" + item.content.url + "&w=92&h=92";
                        var item$ = $(ani.parseItemTags('<td class="repo-item repo-{{item.id}}"><img src="{{item.thumbUrl}}" /></td>', function (k) { return (eval(k)) }));
                        wizard.backgroundList.append(item$);
                        item$[0].repoItem = item;
                    });
                    q.filter.type = 14120;
                    animobile.api('search_repo', q, function (res) {
                        res.data.forEach(function (item) {
                            item.content = JSON.parse(item.content);
                            item.thumbUrl = "http://blmani.com/aniparti_fan/thumb.php?s=aniparti_fan/com/" + item.content.url + "&w=92&h=92";
                            var item$ = $(ani.parseItemTags('<td class="repo-item repo-{{item.id}}"><img src="{{item.thumbUrl}}" /></td>', function (k) { return (eval(k)) }));
                            wizard.characterList.append(item$);
                            item$[0].repoItem = item;
                        });
                        if (res.data.length < 1) {
                            wizard.characterList.append('<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>');
                        }
                        else if (res.data.length < 2) {
                            wizard.characterList.append('<td>&nbsp;</td><td>&nbsp;</td>');
                        }
                        animobile.hideProcessing();
                    });
                });

                wizard.$.find(".applyWizardButton")[0].onclick = function () {
                    var wizardScreen = this.parentNode.parentNode.parentNode.parentNode;
                    var repoItems = [];
                    wizard.$.find(".repo-item.selected").each(function () {
                        repoItems.push(this.repoItem);
                    });

                    var createObjects = function () {
                        animobile.createNewSlide(function () {
                            animobile.loadRepoItems(repoItems, function () {

                                var masterTextPlacement = -1;
                                if (wizard.$.find(".masterTextTop.selected").length > 0) {
                                    masterTextPlacement = 1;
                                }
                                else if (wizard.$.find(".masterTextBottom.selected").length > 0) {
                                    masterTextPlacement = 2;
                                }
                                if (masterTextPlacement > 0) {
                                    console.log("masterTextPlacement", masterTextPlacement);
                                    animobile.components["masterText1.0"]
                                        .createObject("Master text from wizard").fabric.objectDock = masterTextPlacement;

                                }
                                animobile.canvas.renderAll();
                                wizardScreen.$.remove();
                                animobile.showStage();
                            });

                        });

                    };

                    if (animobile.canvas) {
                        createObjects();
                    }
                    else {
                        animobile.startEmptyProject(function () {
                            createObjects();

                        });
                    }

                }


                wizard.$.find(".cancelWizardButton")[0].onclick = function () {
                    this.parentNode.parentNode.parentNode.parentNode.$.remove();
                };

                wizard.$.find(".useOwnCharacterButton").fileUploadButtonEx({ accept: "image/*", dataType: "arraybuffer", 
                    onFileInput: function (file) {
                        var item = { id: -1, type: 14140, content: { url: window.URL.createObjectURL(file[0]) } };
                         var img = new Image();
                        img.onload = function () {
                            animobile.components["imageLayer1.0"].thumbnail(this, 92,92, function (img) {
                                item.thumbUrl = img.src;
                                var item$ = $(ani.parseItemTags('<td class="repo-item repo-{{item.id}}"><img src="{{item.thumbUrl}}" /></td>', function (k) { return (eval(k)) }));
                                wizard.characterList.prepend(item$);
                                item$[0].repoItem = item;
                            })
                        };
                        img.src = item.content.url;                        
                    }
                });

                wizard.$.find(".useOwnBackgroundButton").fileUploadButtonEx({
                    accept: "image/*", dataType: "arraybuffer",
                    onFileInput: function (file) {
                        var item = { id: -1, type: 14100, content: { url: window.URL.createObjectURL(file[0]) } };
                        var img = new Image();
                        img.onload = function () {
                            animobile.components["imageLayer1.0"].thumbnail(this, 92, 92, function (img) {
                                item.thumbUrl = img.src;
                                var item$ = $(ani.parseItemTags('<td class="repo-item repo-{{item.id}}"><img src="{{item.thumbUrl}}" /></td>', function (k) { return (eval(k)) }));
                                wizard.backgroundList.prepend(item$);
                                item$[0].repoItem = item;
                            })
                        };
                        img.src = item.content.url;
                    }
                });

                document.creationWizardElement.initialized = true;
            }
            document.creationWizardElement.$.find(".repo-item.selected").removeClass("selected");

            //
        
        };

        animobile.wizardItemWidth = ($(window).width() - 200) / 3;

        animobile.wizardItemWidth = (($(window).height() - 130) / 2) / 3;
        $(document.body).append('<style>.itemList td {width:' + animobile.wizardItemWidth + 'px !important;;min-width:' + animobile.wizardItemWidth + 'px !important;}</style>');


       


        animobile.createANewSlide = function () {
            if (animobile.whatDoYouWantToCreate.what == 200) {
                animobile.showCreationWizard();
            }
            else {
                if (animobile.canvas) {
                    animobile.createNewSlide();
                }
                else {
                    animobile.startEmptyProject(function () {
                        animobile.createNewSlide();

                    });
                }
                
            }

        };

        animobile.whatDoYouWantToCreate = function (what) {
            animobile.whatDoYouWantToCreate.what = what;

            animobile.createANewSlide();

            return;
            animobile.startEmptyProject(function () {
                animobile.createANewSlide();

            });
        };

        /*
        animobile.showStage();
        
        animobile.startEmptyProject(function () {
            animobile.createNewSlide();
            // animobile.components["masterText1.0"].createObject();
            animobile.loadRepoItems([{
                content: { url: "assets/1bdbjuo4o4D7j" },
                id: "1aco9aaaac4mjo5baab0asdbb4c0ad4", type: 14120
            }]);
        });
        */
       // animobile.whatDoYouWantToCreate(200);


        document.landingScreenExitButton.onclick = function () {
            if (document.landingScreen.$.hasClass('what_to_create')) {
                document.landingScreen.$.removeClass('what_to_create')
            }
            else {
                animobile.exitTool();
            }

        };
    };

   


    animobile.importTemplate = function () {
        var schema$ = ani.editPages({
            items: [
                { input: "text", field: "name", title: "Name", cssClass: "top-title text-align-left" },
                { input: "textarea", field: "description", title: "Description", style: "min-height:50px" },

            ]
        });


        
        var md = ani.modals.open({ element: $(animobile.confirmModal) });


        animobile.peristsBlobKeys = {};
        md.ready = function () {
            var template_info={};
            ani.editPages.run(schema$, template_info);
            this.$.addClass('infoModal');
            this.$.find(".confirmTitle").html('Import Template');
          
            var importButton$ = $('<button class="button button-rounded button-green">Select zip file</button>');

            this.$.find(".confirmMessage").css("display", "inline-block").
             css("max-height", "300px").css("vertical-align", "top")
                .css("text-align", "left")
            .append(importButton$).append(schema$);

            md.$.find(".ani-modal-ok-button").html('Import').hide();
            md.$.find(".ani-modal-cancel-button").html('Cancel');
            schema$.hide();
            importButton$.fileUploadButtonEx({accept: ".zip",
                dataType: "arraybuffer", onFileData: function (data) {
                    JSZip.loadAsync(data).then(function (zip) {
                        zip.file('index.html').async("string").then(function (text) {
                            var i1 = text.indexOf('aniparti-content="');
                            if (i1 > 0) {
                                var i2 = text.indexOf('"', i1 + 20);
                                md.content = text.substr(i1 + 18, (i2 - (i1 + 18)));
                                md.source = JSON.parse(LZString.decompressFromEncodedURIComponent(md.content));
                                console.log("source", md.source);
                                var assetsFiles = [];
                                for (var f in zip.files) {
                                    if (f.indexOf("assets/") == 0) {
                                        assetsFiles.push(zip.files[f]);
                                    }
                                }


                                template_info.name = md.source.projectName;

                                ani.editPages.run(schema$, template_info);
                                md.loadedAssets = {};
                                schema$.show();
                                md.$.find(".ani-modal-ok-button").show();


                                animobile.showProcessing();
                                eachItem(assetsFiles, function (file, next) {
                                  

                                    window.loadUrl(animobile.appUrl + '/file_exist.php?f=com/' + file.name).onload = function () {

                                        if (this.response == "true") {
                                            md.loadedAssets["/" + file.name] = "/" + file.name;
                                            next.call();
                                        }
                                        else {

                                            zip.file(file.name).async("arraybuffer").then(function (fileData) {
                                                var blob = new Blob([fileData]);
                                                var blobUrl = window.URL.createObjectURL(blob);
                                                animobile.peristsBlobKeys[blobUrl] = file.name.replace("assets/","");
                                                md.loadedAssets["/" + file.name] = blobUrl;
                                                next.call();
                                            });
                                           
                                        }
                                        

                                        
                                    };
                                    


                                }, function () {
                                    animobile.hideProcessing();
                                    console.log("loadedAssets", md.loadedAssets);
                                });
                            }

                        });


                    });
                }
            });

            md.saveTemplate = function (completed) {
                animobile.persistProject(function (success) {
                    animobile.showProcessing();
                    if (!success) {
                        return;
                    }
                   
                    var repo = {};
                    repo.name = template_info.name;
                    repo.description = template_info.description;
                    repo.content = animobile.compileProject();
                    repo.user_id = repo.user_id || animobile.userId;
                    animobile.saveRepo(repo, 111, 100, "Projects", function (repo) {
                        delete repo.content;
                        animobile.hideProcessing();
                        console.log("animobile.currentProject", repo);
                        if (completed) completed(repo);


                    });

                });
            }
            md.closing = function (res) {
                if (res) {

                    var js = LZString.decompressFromEncodedURIComponent(md.content);
                    //console.log(js);
                    for (var a in md.loadedAssets) {
                        var reg = new RegExp('"' + a + '"', "g");

                        js = js.replace(reg, '"' + md.loadedAssets[a] + '"');
                       


                    }
                    animobile.showProcessing();
                    animobile.createCanvasArea(function () {
                        js = JSON.parse(js);
                        js.slides.forEach(function (slide) {
                            slide.layers.forEach(function (layer) {
                                layer.objects.forEach(function (obj) {
                                    obj.anipartiTemplateObject = true;
                                    if (obj.componentId == "smartText1.0") {
                                        obj.component.extendedVersion = "2.0";
                                    }

                                });

                            });

                        });
                        console.log("js", js);
                        animobile.loadTimelines.anipartiBlocks = true;
                        
                        animobile.loadProject(js, function () {
                            animobile.loadTimelines.anipartiBlocks = false;
                            
                            md.saveTemplate(function (repo) {
                                animobile.success("Import aniparti", "Template successfully imported");

                            });
                            

                        });
                        //animobile.showStage();
                        md.close();
                    });



                    return (false);
                }
                return (true);
            }

            this.overlay[0].onclick = function () {
                md.close();
            }
        };



    };

    

    

</script>
<div data-bind="animobileViews" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden">
    <div data-bind="hiddenElements" style="display:none">

        <div data-bind="layerToolsOptions">
            <a href="#"><i class="fa fa-plus chips-icon  bg-green-dark" tapable="true" data-action="animobile.showAddNewObject()"></i></a>
            <a class="nodeExpander" href="#"><i class="fa chips-icon bg-gray-dark" data-action="animobile.expandCurrentNode()" tapable="true"></i></a>
        </div>

     




        <style>
            .slidesImagesList li > img {
                width: 64px;
            }

            .slidesImagesList li:hover > img {
                opacity: 0.5;
            }

            .slidesImagesList li:hover {
                border: solid 2px red;
            }

            .slidesImagesList li > i {
                position: absolute;
                color: red;
                font-size: 20px;
                right: 0;
                top: -3px;
                display: none;
                margin-left1: -12px;
                margin-top1: -14px;
            }

            .slidesImagesList li:hover > i {
                display: block;
            }

            .slidesImagesList li {
                display: block;
                position: relative;
                width: 64px;
                height: 64px;
                list-style-image: none;
                float: left;
                margin: 5px;
                border: solid 2px #e2e1e1;
                overflow: hidden;
            }
        </style>
        <div data-bind="imagesToSlideModal" style="margin:10px;">
            <h3 style="text-align:center;margin-bottom:20px;border-bottom: solid 1px #d7d4d4;padding-bottom: 10px;">Add Multiple Images</h3>

            <div style="min-height:350px;">
                <ul data-bind="slidesImagesList" style="height:300px;min-height:300px; overflow-y:auto;margin:0;padding:3px;"></ul>
                
                
                <div style="position:absolute;bottom:10px;left:50%;margin-left:-24px">
                    <a data-bind="addMoreFilesToSlideImages" href="#" class="iconText no-title highlighted roundButton newui-red " ><i class="bmico bmico-plus-icon"></i></a>

                </div>
               
               
                
            </div>
            <a data-bind="confirmSlideToImagesButton" href="#" class="button button-round newui-red " style="position:absolute;bottom:-30px;left:50%;margin-left:20px;width:120px">Confirm</a>
            <a data-bind="cancelSlideToImagesButton" href="#" class="button button-round button-outline" style="position:absolute;bottom:-30px;left:50%;margin-left:-140px;width:120px">Cancel</a>

        </div>

        <style>
            .emojImagesList li {
                width: 64px;
                height: 64px;
                overflow: hidden;
            }

                .emojImagesList li > img {
                    width: auto;
                    height: 64px;
                }

                .emojImagesList li:hover > img {
                    opacity: 1;
                }
        </style>
        <div data-bind="emojModal" style="margin:10px;">
            <div>
                <h3 style="text-align:center;margin-bottom:20px;border-bottom: solid 1px #d7d4d4;padding-bottom: 10px;">Select Emoj</h3>
                <ul data-bind="emojImagesList" class="slidesImagesList" style="height:300px;min-height:300px; overflow-y:auto;margin:0;padding:3px;"></ul>
                <div class="range-slider"><input data-bind="emojImageSpeed" class="ios-slider" type="range" value="100" min="0" max="200" /></div>

                  <a data-bind="applyEmojButton" href="#" class="button button-round newui-red " style="position:absolute;bottom:-30px;left:50%;margin:0;margin-left:-60px;width:120px">Select</a>

            </div>

        </div>

        <div data-bind="saveWorkModal" style="margin:10px;">
            <style>
                .saveWorkModal em {
                    font-size: 14px;
                    font-weight: bold;
                }
            </style>
            <div>
                <h3 class="uppercase bolder"style="text-align:center;margin-bottom:20px;border-bottom: solid 1px #d7d4d4;padding-bottom: 10px;">Save Work</h3>
                <div style="padding:15px;margin-bottom:20px">

                   <div class="input-simple-1 has-icon input-blue bottom-30"><em>Work name</em><input type="text"  data-bind="saveWorkName" placeholder="Work name"></div>
                 
                    <div class="input-simple-1 textarea has-icon bottom-30"><em>Work description</em> <textarea data-bind="saveWorkDescription" class="textarea-simple-1" placeholder="Work description"></textarea></div>
                    


                </div>
                <a data-bind="saveWorkButton" href="#" class="button button-round newui-red " style="position:absolute;bottom:-30px;left:50%;margin:0;margin-left:-60px;width:120px">Save</a>

            </div>

        </div>

        <div data-bind="newSlideModal" style="margin:10px;margin-bottom:40px">
            <div>
                <h3 style="text-align:center;margin-bottom:30px;border-bottom: solid 1px #d7d4d4;padding-bottom: 10px;">New Slide</h3>
                <table width="80%" class="no-border">
                    <tr>
                        <td style="width:10%">&nbsp;</td>
                        <td>
                            <a href="#" class="iconText title-out outline roundButton large centerIcon" data-bind="addEmptySlide">
                                <i class="bmico bmico-empty-slide-icon"></i>
                                <em>Empty Slide</em>
                            </a>
                        </td>
                        <td>
                            <a href="#" class="iconText title-out outline roundButton large centerIcon" >
                                <i class="bmico bmico-with-images-slide" data-bind="addSlideWithImage"></i>
                                <em>With Images</em>
                            </a>
                        </td>
                        <td style="width:10%">&nbsp;</td>
                    </tr>
                </table>
            </div>

        </div>

        <div data-bind="addObjectsModal" style="margin:10px;margin-bottom:40px">
            <div>
                <h3 style="text-align:center;margin-bottom:30px;border-bottom: solid 1px #d7d4d4;padding-bottom: 10px;">Add Object to slide</h3>
                <table width="80%" class="no-border" style="margin-bottom:30px;background-color: #fdfdfd;">
                    <tr>                        
                      

                        <td>
                            <a href="#" class="iconText title-out outline roundButton large centerIcon">
                                <i class="bmico bmico-single-image-icon" data-bind="addObjectsModal_addSingleImage"></i>
                                <em>Image</em>
                            </a>
                        </td>
                        <td>
                            <a href="#" class="iconText title-out outline roundButton large centerIcon">
                                <i class="bmico bmico-with-images-slide" data-bind="addObjectsModal_addSlideWithImage"></i>
                                <em>Slides Images</em>
                            </a>
                        </td>
                        <td>
                            <a href="#" class="iconText title-out outline roundButton large centerIcon">
                                <i class="bmico bmico-single-image-icon" onclick="document.addObjectsModal.modal.close(); document.addTextOnCanvasButton.onclick();"></i>
                                <em>Text</em>
                            </a>
                        </td>
                       
                       

                    </tr>
                    <tr >
                        <td style="padding-top: 20px;">
                            <a href="#" class="iconText title-out outline roundButton large centerIcon" onclick="document.addObjectsModal.modal.close(); animobile.addEmoj();">
                                <i class="bmico bmico-emoji-icon"></i>
                                <em>Emoj</em>
                            </a>
                        </td>
                        <td style="padding-top: 20px;">
                            <a href="#" class="iconText title-out outline roundButton large centerIcon" onclick="document.addObjectsModal.modal.close(); animobile.components['amioImage1.0'].createObject()">
                                <i class="bmico bmico-ads"></i>
                                <em>Ads Object</em>
                            </a>

                        </td>
                    </tr>
                </table>
            </div>

        </div>



        <div data-bind="popupMenuModal" style="display:inline-block">
            <div style="margin:40px">
                <label class="chipButton" onclick="document.popupMenuModal.modal.close(); animobile.exitTool()"><a href="#" class="bg-red-dark"><i class="fa fa-reply"></i></a>Back to my home</label>
                <div class="decoration deco-3"></div>
                <label class="chipButton" onclick="document.popupMenuModal.modal.close(); animobile.deleteSlide()"><a href="#" class="bg-red-light"><i class="fa fa-times"></i></a>Delete current slide</label>

                <div class="decoration deco-3"></div>

                <label class="chipButton" onclick="document.popupMenuModal.modal.close(); animobile.newProject()"><a href="#" class="bg-gray-dark"><i class="fa fa-file"></i></a>New work</label>
                <label class="chipButton" onclick="document.popupMenuModal.modal.close(); animobile.saveWork()"><a href="#" class="bg-green-light"><i class="fa fa-save"></i></a>Save my work</label>
                <label class="chipButton" onclick="document.popupMenuModal.modal.close(); animobile.openProject()"><a href="#" class="bg-blue-light"><i class="fa fa-server"></i></a>Load my work</label>
                <div class="decoration deco-3"></div>
                <label class="chipButton" onclick=" document.popupMenuModal.modal.close(); animobile.publishProject()"><a href="#" class="bg-pink-dark"><i class="fa fa-newspaper-o"></i></a>Publish</label>
                <label class="chipButton" onclick="document.popupMenuModal.modal.close(); animobile.previewProject()"><a href="#" class="bg-gray-dark"><i class="fa fa-eye"></i></a>Preview</label>


            </div>
        </div>
        <style>
            .creationWizard > div {
                height: 33.33%;
                width: 100%;
                float: left;
                border-bottom: solid 1px #e6e6e6;
            }

                .creationWizard > div > .itemsArea {
                    position: absolute;
                    left: 10px;
                    right: 10px;
                    bottom: 35px;
                    top: 40px;
                    overflow: hidden;
                    overflow-x: auto;
                }

                .creationWizard > div > .buttonsArea {
                    position: absolute;
                    left: 10px;
                    right: 10px;
                    bottom: 5px;
                    height: 30px;
                }

                .creationWizard > div > h4 {
                    font-size: 16px;
                    font-weight: 600;
                    color: #b4b4b4;
                    padding: 5px;
                }

            .itemList td {
                min-width: 150px;
                margin: 5px;
            }

                .itemList td > img, .itemList.masterTextBubbles td > div {
                    margin: 5%;
                    width: 90%;
                    border: solid 2px transparent;
                    -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.45);
                    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.45);
                    border-radius: 10px;
                    padding: 10px;
                    pointer-events: none;
                }

            .itemList.masterTextBubbles td {
                min-width: 33.33%;
            }

                .itemList.masterTextBubbles td > div {
                    height: 90%;
                }

                    .itemList.masterTextBubbles td > div > i {
                        position: absolute;
                        font-size: 70px;
                        margin-left: -35px;
                        top: 50%;
                        margin-top: -35px;
                        color: #d6d6d6;
                    }

                .itemList td.selected > img, .itemList.masterTextBubbles td.selected > div {
                    border: solid 2px #6a6868;
                }

            .creationWizard .buttonsArea a {
                padding: 0px 10px 0px 10px;
                margin-left: 10px;
            }

            .creationWizard {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 50px;
            }
        </style>
        <div data-bind="creationWizardElement" class="fullScreenDiv">
            <div class="creationWizard">
                <div>
                    <h4>Set Background(s) & slides</h4>
                    <div class="itemsArea">
                        <table style="height:100%">
                            <tr class="itemList backgroundList"></tr>
                        </table>
                    </div>
                    <div class="buttonsArea">
                        <a href="#" class="useOwnBackgroundButton button button-round button-green button-xxs pull-right"><i class="bmico bmico-icon-gallery"></i> Use Own</a>
                        <a href="#" class="getBackgroundsButton button button-round button-yellow button-xxs pull-right"><i class="bmico bmico-icon-download"></i> Get</a>

                    </div>
                </div>
                <div>
                    <h4>Add Character(s)</h4>
                    <div class="itemsArea">
                        <table style="height:100%"><tr class="itemList characterList"></tr></table>
                    </div>
                    <div class="buttonsArea">
                        <a href="#" class="useOwnCharacterButton button button-round button-green button-xxs pull-right"><i class="bmico bmico-icon-gallery"></i> Use Own</a>
                        <a href="#" class="getCharactersButton button button-round button-yellow button-xxs pull-right"><i class="bmico bmico-icon-download"></i> Get</a>

                    </div>
                </div>
                <div>
                    <h4>Use master text bubble</h4>
                    <div class="itemsArea">
                        <table style="height:100%">
                            <tr class="itemList masterTextBubbles single-selection">
                                <td class="selected"><div><i class="bmico bmico-icon-phone"></i></div></td>
                                <td class="masterTextBottom">
                                    <div><i class="bmico bmico-icon-phone-bubble-bottom"></i></div>
                                </td>
                                <td class="masterTextTop">
                                    <div><i class="bmico bmico-icon-phone-bubble-up"></i></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>


            </div>
            <div style="position:absolute;left:0;right:0;bottom:0px">
                <a class="button cancelWizardButton" style="float: left;width: 50%;height: 100%; background-color: gray !important;    padding: 10px;font-size: 15px;">Cancel</a>
                <a class="button newui-red applyWizardButton" style="float: right;width: 50%;padding: 10px;font-size: 15px;height: 100%;">Apply</a>

            </div>
        </div>
      
        
    </div>
    <div data-bind="previewFrameArea" class="canvasChipTools" style="display:none;background-color:rgba(111,111,111,0.6); position:absolute;left:0;right:0;top:0;bottom:0;width:100%;height:100%">
        <iframe data-bind="previewFrame" style="position:absolute;z-index:1000; left:0;right:0;top:0;bottom:0;width:100%;height:100%;z"></iframe>
        <a data-bind="exitPreviewFrameButton" class="bg-gray-dark" style="left:10px;z-index:1001;position:absolute;top:10px;"><i class="fa fa-arrow-left"></i></a>
    </div>


    <style id="fonts">
                  @font-face {
                font-family: 'blmani';
                src: url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
                font-weight: normal;
                font-style: normal;
            }
            .bmico {
                display: inline-block;
                font: normal normal normal 14px/1 'blmani';
                font-family:blmani;
                font-size: inherit;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
           
            ._08x {
                transform:scale(0.8);
            }

            ._06x {
                transform:scale(0.6);
            }


.bmico-icon-add-object:before {
  content: "\e967";
}
.bmico-icon-add:before {
  content: "\e93f";
  
}
.bmico-icon-audio-file:before {
  content: "\e940";
  
}
.bmico-icon-back-arrow:before {
  content: "\e941";
  
}
.bmico-icon-bin:before {
  content: "\e942";
  
}
.bmico-icon-browse:before {
  content: "\e943";
  
}
.bmico-icon-camera:before {
  content: "\e944";
  
}
.bmico-icon-checked:before {
  content: "\e945";
  
}
.bmico-icon-close:before {
  content: "\e946";
  
}
.bmico-icon-comic:before {
  content: "\e947";
  
}
.bmico-icon-curve:before {
  content: "\e948";
  
}
.bmico-icon-down:before {
  content: "\e949";
  
}
.bmico-icon-download:before {
  content: "\e94a";
  
}
.bmico-icon-emoji:before {
  content: "\e94b";
  
}
.bmico-icon-fiction:before {
  content: "\e94c";
  
}
.bmico-icon-fullscreen:before {
  content: "\e94d";
  
}
.bmico-icon-gallery:before {
  content: "\e94e";
  
}
.bmico-icon-hamburger:before {
  content: "\e94f";
  
}
.bmico-icon-image:before {
  content: "\e950";
  
}
.bmico-icon-info:before {
  content: "\e951";
  
}
.bmico-icon-layer:before {
  content: "\e952";
  
}
.bmico-icon-layers:before {
  content: "\e953";
  
}
.bmico-icon-library:before {
  content: "\e954";
  
}
.bmico-icon-microphone:before {
  content: "\e955";
  
}
.bmico-icon-move:before {
  content: "\e956";
  
}
.bmico-icon-phone:before {
  content: "\e957";
  
}
.bmico-icon-phone-bubble-bottom:before {
  content: "\e958";
  
}
.bmico-icon-phone-bubble-up:before {
  content: "\e959";
  
}
.bmico-icon-playbtn:before {
  content: "\e95a";
  
}
.bmico-icon-poses:before {
  content: "\e95b";
  
}
.bmico-icon-remove-text:before {
  content: "\e95c";
  
}
.bmico-icon-replay:before {
  content: "\e95d";
  
}
.bmico-icon-save:before {
  content: "\e95e";
  
}
.bmico-icon-saved:before {
  content: "\e95f";
  
}
.bmico-icon-scratch:before {
  content: "\e960";
  
}
.bmico-icon-search:before {
  content: "\e961";
  
}
.bmico-icon-slide:before {
  content: "\e962";
  
}
.bmico-icon-template:before {
  content: "\e963";
  
}
.bmico-icon-text:before {
  content: "\e964";
  
}
.bmico-icon-up:before {
  content: "\e965";
  
}
.bmico-icon-wizard:before {
  content: "\e966";
  
}
.bmico-v:before {
  content: "\e93a";
}
.bmico-comics-icon:before {
  content: "\e93b";
}
.bmico-creation-icon:before {
  content: "\e93c";
}
.bmico-search-icon:before {
  content: "\e93d";
}
.bmico-dialogue:before {
  content: "\e933";
}
.bmico-message:before {
  content: "\e934";
}
.bmico-play-setting:before {
  content: "\e935";
}
.bmico-rendring:before {
  content: "\e936";
}
.bmico-settings:before {
  content: "\e937";
}
.bmico-unlocked:before {
  content: "\e932";
}
.bmico-check:before {
  content: "\e93e";
}
.bmico-line-height:before {
  content: "\e939";
}
.bmico-ads:before {
  content: "\e938";
}
.bmico-cross-icon:before {
  content: "\e92e";
}
.bmico-fit-to-screen:before {
  content: "\e92f";
}
.bmico-no-effect-icon:before {
  content: "\e930";
}
.bmico-watch-icon:before {
  content: "\e931";
}
.bmico-add-text-icon:before {
  content: "\e900";
}
.bmico-advance-btn:before {
  content: "\e901";
}
.bmico-back-to-home-icon:before {
  content: "\e902";
}
.bmico-bottom-arrow:before {
  content: "\e903";
}
.bmico-cancel-btn:before {
  content: "\e904";
}
.bmico-center-align:before {
  content: "\e905";
}
.bmico-duplicate:before {
  content: "\e906";
}
.bmico-effects-btn:before {
  content: "\e907";
}
.bmico-emoji-icon:before {
  content: "\e908";
}
.bmico-empty-slide-icon:before {
  content: "\e909";
}
.bmico-eye-icon:before {
  content: "\e90a";
}
.bmico-font-btn:before {
  content: "\e90b";
}
.bmico-font-color:before {
  content: "\e90c";
}
.bmico-font-font-family:before {
  content: "\e90d";
}
.bmico-font-font-size:before {
  content: "\e90e";
}
.bmico-font-size:before {
  content: "\e90f";
}
.bmico-from-bottom:before {
  content: "\e910";
}
.bmico-from-left:before {
  content: "\e911";
}
.bmico-from-right:before {
  content: "\e912";
}
.bmico-from-top:before {
  content: "\e913";
}
.bmico-justify-align:before {
  content: "\e914";
}
.bmico-layers-btn:before {
  content: "\e915";
}
.bmico-left-align:before {
  content: "\e916";
}
.bmico-load-work-icon:before {
  content: "\e917";
}
.bmico-lock:before {
  content: "\e918";
}
.bmico-menu-btn:before {
  content: "\e919";
}
.bmico-new-work-icon:before {
  content: "\e91a";
}
.bmico-opacity-icon:before {
  content: "\e91b";
}
.bmico-pause-effect-icon:before {
  content: "\e91c";
}
.bmico-play-effects-icon:before {
  content: "\e91d";
}
.bmico-plus-icon:before {
  content: "\e91e";
}
.bmico-position-icon:before {
  content: "\e91f";
}
.bmico-publish-work-icon:before {
  content: "\e920";
}
.bmico-pump-in:before {
  content: "\e921";
}
.bmico-pump-out:before {
  content: "\e922";
}
.bmico-record-btn-icon:before {
  content: "\e923";
}
.bmico-right-align:before {
  content: "\e924";
}
.bmico-rotate-icon:before {
  content: "\e925";
}
.bmico-save-btn:before {
  content: "\e926";
}
.bmico-scale-icon:before {
  content: "\e927";
}
.bmico-single-image-icon:before {
  content: "\e928";
}
.bmico-sound-record:before {
  content: "\e929";
}
.bmico-top-arrow:before {
  content: "\e92a";
}
.bmico-trash:before {
  content: "\e92b";
}
.bmico-with-images-slide:before {
  content: "\e92c";
}
.bmico-add-image-icon:before {
  content: "\e92d";
}


    </style>
  
     
    <div data-bind="newUIArea" class="fullScreenDiv" >
        <style>
           
            .default-select {
                width: 100%;               
                border: solid 2px #aaaaaa;
                padding: 8px;
                border-radius: 8px;
 
            }
            .default-select-70{
                width: 70%;       
            }
            .default-select-60{
                width: 60%;       
            }
            @keyframes blinker {50% {opacity: 0; }}.blink_me {animation: blinker 1s linear infinite;}
            .ani-layer >.titleArea ,
            .ani-layer > .layerNodeWrapper,
            .ani-slide >.titleArea ,
            .ani-slide >.layerNodeWrapper ,
            .nodeToolsOptions,
            .timelineArea1,.nodeTitle,
            .ani-camera{
                display:none !important;

            }
            .ani-slide.showTimeline >.layerNodeWrapper{
                display:block !important;
                height:34px;
            }
            .ani-slide.showTimeline >.children{
                display:none;
            }

            .ani-layer {
                border:none;
            }
           .objectLayers .layerNodeWrapper > .bmico-eye-icon {
                position: absolute;
                right: 20px;
                top: 20px;
                font-size: 24px;
                color: #2b2b2b;
                pointer-events:fill;
            }
           .objectLayersArea .timelineArea {
               display:none !important
           }
          .objectLayers .layerNode.hidden > .layerNodeWrapper > .bmico-eye-icon {                
                color: #c1c1c1;
               
            }

          .objectLayers .layerNodeWrapper > .bmico-eye-icon {                
              

                display:block !important;
            }

           .objectLayers .layerNode .nodeIcon {
                pointer-events: none;
                margin:0;
                width: 100%;
                top:50%;
            }

            .objectLayers .titleArea  i {
               font-size:32px;
               margin-left:8px;
               margin-top:8px;
               
            }
           .objectLayers .layerNode {
               border-bottom: solid 1px #eae7e7;
               height:60px;
            }
           .objectLayers .layerNode > .titleArea {
               border: solid 1px #eae7e7;
                margin: 5px;
                padding:0;
                display:block !important;
            }
          .objectLayers  .layerNode.selected,.objectLayers .layerNode.selected > .titleArea {
                background-color: rgba(199, 199, 199, 0.2);
            }
            .button, .button-round {
                color: #FFFFFF;
                height: 35px;
                line-height: 34px;
                text-align: center;
                font-size: 13px;
                display: inline-block;
                margin: 0px 10px 10px 0px;
                padding: 0px 20px 0px 20px;
                margin:0;
            }
            .button-outline {
                border:solid 1px #363636;
                color:#363636;
                background-color:#ffffff;
                font-weight:bold;
            }
            .ani-modal-overlay {
                background-color: rgba(95, 95, 95, 0.6);
            }
            .ios-slider-box::-webkit-slider-thumb {
                background-color: #b6b6b6 !important;
                border: solid 1px rgba(0,0,0,0.1);
                border-radius: 0px;
                height: 25px !important;
                width: 9px !important;
                box-shadow: none !important;
            }
            .ios-slider {
                height: 40px !important;
               background: linear-gradient(to right, #717171 0%, #717171 100%);
                background-size: 100% 1px;
                background-position: center;
                background-repeat: no-repeat;
            }
            .childSchemaAreas{
                border-bottom:solid 1px #e3e3e3;padding-top: 10px;height:50px
            }
            .pull-left{
                float:left !important;
            }
            .pull-right{
                float:right !important;
            }
            a.iconText{
                display:block;
                width:48px;height:48px;
                line-height:37px;
                font-size:22px;
                position:relative;
                text-align:center;
                color:#808080;
                float:left;
                margin:0px;
              
            }
             a.iconText >img {
                 position:absolute;
                 left:1%;width:98%
             }
           
            a.iconText.centerIcon{
                  left:50%;
                margin-left:-24px;
            }

             a.iconText.large.centerIcon{
                  left:50%;
                margin-left:-32px;
            }

            a.iconText.highlighted {
             color:white;
             background-color:#bababa;
            }

              

            a.iconText.roundButton{
                border-radius:100%;
            }
            a.iconText.no-title {
             color:#d1d1d1;
              line-height:48px;
                font-size:24px;
            }
             a.iconText.no-title >em {
            display:none;
            }

          
              a.iconText.outline {
                    color: #818181;
                   border:solid 1px #818181;
                   background:none;
                }

               a.iconText.large{
                   width:64px;height:64px;
                line-height:68px;
                font-size:32px;
            }

            a.iconText.selected, a.iconText:hover {
                color:#e44130 !important;
            }

            a.iconText.highlighted:hover {
                color:white !important;
            }
             a.iconText >em {
                 position:absolute;
                 left:-5px;right:-5px;bottom:-10px;
                 text-align:center;
                 font-style:normal;       
                 font-size:9px;         
            }
              a.iconText.large >em {
               bottom:-30px;
                left:-15px;right:-15px;
                 font-size:13px;         
            }
                a.iconText.no-icon > em {
                    font-size: 12px;
                    bottom: unset;
                    position: relative;
                }

                a.iconText.title-out {
                    margin-bottom:20px;
                }
                a.iconText.title-out > em {
                    font-size: 14px;
                    bottom: -50px;
                    left:-20px;
                    right:-20px;
                }

                a.iconText.title-right {
                    width:auto;
                    display:inline-block;
                }
                a.iconText.title-right >em {
                    position:relative;
                    margin-left:10px;
                    bottom:6px;
                    text-align:left;
                    font-size:12px;
                }
                .inputTitle5 .inputTitle {
                 width:5% !important;
             }
                .inputTitle10 .inputTitle {
                 width:10% !important;
             }
             .inputTitle20 .inputTitle {
                 width:20% !important;
             }
             .inputTitle25 .inputTitle {
                 width:25% !important;
             }
             .inputTitle30 .inputTitle {
                 width:30% !important;
             }
             .inputTitle40 .inputTitle {
                 width:40% !important;
             }
             .inputTitle50 .inputTitle {
                 width:50% !important;
             }
            .newUIArea .editPages .ios-slider {
                background: linear-gradient(to right, #d8d8d8 0%, #d8d8d8 100%);
                background-size: 100% 3px;
                background-position: center;
                background-repeat: no-repeat;
                height: 30px!important;
                opacity:0.8;
            }
        </style>
        <style>
            .editPages .fac label {
                color: #a4a4a4;
                font-size: 110%;
                font-weight: 600;
            }
            .editPages .page-input textarea.no-border {
                border:none !important;
            }
            .fullScreenDiv {
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background-color: white;
                position: absolute;
            }
            .ani-modal {
                position: absolute;
                left: 0%;
                top: 0%;
                font-family: inherit;
                border-radius: 1rem;
                background-color: white;
                box-sizing: content-box;
                min-width: 90%;
                max-width: 400px;
                width: 90%;
                overflow: visible;
                box-shadow: 0px 10px 26px 6px rgba(0,0,0,0.17);
            }
            .newui-red {
                background-color: #e44130 !important;
            }
            .newui-red-color {
                color: #e44130 !important;
            }

            .button-round.small {
                height: 25px;
                line-height: 23px;
                margin: 0;
                padding: 0px 22px 0px 22px;
                font-weight: 600;
            }

            .button-round.outline {
                border: solid 1px #909090;
                color: #909090;
            }

            .newUIArea {
            }

            .newUIArea .chipButton {
                    opacity: 1;
                    transform: scale(1.0);
                }

            a.chipButton.large {
                width: 64px;
                height: 64px;
                border-radius: 44px;
                font-size: 24px;
                color: #FFFFFF;
                text-align: center;
                line-height: 64px;
                margin-bottom: 0px;
                transform: scale(1);
                opacity: 1;
            }

            a.chipButton.outline {
                box-shadow: none;
                background-color: transparent;
                border: solid 1px #4d4d4d;
                color: #4d4d4d;
            }

            div.chipButton.large {
                width: 64px;
                height: 94px;
            }

            div.chipButton em {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                text-align: center;
                font-style: normal;
            }

            .plusIcon {
            }

            .bottomBarArea {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: auto;
                background-color:white;
            }

            .mainBottomBar, .schemaBottomBar {
                height: 45px;
                width: 100%;
                float: left;
                border-top: solid 1px #e3e3e3;
            }

            .backdrop-box {
                filter: blur(6px);
                -webkit-filter: blur(6px);
            }

            table.no-border, table.no-border td {
                border: none;
                text-align: center;
                margin:0;
                padding:0;
            }

            .float-box {
                float: left;
                width: 25%;
                text-align: center;
            }
            .newUIArea .editPages .page-input input[type="text"] {
                border-radius: 6px !important;
                background-color: white;
                border: solid 1px #d9d9d9 !important;
                padding: 5px;
                text-align: center;
                height: 30px;
                line-height: 30px;
                font-size: 100%;
                color: #353535;
                width: 50%;
                float: left;
            }
           .newUIArea .editPages .page-input em {
                color: #a5a5a5;
                font-size: 100%;
                font-weight: 600;
                width: 40%;
                float: left;
                text-align: right;
                padding-right: 5%;
                padding-top: 6px;
            }
           .newUIArea .editPages .page-input {
                padding: 1px;
                display: inline-block;
                width: 100%;
                min-height: 50px;
            }

            .confirmModal table {
                min-height:180px;
            }
             .confirmModal input {
               width:80px;
               padding:6px;
               border:solid 1px #d7d4d4;
               text-align:center;
               margin:2px;
            }
           .confirmModal table td {
                max-height: 80px;
                font-weight: 700;
                line-height: 30px;
                text-align: center !important;
                vertical-align: middle;
                font-size: 14px;
                width: 100%;
            }
          .ani-modal.lowHeight .confirmModal table{
              min-height:80px;

           }
           .ani-modal.lowHeight .confirmModal table td {
                font-size: 12px;
            }

           .ani-modal.infoModal .confirmModal .ani-modal-cancel-button {
                display:none;
            }

           .ani-modal.infoModal .confirmModal .ani-modal-ok-button {
                float:left !important;
                transition:none;
                left:50%;
                margin-left:-55px;
            }

             .confirmModal .videos-rendered-table td {
                font-size:14px !important;
                text-align:left !important;
                vertical-align:top;
            }
           
        </style>


            <script type="text/html" data-execute="animobile.audioRecordingSchemaTemplate=$(this).html()">
                <style>
                    .audioRecordingSchemaUI {
                       height: 48px;
                        float: left;
                        border-top: solid 1px #ebebeb;
                        width: 100%;
                        padding-left: 6px;
                          padding-right: 6px;
                    }
                    .recordingSettingsAttributtes {
                        height:30px;
                    }
                    .recordingSettingsAttributtes a.iconText {
                        height:20px;
                        line-height:20px;
                    }
                    .recordingSettingsUI {
                        display:none;
                            height: 48px;
                          padding-top: 8px;
                          padding-left: 6px;
                    }
                    .checkSoundButton.playing >i:before {
                        content:'\f04d';
                    }
                </style>
                <div class="audioRecordingSchemaUI" data-bind="beginBecordingScreen">
                    <a class="iconText title-right" data-bind="beginBecordingButton" style="padding-top: 7px;float:left"><i class="bmico bmico-record-btn-icon"></i><em>Record Voice</em></a>
                </div>
                <div class="audioRecordingSchemaUI" data-bind="recordingScreen">
                    <a class="iconText title-right" style="padding-top: 7px;float:left"><i class="bmico bmico-sound-record"></i><em data-bind="recordingTimeDisplay">00:00</em></a>
                    <label class="blink_me newui-red-color" style="position:absolute;left:50%;margin-left:-42.5px;margin-top: 9px;">Recording now</label>
                    <a data-bind="stopRecordingButton" class="iconText no-title pull-right outline roundButton _08x" style="color:#b8b8b8;border-color:#b8b8b8"><i class="fa fa-stop _08x"></i></a>
                </div>

                <div class="audioRecordingSchemaUI recordingSettingsAttributtes" data-bind="recordingSettingsAttributtes">
                    <a schema-name=".delaySettings" class="iconText no-icon"><em>Delay</em></a>
                    <a schema-name=".repeatSettings" class="iconText no-icon"><em>Repeat</em></a>
                    <a schema-name=".volumeSettings" class="iconText no-icon"><em>Volume</em></a>
                </div>


                <div class="audioRecordingSchemaUI" data-bind="recordingSettings">
                    <a class="iconText title-right" style="padding-top: 7px;float:left"><i class="bmico bmico-sound-record"></i><em data-bind="recordingTimePreview">00:00</em></a>

                    <a href="#" data-bind="recordingSettingsApplyButton" style="margin-top:7px;margin-left:10px" class="button button-round newui-red  pull-right">Apply</a>

                    <a class="iconText pull-right" data-bind="updateRecordButton"><i class="bmico bmico-record-btn-icon"></i><em>Record</em></a>
                    <a class="iconText pull-right" data-bind="settingsButton"><i class="bmico bmico-advance-btn"></i><em>Settings</em></a>
                    <a class="iconText pull-right" data-bind="checkSoundButton"><i class="fa fa-play"></i><em>Check</em></a>

                </div>
            </script>

            <script type="text/html" data-execute="animobile.defaultObjectSchemaTemplate=$(this).html()">
                <a class="iconText advancedButton"><i class="bmico bmico-advance-btn"></i><em>Advanced</em></a>
                <a class="iconText effectsButton" style="display:none"><i class="bmico bmico-effects-btn"></i><em>Effects</em></a>
                <a class="iconText layersButton" onclick="document.objectLayers.showLayers()"><i class="bmico bmico-icon-layer"></i><em>Layers</em></a>
                <a class="iconText component textButton smartText1_0"><i class="bmico bmico-font-btn"></i><em>Font</em></a>
                <a class="iconText component textEditButton smartText1_0"><i class="bmico bmico-add-text-icon"></i><em>Text</em></a>
                <a class="iconText component masterText1_0" onclick="animobile.components['masterText1.0'].displaySchema()"><i class="bmico bmico-font-btn"></i><em>Text Box</em></a>
                <a class="iconText amioButton component amioImage1_0"><i class="bmico bmico-ads"></i><em>Ads</em></a>
                <a class="iconText setImageButton component"><i class="bmico bmico-single-image-icon"></i><em>Set Image</em></a>
                <a class="iconText setCharacterPos component"><i class="bmico bmico-icon-poses"></i><em>Poses</em></a>
                <a class="iconText pathEffectButton"><i class="bmico bmico-rotate-icon"></i><em>Path Effect</em></a>
                <a class="iconText soundButton"><i class="bmico bmico-sound-record"></i><em>Sound</em></a>
                <a class="iconText deleteButton pull-right highlighted newui-red" onclick="animobile.deleteObjectButton()"><i class="bmico bmico-trash"></i><em>Delete</em></a>
                <a class="iconText lockButton pull-right highlighted"><i class="bmico bmico-lock"></i><em>Lock</em></a>
            </script>

            <style>
                .lockButton.locked{
                   background-color: #e44130 !important;
                }
                .lockButton.locked >i:before{
                    content:'\e932';
                }
            </style>

            <script type="text/html" data-execute="animobile.objectManipulationSchemaTemplate=$(this).html()">
                <table width="100%" class="no-border">
                    <tr>
                        <td><a schema-name="closeButton" class="iconText centerIcon no-title"><i class="bmico bmico-cancel-btn"></i></a></td>
                        <td><a schema-name="duplicateButton" class="iconText centerIcon no-title"><i class="bmico bmico-duplicate"></i></a></td>
                        <td><a schema-name=".positionSchemaArea" class="iconText centerIcon no-title"><i class="bmico bmico-position-icon"></i></a></td>
                        <td><a schema-name=".rotateSchemaArea" class="iconText centerIcon no-title"><i class="bmico bmico-rotate-icon"></i></a></td>
                        <td><a schema-name=".scaleSchemaArea" class="iconText centerIcon no-title"><i class="bmico bmico-scale-icon"></i></a></td>
                        <td><a schema-name=".opacitySchemaArea" class="iconText centerIcon no-title"><i class="bmico bmico-opacity-icon"></i></a></td>
                    </tr>
                </table>
            </script>

            <script type="text/html" data-execute="animobile.objectTextSchemaTemplate=$(this).html()">
                <table width="100%" class="no-border">
                    <tr>
                        <td><a schema-name="closeButton" class="iconText centerIcon no-title"><i class="bmico bmico-cancel-btn"></i></a></td>
                        <td><a schema-name=".fontSizeSchemaArea" class="iconText centerIcon  no-title"><i class="bmico bmico-font-size"></i><em>Font Size</em></a></td>
                        <td><a schema-name=".fontFamilySchemaArea" class="iconText centerIcon  no-title"><i class="bmico bmico-font-font-family"></i><em>Font Family</em></a></td>
                        <td><a schema-name=".lineHeightSchemaArea" class="iconText centerIcon  no-title"><i class="bmico bmico-line-height"></i><em>Line Height</em></a></td>
                        <td><a schema-name=".alignmentSchemaArea" class="iconText centerIcon  no-title"><i class="bmico bmico-justify-align"></i><em>Align</em></a></td>
                        <td><a schema-name=".fontColorSchemaArea" class="iconText centerIcon  no-title"><i class="bmico bmico-font-color"></i><em>Color</em></a></td>
                    </tr>
                </table>
            </script>

            <script type="text/html" data-execute="animobile.objectMasterTextSchemaTemplate=$(this).html()">
                <table width="100%" class="no-border">
                    <tr>
                        <td><a schema-name=".editTextValue" class="iconText centerIcon  no-title"><i class="bmico bmico-add-text-icon"></i><em>Edit Text</em></a></td>
                        <td><a schema-name=".fontSizeSchemaArea" class="iconText centerIcon  no-title" ><i class="bmico bmico-font-size"></i><em>Font Size</em></a></td>
                        <td><a schema-name=".fontFamilySchemaArea" class="iconText centerIcon  no-title"><i class="bmico bmico-font-font-family"></i><em>Font Family</em></a></td>
                        <td><a schema-name=".lineHeightSchemaArea" class="iconText centerIcon  no-title"><i class="bmico bmico-line-height"></i><em>Line Height</em></a></td>
                        <td><a schema-name=".alignmentSchemaArea" class="iconText centerIcon  no-title"><i class="bmico bmico-justify-align"></i><em>Align</em></a></td>
                        <td><a schema-name=".markerPositionSchemaArea" class="iconText centerIcon  no-title"><i class="bmico bmico-dialogue"></i><em>Marker</em></a></td>
                        <td><a schema-name=".fontColorSchemaArea" class="iconText centerIcon  no-title"><i class="bmico bmico-font-color"></i><em>Color</em></a></td>
                    </tr>
                </table>
            </script>

            <script type="text/html" data-execute="animobile.objectTextFontFamilySchemaTemplate=$(this).html()">
                <style>
                    .fontFamilyList a{
                        display:block;
                        float:left;
                        font-size:12px;
                        padding:10px;
                        padding-top:0;
                        color:#808080;
                    }
                    .fontFamilyList a.selected {
                       color:#e44130;
                       font-weight:bold;
                    }
                </style>
                <div class="fontFamilyList" style="left:0;top:0;right:0;bottom:0;overflow-x:auto;width:100%;min-height:48px">
                    <a font="Arial" style="font-family:Arial">Arial</a>
                    <a font="Tahoma" style="font-family:Tahoma">Tahoma</a>
                    <a font="Trebuchet MS" style="font-family:'Trebuchet MS'">Trebuchet MS</a>
                    <a font="Impact" style="font-family:'Impact'">Impact</a>
                </div>
            </script>

            <script type="text/html" data-execute="animobile.objectTextAlignSchemaTemplate=$(this).html()">
                <div style="left:0;top:0;right:0;bottom:0;overflow-x:auto;width:100%;min-height:48px">
                    <a align="left" class="iconText no-title"><i class="bmico bmico-left-align"></i></a>
                    <a align="right" class="iconText no-title"><i class="bmico bmico-right-align"></i></a>
                    <a align="center" class="iconText no-title"><i class="bmico bmico-center-align"></i></a>
                </div>
            </script>

        <script type="text/html" data-execute="animobile.characterPosSchemaTemplate=$(this).html()">
            <div style="position:absolute;left:0;right:0;top:-300%;height:300%; background-color:rgba(10,10,10,0.1)">

            </div>
            <div style="position:absolute;left:0;right:0;top:0;bottom:50px;overflow-x:auto">
                <table style="height:100%">
                    <tr class="itemList"></tr>
                </table>
            </div>
            <div style="position:absolute;left:0;right:0;bottom:0px;height:50px">
                <a class="button cancelButton" style="float: left;width: 50%;height: 100%; background-color: gray !important;    padding: 10px;font-size: 15px;">Cancel</a>
                <a class="button newui-red applyButton" style="float: right;width: 50%;padding: 10px;font-size: 15px;height: 100%;">Apply</a>

            </div>
           

        </script>

       
        <script type="text/html" data-execute="animobile.creationWizardTemplate=$(this).html()">
          
            
        </script>

           <script type="text/html" data-execute="animobile.fullScreenPopupTemplate=$(this).html()">
               <div class="fullScreenDiv fullScreenPopup" style="background-color:#ffffff;">
                   <h4 class="popupTitle" style="position:absolute;left:0;top:15px;right:0;font-weight:bold;text-align:center">Heading</h4>
                   <a style="position:absolute;left:5px;top:5px;" onclick="this.parentNode.$.remove()" class="iconText no-title "><i class="bmico bmico-icon-back-arrow"></i></a>
                   <img src="http://blmani.com/aniparti_fan/logo-aniparti-red.png" width="24" style="position:absolute;right:10px;top:10px;" />
                   <div class="contentArea" style="position:absolute;left:0;right:0;top:60px;bottom:0px;">

                   </div>

               </div>


           </script>


            <div data-bind="landingScreen" class="fullScreenDiv" style="bottom:-50px">

                <a style="position:absolute;left:10px;top:10px;" data-bind="landingScreenExitButton"  class="iconText no-title "><i class="bmico bmico-icon-back-arrow"></i></a>

                <img src="http://blmani.com/aniparti_fan/logo-aniparti-red.png" width="120" style="position:absolute;left:50%;top:10%;margin-left:-60px" />
                <h5 style="position:absolute;left:10%;right:10%;top:40%;text-align:center;font-weight:700">
                    Be An Awesom Creator! <br /><br />
                    What do you want to create
                    <br />


                </h5>
                <div style="position:absolute;left:10%;right:10%;top:55%;text-align:center;display:none">
                    <style>
                        .landingscreenButtons,.landingscreenButtons td{
                            border:none;
                        }
                    </style>
                    <table class="landingscreenButtons">
                        <tr>
                            <td><a href="#" onclick="animobile.loadFromWork()" class="button button-round small outline">Saved work</a></td>
                            <td><a href="#" onclick="animobile.startEmptyProject(function () { animobile.createNewSlide();  });" onclick1="document.startNewCreationScreen.$.show(); document.newUIArea.blurUI(true);" class="button button-round small newui-red">New creation</a></td>
                        </tr>
                       

                       

                    </table>


                  

                </div>

                
                <style>
                    .landingScreen .iconText i,.fullScreenPopup  .iconText i,.fullScreenPopup  .popupTitle{
                        color:#e44130 ;
                    }
                    .homemenu{
                        position:absolute;left:0;right:0;bottom:0;text-align:center;
                        padding-bottom:75px;
                    }
                    .homemenu table {
                        width:90%;
                        margin-left:5%;
                        
                        height:100px;
                        -webkit-box-shadow: 0px 0px 50px -5px rgba(0,0,0,0.37);
                        box-shadow: 0px 0px 50px -5px rgba(0,0,0,0.37);
                    }
                   
                   .homemenu table td .iconText {
                       margin-top:-20px;
                   }

                    .landingScreen.what_to_create .menu1,.landingScreen .menu2{
                        display:none;
                    }

                    .landingScreen.what_to_create .menu2{
                        display:block;
                    }
                </style>
                <div class="homemenu menu1" >
                    <table >
                        <tr>
                            <td><a class="iconText centerIcon large"><i class="bmico bmico-icon-fiction"></i><em>Fan Fiction</em></a></td>
                            <td><a class="iconText centerIcon large" onclick="document.landingScreen.$.addClass('what_to_create')"><i class="bmico bmico-icon-comic"></i><em>Fan Comic</em></a></td>
                        </tr>
                    </table>
                </div>

                <div class="homemenu menu2">
                    <table style="height:200px">
                        <tr>
                            <td><a class="iconText centerIcon large"><i class="bmico bmico-icon-saved"></i><em>From Saved</em></a></td>
                            <td><a class="iconText centerIcon large"><i class="bmico bmico-icon-template"></i><em>With Template</em></a></td>
                        </tr>
                        <tr>
                            <td><a class="iconText centerIcon large" onclick="animobile.whatDoYouWantToCreate(100)"><i class="bmico bmico-icon-scratch"></i><em>From Scratch</em></a></td>
                            <td><a class="iconText centerIcon large" onclick="animobile.whatDoYouWantToCreate(200)"><i class="bmico bmico-icon-wizard"></i><em>By Wizard</em></a></td>
                        </tr>
                    </table>
                </div>
               

              


            </div>

            <div data-bind="canvasScreen" class="fullScreenDiv" style="display:none">
                <style>
                    .mainTopBar i {
                        top:8px;font-size:22px;color:#9d9d9d;
                        position:absolute;
                    }
                     .slideTopBar i {
                        top:8px;font-size:14px;color:#9d9d9d;
                        position:absolute;
                    }

                        .slideTopBar  i:hover,.mainTopBar  i:hover {
                            color: #e44130 !important;
                        }
                     .topMenuBar ul li{
                         list-style:none;
                         list-style-image:none;
                         padding:5px;
                         height:44px;
                     }
                     .topMenuBar ul li.seperator{
                         border-bottom:solid 1px #f1f1f1;
                     }
                     .topMenuBar ul li a.iconText {
                         height:42px;
                     }
                </style>
                <div data-bind="mainTopBar" style="border-bottom:solid 1px #d7d7d7;height:40px">
                    <img src="http://blmani.com/com/aniparti-logo-on-top.png" height="28" style="position: absolute;left:50px;top:5px" />
                    <i class="bmico bmico-menu-btn" style="left:12px;" ontouchstart="document.topMenuBar.showBar()"></i>
                    <i class="bmico bmico-save-btn" onclick="animobile.saveWork()" style="right:12px;"></i>
                    <i class="bmico bmico-cancel-btn" onclick="animobile.exitStage()" style="right:50px;top:8px;"></i>

                </div>

                <div data-bind="slideTopBar" style="background-color: #fafafa;height:35px;position:relative">
                    <label data-bind="slideTitle" style="position:absolute;left:12px;" ontouchstart="document.displaySlideList.showList()">Slide <span data-bind="currentSlideIndex">1</span></label>

                    <table class="no-border" style="position:absolute;right:5px;top:0px;width:70%">
                        <tr>
                        
                            
                                <td><i class="bmico bmico-justify-align" onclick="animobile.openSlideTimeline();"></i></td>

                            <td><i class="bmico bmico-fit-to-screen" onclick="animobile.currentSlide$.currentCamera$.fitScreen();"></i></td>
                            <td><i class="bmico bmico-icon-layer" onclick="document.objectLayers.showLayers('top')"></i></td>
                            <td><i class="bmico bmico-trash" onclick="animobile.deleteSlide()"></i></td>
                            <td style="display:none"><i class="bmico bmico-plus-icon" onclick="animobile.addNewSlide()"></i></td>

                            <td><i class="bmico bmico-top-arrow" onclick="animobile.moveSlideIndex(document.currentSlideIndex.value - 1)"></i></td>

                            <td><i class="bmico bmico-bottom-arrow" onclick="animobile.moveSlideIndex(document.currentSlideIndex.value+1)"></i></td>

                        </tr>
                    </table>







                </div>
                <iframe data-bind="canvasFrame" style="width:calc(100% - 0px);height:calc(100% - 90px);overflow:hidden;"></iframe>
              
                <style>
                    .canvaZoomerWrapper {
                        position:absolute;left:50%;width:200px;margin-left:-100px;bottom:40px
                    }
                     .canvasScreen.timelineActivated .canvaZoomerWrapper{
                         bottom:unset;
                         top:40px;
                     }

                </style>
                <div class="canvaZoomerWrapper">
                    <div class="range-slider  range-slider-icons" style="opacity:0.5;padding:0"><input data-bind="canvasZoomer" class="ios-slider" type="range" value="0" min="-20" max="20"></div>
                </div>

                <div data-bind="bottomBarArea">
                    <div class="schemaBottomBar" data-bind="schemaDisplay" style="height:auto;display:none"></div>
                    <div data-bind="mainBottomBar">
                       
                            <table width="100%" class="no-border" style="display:none">
                            <tr>
                                <td><a class="iconText no-title centerIcon" data-bind="addImageOnCanvasButton"><i class="bmico bmico-add-image-icon"></i></a></td>
                                <td><a class="iconText no-title centerIcon" data-bind="addTextOnCanvasButton"><i class="bmico bmico-font-btn"></i></a></td>
                                <td>
                                    <a href="#" class="iconText highlighted roundButton newui-red no-title" onclick="animobile.addNewObject()" style="left:50%;margin-left:-24px;transform: scale(0.7);top:50%;line-height:50px;margin-top:-4px">
                                        <i class="bmico bmico-plus-icon"></i>
                                    </a>
                                </td>
                                <td><a class="iconText  no-title centerIcon" data-bind="addEmojOnCanvasButton"><i class="bmico bmico-emoji-icon"></i></a></td>
                                <td><a class="iconText  no-title centerIcon"  onclick1="animobile.audioRecordingSchema.showRecording();" data-bind="addAudioOnCanvasButton"><i class="bmico bmico-sound-record"></i></a></td>
                            </tr>
                        </table>
                       
                        <a href="#" class="iconText highlighted roundButton newui-red no-title" onclick="animobile.createANewSlide()" style="left:50%;margin-left:-24px;bottom:2px; transform: scale(0.7);line-height:50px;">
                            <i class="bmico bmico-plus-icon"></i>
                        </a>

                        <a href="#" class="iconText large no-title" onclick="animobile.addNewObject()" style="right:5px;bottom:-12px;color: #969696;position:absolute ">
                            <i class="bmico bmico-icon-add-object"></i>
                        </a>





                    </div>
                </div>

                <style>
                    .objectLayers {
                        display: none;
                        position: absolute;
                        width: 120px;
                        height: 300px;
                        background-color: white;
                        border: solid 1px #cacaca;
                    }

                    .objectLayersArea {
                        overflow-y: auto;
                        position: absolute;
                        left: 0;
                        right: 0;
                    }

                    .objectLayers.bottom {
                        left: 0;
                        bottom: 96px;
                        box-shadow: 3px -4px 4px 1px rgba(0,0,0,0.1);
                    }

                    .objectLayers.show {
                        display: block;
                    }

                    .objectLayers.top {
                        left: unset;
                        bottom: unset;
                        top: 70px;
                        right: 0;
                        box-shadow: -3px 4px 4px 1px rgba(0,0,0,0.1);
                    }

                    .objectLayers.bottom .objectLayersArea {
                        top: 30px;
                        bottom: 0;
                    }

                    .objectLayers.top .objectLayersArea {
                        top: 0px;
                        bottom: 30px;
                    }

                    .objectLayers .button {
                        position: absolute;
                        right: 0;
                        left: 0;
                        margin: 0;
                        line-height: 25px !important;
                        padding: 0px 10px 0px 10px;
                        height: 28px !important;
                        background-color: #d0d0d0;
                        border: solid 2px #d0d0d0;
                        color: #6c6c6c;
                    }

                    .objectLayers.bottom .button {
                        bottom: unset;
                        top: 0;
                    }

                    .objectLayers.top .button {
                        bottom: 0;
                        top: unset;
                    }
                </style>
              

               
                <div data-bind="objectLayers" class="bottom">
                    <div data-bind="objectLayersArea"></div>
                    <a href="#" class="button button-s" onclick="document.objectLayers.hideLayers()">Close</a>
                </div>


                <div data-bind="pathCurveEffect" style="display:none; position:absolute;left:0;right:0;bottom:0;height:180px;background-color:none">
                    <div style="width:100%;height:50px;background-color:#e8e8e8;" data-bind="pathCurveEffectSchemaContainer" >
                       

                    </div>
                    <div class="tabs">
                        <div class="tab-titles pull-right">
                            <a schema-name=".positionSchemaArea" class="iconText active-tab-button" data-tab="positionSchemaArea"><i class="bmico bmico-position-icon"></i><em>Path</em></a>
                            <a schema-name=".rotateSchemaArea" class="iconText"  data-tab="rotateSchemaArea"><i class="bmico bmico-rotate-icon"></i><em>Rotate</em></a>
                            <a schema-name=".scaleSchemaArea" class="iconText"  data-tab="scaleSchemaArea"><i class="bmico bmico-scale-icon"></i><em>Scale</em></a>
                            <a schema-name=".opacitySchemaArea" class="iconText" data-tab="opacitySchemaArea"><i class="bmico bmico-opacity-icon"></i><em>Opacity</em></a>
                           

                    </div>
                       
                       

                    </div>
                  
                    <div data-bind="timelineLayers" style="position:absolute;left:0;right:0;top:50px;height:130px;background-color:#d7d4d4">

                    </div>
              
                    <div data-bind="pathEffectSchemaButtons">
                        <a class="iconText addNewPath"><i class="bmico bmico-plus-icon"></i><em>New</em></a>
                        <a class="iconText deletePath"><i class="bmico bmico-trash"></i><em>Delete</em></a>
                        <a class="iconText sendBlockToBack"><i class="bmico bmico-icon-layers"></i><em>Send Back</em></a>
                        <a class="iconText soundModeButtons recordSoundButton"><i class="bmico bmico-sound-record"></i><em>Record</em></a>
                        <a class="iconText soundModeButtons uploadSoundButton"><i class="bmico bmico-back-to-home-icon" style="transform:rotate(90deg)"></i><em>Upload</em></a>
                    </div>
                    <a class="iconText no-title closeSlideTimelineButton " style="color:gray;position:absolute;right:10px;top:50px"><i class="bmico bmico-cross-icon"></i></a>

                    <script type="text/html" data-execute="animobile.recordSoundPopupUI=$(this).html()">
                        <table style="position:absolute">
                            <tr>
                                <td>
                                    
                                </td>
                                <td>
                                    <h4 class="recordingTime"></h4>
                                </td>
                            </tr>

                        </table>
                    </script>
                </div>

             

            </div>







</div>

    <div data-bind="startNewCreationScreen" class="fullScreenDiv" style="background-color:rgba(210,210,210,0.9);display:none">
        

       <div style="position:absolute;left: 0;top:40%;width:100%">
            <h4 style="text-align:center;font-weight:700">
                Select an action or object you <br />
                want to start

            </h4>
           <img style="width: 200px;transform: rotate(-70deg);position: absolute;left: 50%; margin-left: -150px;margin-top: 40px;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4OS43MjQgNTMuMzA0Ij4gIDxkZWZzPiAgICA8c3R5bGU+ICAgICAgLmNscy0xIHsgICAgICAgIGZpbGw6ICMyMzFmMjA7ICAgICAgfSAgICA8L3N0eWxlPiAgPC9kZWZzPiAgPGcgaWQ9Ikdyb3VwXzEyMTMiIGRhdGEtbmFtZT0iR3JvdXAgMTIxMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQ2OCAtMzg3OC4yOTMpIj4gICAgPHBhdGggaWQ9IlBhdGhfOTE2IiBkYXRhLW5hbWU9IlBhdGggOTE2IiBjbGFzcz0iY2xzLTEiIGQ9Ik0xMTIuMSwyMDUuODE5Yy0yLjQ1OS04LjU4MS01LjY4OS0xNi4zMjYtMTEuOTM4LTIyLjg4MUE1NS45MTQsNTUuOTE0LDAsMCwwLDc3Ljk3LDE2OC44NTJjLTE3LjMzNC01LjkxNy0zOC43NjUtMi41MTYtNTIuMDgzLDEwLjQxMWExLjU1MywxLjU1MywwLDAsMCwxLjg3NSwyLjQyOWMxNC42MjYtOC42NDEsMzEuMzctMTIuNzgyLDQ3Ljk2NC03LjQ3MiwxNC42NDcsNC42ODgsMjguODc5LDE3LjcsMzQuNDcyLDMyLjEyMy40NDcsMS4xNTQsMi4yNTUuNzIxLDEuOS0uNTI0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ0OTAuNDE4IDM3MjQuNTgxKSIvPiAgICA8cGF0aCBpZD0iUGF0aF85MTciIGRhdGEtbmFtZT0iUGF0aCA5MTciIGNsYXNzPSJjbHMtMSIgZD0iTTI2LjQyNiwxODMuMDU1YzMuMTg2LTMuNSw1LjQ0Ny03LjkzLDcuOTE1LTExLjk1NiwyLjI0OS0zLjY2OSw0LjQtOS43NzEsOC4yNi0xMS45OTMsMy4yMTctMS44NTQuMzEtNi44NTEtMi45MTMtNC45ODMtNC4wMTcsMi4zMjctNS44LDYuOTU3LTcuOTEzLDEwLjg3Ny0yLjgzLDUuMjUxLTYuMzY2LDEwLjczOS04LjA5MSwxNi40NTlhMS42NTIsMS42NTIsMCwwLDAsMi43NDIsMS42WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ0OTAuNDE4IDM3MjQuNTgxKSIvPiAgICA8cGF0aCBpZD0iUGF0aF85MTgiIGRhdGEtbmFtZT0iUGF0aCA5MTgiIGNsYXNzPSJjbHMtMSIgZD0iTTIyLjkwNSwxODIuNjEzYzIuOTMxLDIuMjM2LDcuNDMuOSwxMC44OTIuNTI5YTY2LjU5LDY2LjU5LDAsMCwwLDEyLjYtMi4xMmMyLjM0NC0uNzI5LDIuMDc0LTQuODI4LS42MTEtNC41MTItNC4yMzEuNS04LjM3NSwxLjU2Ny0xMi42LDIuMTY2LTMuNS40OTUtNy44Mi0uMTY3LTEwLjQ4NiwyLjM5MWExLDEsMCwwLDAsLjIsMS41NDZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDQ5MC40MTggMzcyNC41ODEpIi8+ICA8L2c+PC9zdmc+" />
        
        </div>

            <i class="bmico bmico-cross-icon" onclick="document.startNewCreationScreen.$.hide(); document.newUIArea.blurUI(false)" style="position:absolute;right:20px;top:20px;font-size:22px"></i>
        <div style="position:absolute;left:0;right:0;bottom:0;height:100px;padding-top:20px; background-color:white;">
            <table width="100%" class="no-border">
                <tr>
                    <td>
                        <a href="#" class="iconText outline roundButton large centerIcon no-title" data-bind="startCreationWithImage">
                            <i class="bmico bmico-single-image-icon"></i>
                        </a> 
                    </td>
                    <td>
                        <a href="#" class="iconText outline roundButton large centerIcon no-title" data-bind="startCreationWithImageSlides">
                            <i class="bmico bmico-with-images-slide"></i>
                        </a>
                    </td>
                    <td>
                        <a href="#" class="iconText outline roundButton large centerIcon no-title" data-bind="startCreationWithText">
                            <i class="bmico bmico-add-text-icon"></i>
                        </a>
                    </td>

                    <td>
                        <a href="#" class="iconText outline roundButton large centerIcon no-title" onclick="animobile.startEmptyProject(function () { animobile.createNewSlide();  });" >
                            <i class="bmico bmico-empty-slide-icon"></i>
                        </a>
                    </td>
                    <td style="display:none">
                        <a href="#" class="iconText outline roundButton large centerIcon no-title" data-bind="startCreationWithCamera">
                            <i class="fa fa-camera"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <div data-bind="textEditArea" class="fullScreenDiv" style="background-color:rgba(210,210,210,0.9);display:none">
        <textarea data-bind="textEditAreaTextbox" style="position:absolute;padding:10px;background:transparent; font-family:'Segoe UI';width:300px;left:50%;top:50%;height:32px;margin-top:-16px;font-size:32px;margin-left:-150px"></textarea>
        <a href="#" data-bind="textEditAreaApplyButton" class="button button-round newui-red " style="position:absolute; bottom:10px;width:120px;right:10px">Apply</a>
        <a href="#" data-bind="textEditAreaCancelButton" class="button button-round button-outline" style="position:absolute; bottom:10px;width:120px;left:10px">Cancel</a>

    </div>
    <div data-bind="loadSavedWork" class="fullScreenDiv" style="display:none;z-index:1000;">
        <script type="text/html" data-execute="animobile.savedWorkListItemTemplate=$(this).html()">
            <li>
            <a class="iconText outline large no-title"><i class="bmico bmico-save-btn"></i></a>            
            <h5>{{item.name}}</h5>
                <em>{{item.description}}</em>
                 <span><i class="bmico bmico-watch-icon"></i>&nbsp;{{Date.fromatFromTime(item.modified_date,'dd-mm-yyyy  hh:mm TT')}}</span>
            </li>        
        </script>
        <style>
            .savedWorkList li {
                list-style:none;
                list-style-image:none;
                margin:4px;
                padding:5px;
                min-height:80px;
              
                border-bottom:solid 1px #e8e8e8;

            }
            .savedWorkList li:hover {
                background-color:#e9e9e9;
            }
            .savedWorkList li > h5 {
                font-size: 16px;
                font-weight: bold;
                display:block;
               
            }
            .savedWorkList li > em {
                display:block;               
                font-style:normal;
                margin-top:-6px;

            }
            .savedWorkList li > span {
                 margin-top:-4px;
              font-size:10px;
               display:block;  
               font-weight:bold;             
            }
            .savedWorkList li > a {
                margin-right:10px;               
               color: #e8e8e8 !important;
               border-color: #e8e8e8 !important;

            }

        </style>
        <h4 style="position:absolute;left:20px;top:30px;padding-bottom: 10px;width: calc(100% - 35px);font-weight:bold;border-bottom:solid 1px #d7d4d4;" data-bind="loadSavedWorkTitle" >LOAD FROM SAVED WORK</h4>
       
        <i class="bmico bmico-cross-icon" onclick="document.loadSavedWork.$.hide();" style="position:absolute;right:20px;top:30px;font-size:20px"></i>
        <ul data-bind="savedWorkList" style="position:absolute;left:0;top:90px;bottom:0;right:0;overflow-y:auto;margin:0;padding:0"></ul>
    </div>


    <div data-bind="workSettingArea" class="fullScreenDiv" style="background-color:rgba(210,210,210,0.95);display:none;z-index:1000;">
        <h4  style="position:absolute;left:20px;top:30px;padding-bottom: 10px;width: calc(100% - 35px);font-weight:bold;border-bottom:solid 1px #b8b8b8;">WORK SETTINGS</h4>
        <i class="bmico bmico-cross-icon"  onclick="document.workSettingArea.$.hide();" style="position:absolute;right:20px;top:30px;font-size:20px"></i>
        <a href="#" data-bind="workSettingApplyButton" class="button button-round newui-red " style="position:absolute; bottom:10px;width:120px;left:50%;margin-left:-60px">Apply</a>

        

    </div>






    <div data-bind="topMenuBarOverlay" class="ani-modal-overlay" ontouchstart="document.topMenuBar.hideBar(); document.displaySlideList.$.hide();" style="background-color:rgba(100,100,100,0.1);display:none"></div>
    
    <style>
        .displaySlideList > ul > li {
            list-style:none;
            list-style-image:none;
            display:block;
            padding:4px;
            font-weight:700;
        }
         .displaySlideList > ul > li:hover{
        color: #e44130 !important;
         }
    </style>
    <div data-bind="displaySlideList" style="display:none;position:absolute;left:0;top:70px;width:100px;height:auto; background-color:white;border:solid 1px #cacaca;padding-top:10px;box-shadow: 1px 3px 4px 1px rgba(0,0,0,0.1);">
        <ul style="padding-left:10px;padding-right:4px;max-height:280px;overflow-y:auto;margin-bottom:15px"></ul>
    </div>
    
    

    <div data-bind="topMenuBar" style="display:none;position:absolute;left:0;top:40px;width:200px;height:400px;background-color:white;border:solid 1px #cacaca;padding-top:10px;box-shadow: 1px 3px 4px 1px rgba(0,0,0,0.1);">
        <ul style="padding-left:8px;padding-right:8px">
            <li class="seperator"><a onclick="document.topMenuBar.hideBar();animobile.exitTool()" class="iconText title-right"><i class="bmico bmico-back-to-home-icon"></i><em>Back to home</em></a></li>
            <li><a class="iconText title-right" onclick="document.topMenuBar.hideBar(); animobile.projectSettingSchema.showSettings();"><i class="bmico bmico-settings"></i><em>Work setting</em></a></li>
            <li><a class="iconText title-right" onclick="document.topMenuBar.hideBar(); animobile.closePathCurveEffect(); animobile.newProject();"><i class="bmico bmico-new-work-icon"></i><em>New work</em></a></li>
            <li><a class="iconText title-right" onclick="document.topMenuBar.hideBar(); animobile.saveWork()"><i class="bmico bmico-save-btn"></i><em>Save work</em></a></li>
            <li class="seperator" onclick="document.topMenuBar.hideBar(); animobile.loadFromWork()"><a class="iconText title-right"><i class="bmico bmico-load-work-icon"></i><em>Load work</em></a></li>
            <li class="seperator"><a class="iconText title-right selected"><i class="bmico bmico-trash"></i><em>Delete work</em></a></li>
            <li><a class="iconText title-right" onclick="document.topMenuBar.hideBar(); animobile.videoRendering()"><i class="bmico bmico-rendring"></i><em>Video rendering</em></a></li>
            <li><a class="iconText title-right" onclick="document.topMenuBar.hideBar(); animobile.previewProject()"><i class="bmico bmico-eye-icon"></i><em>Preview work</em></a></li>
            <li data-bind="publishProjectLink"><a class="iconText title-right" onclick="document.topMenuBar.hideBar(); animobile.publishProject()"><i class="bmico bmico-publish-work-icon"></i><em>Publish work</em></a></li>
          
        </ul>
    </div>
 

</div>
<style>
    .fac {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
    }
    .fac > input + label:before, .fac > span::after {
        font-family: "FontAwesome";
        font-weight: 900;
        position: absolute;
        left: 0;
        margin-top: 0.5px;
    }
    .fac-checkbox > span::after {
        content: "\f0c8";
        opacity: 1;
    }
        


       .bg-blue-light2 {
           background-color: #002fff !important;
           color: #FFFFFF;
       }
       .button-center-small {
           width: 100px;
           margin: 0 auto;
           display: block;
       }
     

       .smartTextColorSelection .inputTitle {
           padding:0 !important;
       }
       .editPages .page-input {
           padding: 1px;
           display: inline-block;
           width: 100%;
           min-height: 60px;
       }
       .menu-share-socials a {
           width: auto;
           min-width: 70px;
           height: 70px;
           float: left;
           font-size: 45px;
           text-align: center;
           margin: 0px 5px 15px 5px;
       }
       .gutter.gutter-vertical{
       background-color:#b6b6b6;
       }
       .outline-button i {
           margin-right:15px;
           font-size:22px;
           pointer-events:none;
       }
       .outline-button:hover,.outline-button:active{
           background-color:#e5e5e5;
       }
       .outline-button {
           width: 80% !important;
           margin-left: 10% !important;
           margin-right: 10% !important;
           margin-top:10px;
           border: solid 2px #000000;
           border-radius: 14px !important;
           background-color: white;
           color: black;
           font-size: 110%;
           font-weight: 700;

       }
       .icons-leftside-schema {
           color: #a7a7a7;
           font-weight: 700;


       }
    .icon {
        margin:0;
    }
       .boxicon > span {
           padding:0px;
           padding-left:3px;padding-right:3px;

           background-color:white;
           border:solid 2px #9d9d9d !important;
           float:left;
           border-radius:10px !important;
           margin-right:4%;

       }
       .boxicon > span.selected,.boxicon > span:hover,.boxicon > span:active {
           background-color:#d1d1d1;

       }
       .icons-leftside-schema .icon >i,.icons-leftside-schema.icon >i{
                margin-right:10px;
       }
        .icons-leftside-schema .icon , .icons-leftside-schema.icon,.boxicon > span >i {
                padding-top:8px;
                  padding-bottom:6px;
        }
        .boxicon > span >i {
            margin:0;
        }
       .editPages .icon >i,.editPages .boxicon > span >i{
           transform:scale(0.8);-webkit-transform:scale(0.8);
           width:48px;height:48px;display:block;float:left;
           background-image:url('data:image/png;base64,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');
       }
       .spinner-overlay {
           position: absolute;
           left: 0;
           top: 0;
           right: 0;
           bottom: 0;
           z-index:991119;
           background-color: rgba(10,10,10,0.2);
       }
       .spinner {
           left: 50%;
           top: 50%;
           margin-left: -20px;
           margin-top: -20px;
           position: absolute;
           width: 40px;
           height: 40px;
           background-color: #333;
           border-radius: 100%;
           -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
           animation: sk-scaleout 1.0s infinite ease-in-out;
       }
       @-webkit-keyframes sk-scaleout {
           0% {
               -webkit-transform: scale(0);
           }

           100% {
               -webkit-transform: scale(1.0);
               opacity: 0;
           }
       }
       @keyframes sk-scaleout {
           0% {
               -webkit-transform: scale(0);
               transform: scale(0);
           }

           100% {
               -webkit-transform: scale(1.0);
               transform: scale(1.0);
               opacity: 0;
           }
       }
           .split.content {
               margin: 0;
               border: none;
               padding: 0;
           }

           .header-clear-larger {
               padding-top: 60px;
           }

           .header-logo-app .header-icon-3 {
               right: auto;
               left: 0;

           }




       .preloader-light {
           background-color: rgba(0,0,0,0.2) !important;
       }



       .button-80px {
           min-width: 80px;
           width: 80px;
       }

       .button-120px {
           min-width: 120px;
           width: 120px;
       }


       .timeline {
           position: absolute;
           top: 0;
           bottom: 0;
           left: 0;
       }

       .timeline-block {
           position: absolute;
           top: 0;
           bottom: 0;
           left: 0;
           pointer-events: fill;
           background-color: rgba(128, 128, 128, 0.63);
           border: outset 1px rgba(167, 167, 167, 0.36);
           margin: 0;
           padding: 0;
       }
       .timeline-block-title,.timeline-block-title >label {
           position:absolute;left:0;right:0;top:48%;bottom:0;
           text-align:center;
           color:#ffffff;
           font-size:80%;
           pointer-events:none;

       }
       .timeline-block-title {
           top:0;overflow:hidden;
           font-size:100%;
       }
    .timeline-block-child {
        background-color: transparent;
        border: none;
        pointer-events: none;
    }
        .timeline-block-child > .timeline-frame {
            pointer-events: fill;
        }

           .timeline-block > .addKeyframeButton {
               position: absolute;
               right: -45px;
               font-size: 30px;
               top: 2px;
               visibility: hidden;
           }

           .timeline-block.selected > .addKeyframeButton {
               visibility: visible;
           }

           .timeline-block > .removeKeyframeButton {
               position: absolute;
               right: -85px;
               font-size: 30px;
               top: 2px;
               visibility: hidden;
               color: #8c7777;
           }

           .timeline-block.selected > .removeKeyframeButton {
               visibility: visible;
           }



           .timeline-block.selected {
               background-color: rgba(77, 77, 77, 0.90)
           }
            .timeline-block-child.selected {
               background-color:transparent;
           }

           .timeline-block > .timeline-frame.selected {
               opacity:1;
           }

           .timeline-block > .timeline-frame,.timeline-block > .block-resizer {
               position: absolute;
               top: 1px;
               bottom: 1px;
               left: 0;
               opacity:0.8;
               width: 8px;
               list-style: none;
               list-style-image: none;
               
           }

          .timeline-block > .block-resizer {

                visibility:hidden;
                width: 8px;
                margin-left: 0;
                font-size: 26px;
                opacity:1;
                background: none;
                transform: rotate(90deg);
                margin-top: -16px;
           }
        .timeline-block.selected.resizeable  > .block-resizer {
             visibility:visible;
        }


</style>

<style>


    td, table {
        border: none;
        background-color: transparent !important;
        padding:0;margin:0;
        
    }

   

      p {
          line-height: 23px;
          margin-bottom: 30px;
          font-size: 15px;
      }

      .layerNode {

          position: relative;
          padding: 0 !important;
          border-bottom:outset 1px silver;
           margin:0;
           line-height:0;
           width:100%;
           display:inline-block;


      }
      .layerNode .nodeIcon {
          pointer-events: none;
          margin-top: -1px;
          margin-left:6px;
           width: 80%;
      }

    

      .layerNodeWrapper {
          height: 20px;
           pointer-events:none;
           display:block;width:100%;
      }
      .layerNodeWrapper .bmico-eye-icon{
          display:none;
      }
          .layerNode.selected , .layerNode.selected> .titleArea {
              background-color: rgba(130, 130, 130, 0.2);
          }

          .layerNode > .titleArea {
              position: absolute;
              left: 0px;
              top: 0px;
              bottom: -1px;
              width: 55px;
              padding: 3px;
              z-index: 999;
             border-bottom: inset 1px #707070;
              overflow: hidden;
              display:none;

          }

          .layerNodeWrapper > .timelineArea {
              position: absolute;
              left: 0px;
              top: 0px;
              bottom: 0;
              right: 0;
              pointer-events: none;
              overflow: hidden;
          }

          .layerNodeWrapper > .timeline {
              position: absolute;
              left: 0px;
              top: 0px;
              bottom: 0;
              pointer-events: fill;
          }


      .layerNode > .children {
          display:none;
        width:100%;


      }

      .layerNode.expanded > .children {
          display:block;



      }
      .timelineNodes ,.timelineNodes ul {
          margin:0 !important;padding:0 !important;height:0;
      }

      .layerNodeWrapper  .nodeToolsOptions  > div > a >i {
           font-size: 24px;

      }
     .layerNodeWrapper  .nodeToolsOptions {
          position: absolute;
          left: 70px;
          top: 7.5px;
          right:5px;
          bottom:2px;
          display:none;
          opacity:0.6;
          pointer-events:none;
      }
      .layerNodeWrapper .nodeToolsOptions i {
          pointer-events:fill;
      }
     .layerNode.selected >.layerNodeWrapper .nodeToolsOptions {
          display:block;
      }

     .layerNodeWrapper  > .nodeTitle {
          font-size: 12px;
          position: absolute;
          left: 86px;
          top: 12px;
          pointer-events:none;
          max-width:50px;overflow:hidden;
      }


      .layerNodeWrapper  .nodeToolsOptions >  div >.nodeExpander{
          float:right;
      }
        .layerNodeWrapper   .nodeToolsOptions >div > .nodeExpander >i:before {
              content: "\f078";
          }

         .layerNode.expanded > .layerNodeWrapper   .nodeToolsOptions > div > .nodeExpander> i:before {
              content: "\f077";
          }

      .layerNode .nodeTitle i {
          font-size: 24px;
          color: gray;
          padding-left: 8px;
      }


      .layerNode.ani-layer > .layerNodeWrapper > .nodeTitle, .layerNode.ani-slide > .layerNodeWrapper  >.nodeTitle, .layerNode.ani-noicon > .layerNodeWrapper  >.nodeTitle {
          left: 5px;
          z-index:9999;
      }
      .layerNode.ani-layer >  .titleArea> .nodeIcon, .layerNode.ani-slide >  .titleArea> .nodeIcon ,.layerNode.ani-noicon >  .titleArea> .nodeIcon {
          display: none;
      }
     .layerNode .chips a {
          border: none;
          display: inline-block;
          background:none;

      }
    .layerNode  .chips-large a {
          padding: 0px 10px 0px 20px;
          border-radius: 20px;
          margin-right: 5px;
          margin-bottom: 5px;
      }
    .sort-handle {
        touch-action: none;
    }
</style>


<script type="text/html" data-execute="animobile.nodeTemplate=$(this).html()">
    <li class="layerNode">
        <div class="titleArea sort-handle" tapable="true">
            <img  src="{{node.iconUrl}}" class="nodeIcon" />
        </div>
        <div class="layerNodeWrapper">
            <h4 class="nodeTitle">Node</h4>
            <div class="nodeToolsOptions chips chips-large"></div>
            <div class="timelineArea">
                <div class="timeline"></div>
            </div>
            <i class="bmico bmico-eye-icon"></i>
        </div>
        <ul class="children"></ul>
    </li>
</script>

<script type="text/html" data-execute="animobile.confirmModal=$(this).html()">
    <div class="confirmModal" style="padding:30px;padding-bottom:60px;" >
        <h3 class="center-text bolder bottom-15 confirmTitle" style="border-bottom:solid 1px #e1e1e1;padding-bottom: 10px;">Are you sure?</h3>
       <table class="no-border">
           <tr><td class="confirmMessage" valign="middle" ></td></tr>
       </table>
        
        <a href="#" class="ani-modal-ok-button button button-round newui-red pull-right " style="bottom:-40px;width:110px;">Yes</a>
        <a href="#" class="ani-modal-cancel-button button button-round pull-left button-outline" style="bottom:-40px;width:110px;">No</a>

    </div>
</script>

<script type="text/html" data-execute="animobile.errorModal=$(this).html()">
    <div style="padding:30px;" class="bg-red-dark">
        <h1 class="uppercase bolder"><i class="fa fa-sm right-20 fa-times "></i><span class="errorTitle"></span></h1>
        <p class="color-white top-20 bottom-0 opacity-80 errorMessage">
            This is a big notification box. Looks sweet!
        </p>
    </div>
</script>

<script type="text/html" data-execute="animobile.successModal=$(this).html()">
    <div style="padding:30px;" class="bg-green-dark">
        <h1 class="uppercase bolder"><i class="fa fa-sm right-10 fa-check-square"></i> <span class="successTitle"></span></h1>
        <p class="color-white bottom-0 opacity-70 successMessage">
            This is a big notification box. Looks sweet!
        </p>
    </div>
</script>


<div data-bind="mainView">
    <style>
        .canvasChipTools1 a {
            background: none;
            border: solid 0px rgba(0,0,0,0.03);
            display: inline-block;
            opacity: 0.7;
            height: 30px;
        }

        .canvasChipTools a, a.chipButton, label.chipButton a {
            width: 34px;
            height: 34px;
            border-radius: 44px;
            font-size: 12px;
            color: #FFFFFF;
            text-align: center;
            line-height: 34px;
            box-shadow: 0px 0px 40px 8px rgba(0,0,0,0.10);
            margin-bottom: 28px;
            transform: scale(1.4);
            opacity: 0.7;
        }

        label.chipButton a {
            margin: 0;
            float: left;
            position: absolute;
            left: 0;
        }

        label.chipButton {
            line-height: 34px;
            padding-left: 50px;
            font-size: 18px;
            font-weight: 700;
            color: #9b9999;
            display: block;
            margin-bottom: 30px;
        }

        .canvasChipTools1 a i {
            font-size: 14px !important;
            box-shadow: 0px 0px 40px 8px rgba(0,0,0,0.10);
        }
    </style>

   
      <div data-bind="fullTimelineArea"  style="overflow:hidden;background-color:#eeeeee;position:absolute;left:0;right:0;top:0;bottom:0">
          <style>
              .timelineButtons span {
                  pointer-events: fill;
              }

              .timelineButtons .pauseTimelineButton {
                  display: none;
              }

              .timelineButtons.playing .pauseTimelineButton {
                  display: initial;
              }

              .timelineButtons.playing .playTimelineButton {
                  display: none;
              }
          </style>
          <div style="height:48px;width:100%;">
              <div data-bind="timelineButtons" style="font-size:24px;left:10px;top:10px;position:absolute;color:gray;">
                  <span class="playTimelineButton bmico bmico-play-effects-icon"></span>
                  <span class="pauseTimelineButton bmico bmico-pause-effect-icon"></span>
              </div>

              <h4 style="position:absolute;padding-left:4px;top:8px; left:40px;height:48px; margin:0;font-weight:500;transform: scaleX(0.8) scaleY(1.2);transform-origin: left top;">
                  <span data-bind="playTimeHour">00</span>:
                  <span data-bind="playTimeMin">30</span>:
                  <span data-bind="playTimeSec">01</span>&nbsp;
                  <span data-bind="playTimeMili" style="font-size:50%">000</span>
              </h4>

              
          </div>
        <div data-bind="animobile_timeline" style="height:30px;right:0;left:0;top:48px;background-color: #eeeeee; position:absolute;border-bottom:solid 1px #c2c2c2;border-top:solid 1px silver">

            <div data-bind="timelineScroller" style="position:absolute;left:0;right:0;top:50%;bottom:0;display:none"></div>
        </div>


        <div data-bind="timelineWrapper" style="position:absolute;top:77px;bottom:0px;left:0px;right:0px;overflow:hidden;border-bottom:solid 1px silver">

            <div data-bind="timelineNodesArea" style="position:absolute;top:0px;bottom:0px;left:0px;right:0px;overflow-y:auto;overflow-x:hidden;">
                <ul data-bind="timelineNodes" class="" style="margin-top:5px;margin-bottom:5px;width:100%"></ul>
            </div>

        </div>

        <div data-bind="timelineTrackers" style="position:absolute;left:0px;top:1px;bottom:0px;right:0;pointer-events:none">
            <div data-bind="timelineTracker" style="position:absolute;left:0;top:48px;bottom:0;width:1px;background-color:black;opacity:0.5">
                <div style="position:absolute;left:-22px;top:0px;background-color:black;height:16px;width:50px;">
                    <i class="fa fa-caret-down" style="color:black; position:absolute;left:50%;margin-left:-12px; top:0px;font-size:32px"></i>
                    <span data-bind="timelineTrackerTime" style="position:absolute;left:0;top:-6px;font-size:90% ;right:0;text-align:center;color:white">0.0</span>

                </div>

            </div>

        </div>


          <div style="position:absolute;left:0; width:100%;bottom:0px;height:38px;pointer-events:none;">
              <div class="range-slider  range-slider-icons" style="opacity:0.5;padding:0;pointer-events:fill"><input data-bind="timelineScrollerBar" class="ios-slider" type="range" value="0" min="-100" max="100"></div>
          </div>

        

    </div>

   
</div>

<script type="text/html" data-execute="animobile.mainViewTemplate=$(this).html()">
    <div>
        <h2>View {{self.viewsCount()}}</h2>
    </div>
</script>
