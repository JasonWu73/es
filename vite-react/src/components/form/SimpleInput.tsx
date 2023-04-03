import Button from '../ui/Button';
import classes from './SimpleInput.module.scss';

export default function SimpleInput() {
    return (
        <form className={classes.form}>
            <div className={classes['form-control']}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name"/>
            </div>
            <div className={classes['form-action']}>
                <Button>Submit</Button>
            </div>
        </form>
    );
}
