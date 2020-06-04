javascript: (
    function () {
        let main = event => {
            // set up the event listener
            document.removeEventListener("copy", main, true);
            event.preventDefault();
            let clipboardData = event.clipboardData;
            // set the document in focus
            const el = document.createElement('textarea');
            el.value = "";
            // there is a potential issue here. if you are on the 
            // wrong page, everything dies with a null issue. to
            // remove the chance of that, I put a try/catch
            let children = ""
            try {
                children = 
                    document.getElementsByTagName("gallery-app")[0].
                    shadowRoot.children.modalViewer.
                    shadowRoot.children.artifactViewerModal.
                    children.header.children["header-container"].
                    children;
            }
            catch(e) {
                alert("Something went wrong. Are you on the right page?", e);
                return;
            }
            // depending on the size of the webpage, the button holding
            // the artifactId will either be "expandIcon" or "expandIconMobile".
            // this ternary expression should fix this
            let correctChild = children["expandIconMobile"] === undefined ? "expandIcon" : "expandIconMobile";
            let artifactId = "";
            try {
                artifactId = children[correctChild].href.split("/artifacts/")[1].split("?")[0];
                clipboardData.clearData();
                clipboardData.setData("text/plain", artifactId);
                document.body.appendChild(el);
                el.select(); 
                document.body.removeChild(el);
                alert("Copied artifactId=" + artifactId + " to clipboard");
            }
            catch(e) {
                alert("Something went wrong. Are you on the right page?", e);
                return;
            }
        };
        document.addEventListener("copy", main, true);
        document.execCommand("copy");
    }
)()