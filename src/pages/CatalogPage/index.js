import s from './catalog.module.scss';
import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import carService from '../../services/CarService';
import brandService from '../../services/BrandService';

export default function Catalog() {
    const [cars, setCars] = React.useState([]);
    const [brandName, setBrandName] = React.useState("");
    const [bodyType, setBodyType] = React.useState("");
    const [transmission, setTransmission] = React.useState("");
    const [fuelType, setFuelType] = React.useState("");
    const [brands, setBrands] = React.useState([]);

    const [bodyTypes, setBodyTypes] = React.useState([]);
    const [fuelTypes, setFuelTypes] = React.useState([]);
    const [transmissions, setTransmissions] = React.useState([]);

    React.useEffect(() => {
        carService.getAllCars(setCars);
        brandService.getAllBrands(setBrands);
        carService.getCarsEnums().then(({ data }) => {
            setBodyTypes(data['bodyTypes']);
            setTransmissions(data['transmissions']);
            setFuelTypes(data['fuelTypes']);
        });
    }, []);

    const filteredCars = cars.filter((car) =>
        (car.brandName === brandName || brandName === "") &&
        (car.bodyType === bodyType || bodyType === "") &&
        (car.transmission === transmission || transmission === "") &&
        (car.fuelType === fuelType || fuelType === "")
    );

    const resetFilters = () => {
        setBodyType("");
        setBrandName("");
        setFuelType("");
        setTransmission("");
    }

    return (
        <div className={s.background}>
            <div className={s.content}>
                <Header />
                <div className={s.filter}>
                    {console.log(brandName)}
                    <p>Бренд</p>
                    <select defaultValue="" value={brandName} onChange={(obj) => setBrandName(obj.target.value)}>
                        <option value="">Все</option>
                        {brands
                            .map((brand) => (
                                <option key={brand.id} value={brand.name}>{brand.name}</option>
                            ))}
                    </select>
                    <p>Тип топлива</p>
                    <select value={fuelType} onChange={(obj) => setFuelType(obj.target.value)}>
                        <option value="">Все</option>
                        {fuelTypes
                            .map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))
                        }
                    </select>
                    <p>Тип трансмиссии</p>
                    <select value={transmission} onChange={(obj) => setTransmission(obj.target.value)}>
                        <option value="">Все</option>
                        {transmissions
                            .map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))
                        }
                    </select>
                    <p>Тип кузова</p>
                    <select value={bodyType} onChange={(obj) => setBodyType(obj.target.value)}>
                        <option value="">Все</option>
                        {bodyTypes
                            .map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))
                        }
                    </select>
                    <button className={s.button} onClick={() => resetFilters()}>Сбросить фильтры</button>
                </div>
                <div className={s.body}>
                    {filteredCars.length !== 0 ? filteredCars
                        .map((car) => (
                            <Card key={car.id} car={car} />
                        )) :
                        <h1>В каталоге нет автомобилей, которые удовлетворяют всем вашим требованиям</h1>}
                </div>
            </div>
        </div>
    );
}
