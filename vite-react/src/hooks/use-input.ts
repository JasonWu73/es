import {ChangeEvent, useCallback, useState} from "react";

export function useInput(validate: (value: string) => boolean) {
    const [value, setValue] = useState(''); // 值
    const [touched, setTouched] = useState(false); // 用于判断是否触发 UI 渲染错误
    const valid = validate(value); // 校验值是否合法
    const hasError = touched && !valid; // 用于判断 UI 是否需要渲染错误信息

    const handleBlur = useCallback(() => {
        setTouched(true);
    }, []);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, []);

    function reset() {
        setValue('');
        setTouched(false);
    }

    return {value, valid, hasError, handleBlur, handleChange, reset};
}
