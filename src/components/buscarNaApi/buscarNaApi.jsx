import { useEffect } from "react"

export default function BuscarNaApi() {

    let cidade = ''
    let estado = ''
    let pais = ''
    let coorX = ''
    let coorY = ''

    // Dados que vou precisar recolher: Endereço de ip, Localização (cidade, estado e número), Hora do local, Provedor de internet

    useEffect(() => {
        fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_JH7C5Zg0ven1hiDeuPc6DUQCrgVeE&ipAddress=29.212.190.192')
            .then(response => response.json())
            .then(data => console.log(data.location))
            // Caso eu queira puxar algum valor, por exemplo a cidade é só mudar o data.location para data.location.city

            .catch(err => console.error(err))
    }, [])
    

}
