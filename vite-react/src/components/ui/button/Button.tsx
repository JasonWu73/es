import classes from './Button.module.scss';
import {ReactNode} from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({onClick, children, disabled}: Props) {
    return (
        <button disabled={disabled} onClick={onClick} className={classes.btn}>{children}</button>
    );
}
