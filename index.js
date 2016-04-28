// This module generates a password from random bytes and does a quality check if it contains all regex character classes

var crypto = require('crypto');

module.exports = {

    // throws an error if it can't generate the desired password length OR returns an object of
    // {
    //      secret:     password,       //  your generated password
    //      iterations: Number          // shows how many blocks of randomBytes were needed
    // }

    generate : function (targetLength) {
        var secret = "";
        if (!targetLength || targetLength < 8) throw Error("You must use at least 8 characters as targetLength. ->  gennifer(targetLength)");
        // adjust this character classes to change output of passwords
        var regLowerCase = /[a-z]/;
        var regUpperCase = /[A-Z]/;
        var regDigit = /[0-9]/;
        var regSpecialChar = /[!._+-]/;

        var iter = 0;
        while (!(secret.length >= targetLength && regLowerCase.test(secret) && regUpperCase.test(secret) && regDigit.test(secret) && regSpecialChar.test(secret))) {
            iter++;
            if (iter > 10000) throw Error("Cannot generate a password with desired character classes");
            secret = "";
            var buf = crypto.randomBytes(512);
            for (var value of buf) {
                if (secret.length >= targetLength) break;
                //if (32 < value && value < 127) secret = secret + String.fromCharCode(value);
                value = String.fromCharCode(value);
                if (regLowerCase.test(value) || regUpperCase.test(value) || regDigit.test(value) || regSpecialChar.test(value)) secret = secret + value;
            }
        }
        return {secret : secret, iterations: iter};
    }

}
