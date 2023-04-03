import Button from '../ui/Button';
import classes from './SimpleInput.module.scss';
import {ChangeEvent, FormEvent, useState} from "react";

export default function SimpleInput() {
    const [name, setName] = useState('');
    const [nameTouched, setNameTouched] = useState(false);
    const nameInvalid = name.trim().length === 0;
    const nameInputInvalid = nameInvalid && nameTouched;

    function handleNameBlur() {
        setNameTouched(true);
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (nameInvalid) {
            return;
        }
        console.log('useState: ', name.trim());
        setName('');
        setNameTouched(false);
    }

    const nameClasses = `${classes['form-control']} 
    ${nameInputInvalid ? classes['form-control--error'] : ''}`;

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={nameClasses}>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={handleNameChange} onBlur={handleNameBlur} type="text" id="name"/>
                {nameInputInvalid && <p className={classes.error}>Name is empty.</p>}
            </div>
            <div className={classes['form-action']}>
                <Button>Submit</Button>
            </div>
        </form>
    );
}
