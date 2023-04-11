import s from './models.module.scss';
import React from 'react';
import Header from '../../components/Header';
import modelService from '../../services/ModelService';
import brandService from '../../services/BrandService';

export default function Models() {
    const [models, setModels] = React.useState([]);
    const [modelName, setModelName] = React.useState("");
    const [modelDescription, setModelDescription] = React.useState("");
    const [brandId, setBrandId] = React.useState(0);
    const [brands, setBrands] = React.useState([]);
    const [updatedModelId, setUpdatedModelId] = React.useState(0);
    const [updatedModelName, setUpdatedModelName] = React.useState("");
    const [updatedModelDescription, setUpdatedModelDescription] = React.useState("");
    const [updatedBrandId, setUpdatedBrandId] = React.useState(0);


    React.useEffect(() => {
        brandService.getAllBrands(setBrands);
        modelService.getAllModels(setModels);
    }, []);

    const onDeleteModel = (id) => {
        modelService.deleteModel(id);
        window.location.reload();
    }

    const onAddModel = (e) => {
        e.preventDefault();
        if (brandId !== 0) {
            const model = {
                name: modelName,
                description: modelDescription,
                brandId: brandId,
            };
            modelService.addNewModel(model);
            window.location.reload();
        }
    }

    const onEdit = (model) => {
        setUpdatedBrandId(model.brandId);
        setUpdatedModelName(model.name);
        setUpdatedModelDescription(model.description);
        setUpdatedModelId(model.id);
    }

    const onCommitEdit = (e) => {
        e.preventDefault();

        if (updatedBrandId !== 0) {
            const updatedModel = {
                id: updatedModelId,
                brandId: updatedBrandId,
                name: updatedModelName,
                description: updatedModelDescription
            }
            modelService.updateModel(updatedModel.id, updatedModel);
            window.location.reload();
        }
    }

    return (
        <div className={s.background}>
            <Header />
            <div className={s.body}>
                <form className={s.add} onSubmit={(e) => onAddModel(e)}>
                    <input required placeholder='Название' value={modelName} onChange={(obj) => setModelName(obj.target.value)} />
                    <input required placeholder='Описание' value={modelDescription} onChange={(obj) => setModelDescription(obj.target.value)} />
                    <select value={brandId} onChange={(obj) => setBrandId(obj.target.value)}>
                        <option value="0">Select an option</option>
                        {brands
                            .map((brand) => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                    </select>
                    <button>Создать</button>
                </form>

                {updatedModelId !== 0 &&
                    <form className={s.update} onSubmit={(e) => onCommitEdit(e)}>
                        <p>Редактируемый ID: {updatedModelId}</p>
                        <div className={s.zone}>
                            <input required placeholder='Название' value={updatedModelName} onChange={(obj) => setUpdatedModelName(obj.target.value)} />
                            <input required placeholder='Описание' value={updatedModelDescription} onChange={(obj) => setUpdatedModelDescription(obj.target.value)} />
                            <select value={updatedBrandId} defaultValue={updatedBrandId} onChange={(obj) => setUpdatedBrandId(obj.target.value)}>
                                {brands
                                    .map((brand) => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                            </select>
                            <button>Применить</button>
                        </div>
                    </form>
                }
                {models
                    .map((model) => (
                        <div className={s.row}>
                            {console.log(brands)}
                            <div className={s.id}>{model.id}</div>
                            <div className={s.brand}>{brands.find(brand => brand.id === model.brandId).name}</div>
                            <div className={s.brand}>{model.name}</div>
                            <div className={s.descr}>{model.description}</div>
                            <button onClick={() => onEdit(model)}>Редактировать</button>
                            <button onClick={() => onDeleteModel(model.id)}>Удалить</button>
                        </div>
                    ))}
            </div>
        </div>
    );
}