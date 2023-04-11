import s from './catalog.module.scss';
import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import carService from '../../services/CarService';

export default function Catalog() {
    const [cars, setCars] = React.useState([]);

    React.useEffect(() => {
        carService.getAllCars(setCars);
    }, []);

    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.body}>
                    {cars
                        .map((car) => (
                            <Card car={car} />
                        ))}
                </div>
            </div>
        </div>
    );
}
