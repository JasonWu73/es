import {ChangeEvent, useCallback, useState} from "react";

export function useInput(validate: (value: string) => boolean) {
    const [value, setValue] = useState('');
    const [valueTouched, setValueTouched] = useState(false);

    const valueInvalid = valueTouched && !validate(value);
    console.log(valueInvalid);

    const handleValueBlur = useCallback(() => {
        setValueTouched(true);
    }, []);

    const handleValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, []);

    function reset() {
        setValue('');
        setValueTouched(false);
    }

    return {value, valueInvalid, handleValueBlur, handleValueChange, reset};
}
