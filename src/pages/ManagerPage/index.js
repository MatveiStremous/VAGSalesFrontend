import s from './managerPage.module.scss';
import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

export default function ManagerPage() {
    const Navigate = useNavigate();
    return (
        <div className={s.background}>
            <Header />
            <div className={s.body}>
                <h2 onClick={() => { Navigate("/brands") }}>Управление брендами</h2>
                <h2 onClick={() => { Navigate("/models") }}>Управление моделями</h2>
                <h2 onClick={() => { Navigate("/addingNewCar") }}>Добавить новый автомобиль</h2>
                <h2 onClick={() => { Navigate("/requests") }}>Управление заявками</h2>
                <h2 onClick={() => { Navigate("/questions") }}>Управление вопросами</h2>
                <h2 onClick={() => { Navigate("/statistic") }}>Статистика</h2>
            </div>
        </div>
    );
}