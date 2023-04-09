import s from './home.module.scss';
import React from 'react';
import Header from '../../components/Header';

export default function Home() {
    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    <div className={s.center}>

                    </div>
                    <div className={s.bottom}>
                        <div className={s.left}>
                            <div />
                            <button>Выбрать авто</button>
                        </div>
                        <img src="images/car.svg" alt='car' width={1000} />
                    </div>
                </div>
            </div>
        </div>
    );
}
