javascript: (
    function () {
        let main = event => {
            
            document.removeEventListener("copy", main, true);
            event.preventDefault();
            let clipboardData = event.clipboardData;
            
            const el = document.createElement('textarea');
            el.value = "";
            
            let children = ""
            children = 
                document.getElementsByTagName("gallery-app")[0].
                shadowRoot.children.modalViewer.
                shadowRoot.children.artifactViewerModal.
                children.header.children["header-container"].
                children;
            
            if(children["expandIconMobile"] === undefined) {
                correctChild = "expandIcon"
            }
            else {
                correctChild = "expandIconMobile"
            }

            let artifactId = "";
            artifactId = children[correctChild].href.split("/artifacts/")[1].split("?")[0];
                clipboardData.clearData();
                clipboardData.setData("text/plain", artifactId);
                document.body.appendChild(el);
                el.select(); 
                document.body.removeChild(el);
                alert("Copied artifactId=" + artifactId + " to clipboard");
            
        };
        document.addEventListener("copy", main, true);
        document.execCommand("copy");
    }
)()

// javascript: (
//     function () %7B
//         let main %3D event %3D> %7B
            
//             document.removeEventListener("copy"%2C main%2C true)%3B
//             event.preventDefault()%3B
//             let clipboardData %3D event.clipboardData%3B
            
//             const el %3D document.createElement('textarea')%3B
//             el.value %3D ""%3B
            
//             let children %3D ""%3B
//             children %3D 
//                 document.getElementsByTagName("gallery-app")%5B0%5D.
//                 shadowRoot.children.modalViewer.
//                 shadowRoot.children.artifactViewerModal.
//                 children.header.children%5B"header-container"%5D.
//                 children%3B
            
//             if(children%5B"expandIconMobile"%5D %3D%3D%3D undefined) %7B
//                 correctChild %3D "expandIcon"
//             %7D
//             else %7B
//                 correctChild %3D "expandIconMobile"
//             %7D

//             let artifactId %3D ""%3B
//             artifactId %3D children%5BcorrectChild%5D.href.split("/artifacts/")%5B1%5D.split("?")%5B0%5D%3B
            
//             clipboardData.clearData()%3B
//             clipboardData.setData("text/plain"%2C artifactId)%3B
//             document.body.appendChild(el)%3B
//             el.select()%3B 
//             document.body.removeChild(el)%3B
//             alert("Copied artifactId%3D" %2B artifactId %2B " to clipboard")%3B
            
//         %7D%3B
//         document.addEventListener("copy"%2C main%2C true)%3B
//         document.execCommand("copy")%3B
//     %7D
// )()