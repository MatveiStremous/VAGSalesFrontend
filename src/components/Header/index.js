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
                <Link to="/catalog" style={{ textDecoration: 'none' }}>
                    <p>Каталог</p>
                </Link>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                    <p>О нас</p>
                </Link>
                <p>Марки</p>
                <p>Тест-драйв</p>
                <p>Поддержка</p>
                <Link to="/contacts" style={{ textDecoration: 'none' }}>
                    <p>Контакты</p>
                </Link>
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