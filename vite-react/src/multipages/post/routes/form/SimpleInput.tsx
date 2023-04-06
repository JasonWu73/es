import classes from './SimpleInput.module.scss';
import Button from '../../../../shared/components/button/Button';
import {FormEvent} from "react";
import {useInput} from "../../../../shared/hooks/use-input";
import Card from '../../../../shared/components/card/Card';

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

  return (
    <Card>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={getClasses(nameHasError)}>
          <label htmlFor="name">Name</label>
          <input value={name} onChange={handleNameChange} onBlur={handleNameBlur} type="text" id="name"/>
          {nameHasError && <p className={classes.error}>Name must not be empty.</p>}
        </div>
        <div className={getClasses(emailHasError)}>
          <label htmlFor="email">Email</label>
          <input value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} type="text" id="email"/>
          {emailHasError && <p className={classes.error}>Email is not valid.</p>}
        </div>
        <div className={classes['form-action']}>
          <Button disabled={!formValid}>Submit</Button>
        </div>
      </form>
    </Card>
  );
}

function getClasses(hasError: boolean) {
  return `${classes['form-control']} ${hasError ? classes['form-control--error'] : ''}`;
}
