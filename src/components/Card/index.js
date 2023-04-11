import s from './card.module.scss'
import { useNavigate } from 'react-router-dom';

export default function Card({ car }) {
    const Navigate = useNavigate();

    const onClickCard = () => {
        Navigate('/carInfo/' + car.id);
    }
    return (
        <div className={s.card} onClick={() => onClickCard()}>
            <img className={s.photo} src={car.imageURL} alt="carPhoto" />
            <div className={s.info}>
                <div className={s.title}>{car.brandName} {car.modelName}</div>
                <div className={s.data}>
                    <div className={s.col}>
                        <div className={s.row}>
                            <p className={s.name}>КПП</p>
                            <h4 className={s.value}>{car.transmission}</h4>
                        </div>
                        <div className={s.row}>
                            <p className={s.name}>Год выпуска</p>
                            <h4 className={s.value}>{car.year}</h4>
                        </div>
                    </div>
                    <div className={s.col}>
                        <div className={s.row}>
                            <p className={s.name}>Кузов</p>
                            <h4 className={s.value}>{car.bodyType}</h4>
                        </div>
                        <div className={s.row}>
                            <p className={s.name}>Объём двигателя</p>
                            <h4 className={s.value}>{car.engineCapacity}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}