import s from './registration.module.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Notification from '../../components/Notification';

function Registration() {
    const [name, setName] = React.useState('Matthew');
    const [password, setPassword] = React.useState('123123');
    const [email, setEmail] = React.useState('Matthew@gmail.com');
    const [phone, setPhone] = React.useState('3753333333');
    const Navigate = useNavigate();
    const [isNotificationActive, setIsNotificationActive] = React.useState(false);
    const [notificationText, setNotificationText] = React.useState("Неверно введены логин или пароль.");
    const [notificationTitle, setNotificationTitle] = React.useState("Ошибка");

    const onRegistration = (e) => {
        e.preventDefault();

        const user = { email, password, phone, name };

        AuthService.register(user)
            .then(() => {
                Navigate("/signin");
            })
            .catch(function (error) {
                setNotificationText(error.response.data.message);
                setIsNotificationActive(true);
                setNotificationTitle("Ошибка")
            });
    }

    return (
        <div className={s.background}>
            <div className={s.regArea}>
                <svg width="450" height="110" viewBox="0 0 450 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 33C0 16.4314 13.4315 3 30 3H420C436.569 3 450 16.4315 450 33V106.296C450 106.296 371.035 89.9472 320.318 89.9472C230.318 89.9472 182.864 110 93.2727 110C57.2083 110 0 93.5385 0 93.5385V33Z" fill="#F29330" fill-opacity="0.25" />
                    <path d="M0 30C0 13.4314 13.4315 0 30 0H420C436.569 0 450 13.4315 450 30V102.331C450 102.331 371.035 86.1346 320.318 86.1346C230.318 86.1346 182.864 106 93.2727 106C57.2083 106 0 89.6923 0 89.6923V30Z" fill="#F29330" fill-opacity="0.5" />
                    <path d="M0 30C0 13.4314 13.4315 0 30 0H420C436.569 0 450 13.4315 450 30V93.7872C450 93.7872 374.457 82.0638 323.591 82.0638C234.409 82.0638 161.239 95 84.6818 95C40.5 95 0 73.9787 0 73.9787V30Z" fill="#F29330" />
                </svg>


                <h1>СОЗДАТЬ АККАУНТ</h1>
                <h2>стань частью <b>volkswagen group</b></h2>
                <form onSubmit={(e) => onRegistration(e)}>
                    <input required placeholder='Имя' value={name} onChange={(obj) => setName(obj.target.value)} />
                    <input required placeholder='Номер телефона' value={phone} onChange={(obj) => setPhone(obj.target.value)} />
                    <input required placeholder='Почта' type="email" value={email} onChange={(obj) => setEmail(obj.target.value)} />
                    <input required placeholder='Пароль' type="password" value={password} onChange={(obj) => setPassword(obj.target.value)} />
                    <input required placeholder='Повторите пароль' type="password" defaultValue="123123" />
                    <button>ЗАРЕГИСТРИРОВАТЬСЯ</button>
                </form>
                <div className={s.signIn}>
                    <h4>Уже с нами?</h4>
                    <a href='/signin'>Войти</a>
                </div>
                {isNotificationActive && <Notification setActive={setIsNotificationActive} title={notificationTitle} text={notificationText} />}
            </div>
        </div>
    );
}

export default Registration;
