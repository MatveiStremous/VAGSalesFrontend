import s from './editCar.module.scss'
import CarService from '../../services/CarService';
import React from 'react';

export default function EditCarForm({ car }) {
    const [bodyTypes, setBodyTypes] = React.useState([]);
    const [fuelTypes, setFuelTypes] = React.useState([]);
    const [transmissions, setTransmissions] = React.useState([]);

    const [bodyType, setBodyType] = React.useState(car.bodyType);
    const [transmission, setTransmission] = React.useState(car.transmission);
    const [fuelType, setFuelType] = React.useState(car.fuelType);
    const [engineCapacity, setEngineCapacity] = React.useState(car.engineCapacity);
    const [year, setYear] = React.useState(car.year);
    const [imageUrl, setImageUrl] = React.useState(car.imageURL);
    const [description, setDescription] = React.useState(car.description);

    const onCommitEdit = (e) => {
        e.preventDefault();
        const updatedCar = { bodyType, transmission, fuelType, engineCapacity, year, imageURL: imageUrl, description, modelId: car.modelId };
        CarService.updateCar(car.id, updatedCar);
        window.location.reload();
    }

    React.useEffect(() => {
        CarService.getCarsEnums().then(({ data }) => {
            setBodyTypes(data['bodyTypes']);
            setTransmissions(data['transmissions']);
            setFuelTypes(data['fuelTypes']);
        })
    }, []);

    return (
        <div className={s.background} >
            <div className={s.body}>
                <form className={s.add} onSubmit={(e) => onCommitEdit(e)}>
                    <p>Тип топлива</p>
                    <select value={fuelType} onChange={(obj) => setFuelType(obj.target.value)}>
                        <option value="0">Select an option</option>
                        {fuelTypes
                            .map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))
                        }
                    </select>
                    <p>Тип трансмиссии</p>
                    <select value={transmission} onChange={(obj) => setTransmission(obj.target.value)}>
                        <option value="0">Select an option</option>
                        {transmissions
                            .map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))
                        }
                    </select>
                    <p>Тип кузова</p>
                    <select value={bodyType} onChange={(obj) => setBodyType(obj.target.value)}>
                        <option value="0">Select an option</option>
                        {bodyTypes
                            .map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))
                        }
                    </select>
                    <p>Год выпуска</p>
                    <input required placeholder='Год выпуска' value={year} onChange={(obj) => setYear(obj.target.value)} />
                    <p>Объём двигателя</p>
                    <input required placeholder='Объём двигателя' value={engineCapacity} onChange={(obj) => setEngineCapacity(obj.target.value)} />
                    <p>Путь к фото</p>
                    <input required placeholder='Путь к фото' value={imageUrl} onChange={(obj) => setImageUrl(obj.target.value)} />
                    <p>Описание</p>
                    <input required placeholder='Описание' value={description} onChange={(obj) => setDescription(obj.target.value)} />
                    <button>Сохранить изменения</button>
                </form>
            </div>
        </div >
    );
}