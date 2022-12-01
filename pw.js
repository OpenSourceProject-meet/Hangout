//특수문자인지 check
function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}

//특수문자를 hex로 변환
String.prototype.hexEncode = function () {
    var hex, i;

    var result = "";
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += hex;
    }

    return '%' + result
}

//특정 인덱스 문자 변환 
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function transSpecialToHex(str) {
    for (i = 0; i < str.length; i++) {
        if (containsSpecialChars(str[i])) {
            str = str.replaceAt(i, str[i].hexEncode())
        }
    }

    return str;

}

module.exports = {
    transSpecialToHex,
    containsSpecialChars,

}