import { types } from "../../types/types"


export const setError = (error) => ({
    type: types.uiSetError,
    payload: error
});

export const setMessage = (error) => ({
    type: types.uisetMessage,
    payload: error
});

export const removeMessage = (error) => ({
    type: types.uiremoveMessage,
});

export const removeError = () => ({
    type: types.uiRemoveError
});

export const startLoading = () => ({
    type: types.uiStartLoading
})

export const finishLoading = () => ({
    type: types.uiFinishLoading
})