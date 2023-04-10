import Logo from '../../components/Logo';
import React from 'react';
import s from './header.module.scss';
import { Link } from "react-router-dom";
import AppContex from '../../context';

export default function Header() {

    const { user } = React.useContext(AppContex);
    console.log(user)
    return (
        <div className={s.header}>
            <Link to="/">
                <Logo width="100" height="100" />
            </Link>
            <div className={s.navigation}>
                <p>Каталог</p>
                <p>О нас</p>
                <p>Марки</p>
                <p>Тест-драйв</p>
                <p>Поддержка</p>
                <p>Контакты</p>
            </div>
            <Link to="/signin">
                <button>
                    {user.role === "" ? "Войти" : "Личный кабинет"}
                </button>
            </Link>
        </div >
    );
}