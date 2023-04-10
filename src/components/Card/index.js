import s from './card.module.scss'

export default function Card() {
    return (
        <div className={s.card}>
            <img className={s.photo} src='images/CatalogCar1.png' alt="carPhoto" />
            <div className={s.info}>
                <div className={s.title}>AUDI RS 7 SPORTBACK</div>
                <div className={s.data}>
                    <div className={s.col}>
                        <div className={s.row}>
                            <p className={s.name}>КПП</p>
                            <h4 className={s.value}>Механика</h4>
                        </div>
                        <div className={s.row}>
                            <p className={s.name}>Год выпуска</p>
                            <h4 className={s.value}>2023</h4>
                        </div>
                    </div>
                    <div className={s.col}>
                        <div className={s.row}>
                            <p className={s.name}>Кузов</p>
                            <h4 className={s.value}>Sedan</h4>
                        </div>
                        <div className={s.row}>
                            <p className={s.name}>Объём двигателя</p>
                            <h4 className={s.value}>3,2</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}