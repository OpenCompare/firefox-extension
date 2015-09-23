(function(){
    "use strict";

    function setStatus(status) {
        if (status.https) {
            document.getElementById('checkPage').style.display = 'none';
            document.getElementById('uncheckPage').style.display = 'none';
            document.getElementById('httpsMessage').style.display = 'block';
        } else if (status.enabled) {
            document.getElementById('checkPage').style.display = 'none';
            document.getElementById('uncheckPage').style.display = 'block';
            document.getElementById('httpsMessage').style.display = 'none';
        } else {
            document.getElementById('checkPage').style.display = 'block';
            document.getElementById('uncheckPage').style.display = 'none';
            document.getElementById('httpsMessage').style.display = 'none';
        }

    }

    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        setStatus({
            enabled: true,
            https: false
        });
        self.port.emit("checkPage");
    });

    var uncheckPageButton = document.getElementById('uncheckPage');
    uncheckPageButton.addEventListener('click', function() {
        setStatus({
            enabled: false,
            https: false
        });
        self.port.emit("removeButtons");
    });

    self.port.on("status", function(status) {
        setStatus(status);
    });


})();