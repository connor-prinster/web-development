javascript:(
    function() {
    let copyListener = event => {
        document.removeEventListener("copy", copyListener, true);
        event.preventDefault();
        let clipboardData = event.clipboardData;
        let sessionId = document.cookie.split( ';' ).map( 
            function( x ) { 
                return x.trim().split( '=' ); 
            } ).reduce(  
                function( a, b ) { 
                    a[ b[ 0 ] ] = b[ 1 ]; 
                    return a; 
                }, {} )[ "fssessionid" ];
                if (sessionId == undefined) { 
                    alert("No sessionId found");
                } 
                else {
                    alert("Copied session Id to clipboard: " + sessionId);
                    clipboardData.clearData();
                    clipboardData.setData("text/plain", sessionId);
                }
        };
        document.addEventListener("copy", copyListener, true);
        document.execCommand("copy")
    })()
 
