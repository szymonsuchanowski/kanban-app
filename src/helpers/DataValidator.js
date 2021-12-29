export default class DataValidator {
    name = {
        regExp: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        err: 'required (min. 3 letters)',
        required: true,
    };

    owner = {
        regExp: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        err: 'required (min. 3 letters)',
        required: true,
    };

    checkDataErrors(inputName, inputValue) {
        return !(!this[inputName].required && inputValue.trim().length === 0)
            ? this.isDataValid(inputName, inputValue)
            : null;
    }

    isDataValid(inputName, inputValue) {
        const isDataValid = this.isMatchRegex(inputName, inputValue.trim());
        return !isDataValid ? this.createErrObject(inputName) : null;
    }

    isMatchRegex(inputName, inputValue) {
        return this[inputName].regExp.test(inputValue);
    }

    createErrObject(inputName) {
        return {
            [inputName]: this[inputName].err,
        };
    }
}
