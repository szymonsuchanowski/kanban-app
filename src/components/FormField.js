import React from 'react';
import { isObjectEmpty } from '../helpers/helpersFunctions';
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

    const renderField = () => {
        const {
            field: { name, label, type = null, fieldName = 'input' },
            formState,
        } = props;
        const FieldName = fieldName;
        return (
            <>
                <label htmlFor={name}>
                    {label}
                    <FieldName
                        id={name}
                        name={name}
                        type={type}
                        value={formState[name].value}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </label>
                <div>{renderErrorMsg()}</div>
            </>
        );
    };

    return <div>{renderField()}</div>;
};

export default FormField;
