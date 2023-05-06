import Logo from '../../components/Logo';
import React from 'react';
import s from './header.module.scss';
import { Link, useNavigate } from "react-router-dom";
import AppContex from '../../context';

export default function Header() {
    const { user } = React.useContext(AppContex);
    const Navigate = useNavigate();
    return (
        <div className={s.header}>
            <Link to="/">
                <Logo width="100" height="100" />
            </Link>
            <div className={s.navigation}>
                <p onClick={() => { Navigate("/catalog") }}>Каталог</p>
                <p onClick={() => { Navigate("/about") }}>О нас</p>
                <p onClick={() => { Navigate("/support") }}>Поддержка</p>
                <p onClick={() => { Navigate("/contacts") }}>Контакты</p>
                {
                    (user.role === "ROLE_MANAGER" || user.role === "ROLE_ADMIN") &&
                    <p onClick={() => { Navigate("/manager") }}>Управление</p>
                }
                {
                    user.role === "ROLE_ADMIN" &&
                    <p onClick={() => { Navigate("/users") }}>Пользователи</p>
                }
            </div>
            {
                user.role === "" ?
                    <button onClick={() => { Navigate("/signin") }}>Войти</button>
                    :
                    <button onClick={() => { Navigate("/account") }}>Личный кабинет</button>
            }
        </div >
    );
}