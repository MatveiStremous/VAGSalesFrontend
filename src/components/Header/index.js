import Logo from '../../components/Logo';
import s from './header.module.scss';
import { Link } from "react-router-dom";

export default function Header() {
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
                    Войти
                </button>
            </Link>
        </div >
    );
}