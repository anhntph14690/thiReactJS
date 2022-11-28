import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { TypeProducts } from './type/product'

type UpdateProps = {
    onUpdate: (product: TypeProducts) => void
}
type FormInputs = {
    name: string,
    img: string,
    price: number,
    description: string
}
const Edit = (props: UpdateProps) => {
    const [products, setProducts] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function getProducts() {
            const { data } = await axios.get('http://localhost:3004/products/' +id);
            reset(data);
            setProducts(data);
        } getProducts()
    }, [])
    const onSubmit: SubmitHandler<FormInputs> = data => {
        props.onUpdate(data);
        navigate('/list');
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Tên" {...register('name', { required: true, minLength: 5 })} />
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
                <button>Edit</button>
            </form>
        </div>
    )
}
export default Edit;