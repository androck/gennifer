// This module generates a password from random bytes and does a quality check if it contains all this.regex character classes

var crypto = require('crypto');

module.exports = {

    // adjust this character classes to change output of passwords
    regLowerCase : /[a-z]/,
    regUpperCase : /[A-Z]/,
    regDigit : /[0-9]/,
    regSpecialChar : /[!._+,;:#=-]/,


    // generate(targetLength) throws an error if it can't generate the desired password length OR returns an object of
    // {
    //      secret:     password,       //  your generated password
    //      iterations: Number          // shows how many blocks of randomBytes were needed
    // }
    generate : function (targetLength) {
        var secret = "";
        if (!targetLength || targetLength < 8) throw Error("You must use at least 8 characters as targetLength. ->  gennifer(targetLength)");

        var iter = 0;
        while (!(secret.length >= targetLength && this.regLowerCase.test(secret) && this.regUpperCase.test(secret) && this.regDigit.test(secret) && this.regSpecialChar.test(secret))) {
            iter++;
            if (iter > 10000) throw Error("Cannot generate a password with desired character classes");
            secret = "";
            var buf = crypto.randomBytes(512);
            for (var value of buf) {
                if (secret.length >= targetLength) break;
                //if (32 < value && value < 127) secret = secret + String.fromCharCode(value);
                value = String.fromCharCode(value);
                if (this.regLowerCase.test(value) || this.regUpperCase.test(value) || this.regDigit.test(value) || this.regSpecialChar.test(value)) secret = secret + value;
            }
        }
        return {secret : secret, iterations: iter};
    },

    // verify(secret, targetLength) verifies if secret contains characters of all character classes and has length targetLength, returns true or throws an Error
    verify : function (secret, targetLength) {

        if (!(secret.length >= targetLength && this.regLowerCase.test(secret) && this.regUpperCase.test(secret) && this.regDigit.test(secret) && this.regSpecialChar.test(secret))) throw Error("Passwort entspricht nicht den aktuellen Richtlinien")
        return true;
    }


}
