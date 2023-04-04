import Button from '../ui/button/Button';
import classes from './SimpleInput.module.scss';
import {FormEvent} from "react";
import {useInput} from "../../hooks/use-input";

export default function SimpleInput() {
  const {
    value: name,
    valid: nameValid,
    hasError: nameHasError,
    handleBlur: handleNameBlur,
    handleChange: handleNameChange,
    reset: resetName
  } = useInput(name => name.trim().length > 0);

  const {
    value: email,
    valid: emailValid,
    hasError: emailHasError,
    handleBlur: handleEmailBlur,
    handleChange: handleEmailChange,
    reset: resetEmail
  } = useInput(email => email.trim().includes('@'));

  const formValid = nameValid && emailValid;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!formValid) {
      return;
    }
    console.log({
      name: name.trim(),
      email: email.trim()
    });
    resetName();
    resetEmail();
  }

  const nameClasses = `${classes['form-control']} ${nameHasError ? classes['form-control--error'] : ''}`;
  const emailClasses = `${classes['form-control']} ${emailHasError ? classes['form-control--error'] : ''}`;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={nameClasses}>
        <label htmlFor="name">Name</label>
        <input value={name} onChange={handleNameChange} onBlur={handleNameBlur} type="text" id="name"/>
        {nameHasError && <p className={classes.error}>Name must not be empty.</p>}
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} type="text" id="email"/>
        {emailHasError && <p className={classes.error}>Email is not valid.</p>}
      </div>
      <div className={classes['form-action']}>
        <Button disabled={!formValid}>Submit</Button>
      </div>
    </form>
  );
}
