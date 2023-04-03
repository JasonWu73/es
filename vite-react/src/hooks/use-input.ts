import {ChangeEvent, useCallback, useReducer} from "react";

interface State {
    value: string;
    touched: boolean;
}

interface Action {
    type: 'set_value' | 'set_touched' | 'reset';
    nextValue?: string;
    nextTouched?: boolean;
}

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'set_value': {
            return {
                ...state,
                value: action.nextValue!
            };
        }
        case 'set_touched': {
            return {
                ...state,
                touched: action.nextTouched!
            };
        }
        case 'reset': {
            return {
                value: '',
                touched: false
            }
        }
    }
    throw Error('Unknown action: ' + action.type);
}

export function useInput(validate: (value: string) => boolean) {
    const [state, dispatch] = useReducer(reducer, {
        value: '', // 值
        touched: false // 用于判断是否触发 UI 渲染错误
    });

    const valid = validate(state.value); // 校验值是否合法, 用于表单的整体验证
    const hasError = state.touched && !valid; // 用于判断 UI 是否需要渲染错误信息

    const handleBlur = useCallback(() => {
        dispatch({
            type: 'set_touched',
            nextTouched: true
        });
    }, []);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'set_value',
            nextValue: event.target.value
        });
    }, []);

    function reset() {
        dispatch({type: 'reset'});
    }

    return {
        value: state.value,
        valid,
        hasError,
        handleBlur,
        handleChange,
        reset
    };
}
