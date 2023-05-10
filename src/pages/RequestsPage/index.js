import s from './requestsPage.module.scss';
import React from 'react';
import Header from '../../components/Header';
import RequestService from '../../services/RequestService';

export default function RequestsPage() {
    const [requests, setRequests] = React.useState([]);
    const [findStatus, setFindStatus] = React.useState("");
    const [findValue, setFindValue] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [editRequest, setEditRequest] = React.useState({});
    const [isEdit, setIsEdit] = React.useState(false);

    const onEditRequest = (request) => {
        setIsEdit(true);
        setStatus(request.status);
        setEditRequest(request);
    }

    const onCommitEdit = () => {
        setIsEdit(false);
        RequestService.changeStatus(editRequest.id, status);
        window.location.reload();
    }

    React.useEffect(() => {
        RequestService.getAllRequests()
            .then(({ data }) => {
                setRequests(data);
            });
    }, []);

    const filteredRequests = requests.filter((request) =>
        (request.status === findStatus || findStatus === "") &&
        (request.name.toLowerCase().includes(findValue) ||
            request.email.toLowerCase().includes(findValue) ||
            request.phone.toLowerCase().includes(findValue) ||
            request.carName.toLowerCase().includes(findValue))
    );

    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    <div className={s.data}>
                        {isEdit &&
                            <div className={s.change}>
                                <h2>Смена статуса</h2>
                                <table>
                                    <tr className={s.head}>
                                        <th>№</th><th>ДАТА</th><th>Имя</th><th>Телефон</th><th>Почта</th><th>Машина</th><th>Статус</th><th>&nbsp;</th>
                                    </tr>
                                    <tr>
                                        <td>{editRequest.id}</td>
                                        <td>{editRequest.date.split("-").reverse().join(".")}</td>
                                        <td>{editRequest.name}</td>
                                        <td>{editRequest.phone}</td>
                                        <td>{editRequest.email}</td>
                                        <td>{editRequest.carName}</td>
                                        <td>
                                            <select defaultValue="" value={status} onChange={(obj) => setStatus(obj.target.value)}>
                                                <option value="Оформлена">Оформлена</option>
                                                <option value="Обрабатывается">Обрабатывается</option>
                                                <option value="Выполнена">Выполнена</option>
                                            </select>
                                        </td>
                                        <td className={s.cancel} onClick={() => onCommitEdit()}>
                                            Сохранить статус
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        }
                        <div className={s.buttons}>
                            <input placeholder="Поиск" value={findValue} onChange={(obj) => setFindValue(obj.target.value.toLowerCase())}></input>
                            <select defaultValue="" value={findStatus} onChange={(obj) => setFindStatus(obj.target.value)}>
                                <option value="">Все</option>
                                <option value="Отменена">Отменена</option>
                                <option value="Оформлена">Оформлена</option>
                                <option value="Обрабатывается">Обрабатывается</option>
                                <option value="Выполнена">Выполнена</option>
                            </select>
                        </div>
                        <div>
                            <table>
                                <tr className={s.head}>
                                    <th>№</th><th>ДАТА</th><th>Имя</th><th>Телефон</th><th>Почта</th><th>Машина</th><th>Статус</th><th>&nbsp;</th>
                                </tr>
                                {filteredRequests
                                    .map((request) => (
                                        <tr key={request.id}>
                                            <td>{request.id}</td>
                                            <td>{request.date.split("-").reverse().join(".")}</td>
                                            <td>{request.name}</td>
                                            <td>{request.phone}</td>
                                            <td>{request.email}</td>
                                            <td>{request.carName}</td>
                                            <td>{request.status}</td>
                                            <td className={s.cancel} onClick={() => { onEditRequest(request) }}>Сменить статус</td>

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
