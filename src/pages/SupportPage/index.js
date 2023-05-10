import s from './supportPage.module.scss';
import React from 'react';
import Header from '../../components/Header';
import Logo3 from '../../components/Logo3';
import AppContex from '../../context';
import QuestionService from '../../services/QuestionService';

export default function SupportPage() {
    const { user } = React.useContext(AppContex);
    const [email, setEmail] = React.useState(user.email);
    const [name, setName] = React.useState(user.name);
    const [message, setMessage] = React.useState("");

    const onAddNewQuestion = (e) => {
        e.preventDefault();
        const question = { email, name, message };
        QuestionService.addNewQuestion(question);
    }

    React.useEffect(() => {
        setEmail(user.email);
        setName(user.name);
    }, [user]);

    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    <div className={s.data}>
                        <form onSubmit={(e) => onAddNewQuestion(e)}>
                            <div className={s.up}>
                                <div className={s.left}>
                                    <p>Почта</p>
                                    <input className={s.inp} required placeholder='Ваша почта' type="email" value={email} onChange={(obj) => setEmail(obj.target.value)} />
                                    <p>Имя</p>
                                    <input className={s.inp} required placeholder='Ваше имя' value={name} onChange={(obj) => setName(obj.target.value)} />
                                </div>
                                <div className={s.right}>
                                    <Logo3 />
                                </div>
                            </div>
                            <div className={s.bottom}>
                                <p>Вопрос</p>
                                <textarea required placeholder='Ваш вопрос' value={message} onChange={(obj) => setMessage(obj.target.value)} />
                                <div className={s.but}><button>Отправить вопрос</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
