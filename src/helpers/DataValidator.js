import { getCurrentDate } from './helpersFunctions';

export default class DataValidator {
    taskName = {
        regExp: /^.{4,}$/,
        err: 'required (min. 4 characters)',
        required: true,
    };

    owner = {
        regExp: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        err: 'required (min. 3 letters)',
        required: true,
    };

    email = {
        regExp: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        err: 'required (valid e-mail address)',
        required: true,
    };

    date = {
        regExp: /^20\d{2}[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12]\d|3[01])$/,
        err: 'today/future (dd.mm.yyyy) or empty (not required)',
        required: false,
    };

    message = {
        regExp: /^.{5,}$/,
        err: 'min. 5 characters or empty (not required)',
        required: false,
    };

    checkDataErrors(inputName, inputValue) {
        return !(!this[inputName].required && inputValue.trim().length === 0)
            ? this.isDataValid(inputName, inputValue)
            : null;
    }

    isDataValid(inputName, inputValue) {
        const isDataValid = this.isMatchRegex(inputName, inputValue.trim());
        const isDateCorrect = inputName === 'date' ? this.isFutureDate(inputValue) : true;
        return !isDataValid || !isDateCorrect ? this.createErrObject(inputName) : null;
    }

    isMatchRegex(inputName, inputValue) {
        return this[inputName].regExp.test(inputValue);
    }

    isFutureDate(inputValue) {
        this.currentDate = getCurrentDate();
        return new Date(inputValue) >= new Date(this.currentDate);
    }

    createErrObject(inputName) {
        return {
            [inputName]: this[inputName].err,
        };
    }
}
