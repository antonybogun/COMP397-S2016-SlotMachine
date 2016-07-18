/**
 * @source file name:   asset.ts
 * @author          :   Tony Bogun
 * @last modified by:   Tony Bogun (1 contributor)
 * @description     :   Asset object implementation file
 * @revision history:   https://github.com/antonybogun/COMP397-S2016-SlotMachine/commits/master
 */
var objects;
(function (objects) {
    // ASSET CLASS ++++++++++++++++++++++++++
    var Asset = (function () {
        // CONSTRUCTOR +++++++++++++++++++++
        function Asset(id, src) {
            this.id = id;
            this.src = src;
        }
        return Asset;
    }());
    objects.Asset = Asset;
})(objects || (objects = {}));
//# sourceMappingURL=asset.js.map