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
                            <div>
                                <div>{editRequest.id}</div>
                                <div>{editRequest.date}</div>
                                <div>{editRequest.name}</div>
                                <div>{editRequest.phone}</div>
                                <div>{editRequest.email}</div>
                                <div>{editRequest.carName}</div>
                                <select defaultValue="" value={status} onChange={(obj) => setStatus(obj.target.value)}>
                                    <option value="Оформлена">Оформлена</option>
                                    <option value="Обрабатывается">Обрабатывается</option>
                                    <option value="Выполнена">Выполнена</option>
                                </select>
                                <button onClick={() => onCommitEdit()}>Сохранить статус</button>
                            </div>
                        }
                        <input value={findValue} onChange={(obj) => setFindValue(obj.target.value.toLowerCase())}></input>
                        <select defaultValue="" value={findStatus} onChange={(obj) => setFindStatus(obj.target.value)}>
                            <option value="">Все</option>
                            <option value="Отменена">Отменена</option>
                            <option value="Оформлена">Оформлена</option>
                            <option value="Обрабатывается">Обрабатывается</option>
                            <option value="Выполнена">Выполнена</option>
                        </select>
                        <div>
                            <div>
                                {filteredRequests
                                    .map((request) => (
                                        <div className={s.row} key={request.id}>
                                            <div>{request.id}</div>
                                            <div>{request.date}</div>
                                            <div>{request.name}</div>
                                            <div>{request.phone}</div>
                                            <div>{request.email}</div>
                                            <div>{request.carName}</div>
                                            <div>{request.status}</div>
                                            <button onClick={() => onEditRequest(request)}>Сменить статус</button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
