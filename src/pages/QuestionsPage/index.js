import s from './questionsPage.module.scss';
import React from 'react';
import Header from '../../components/Header';
import QuestionService from '../../services/QuestionService';

export default function QuestionsPage() {
    const [questions, setQuestions] = React.useState([]);
    const [findValue, setFindValue] = React.useState("");
    const [answeringQuestion, setAnsweringQuestion] = React.useState({});
    const [answer, setAnswer] = React.useState("");
    const [isAnswer, setIsAnswer] = React.useState(false);

    const onAnswerQuestion = (question) => {
        setIsAnswer(true);
        setAnsweringQuestion(question);
    }

    const onCommitEdit = () => {
        setIsAnswer(false);
        const ans = { name: answeringQuestion.name, email: answeringQuestion.email, message: answer };
        QuestionService.answerToMessage(ans);
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
                            <div>
                                <div>{answeringQuestion.id}</div>
                                <div>{answeringQuestion.name}</div>
                                <div>{answeringQuestion.email}</div>
                                <div>{answeringQuestion.message}</div>
                                <input value={answer} onChange={(obj) => setAnswer(obj.target.value)} />
                                <button onClick={() => onCommitEdit()}>Отправить ответ</button>
                            </div>
                        }
                        <input value={findValue} onChange={(obj) => setFindValue(obj.target.value.toLowerCase())}></input>
                        <div>
                            <div>
                                {filteredQuestions
                                    .map((question) => (
                                        <div className={s.row} key={question.id}>
                                            <div>{question.id}</div>
                                            <div>{question.name}</div>
                                            <div>{question.email}</div>
                                            <div>{question.message}</div>
                                            <button onClick={() => onAnswerQuestion(question)}>Ответить</button>
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
