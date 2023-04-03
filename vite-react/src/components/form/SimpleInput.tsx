import Button from '../ui/Button';
import classes from './SimpleInput.module.scss';
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";

export default function SimpleInput() {
    const nameRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState('');
    const [nameInvalid, setNameInvalid] = useState(true);
    const [nameTouched, setNameTouched] = useState(false);

    useEffect(() => {
        console.log('nameInvalid: ', nameInvalid);
    }, [nameInvalid]);

    function handleNameBlur() {
        setNameTouched(true);
        setNameInvalid(name.length === 0);
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        const enteredName = event.target.value;
        setName(enteredName);
        setNameInvalid(enteredName.trim().length === 0);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setNameTouched(true);
        const enteredName = name.trim();
        if (!enteredName) {
            setNameInvalid(true);
            return;
        }

        setNameInvalid(false);
        console.log('useState: ', enteredName);
        console.log('useRef: ', nameRef.current!.value.trim());

        setName('');
        // nameRef.current!.value = '';
    }

    const nameClasses = `${classes['form-control']} 
    ${nameInvalid && nameTouched ? classes['form-control--error'] : ''}`;

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={nameClasses}>
                <label htmlFor="name">Name</label>
                <input ref={nameRef} value={name} onChange={handleNameChange} onBlur={handleNameBlur} type="text" id="name"/>
                {nameInvalid && nameTouched && <p className={classes.error}>Name is empty.</p>}
            </div>
            <div className={classes['form-action']}>
                <Button>Submit</Button>
            </div>
        </form>
    );
}
