(function(){
    "use strict";

    function setStatus(checking) {
        if (checking) {
            document.getElementById('checkPage').style.display = 'none';
            document.getElementById('uncheckPage').style.display = 'block';
        } else {
            document.getElementById('checkPage').style.display = 'block';
            document.getElementById('uncheckPage').style.display = 'none';
        }
    }

    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        setStatus(true);
        self.port.emit("checkPage");
    });

    var uncheckPageButton = document.getElementById('uncheckPage');
    uncheckPageButton.addEventListener('click', function() {
        setStatus(false);
        self.port.emit("removeButtons");
    });

    self.port.on("status", function(status) {
        setStatus(status);
    });


})();