import s from './brands.module.scss';
import React from 'react';
import Header from '../../components/Header';
import carService from '../../services/CarService';

export default function Brands() {
    const [brands, setBrands] = React.useState([]);
    const [brandName, setBrandName] = React.useState("");
    const [updatedBrand, setUpdatedBrand] = React.useState(() => {
        return {
            id: 0,
            name: "",
        };
    });

    React.useEffect(() => {
        carService.getAllBrands(setBrands);
    }, []);

    const onDeleteBrand = (id) => {
        carService.deleteBrand(id);
        window.location.reload();
    }

    const onAddBrand = (e) => {
        e.preventDefault();
        const brand = { name: brandName };
        carService.addNewBrand(brand);
        window.location.reload();
    }

    const onEdit = (brand) => {
        setUpdatedBrand(brand);
    }

    const onCommitEdit = (e) => {
        e.preventDefault();
        carService.updateBrand(updatedBrand.id, updatedBrand);
        window.location.reload();
    }

    return (
        <div className={s.background}>
            <Header />
            <div className={s.body}>
                <form className={s.add} onSubmit={(e) => onAddBrand(e)}>
                    <input required placeholder='Название' value={brandName} onChange={(obj) => setBrandName(obj.target.value)} />
                    <button>Создать</button>
                </form>

                {updatedBrand.id !== 0 &&
                    <form className={s.update} onSubmit={(e) => onCommitEdit(e)}>
                        <p>Редактируемый ID: {updatedBrand.id}</p>
                        <div className={s.zone}>
                            <input required placeholder='Название' value={updatedBrand.name} onChange={(obj) => setUpdatedBrand({ id: updatedBrand.id, name: obj.target.value })} />
                            <button>Применить</button>
                        </div>
                    </form>
                }
                {brands
                    .map((brand) => (
                        <div className={s.row}>
                            <div className={s.id}>{brand.id}</div>
                            <div className={s.brand}>{brand.name}</div>
                            <button onClick={() => onEdit(brand)}>Редактировать</button>
                            <button onClick={() => onDeleteBrand(brand.id)}>Удалить</button>
                        </div>
                    ))}
            </div>
        </div>
    );
}