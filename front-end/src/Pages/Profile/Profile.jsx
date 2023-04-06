import React, { useState, useEffect } from "react";
import "./Profile.scss";
import Navbar from "../../Components/Navbar";
import { FaSearch } from 'react-icons/fa';
import axios from "axios";

function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userID = JSON.parse(localStorage.getItem("userID"));
  const [cep, setCep] = useState('');
  const [door, setDoor] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('')
  const [errorPassword, setErrorPassword] = useState('');
  const [updateisDisable, setupdateisDisable] = useState(true);
  const [successAddress, setSuccessAddress] = useState('');
  const [successPassword, setSuccessPassword] = useState('');
  const handleCep = (cep) =>{
    fetchCep(cep)
  }

  useEffect(() => {
    
    handleDisable()
  }, [address, door,successPassword])
  const fetchCep = async (cep) =>{
    try{

      const cepUser = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
      const { city, neighborhood, street} = cepUser.data
      const totalAddress = `${city}, ${neighborhood}, ${street}`
      setAddress(totalAddress);
      
    }catch(error){
      setError("Cep - Não existe por favor tente um cep correto.")
      console.log(error)
    }
  }

  const handleDisable = () => {
    if(address !== '' && door !== ''){
      setupdateisDisable(false)
    }else{
      setupdateisDisable(true)
    }
  }

  const handleChange = async  (e) => {
    setError('');
    setSuccessAddress('');
    const { name, value } = e.target;
    handleDisable();
    if(name === 'door'){
      await setDoor(value)
    }
  }

  const confirmNewPassword = async (e) => {
    e.preventDefault();
    setErrorPassword('');
    setSuccessPassword('');
    const { password, newPassword, confirmNewPassword } = e.target;
    if(password.value.lenght <6 || newPassword.value.lenght <6 || confirmNewPassword.value.lenght <6){
      setErrorPassword("A senha deve ter no mínimo 6 caracteres.")
      return;
    }
    if(newPassword.value !== confirmNewPassword.value){
      setErrorPassword("As senhas não são iguais.")
      return;
    }else{
      const user = {
        email: currentUser.email,
        password: password.value,
        newPassword: newPassword.value,
      }
      try{
        const response = await axios.put(`http://localhost:3001/users/${userID}`, user)
        if(response.status === 200){
          setSuccessPassword("Dados atualizados com sucesso");
        }
      }catch(error){
        setErrorPassword(error.response.data.message)
      }
    }
  }

  const updateAddress = async (e) => {
    e.preventDefault();
    const user = {
      name: currentUser.name,
      email: currentUser.email,
      address: address,
      door: door,
      token: currentUser.token,
      role: currentUser.role
    }
    try{
      const response = await axios.put(`http://localhost:3001/users/${userID}`, user)
      if(response.status === 200){
        setSuccessAddress("Dados atualizados com sucesso");
        console.log(user, "aasdasdsasdadasd")
        localStorage.setItem("user", JSON.stringify(user));
      }
    }catch(error){
      setError(error.response.data.message)
    }
  }

  return (
    <div className="Profile">
      <Navbar />
      <div className="Profile__container">
        <h1>Perfil do usuário</h1>
        <div className="Profile__container-top">
          <div className="Profile__info">
            <h2>Informação do usuário:</h2>
            <label htmlFor="">
              Name:
              <p>{currentUser.name}</p>
            </label>
            <label htmlFor="">
              Email:
              <p>{currentUser.email}</p>
            </label>
              <label htmlFor="">
                Endereço:
                <p>{currentUser.address ? currentUser.address : "Ainda não possui endereço registado."}</p>
              </label>
              <label htmlFor="">
                Complemento:
                <p>{currentUser.door ? currentUser.door : "Não possui complemento resgitado."}</p>
              </label>

          </div>

          <form className="Profile__password" onSubmit={confirmNewPassword}>
            <h2>Quer trocar de senha ?</h2>

            <label htmlFor="password">
              Password atual:
              <input
                name="password"
                type="password"
                placeholder="Password"
              />
            </label>
            <label htmlFor="newPassword">
              Password nova:
              <input
                name="newPassword"
                type="password"
                placeholder="Password"
              />
            </label>

            <label htmlFor="confirmNewPassword">
              Confirmar Password atual:
              <input
                name="confirmNewPassword"
                type="password"
                placeholder="Password"
              />
            </label>
            <p className="error">{errorPassword}</p>
            <p className="success">{successPassword}</p>
            <button 
            type="submit">Mudar password</button>
          </form>
        </div>
        <div className="Profile__container-bottom">
          <div className="Profile__add-address">
          <h2>Adicionar Endereço:</h2>
          <label htmlFor="Cep">
              Procurar por Cep:
              <input
                name="cep"
                type="text"
                placeholder="Ex: 3011231"
                value={cep}
                onChange={(e)=> {setCep(e.target.value)}}
                />

                <button type='button' onClick={(e)=> handleCep(cep)}><FaSearch/></button>
            </label>
            <label htmlFor="door">
              Complemento:
              <input
                name="door"
                type="text"
                placeholder="Ex: Apartamento: 101"
                onChange={(e)=> {handleChange(e)}}
              />
            </label>
            <p className="error">{error}</p>  
            <p className="success">{successAddress}</p>
        </div>
        <div className="Profile__diplay-address">
          <h2>Confirmar endereço: </h2>
          <form action="">
              <h5 className="display-title">Endereço:</h5>
              <p>{address}</p>
              <h5 className="display-title">Complemento:</h5>
              <p>{door}</p>
            <button
            disabled={updateisDisable}
            className="" 
            type="sumbit" onClick={updateAddress}>Confirmar</button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
