/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import './ProductsAdmin.scss';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import Navbar from '../../Components/Navbar';

function ProductsAdmin() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [volume, setVolume] = useState('');
  const [alcoholContent, setAlcoholContent] = useState('');
  const [idealTemperature, setIdealTemperature] = useState('');
  const [style, setStyle] = useState('');
  const [image, setimage] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [products, setproducts] = useState([]);
  const [file, setFile] = useState(null);
  const [ErrorDelete, setErrorDelete] = useState(null);
  const [SuccessDelete, setSuccessDelete] = useState(null);

  const handleSubmit = async (event) => {
    console.log('aqui');
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    console.log('Form data:', formData);

    try {
      const response = await axios.post(
        'http://localhost:3001/upload',
        formData,
      );
      setimage(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        name,
        price,
        description,
        volume,
        alcoholContent,
        idealTemperature,
        style,
        urlImage: `http://localhost:3001/images/${image}`,
      };
      const response = await axios.post(
        'http://localhost:3001/products',
        newProduct,
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    setErrorDelete('');
    setSuccessDelete('');
    try {
      const productDelete = await axios.delete(`http://localhost:3001/products/${id}`);
      console.log(productDelete);
      setSuccessDelete('Usuário deletado com sucesso!');
    } catch (error) {
      setErrorDelete(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const getProducts = await axios.get('http://localhost:3001/products');
      console.log(getProducts.data);
      setproducts(getProducts.data);
      console.log(getProducts.data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [SuccessDelete, ErrorDelete]);

  return (
    <main className="ProductAdmin">
      <Navbar />
      <section className="ProductAdmin__container">
        <h3>Adicionar Produtos</h3>
        <form onSubmit={ handleAddProduct }>
          <div className="Admin__productAdd-container">
            <label htmlFor="nome">
              Nome:
              <input
                name="nome"
                type="text"
                placeholder="Ex: Coca-cola 600ml"
                value={ name }
                onChange={ (e) => setName(e.target.value) }
              />
            </label>
            <label htmlFor="Preço">
              Preço:
              <input
                name="Preço"
                type="number"
                placeholder="0"
                value={ price }
                onChange={ (e) => setPrice(e.target.value) }
              />
            </label>
            <label htmlFor="Descrição">
              Descrição:
              <input
                name="Descrição"
                type="text"
                placeholder="Ex: Coca-Cola sabor original contém ..."
                value={ description }
                onChange={ (e) => setDescription(e.target.value) }
              />
            </label>
            <label htmlFor="Quantidade">
              Quantidade:
              <input
                name="Quantidade"
                type="text"
                placeholder="Ex: 600ml"
                value={ volume }
                onChange={ (e) => setVolume(e.target.value) }
              />
            </label>
            <label htmlFor="Álcool">
              Álcool:
              <input
                name="Álcool"
                type="text"
                placeholder="Ex: 0%"
                value={ alcoholContent }
                onChange={ (e) => setAlcoholContent(e.target.value) }
              />
            </label>
            <label htmlFor="Temperatura">
              Temperatura Ideal:
              <input
                name="Temperatura"
                type="text"
                placeholder="Ex: Temperatura ideal de 0º a 4º"
                value={ idealTemperature }
                onChange={ (e) => setIdealTemperature(e.target.value) }
              />
            </label>
            <label htmlFor="estilo">
              Estilo do produto :
              <input
                name="estilo"
                type="text"
                placeholder="Ex: Referigerante"
                value={ style }
                onChange={ (e) => setStyle(e.target.value) }
              />
            </label>
            <label
              htmlFor="image"
              className="Image_label"
            >
              Imagem:
              <button type="button" onClick={ handleSubmit }>
                {isLoading ? '...' : 'Enviar'}
              </button>
              <input
                title=" "
                name="image"
                type="file"
                onChange={ handleFileChange }
              />
            </label>
            <button
              className="button-send"
              type="submit"
            >
              Adicionar

            </button>
          </div>
        </form>
      </section>
      <section className="ProductAdmin__container-remove">
        <h3> Remover Produtos </h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Estilo do Produto</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={ item.id }>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.volume}</td>
                <td>{item.style}</td>
                <td>
                  <button
                    onClick={ () => handleDelete(item.id) }
                    type="button"
                  >
                    <FaTrash />

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {ErrorDelete && <p className="error">{ErrorDelete}</p>}
        {SuccessDelete && <p className="success">{SuccessDelete}</p>}
      </section>
    </main>
  );
}

export default ProductsAdmin;
