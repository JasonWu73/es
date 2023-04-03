import Button from '../ui/Button';
import classes from './SimpleInput.module.scss';
import {ChangeEvent, FormEvent, useRef, useState} from "react";

export default function SimpleInput() {
    const [name, setName] = useState('');
    const nameRef = useRef<HTMLInputElement>(null);

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        console.log('useState: ', name);
        console.log('useRef: ', nameRef.current!.value);

        // setName('');
        nameRef.current!.value = '';
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes['form-control']}>
                <label htmlFor="name">Name</label>
                <input ref={nameRef} value={name} onChange={handleNameChange} type="text" id="name"/>
            </div>
            <div className={classes['form-action']}>
                <Button>Submit</Button>
            </div>
        </form>
    );
}
