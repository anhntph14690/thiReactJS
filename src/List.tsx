import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { TypeProducts } from './type/product'

type ListProps = {
    products: TypeProducts[];
    onRemove: (id: number) => void
}

const List = (props: ListProps) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getProducts() {
            const { data } = await axios.get('http://localhost:3001/products');
            setProducts(data);
        } getProducts()
    }, [])
    return (
        <div>
            <button>
                <NavLink to={`/add`}>Add</NavLink>
            </button>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Img</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.products?.map((item, index) => {
                        return <tr key={index}>
                            <th>{index + 1}</th>
                            <th>{item.name}</th>
                            <th>{item.img}</th>
                            <th>{item.price}</th>
                            <th>{item.description}</th>
                            <th>
                                <NavLink to={`/${item.id}/edit`}>Edit</NavLink>
                            </th>
                            <th>
                                <button onClick={() => props.onRemove(item.id)}>
                                    Remove
                                </button>
                            </th>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default List;