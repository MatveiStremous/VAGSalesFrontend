import s from './account.module.scss';
import React from 'react';
import Header from '../../components/Header';
import AppContex from '../../context';
import AuthService from '../../services/AuthService';
import RequestService from '../../services/RequestService';

export default function AccountPage() {
    const { user } = React.useContext(AppContex);
    const [email, setEmail] = React.useState(user.email);
    const [name, setName] = React.useState(user.name);
    const [phone, setPhone] = React.useState(user.phone);
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPassword2, setNewPassword2] = React.useState("");
    const [requests, setRequests] = React.useState([]);

    const onChangeInfo = (e) => {
        e.preventDefault();
        const info = { name, phone, email };
        AuthService.changePersonalInfo(info);
    }

    const onChangePassword = (e) => {
        e.preventDefault();
        if (newPassword !== newPassword2) {
            alert("Не совпадают пароли");
            return;
        }
        const info = { oldPassword, newPassword };
        AuthService.changePassword(info);
        window.location.reload();
    }

    const onCancelRequest = (id) => {
        RequestService.changeStatus(id, "Отменена");
        window.location.reload();
    }

    React.useEffect(() => {
        setEmail(user.email);
        setName(user.name);
        setPhone(user.phone);
        RequestService.getAllRequestsByEmail(user.email)
            .then(({ data }) => {
                setRequests(data);
            });
    }, [user]);

    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    <div className={s.data}>
                        <form onSubmit={(e) => onChangeInfo(e)}>
                            <p>Почта</p>
                            <h2>{email}</h2>
                            <p>Имя</p>
                            <input required placeholder='Ваше имя' value={name} onChange={(obj) => setName(obj.target.value)} />
                            <p>Номер телефона</p>
                            <input required placeholder='Ваш номер телефона' value={phone} onChange={(obj) => setPhone(obj.target.value)} />
                            <button>Сохранить новые данные</button>
                        </form>
                        <form onSubmit={(e) => onChangePassword(e)}>
                            <p>Старый пароль</p>
                            <input required placeholder='Ваш пароль' type="password" value={oldPassword} onChange={(obj) => setOldPassword(obj.target.value)} />
                            <p>Новый пароль</p>
                            <input required placeholder='Ваш новый пароль' type="password" value={newPassword} onChange={(obj) => setNewPassword(obj.target.value)} />
                            <p>Повторите новый пароль</p>
                            <input required placeholder='Повторите ваш новый пароль' type="password" value={newPassword2} onChange={(obj) => setNewPassword2(obj.target.value)} />
                            <button>Сохранить новый пароль</button>
                        </form>
                        <div>
                            {requests
                                .map((request) => (
                                    <div className={s.row} key={request.id}>
                                        <div>{request.id}</div>
                                        <div>{request.date}</div>
                                        <div>{request.carName}</div>
                                        <div>{request.status}</div>
                                        {
                                            request.status === "Оформлена" &&
                                            <button onClick={() => onCancelRequest(request.id)}>Отменить</button>
                                        }
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}