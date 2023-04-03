import Button from '../ui/Button';
import classes from './SimpleInput.module.scss';
import {ChangeEvent, FormEvent, useRef, useState} from "react";

export default function SimpleInput() {
    const nameRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState('');
    const [nameInvalid, setNameInvalid] = useState(true);

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

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

    const nameClasses = `${classes['form-control']} ${nameInvalid ? classes['form-control--error'] : ''}`;

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={nameClasses}>
                <label htmlFor="name">Name</label>
                <input ref={nameRef} value={name} onChange={handleNameChange} type="text" id="name"/>
                {nameInvalid && <p className={classes.error}>Name is empty.</p>}
            </div>
            <div className={classes['form-action']}>
                <Button>Submit</Button>
            </div>
        </form>
    );
}
