(function(){
    "use strict";

    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        document.getElementById('checkPage').style.display = 'none';
        document.getElementById('uncheckPage').style.display = 'block';

        self.port.emit("checkPage");
    });

    var uncheckPageButton = document.getElementById('uncheckPage');
    uncheckPageButton.addEventListener('click', function() {

        document.getElementById('checkPage').style.display = 'block';
        document.getElementById('uncheckPage').style.display = 'none';

        self.port.emit("removeButtons");
    });

})();