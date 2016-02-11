define(["require", "exports"], function (require, exports) {
    var SchoolLibrary = (function () {
        function SchoolLibrary() {
        }
        SchoolLibrary.prototype.lendBook = function (student) {
            var book = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                book[_i - 1] = arguments[_i];
            }
            student.addBook.apply(student, book);
        };
        return SchoolLibrary;
    })();
    exports.SchoolLibrary = SchoolLibrary;
});
//# sourceMappingURL=school-library.js.map