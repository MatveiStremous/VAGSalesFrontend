import s from './contacts.module.scss';
import React from 'react';
import Header from '../../components/Header';

export default function Contacts() {
    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    <div className={s.data}>Вы можете найти нас по этому адресу: </div>
                    <iframe className={s.map} title="Карта" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5270.876112455569!2d27.703299189459162!3d53.95113472843044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbc9456debf369%3A0xbc193230a9d2296d!2zQXVkaSDQptC10L3RgtGAINCc0LjQvdGB0Lo!5e0!3m2!1sru!2sby!4v1681224514860!5m2!1sru!2sby" width="1200" height="600" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    );
}
