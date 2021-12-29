import fields from './formFields';

export const convertArrToObj = (arr) => Object.assign({}, ...arr);

export const getInputsNames = () => fields.map((field) => field.name);

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;
