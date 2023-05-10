import s from './carInfo.module.scss';
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import CarService from '../../services/CarService';
import NewRequestWindow from '../../components/NewRequestWindow';
import AppContex from '../../context';
import EditCarForm from '../../components/EditCarForm';
import { useNavigate } from 'react-router-dom';

export default function CarInfo() {
    const { user } = React.useContext(AppContex);
    const { id } = useParams();
    const [car, setCar] = React.useState({});
    const [isNewRequestOpened, setIsNewRequestOpened] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const Navigate = useNavigate();

    const deleteThisCar = () => {
        CarService.deleteCar(id);
        Navigate("/catalog");
    }

    React.useEffect(() => {
        CarService.getCarInfo(id, setCar);
    }, [id]);

    return (
        <div className={s.background}>
            <Header />
            <div className={s.body}>
                <div className={s.upInfo}>
                    <img className={s.photo} src={"../../" + car.imageURL} alt="carPhoto" />
                    <div className={s.rightInfo}>
                        <div className={s.allData}>
                            <h2 className={s.title}>{car.brandName} {car.modelName}</h2>
                            <div className={s.row}>
                                <h3 className={s.name}>Год выпуска</h3>
                                <h4 className={s.data}>{car.year}</h4>
                            </div>
                            <div className={s.row}>
                                <h3 className={s.name}>Тип топлива</h3>
                                <h4 className={s.data}>{car.fuelType}</h4>
                            </div>
                            <div className={s.row}>
                                <h3 className={s.name}>Тип кузова</h3>
                                <h4 className={s.data}>{car.bodyType}</h4>
                            </div>
                            <div className={s.row}>
                                <h3 className={s.name}>Трансмиссия</h3>
                                <h4 className={s.data}>{car.transmission}</h4>
                            </div>
                            <div className={s.row}>
                                <h3 className={s.name}>Объём двигателя</h3>
                                <h4 className={s.data}>{car.engineCapacity}</h4>
                            </div>
                        </div>
                        <div className={s.descr}>
                            <h3 className={s.name}>Описание комплектации</h3>
                            <h4 className={s.data}>{car.description}</h4>
                        </div>
                        {
                            (user.role === "ROLE_MANAGER" || user.role === "ROLE_ADMIN") &&
                            <div className={s.buttons}>
                                <button onClick={() => deleteThisCar()}>Удалить</button>
                                <button onClick={() => setIsEdit(true)}>Редактировать</button>
                            </div>
                        }
                    </div>
                </div>
                <div className={s.bottomInfo}>
                    <p className={s.leftBottom}>{car.modelDescription}</p>
                    <button className={s.rightBottom} onClick={() => setIsNewRequestOpened(true)}>Заказать консультацию</button>
                </div>
                {isNewRequestOpened && <NewRequestWindow setActive={setIsNewRequestOpened} carId={id} />}
                {
                    isEdit &&
                    <EditCarForm car={car} />
                }
            </div>
        </div >
    );
}