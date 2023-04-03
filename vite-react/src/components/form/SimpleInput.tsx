import Button from '../ui/Button';
import classes from './SimpleInput.module.scss';
import {ChangeEvent, FormEvent, useState} from "react";

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SimpleInput() {
    const [name, setName] = useState('');
    const [nameTouched, setNameTouched] = useState(false);
    const [email, setEmail] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const nameInvalid = name.trim().length === 0;
    const nameInputInvalid = nameInvalid && nameTouched;
    const emailInvalid = !email.match(EMAIL_REGEXP);
    const emailInputInvalid = emailInvalid && emailTouched;
    const formInvalid = nameInvalid || emailInvalid;

    function handleEmailBlur() {
        setEmailTouched(true);
    }

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handleNameBlur() {
        setNameTouched(true);
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (formInvalid) {
            return;
        }
        console.log({
            name: name.trim(),
            email: email.trim()
        });
        setName('');
        setNameTouched(false);
        setEmail('');
        setEmailTouched(false);
    }

    const nameClasses = `${classes['form-control']} ${nameInputInvalid ? classes['form-control--error'] : ''}`;
    const emailClasses = `${classes['form-control']} ${emailInputInvalid ? classes['form-control--error'] : ''}`;

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={nameClasses}>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={handleNameChange} onBlur={handleNameBlur} type="text" id="name"/>
                {nameInputInvalid && <p className={classes.error}>Name must not be empty.</p>}
            </div>
            <div className={emailClasses}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} type="text" id="email"/>
                {emailInputInvalid && <p className={classes.error}>Email is not valid.</p>}
            </div>
            <div className={classes['form-action']}>
                <Button disabled={formInvalid}>Submit</Button>
            </div>
        </form>
    );
}
