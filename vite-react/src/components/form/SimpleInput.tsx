import Button from '../ui/Button';
import classes from './SimpleInput.module.scss';
import {FormEvent} from "react";
import {useInput} from "../../hooks/use-input";

export default function SimpleInput() {
    const {
        value: name,
        valueInvalid: nameInvalid,
        handleValueBlur: handleNameBlur,
        handleValueChange: handleNameChange,
        reset: resetName
    } = useInput(name => name.trim().length > 0);

    const {
        value: email,
        valueInvalid: emailInvalid,
        handleValueBlur: handleEmailBlur,
        handleValueChange: handleEmailChange,
        reset: resetEmail
    } = useInput(email => email.trim().includes('@'));

    const formInvalid = nameInvalid || emailInvalid;

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (formInvalid) {
            return;
        }
        console.log({
            name: name.trim(),
            email: email.trim()
        });
        resetName();
        resetEmail();
    }

    const nameClasses = `${classes['form-control']} ${nameInvalid ? classes['form-control--error'] : ''}`;
    const emailClasses = `${classes['form-control']} ${emailInvalid ? classes['form-control--error'] : ''}`;

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={nameClasses}>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={handleNameChange} onBlur={handleNameBlur} type="text" id="name"/>
                {nameInvalid && <p className={classes.error}>Name must not be empty.</p>}
            </div>
            <div className={emailClasses}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} type="text" id="email"/>
                {emailInvalid && <p className={classes.error}>Email is not valid.</p>}
            </div>
            <div className={classes['form-action']}>
                <Button disabled={formInvalid}>Submit</Button>
            </div>
        </form>
    );
}
