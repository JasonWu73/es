import classes from './Button.module.scss';
import {ReactNode} from "react";

interface Props {
    onClick?: () => void;
    children: ReactNode;
}

export default function Button({onClick, children}: Props) {
    return (
        <button onClick={onClick} className={classes.btn}>{children}</button>
    );
}
