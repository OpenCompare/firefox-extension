(function(){
    "use strict";

    function setStatus(status) {
        if (status.enabled) {
            document.getElementById('checkPage').style.display = 'none';
            document.getElementById('uncheckPage').style.display = 'block';
        } else {
            document.getElementById('checkPage').style.display = 'block';
            document.getElementById('uncheckPage').style.display = 'none';
        }

    }

    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        setStatus({
            enabled: true
        });
        self.port.emit("checkPage");
    });

    var uncheckPageButton = document.getElementById('uncheckPage');
    uncheckPageButton.addEventListener('click', function() {
        setStatus({
            enabled: false
        });
        self.port.emit("removeButtons");
    });

    self.port.on("status", function(status) {
        setStatus(status);
    });


})();