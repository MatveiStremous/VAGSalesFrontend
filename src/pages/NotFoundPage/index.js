import s from './notFound.module.scss';
import React from 'react';

export default function NotFoundPage() {
    return (
        <div className={s.background}>
            <div className={s.body}>
                <h1>404</h1>
                <h2>Страница не найдена</h2>
            </div>
        </div >
    );
}
