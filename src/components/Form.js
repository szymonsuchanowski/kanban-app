import React, { useReducer, useState, useContext } from 'react';
import FormField from './FormField';
import DataValidator from '../helpers/DataValidator';
import fields from '../data/formFieldsData';
import {
    convertArrToObj,
    getInputsNames,
    isObjectEmpty,
    createInitStateObj,
} from '../helpers/helpersFunctions';
import { formReducer } from '../reducers';
import { FORM_ACTIONS, TASKS_ACTIONS } from '../helpers/actions';
import { EditContext } from '../context';

const Form = (props) => {
    const editTasks = useContext(EditContext);
    const [state, dispatch] = useReducer(formReducer, createInitStateObj());
    const [errors, setErrors] = useState({});

    const markInputInvalid = (errorsArr, err, inputName) => {
        errorsArr.push(err);
        dispatch({
            type: FORM_ACTIONS.SET_INVALID,
            payload: { name: inputName },
        });
    };

    const markInputValid = (inputName) => {
        if (!state[inputName].isValid) {
            dispatch({
                type: FORM_ACTIONS.SET_VALID,
                payload: { name: inputName },
            });
        }
    };

    const createErrors = (errorsArr) => {
        const validator = new DataValidator();
        const inputsNamesList = getInputsNames();
        inputsNamesList.forEach((inputName) => {
            const err = validator.checkDataErrors(inputName, state[inputName].value);
            return err ? markInputInvalid(errorsArr, err, inputName) : markInputValid(inputName);
        });
    };

    const findErrors = () => {
        const errorsArr = [];
        createErrors(errorsArr);
        const errorsObj = convertArrToObj(errorsArr);
        return errorsObj;
    };

    const prepareDataToSubmit = () => {
        const dataArr = fields.map((field) => {
            const { name } = field;
            const { value } = state[name];
            if (value.length !== 0) {
                return {
                    [name]: value,
                };
            }
            return null;
        });
        return convertArrToObj(dataArr);
    };

    const handleSend = () => {
        const { closeModal } = props;
        setErrors({});
        const taskData = prepareDataToSubmit();
        editTasks({
            type: TASKS_ACTIONS.ADD,
            payload: { taskData },
        });
        closeModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsObj = findErrors();
        return isObjectEmpty(errorsObj) ? handleSend() : setErrors(errorsObj);
    };

    const renderFormFields = () =>
        fields.map((field) => (
            <FormField
                key={field.name}
                field={field}
                formState={state}
                errorsState={errors}
                dispatch={dispatch}
            />
        ));

    return (
        <>
            <h2 className="modal__title">new task</h2>
            <form className="modal__form form" onSubmit={handleSubmit} noValidate>
                {renderFormFields()}
                <input className="form__btn" type="submit" value="add" />
            </form>
        </>
    );
};

export default Form;
