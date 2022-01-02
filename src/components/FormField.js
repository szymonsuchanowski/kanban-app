import React from 'react';
import { isObjectEmpty, setClassName } from '../helpers/helpersFunctions';
import { FORM_ACTIONS } from '../helpers/actions';

const FormField = (props) => {
    const handleChange = (e) => {
        const { dispatch } = props;
        const { name, value } = e.target;
        dispatch({
            type: FORM_ACTIONS.CHANGE_VALUE,
            payload: { name, value },
        });
    };

    const showErrMsg = (errMsg) => <p>{errMsg}</p>;

    const renderErrorMsg = () => {
        const {
            field: { name: inputName },
            errorsState,
        } = props;
        return !isObjectEmpty(errorsState) && errorsState[inputName]
            ? showErrMsg(errorsState[inputName])
            : null;
    };

    const getCurrentDate = () => {
        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        return new Date(Date.now() - timezoneOffset).toISOString().slice(0, 10);
    };

    const setDateRange = (type) => (type === 'date' ? getCurrentDate() : null);

    const renderField = () => {
        const {
            field: { name, label, type = null, fieldName = 'input' },
            formState,
        } = props;
        const FieldName = fieldName;
        return (
            <>
                <label className="form__label" htmlFor={name}>
                    {label}
                    <FieldName
                        className={setClassName(name, formState, 'input')}
                        id={name}
                        name={name}
                        type={type}
                        value={formState[name].value}
                        onChange={handleChange}
                        min={setDateRange(type)}
                        autoComplete="off"
                    />
                    <span className={setClassName(name, formState, 'border')} />
                </label>
                <div className="form__placeholder">{renderErrorMsg()}</div>
            </>
        );
    };

    return <div className="form__field">{renderField()}</div>;
};

export default FormField;
