import s from './addingNewCar.module.scss';
import React from 'react';
import Header from '../../components/Header';
import carService from '../../services/CarService';
import brandService from '../../services/BrandService';
import modelService from '../../services/ModelService';

export default function AddingNewCar() {
    const [brands, setBrands] = React.useState([]);
    const [models, setModels] = React.useState([]);
    const [bodyTypes, setBodyTypes] = React.useState([]);
    const [fuelTypes, setFuelTypes] = React.useState([]);
    const [transmissions, setTransmissions] = React.useState([]);

    const [bodyType, setBodyType] = React.useState("");
    const [transmission, setTransmission] = React.useState("");
    const [fuelType, setFuelType] = React.useState("");
    const [engineCapacity, setEngineCapacity] = React.useState(0.0);
    const [year, setYear] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [brandId, setBrandId] = React.useState(0);
    const [modelId, setModelId] = React.useState(0);


    React.useEffect(() => {
        brandService.getAllBrands(setBrands);
        carService.getCarsEnums().then(({ data }) => {
            setBodyTypes(data['bodyTypes']);
            setTransmissions(data['transmissions']);
            setFuelTypes(data['fuelTypes']);
        })
    }, []);

    React.useEffect(() => {
        if (brandId !== 0) {
            modelService.getModelsByBrandId(brandId, setModels);
        }
    }, [brandId]);

    const onAddCar = (e) => {
        e.preventDefault();
        const car = { bodyType, transmission, fuelType, engineCapacity, year, imageUrl, description, modelId };
        carService.addNewCar(car);
        window.location.reload();
    }

    return (
        <div className={s.background} >
            <Header />
            <div className={s.body}>
                <form className={s.add} onSubmit={(e) => onAddCar(e)}>
                    <p>Бренд</p>
                    <select value={brandId} onChange={(obj) => setBrandId(obj.target.value)}>
                        <option value="0">Select an option</option>
                        {brands
                            .map((brand) => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                    </select>
                    <p>Модель</p>
                    <select value={modelId} onChange={(obj) => setModelId(obj.target.value)}>
                        <option value="0">Select an option</option>
                        {brandId !== 0 &&
                            models
                                .map((model) => (
                                    <option key={model.id} value={model.id}>{model.name}</option>
                                ))
                        }
                    </select>
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
                    <button>Создать</button>
                </form>
            </div>
        </div >
    );
}