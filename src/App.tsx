import axios from 'axios';
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Add from './Add';
import Edit from './Edit';
import List from './List';
import { TypeProducts } from './type/product'

function App() {
  const [products, setProducts] = useState<TypeProducts[]>([]);
  useEffect(() => {
    async function getProducts() {
      const {data} = await axios.get('http://localhost:3004/products');
      setProducts(data);
    } getProducts()
  }, [])
  const onHandleAdd = async (product: TypeProducts) => {
    const { data } = await axios.post('http://localhost:3004/products', product);
    setProducts([...products, data])
  }
  const onHandleRemove = async (id: number) => {
    await axios.delete('http://localhost:3004/products/' +id);
    setProducts(products.filter(item => item.id !== id))
  }
  const onHandleUpdate = async (product: TypeProducts) => {
    const { data } = await axios.put('http://localhost:3004/products/' + product.id, product);
    setProducts(products.map(item => item.id == data.id ? data: item))

  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/add' element={<Add onAdd={onHandleAdd} />} />
        <Route path='/list' element={<List products={products} onRemove={onHandleRemove} />} />
        <Route path='/:id/edit' element={<Edit onUpdate={onHandleUpdate} />} />



      </Routes>
    </div>
  )
}

export default App
