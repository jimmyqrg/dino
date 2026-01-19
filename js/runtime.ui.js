            var errorPageController;
            const HIDDEN_CLASS = "hidden";
            function decodeUTF16Base64ToString(t) {
                const e = atob(t);
                let n = "";
                for (let t = 0; t < e.length; t += 2)
                    n += String.fromCharCode(256 * e.charCodeAt(t) + e.charCodeAt(t + 1));
                return n;
            }
            function toggleHelpBox() {
                const t = document.getElementById("details");
                t.classList.toggle(HIDDEN_CLASS);
                const e = document.getElementById("details-button");
                if (
                    (t.classList.contains(HIDDEN_CLASS)
                        ? (e.innerText = e.detailsText)
                        : (e.innerText = e.hideDetailsText),
                    mobileNav)
                ) {
                    document.getElementById("main-content").classList.toggle(HIDDEN_CLASS);
                    const t = document.querySelector(".runner-container");
                    t && t.classList.toggle(HIDDEN_CLASS);
                }
            }
            function diagnoseErrors() {
                window.errorPageController &&
                    errorPageController.diagnoseErrorsButtonClick();
            }
            let isSubFrame = !1;
            function updateForDnsProbe(t) {
                const e = new JsEvalContext(t);
                jstProcess(e, document.getElementById("t")), onDocumentLoadOrUpdate();
            }
            function updateIconClass(t) {
                const e = isSubFrame ? "#sub-frame-error" : "#main-frame-error",
                    n = document.querySelector(e + " .icon");
                n.classList.contains(t) || (n.className = "icon " + t);
            }
            function reloadButtonClick(t) {
                window.errorPageController
                    ? errorPageController.reloadButtonClick()
                    : (window.location = t);
            }
            function downloadButtonClick() {
                if (window.errorPageController) {
                    errorPageController.downloadButtonClick();
                    const t = document.getElementById("download-button");
                    (t.disabled = !0),
                        (t.textContent = t.disabledText),
                        document
                            .getElementById("download-link-wrapper")
                            .classList.add(HIDDEN_CLASS),
                        document
                            .getElementById("download-link-clicked-wrapper")
                            .classList.remove(HIDDEN_CLASS);
                }
            }
            function detailsButtonClick() {
                window.errorPageController && errorPageController.detailsButtonClick();
            }
            (window.top.location !== window.location || window.portalHost) &&
                (document.documentElement.setAttribute("subframe", ""), (isSubFrame = !0));
            let AvailableOfflineContent,
                primaryControlOnLeft = !0;
            function setAutoFetchState(t, e) {
                document
                    .getElementById("cancel-save-page-button")
                    .classList.toggle(HIDDEN_CLASS, !t),
                    document
                        .getElementById("save-page-for-later-button")
                        .classList.toggle(HIDDEN_CLASS, t || !e);
            }
            function savePageLaterClick() {
                errorPageController.savePageForLater();
            }
            function cancelSavePageClick() {
                errorPageController.cancelSavePage(), setAutoFetchState(!1, !0);
            }
            function toggleErrorInformationPopup() {
                document
                    .getElementById("error-information-popup-container")
                    .classList.toggle(HIDDEN_CLASS);
            }
            function launchOfflineItem(t, e) {
                errorPageController.launchOfflineItem(t, e);
            }
            function launchDownloadsPage() {
                errorPageController.launchDownloadsPage();
            }
            function getIconForSuggestedItem(t) {
                switch (t.content_type) {
                    case 1:
                        return "image-video";
                    case 2:
                        return "image-music-note";
                    case 0:
                    case 3:
                        return "image-earth";
                }
                return "image-file";
            }
            function getSuggestedContentDiv(t, e) {
                let n = "";
                const o = [];
                if (t.thumbnail_data_uri)
                    o.push("suggestion-with-image"),
                        (n = `<img src="${t.thumbnail_data_uri}">`);
                else {
                    o.push("suggestion-with-icon"),
                        (n = `<div><img class="${getIconForSuggestedItem(t)}"></div>`);
                }
                let i = "";
                return (
                    t.favicon_data_uri
                        ? (i = `<img src="${t.favicon_data_uri}">`)
                        : o.push("no-favicon"),
                    t.attribution_base64 || o.push("no-attribution"),
                    `<div class="offline-content-suggestion ${o.join(
                        " "
                    )}"onclick="launchOfflineItem('${t.ID}', '${
                        t.name_space
                    }')"><div class="offline-content-suggestion-texts"><div id="offline-content-suggestion-title-${e}"class="offline-content-suggestion-title"></div><div class="offline-content-suggestion-attribution-freshness"><div id="offline-content-suggestion-favicon-${e}"class="offline-content-suggestion-favicon">${i}</div><div id="offline-content-suggestion-attribution-${e}"class="offline-content-suggestion-attribution"></div><div class="offline-content-suggestion-freshness">${
                        t.date_modified
                    }</div><div class="offline-content-suggestion-pin-spacer"></div><div class="offline-content-suggestion-pin"></div></div></div><div class="offline-content-suggestion-thumbnail">${n}</div></div>`
                );
            }
            function offlineContentAvailable(t, e) {
                if (!e || !loadTimeData.valueExists("offlineContentList")) return;
                const n = [];
                for (let t = 0; t < e.length; t++) n.push(getSuggestedContentDiv(e[t], t));
                document.getElementById("offline-content-suggestions").innerHTML = n.join(
                    "\n"
                );
                for (let t = 0; t < e.length; t++)
                    (document.getElementById(
                        `offline-content-suggestion-title-${t}`
                    ).textContent = decodeUTF16Base64ToString(e[t].title_base64)),
                        (document.getElementById(
                            `offline-content-suggestion-attribution-${t}`
                        ).textContent = decodeUTF16Base64ToString(e[t].attribution_base64));
                const o = document.getElementById("offline-content-list");
                "rtl" === document.dir && o.classList.add("is-rtl"),
                    (o.hidden = !1),
                    t && toggleOfflineContentListVisibility(!1);
            }
            function toggleOfflineContentListVisibility(t) {
                if (!loadTimeData.valueExists("offlineContentList")) return;
                const e = !document
                    .getElementById("offline-content-list")
                    .classList.toggle("list-hidden");
                t &&
                    window.errorPageController &&
                    errorPageController.listVisibilityChanged(e);
            }
            function onDocumentLoadOrUpdate() {
                // #region agent log
                fetch('http://127.0.0.1:7243/ingest/3cb9382d-42e8-4283-ad23-8a993d8d247c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'js/runtime.ui.js:onDocumentLoadOrUpdate',message:'enter',data:{hasLoadTimeData:typeof loadTimeData!=='undefined'&&!!loadTimeData,isInitialized:typeof loadTimeData!=='undefined'&&!!loadTimeData&&loadTimeData.isInitialized&&loadTimeData.isInitialized(),hasTemplateRoot:!!document.getElementById('t'),hasRunnerContainer:!!document.querySelector('.runner-container')},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'})}).catch(()=>{});
                // #endregion agent log
                const t =
                        loadTimeData.valueExists("downloadButton") &&
                        loadTimeData.getValue("downloadButton").msg,
                    e = document.getElementById("details-button"),
                    n = loadTimeData.valueExists("suggestedOfflineContentPresentation");
                n &&
                    (document.querySelector(".nav-wrapper").classList.add(HIDDEN_CLASS),
                    e.classList.add(HIDDEN_CLASS),
                    (document.getElementById("download-link").hidden = !t),
                    document
                        .getElementById("download-links-wrapper")
                        .classList.remove(HIDDEN_CLASS),
                    document
                        .getElementById("error-information-popup-container")
                        .classList.add("use-popup-container", HIDDEN_CLASS),
                    document
                        .getElementById("error-information-button")
                        .classList.remove(HIDDEN_CLASS));
                loadTimeData.valueExists("attemptAutoFetch") &&
                    loadTimeData.getValue("attemptAutoFetch");
                const o =
                        loadTimeData.valueExists("reloadButton") &&
                        loadTimeData.getValue("reloadButton").msg,
                    i = document.getElementById("reload-button"),
                    a = document.getElementById("download-button");
                "none" === i.style.display &&
                    "none" === a.style.display &&
                    e.classList.add("singular"),
                    (document.getElementById("control-buttons").hidden = n || !(o || t));
                const s =
                    loadTimeData.valueExists("iconClass") &&
                    loadTimeData.getValue("iconClass");
                updateIconClass(s),
                    isSubFrame ||
                        "icon-offline" !== s ||
                        (document.documentElement.classList.add("offline"),
                        new Runner(".interstitial-wrapper"));
            }
            function onDocumentLoad() {
                // #region agent log
                fetch('http://127.0.0.1:7243/ingest/3cb9382d-42e8-4283-ad23-8a993d8d247c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'js/runtime.ui.js:onDocumentLoad',message:'enter',data:{primaryControlOnLeft,hasButtons:!!document.getElementById('buttons')},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H4'})}).catch(()=>{});
                // #endregion agent log
                const t = document.getElementById("buttons");
                primaryControlOnLeft
                    ? t.classList.add("suggested-left")
                    : t.classList.add("suggested-right"),
                    onDocumentLoadOrUpdate();
            }
            document.addEventListener("DOMContentLoaded", onDocumentLoad);
        

            let mobileNav = !1;
            function onResize() {
                const e = document.querySelector("#details"),
                    t = document.querySelector("#main-content"),
                    i = e.classList.contains(HIDDEN_CLASS),
                    n = document.querySelector(".runner-container");
                mobileNav !==
                    window.matchMedia(
                        "(min-width: 240px) and (max-width: 420px) and (min-height: 401px), (max-height: 560px) and (min-height: 240px) and (min-width: 421px)"
                    ).matches &&
                    ((mobileNav = !mobileNav)
                        ? (t.classList.toggle(HIDDEN_CLASS, !i),
                          e.classList.toggle(HIDDEN_CLASS, i),
                          n && n.classList.toggle(HIDDEN_CLASS, !i))
                        : i ||
                          (t.classList.remove(HIDDEN_CLASS),
                          e.classList.remove(HIDDEN_CLASS),
                          n && n.classList.remove(HIDDEN_CLASS)));
            }
            function setupMobileNav() {
                window.addEventListener("resize", onResize), onResize();
            }
            document.addEventListener("DOMContentLoaded", setupMobileNav);

            // #region agent log
            window.addEventListener("error", function (e) {
                fetch('http://127.0.0.1:7243/ingest/3cb9382d-42e8-4283-ad23-8a993d8d247c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'js/runtime.ui.js:window.error',message:'error',data:{message:e&&e.message,filename:e&&e.filename,lineno:e&&e.lineno,colno:e&&e.colno},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H8'})}).catch(()=>{});
            });
            // #endregion agent log
        

            
