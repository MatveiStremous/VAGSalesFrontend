import Logo from '../../components/Logo';
import React from 'react';
import s from './header.module.scss';
import { Link } from "react-router-dom";
import AppContex from '../../context';
import authService from '../../services/AuthService';

export default function Header() {

    const { user, setUser } = React.useContext(AppContex);

    const onLogOut = () => {
        authService.logOut();
        setUser({
            email: "",
            name: "",
            role: "",
            phone: "",
        });
    }

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
            {
                user.role === "" ?
                    <Link to="/signin">
                        <button>Войти</button>
                    </Link>
                    : <button onClick={onLogOut}>Выйти</button>
            }

        </div >
    );
}