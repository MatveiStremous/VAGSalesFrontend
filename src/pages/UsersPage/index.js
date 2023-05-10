import s from './usersPage.module.scss';
import React from 'react';
import Header from '../../components/Header';
import UserService from '../../services/UserService';

export default function UsersPage() {
    const [users, setUsers] = React.useState([]);
    const [role, setRole] = React.useState("");
    const [findValue, setFindValue] = React.useState("");

    const onChangeRole = (id, role) => {
        UserService.changeRole(id, role);
        window.location.reload();
    }

    React.useEffect(() => {
        UserService.getAllUsers()
            .then(({ data }) => {
                setUsers(data);
            });
    }, []);

    const filteredUsers = users.filter((user) =>
        (user.role === role || role === "") &&
        (user.name.toLowerCase().includes(findValue) ||
            user.email.toLowerCase().includes(findValue) ||
            user.phone.toLowerCase().includes(findValue))
    );

    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    <div className={s.data}>
                        <div className={s.buttons}>
                            <input value={findValue} onChange={(obj) => setFindValue(obj.target.value.toLowerCase())}></input>
                            <select defaultValue="" value={role} onChange={(obj) => setRole(obj.target.value)}>
                                <option value="">Все</option>
                                <option value="Пользователь">Пользователь</option>
                                <option value="Менеджер">Менеджер</option>
                                <option value="Администратор">Администратор</option>
                            </select>
                        </div>
                        <div>
                            <table>
                                <tr className={s.head}>
                                    <th>№</th><th>Почта</th><th>Имя</th><th>Телефон</th><th>Роль</th><th>&nbsp;</th>
                                </tr>
                                {filteredUsers
                                    .map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.name}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.role}</td>
                                            {
                                                user.role === "Пользователь" &&
                                                <td className={s.cancel} onClick={() => onChangeRole(user.id, "Менеджер")}>Назначить менеджером</td>
                                            }
                                            {
                                                user.role === "Менеджер" &&
                                                <td className={s.cancel} onClick={() => onChangeRole(user.id, "Пользователь")}>Снять с должности менеджера</td>
                                            }
                                        </tr>
                                    ))}
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
