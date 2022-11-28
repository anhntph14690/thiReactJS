import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { TypeProducts } from './type/product'

type AddProps = {
    onAdd: (product: TypeProducts) => void
}
type FormInputs = {
    name: string,
    img: string,
    price: number,
    description: string
}
const Add = (props: AddProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FormInputs> = (data: TypeProducts) => {
        props.onAdd(data);
        navigate('/list');
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Tên" {...register('name', { required: true, minLength: 5})} />
                {Object.keys(errors).length !== 0 && (
                    <ul>
                        {errors.name?.type == 'required' && <li>Nhập</li>}
                    </ul>
                )}
                <input type="text" placeholder="Ảnh" {...register('img', { required: true })} />
                {Object.keys(errors).length !== 0 && (
                    <ul>
                        {errors.img?.type == 'required' && <li>Nhập</li>}
                    </ul>
                )}
                <input type="number" placeholder="Giá" {...register('price', { required: true })} />
                {Object.keys(errors).length !== 0 && (
                    <ul>
                        {errors.price?.type === 'required' && <li>Nhập</li>}
                    </ul>
                )}
                <input type="text" placeholder="Mô tả" {...register('description', { required: true })} />
                {Object.keys(errors).length !== 0 && (
                    <ul>
                        {errors.description?.type == 'required' && <li>Nhập</li>}
                    </ul>
                )}
                <button>Add</button>
            </form>

        </div>
    )
}
export default Add;