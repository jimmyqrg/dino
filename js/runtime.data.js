var loadTimeData;
            class LoadTimeData {
                constructor() {
                    this.data_ = null;
                }
                set data(t) {
                    expect(!this.data_, "Re-setting data."), (this.data_ = t);
                }
                valueExists(t) {
                    return t in this.data_;
                }
                getValue(t) {
                    expect(this.data_, "No data. Did you remember to include strings.js?");
                    const e = this.data_[t];
                    return expect(void 0 !== e, "Could not find value for " + t), e;
                }
                getString(t) {
                    const e = this.getValue(t);
                    return expectIsType(t, e, "string"), e;
                }
                getStringF(t, e) {
                    const n = this.getString(t);
                    if (!n) return "";
                    const a = Array.prototype.slice.call(arguments);
                    return (a[0] = n), this.substituteString.apply(this, a);
                }
                substituteString(t, e) {
                    const n = arguments;
                    return t.replace(/\$(.|$|\n)/g, function (t) {
                        return (
                            expect(
                                t.match(/\$[$1-9]/),
                                "Unescaped $ found in localized string."
                            ),
                            "$$" === t ? "$" : n[t[1]]
                        );
                    });
                }
                getSubstitutedStringPieces(t, e) {
                    const n = arguments;
                    return (t.match(/(\$[1-9])|(([^$]|\$([^1-9]|$))+)/g) || []).map(
                        function (t) {
                            return t.match(/^\$[1-9]$/)
                                ? { value: n[t[1]], arg: t }
                                : (expect(
                                      (t.match(/\$/g) || []).length % 2 == 0,
                                      "Unescaped $ found in localized string."
                                  ),
                                  { value: t.replace(/\$\$/g, "$"), arg: null });
                        }
                    );
                }
                getBoolean(t) {
                    const e = this.getValue(t);
                    return expectIsType(t, e, "boolean"), e;
                }
                getInteger(t) {
                    const e = this.getValue(t);
                    return (
                        expectIsType(t, e, "number"),
                        expect(e === Math.floor(e), "Number isn't integer: " + e),
                        e
                    );
                }
                overrideValues(t) {
                    expect(
                        "object" == typeof t,
                        "Replacements must be a dictionary object."
                    );
                    for (const e in t) this.data_[e] = t[e];
                }
                resetForTesting(t = null) {
                    this.data_ = t;
                }
                isInitialized() {
                    return null !== this.data_;
                }
            }
            function expect(t, e) {
                if (!t)
                    throw new Error(
                        "Unexpected condition on " + document.location.href + ": " + e
                    );
            }
            function expectIsType(t, e, n) {
                expect(typeof e === n, "[" + e + "] (" + t + ") is not a " + n);
            }
            expect(!loadTimeData, "should only include this file once"),
                (loadTimeData = new LoadTimeData()),
                (window.loadTimeData = loadTimeData),
                console.warn("crbug/1173575, non-JS module files deprecated.");
        

            const pageData = {
                dinoGameA11yAriaLabel: "Dino game, play",
                dinoGameA11yDescription:
                    "Dino game. A pixelated dinosaur dodges cacti and pterodactyls as it runs across a desolate landscape. When you hear an audio cue, press space to jump over obstacles.",
                dinoGameA11yGameOver: "Game over, your score is $1.",
                dinoGameA11yHighScore: "Your highest score is $1.",
                dinoGameA11yJump: "Jump!",
                dinoGameA11ySpeedToggle: "Start slower",
                dinoGameA11yStartGame: "Game started.",
                errorCode: "",
                fontfamily: "'Segoe UI', Tahoma, sans-serif",
                fontsize: "75%",
                heading: { hostName: "dino", msg: "Press space to play" },
                iconClass: "icon-offline",
                language: "en",
                textdirection: "ltr",
                title: "chrome://dino/",
            };
            loadTimeData.data = pageData;
            // #region agent log
            fetch('http://127.0.0.1:7243/ingest/3cb9382d-42e8-4283-ad23-8a993d8d247c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'js/runtime.data.js:pageData',message:'loadTimeData set',data:{hasLoadTimeData:typeof loadTimeData!=='undefined',isInitialized:loadTimeData&&loadTimeData.isInitialized&&loadTimeData.isInitialized(),title:pageData&&pageData.title},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'})}).catch(()=>{});
            // #endregion agent log
            var tp = document.getElementById("t");
            jstProcess(new JsEvalContext(pageData), tp);
        
