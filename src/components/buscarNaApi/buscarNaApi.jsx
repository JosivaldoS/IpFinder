import { useEffect, useState } from "react"

export default function BuscarNaApi() {

    // let [coorX, setCoorX] = useState('')
    // let [coorY, setCoorY] = useState('')

    let [cidade, setCidade] = useState('')
    let [estado, setEstado] = useState('')
    let [postalCode, setPostalCode] = useState('')

    let [fusoHorario, setFusoHorario] = useState('')

    let [provedorInternet, setProvedorInternet] = useState('')

    // Dados que vou precisar recolher: Endereço de ip, Localização (cidade, estado e número), Hora do local, Provedor de internet

    /*
        Formato json
        {
        "ip": "8.8.8.8",
        "location": {
            "country": "US",
            "region": "California",
            "city": "Mountain View",
            "lat": 37.40599,
            "lng": -122.078514,
            "postalCode": "94043",
            "timezone": "-07:00",
            "geonameId": 5375481
        },
        "domains": [
            "0d2.net",
            "003725.com",
            "0f6.b0094c.cn",
            "007515.com",
            "0guhi.jocose.cn"
        ],
        "as": {
            "asn": 15169,
            "name": "Google LLC",
            "route": "8.8.8.0/24",
            "domain": "https://about.google/intl/en/",
            "type": "Content"
        },
        "isp": "Google LLC"
        }
    */

    useEffect(() => {
        fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_JH7C5Zg0ven1hiDeuPc6DUQCrgVeE&ipAddress=29.212.190.192')
            .then(response => response.json())
            .then(data => setCidade(data.location.city))
            .then(data => setEstado(data.location.region))
            .then(data => setPostalCode(data.location.postalCode))

            .then(data => setFusoHorario(data.location.timezone))

            .then(data => setProvedorInternet(data.isp))
            // Caso eu queira puxar algum valor, por exemplo a cidade é só mudar o data.location para data.location.city

            .catch(err => console.error(err))
    }, [])
    

}
