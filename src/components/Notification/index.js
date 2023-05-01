import React from 'react';
import s from './notification.module.scss';

export default function Notification({ setActive, title, text }) {
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setActive(false);
        }, 7000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [text, setActive]);

    return (
        <div className={s.modal}>
            <div className={s.header}>
                <img className={s.warning} src='../../images/warning.png' alt="warning.png" />
                <h4>{title}!</h4>
                <img onClick={() => setActive(false)} className={s.close} src='../../images/delete.png' alt="close.png" />
            </div>
            <h3>{text}</h3>
        </div>
    );
}
