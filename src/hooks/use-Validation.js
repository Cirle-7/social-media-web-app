import { useReducer } from 'react';

const useValidation = (validity) => {
  const [inputState, dispatchInput] = useReducer(
    (state, action) => {
      if (action.type) {
        return {
          value: action.val,
          isValid: validity.test(action.val),
        };
      }
      return {
        value: '',
        isValid: null,
      };
    },
    {
      value: '',
      isValid: null,
    }
  );
  return { inputState, dispatchInput };
};

export default useValidation;
