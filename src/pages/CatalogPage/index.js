import s from './catalog.module.scss';
import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';

export default function Catalog() {
    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card />
                </div>
            </div>
        </div>
    );
}
