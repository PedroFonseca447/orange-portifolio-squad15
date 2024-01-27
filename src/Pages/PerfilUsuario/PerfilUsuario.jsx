import React from 'react'
import Menu from '../../components/Menu/Menu'

const PerfilUsuario = () => {
    const user = {
        name: "Camila",
        lastName: "Soares",
        country: "Brasil",
        _id: 1,
        avatar: "src/assets/Bianca.png",
      };
  return (
    <>
        <Menu/>
        <main className="perfil">
            <section className="perfil__info">

            </section>
            <section className="perfil__form">

            </section>
        </main>
    </>
  )
}

export default PerfilUsuario