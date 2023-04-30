import s from './newRequestWindow.module.scss';
import React from 'react';
import AppContex from '../../context';
import RequestService from '../../services/RequestService';

function NewRequestWindow({ carId, setActive }) {
    const { user } = React.useContext(AppContex);
    const [email, setEmail] = React.useState(user.email);
    const [name, setName] = React.useState(user.name);
    const [phone, setPhone] = React.useState(user.phone);

    const onAdd = (e) => {
        e.preventDefault();
        const request = { email, name, phone, carId, status: "Оформлена" };
        RequestService.addNewRequest(request);
        setActive(false);
    }

    return (
        <div className={s.modal} onClick={() => setActive(false)}>
            <div className={s.modal_content} onClick={e => e.stopPropagation()}>
                <form onSubmit={(e) => onAdd(e)}>
                    <input required placeholder='Почта' type="email" value={email} onChange={(obj) => setEmail(obj.target.value)} />
                    <input required placeholder='Номер телефона' value={phone} onChange={(obj) => setPhone(obj.target.value)} />
                    <input required placeholder='Имя' value={name} onChange={(obj) => setName(obj.target.value)} />
                    <button>Оставить заявку</button>
                </form>
            </div>
        </div>
    );
}

export default NewRequestWindow;
