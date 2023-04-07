import s from './home.module.scss';
import React from 'react';
import Logo from '../../components/Logo';

export default function Home() {
    return (
        <div className={s.background}>
            <div className={s.header}>
                <Logo width="100" height="100" />
                <div className={s.navigation}>
                    <p>Каталог</p>
                    <p>О нас</p>
                    <p>Марки</p>
                    <p>Тест-драйв</p>
                    <p>Поддержка</p>
                    <p>Контакты</p>
                </div>
                <button>
                    Личный кабинет
                </button>
            </div>
            <div className={s.body}>
                <div className={s.center}>

                </div>
                <div className={s.bottom}>
                    <div className={s.left}>
                        <div />
                        <button>Выбрать авто</button>
                    </div>
                    <img src="images/car.svg" alt='car' width={800} />
                </div>
            </div>

        </div>
    );
}
