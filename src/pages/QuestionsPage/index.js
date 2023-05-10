import s from './questionsPage.module.scss';
import React from 'react';
import Header from '../../components/Header';
import QuestionService from '../../services/QuestionService';
import AgreeWindow from '../../components/AgreeWindow';

export default function QuestionsPage() {
    const [questions, setQuestions] = React.useState([]);
    const [findValue, setFindValue] = React.useState("");
    const [answeringQuestion, setAnsweringQuestion] = React.useState({});
    const [answer, setAnswer] = React.useState("");
    const [isAnswer, setIsAnswer] = React.useState(false);
    const [isAgreeWindowActive, setIsAgreeWindowActive] = React.useState(false);

    const onAnswerQuestion = (question) => {
        setIsAnswer(true);
        setAnsweringQuestion(question);
    }

    const onCommitAnswer = () => {
        setIsAnswer(false);
        const ans = { name: answeringQuestion.name, email: answeringQuestion.email, message: answer };
        QuestionService.answerToMessage(ans);
        QuestionService.deleteQuestion(answeringQuestion.id);
        window.location.reload();
    }

    React.useEffect(() => {
        QuestionService.getAllQuestions()
            .then(({ data }) => {
                setQuestions(data);
            });
    }, []);

    const filteredQuestions = questions.filter((question) =>
    (question.name.toLowerCase().includes(findValue) ||
        question.email.toLowerCase().includes(findValue) ||
        question.message.toLowerCase().includes(findValue))
    );

    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    <div className={s.data}>
                        {isAnswer &&
                            <div className={s.answer}>
                                <div className={s.row}><h1>Номер клиента</h1><h2>{answeringQuestion.id}</h2></div>
                                <div className={s.row}><h1>Имя клиента</h1><h2>{answeringQuestion.name}</h2></div>
                                <div className={s.row}><h1>Почта клиента</h1><h2>{answeringQuestion.email}</h2></div>
                                <div className={s.row}><h1>Вопрос</h1><h2>{answeringQuestion.message}</h2></div>
                                <div className={s.ans}>
                                    <input placeholder='Ответ' value={answer} onChange={(obj) => setAnswer(obj.target.value)} />
                                    <button onClick={() => setIsAgreeWindowActive(true)}>Отправить ответ</button>
                                </div>
                            </div>
                        }
                        <div className={s.buttons}>
                            <input value={findValue} placeholder='Поиск' onChange={(obj) => setFindValue(obj.target.value.toLowerCase())}></input>
                        </div>
                        <table>
                            <tr className={s.head}>
                                <th>№</th><th>Имя</th><th>Почта</th><th>Вопрос</th><th>&nbsp;</th>
                            </tr>
                            {filteredQuestions
                                .map((question) => (
                                    <tr key={question.id}>
                                        <td>{question.id}</td>
                                        <td>{question.name}</td>
                                        <td>{question.email}</td>
                                        <td>{question.message}</td>
                                        <td className={s.cancel} onClick={() => onAnswerQuestion(question)}>Ответить</td>
                                    </tr>
                                ))}
                        </table>
                    </div>
                </div>
                {isAgreeWindowActive &&
                    <AgreeWindow
                        setActive={setIsAgreeWindowActive}
                        fun={onCommitAnswer}
                        title={"Отправка ответа"}
                        text="Вы действительно хотите отправить этот ответ на вопрос?" />
                }
            </div>
        </div >
    );
}
