import { _onSuccess, _onFail, _onUnmount } from './constants'

const stateDefault = {
    data: null,
    isLoading: false
}

export const stateLoadMore = {
    data: null,
    totalPage: null,
    isLoading: true,
};

export const reducerDefault = (state = stateDefault, action, Action) => {
    switch (action.type) {
        case Action:
            return { ...state, isLoading: true };
        case _onSuccess(Action):
            return { data: action.data, isLoading: false };
        case _onFail(Action):
            return { ...state, isLoading: false };
        case _onUnmount(Action):
            return { ...stateDefault };
        default:
            return state;
    }
};

export const reducerAdvance = (state = stateLoadMore, action, Action) => {
    switch (action.type) {
        case Action:
            return { ...state, isLoading: true };
        case _onSuccess(Action): {
            const data = state.data ? [...state.data, ...action.data] : action.data;
            return {
                data: action.isLoadMore ? data : action.data,
                totalPage: action.totalPage,
                isLoading: false,
            };
        }
        case _onFail(Action):
            return { ...state, isLoading: false };
        case _onUnmount(Action):
            return { ...stateLoadMore };
        default:
            return state;
    }
};