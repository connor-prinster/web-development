javascript:(
    function(){
    let copyListener = event => {
        document.removeEventListener("copy", copyListener, true);
        event.preventDefault();let clipboardData = event.clipboardData;let sessionId = document.cookie.split( ';' ).map( function( x ) { return x.trim().split( '=' ); } ).reduce(  function( a, b ) { a[ b[ 0 ] ] = b[ 1 ]; return a; }, {} )[ "fssessionid" ];if (sessionId == undefined) { alert("No sessionId found");} else {alert("Copied session Id to clipboard%3A " %2B sessionId);clipboardData.clearData();clipboardData.setData("text%2Fplain", sessionId);}};document.addEventListener("copy", copyListener, true);document.execCommand("copy")})()

        /* 
            %7B = {
            %3D = =
            %2C = ,
            %3B = ;
            %7D = }
            %5B = [
            %5D = ]
        */


