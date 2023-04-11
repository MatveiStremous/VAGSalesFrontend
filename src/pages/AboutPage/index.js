import s from './about.module.scss';
import React from 'react';
import Header from '../../components/Header';

export default function Home() {
    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    <div className={s.left}>
                        <pre className={s.data}>Приглашаем Вас окунуться в удивительный мир машин.<br />
                            Безупречность автомобилей VAG не нуждается в подтверждении,<br />а полный спектр сервисных услуг окончательно убедят Вас в правильности выбора.<br />
                            Мы будем очень рады видеть Вас в нашем автоцентре!<br /><br />
                            Искренне Ваш, VAG.</pre>
                        <img className={s.leftPhoto} src="images/Porsh.png" alt="carPhoto" />
                    </div>
                    <div className={s.right}>
                        <img className={s.rightPhoto} src="images/ZonaVag.png" alt="carPhoto" />
                    </div>
                </div>
            </div>
        </div>
    );
}
