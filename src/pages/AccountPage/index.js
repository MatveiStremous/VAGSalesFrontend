import s from './account.module.scss';
import React from 'react';
import Header from '../../components/Header';
import AppContex from '../../context';
import AuthService from '../../services/AuthService';
import RequestService from '../../services/RequestService';
import Logo2 from '../../components/Logo2';
import AgreeWindow from '../../components/AgreeWindow';

export default function AccountPage() {
    const { user, setUser } = React.useContext(AppContex);
    const [email, setEmail] = React.useState(user.email);
    const [name, setName] = React.useState(user.name);
    const [phone, setPhone] = React.useState(user.phone);
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPassword2, setNewPassword2] = React.useState("");
    const [requests, setRequests] = React.useState([]);
    const [isAgreeWindowActive, setIsAdreeWindowActive] = React.useState(false);
    const [requestId, setRequestId] = React.useState(0);

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

    const onLogOut = () => {
        AuthService.logOut();
        setUser({
            email: "",
            name: "",
            role: "",
            phone: "",
        });
        window.location.replace("/");
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
                    <div className={s.info}>
                        <form className={s.editInfo} onSubmit={(e) => onChangeInfo(e)}>
                            <div className={s.email}>
                                <p>Почта</p>
                                <h2>{email}</h2>
                            </div>
                            <p>Имя</p>
                            <input required placeholder='Ваше имя' value={name} onChange={(obj) => setName(obj.target.value)} />
                            <p>Номер телефона</p>
                            <input required placeholder='Ваш номер телефона' value={phone} onChange={(obj) => setPhone(obj.target.value)} />
                            <div><button>Сохранить новые данные</button></div>
                        </form>
                        <div className={s.center}>
                            <div className={s.logo}><Logo2 /></div>
                            <div><button className={s.exit} onClick={onLogOut}>Выйти</button></div>
                        </div>
                        <form className={s.changePassword} onSubmit={(e) => onChangePassword(e)}>
                            <p>Старый пароль</p>
                            <input required placeholder='Ваш пароль' type="password" value={oldPassword} onChange={(obj) => setOldPassword(obj.target.value)} />
                            <p>Новый пароль</p>
                            <input required placeholder='Ваш новый пароль' type="password" value={newPassword} onChange={(obj) => setNewPassword(obj.target.value)} />
                            <p>Повторите новый пароль</p>
                            <input required placeholder='Повторите ваш новый пароль' type="password" value={newPassword2} onChange={(obj) => setNewPassword2(obj.target.value)} />
                            <div><button>Сохранить новый пароль</button></div>
                        </form>
                    </div>
                    <div className={s.data}>
                        <table>
                            <tr className={s.head}>
                                <th>№</th><th>ДАТА</th><th>МАШИНА</th><th>СТАТУС ЗАЯВКИ</th><th>&nbsp;</th>
                            </tr>
                            {requests
                                .map((request) => (
                                    <tr key={request.id}>
                                        <td>{request.id}</td>
                                        <td>{request.date.split("-").reverse().join(".")}</td>
                                        <td>{request.carName}</td>
                                        <td>{request.status}</td>
                                        {
                                            request.status === "Оформлена" ?
                                                <td className={s.cancel} onClick={() => { setIsAdreeWindowActive(true); setRequestId(requestId) }}>Отменить</td> : <td />
                                        }
                                    </tr>
                                ))}
                        </table>
                    </div>
                    {
                        isAgreeWindowActive &&
                        <AgreeWindow
                            setActive={setIsAdreeWindowActive}
                            fun={() => onCancelRequest(requestId)}
                            text="Вы уверены, что хотите отменить свою консультацию?"
                            title="Отмена консультации"
                        />
                    }
                </div>
            </div>
        </div >
    );
}
