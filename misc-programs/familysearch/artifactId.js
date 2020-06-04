javascript: (
    function () {
        let main = event => {
            document.removeEventListener("copy", main, true);
            event.preventDefault();
            let clipboardData = event.clipboardData;
            const el = document.createElement('textarea');
            el.value = "";

            let artifactId = 
                document.getElementsByTagName("gallery-app")[0].
                    shadowRoot.children.modalViewer.
                    shadowRoot.children.artifactViewerModal.
                    children.header.children["header-container"].
                    children["expandIconMobile"].href
                    .split("/artifacts/")[1].split("?")[0];

            clipboardData.clearData();
            clipboardData.setData("text/plain", artifactId)
            document.body.appendChild(el);
            el.select(); 
            document.body.removeChild(el);
            alert("Copied artifactId=" + artifactId + " to clipboard");
        };
        document.addEventListener("copy", main, true);
        document.execCommand("copy")
    }
  )()

// javascript: (function () %7Blet main %3D event %3D> %7Bdocument.removeEventListener("copy", main, true)%3Bevent.preventDefault()%3Blet clipboardData %3D event.clipboardData%3Bconst el %3D document.createElement('textarea')%3Bel.value %3D ""%3Blet artifactId %3D document.getElementsByTagName("gallery-app")[0].shadowRoot.children.modalViewer.shadowRoot.children.artifactViewerModal.children.header.children["header-container"].children["expandIconMobile"].href.split("/artifacts/")[1].split("?")[0]%3BclipboardData.clearData()%3BclipboardData.setData("text/plain", artifactId)%3Bdocument.body.appendChild(el)%3Bel.select()%3B document.body.removeChild(el)%3Balert("Copied artifactId%3D" %2B artifactId %2B " to clipboard")%3B}%3Bdocument.addEventListener("copy", main, true)%3Bdocument.execCommand("copy")%3B})()