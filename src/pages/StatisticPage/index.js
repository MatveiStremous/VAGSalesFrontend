import s from './statistic.module.scss';
import React from 'react';
import Header from '../../components/Header';
import RequestService from '../../services/RequestService';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, PieChart, Pie, Tooltip, Cell } from 'recharts';

export default function Statistics() {
    const [carsData, setCarsData] = React.useState([]);
    const [daysData, setDaysData] = React.useState([]);
    const colors = ["black", "purple", "gray", "red", "green", "orange", "blue"]

    React.useEffect(() => {

        RequestService.getDaysData().then(({ data }) => {
            setDaysData(data);
        });
        RequestService.getCarsData().then(({ data }) => {
            setCarsData(data);
        });
    }, []);

    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    <h2>Топ популярных моделей за последний месяц</h2>
                    <BarChart width={800} height={600} data={carsData} label className={s.left}>
                        <Tooltip />
                        <Bar dataKey="value" fill='orange' />
                        <CartesianGrid stroke='#ccc' />
                        <XAxis dataKey="key" />
                        <YAxis />
                    </BarChart>
                    <h2>Распределение заявок по дням недели за последний месяц</h2>
                    <PieChart width={600} height={600} className={s.right}>
                        <Tooltip />
                        <Pie data={daysData} dataKey="value" nameKey="key" outerRadius={250} fill="#8884d8" label={true} >
                            {
                                daysData.map((item, index) => (
                                    <Cell key={colors[index]} fill={colors[index]} />
                                ))
                            }
                        </Pie>
                    </PieChart>
                </div>
            </div>
        </div>
    );
}
