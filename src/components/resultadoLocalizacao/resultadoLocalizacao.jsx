import { useState, useEffect } from 'react'


export default function ResultadoLocalizacao() {
    let [ipInformado, setIpInformado] = useState('')
    // let [coorX, setCoorX] = useState('')
    // let [coorY, setCoorY] = useState('')

    let [cidade, setCidade] = useState('')
    let [estado, setEstado] = useState('')
    let [postalCode, setPostalCode] = useState('')
    let [fusoHorario, setFusoHorario] = useState('')
    let [provedorInternet, setProvedorInternet] = useState('')
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


    const buscarDados = () => {

        if (ipInformado)

        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_JH7C5Zg0ven1hiDeuPc6DUQCrgVeE&ipAddress=${ipInformado}`)
            .then(response => response.json())
            .then(data => {
                setCidade(data.location.city)
                setEstado(data.location.region)
                setPostalCode(data.location.postalCode)
                setFusoHorario(data.location.timezone)
                setProvedorInternet(data.isp)
            })
            // Caso eu queira puxar algum valor, por exemplo a cidade é só mudar o data.location para data.location.city

            .catch(err => alert(err))
    }

    return (
        <div id='ResultadoLocalizacao'>
            <input
                value={ipInformado}
                onChange={(e) => setIpInformado(e.target.value)}
                placeholder="Busque por qualquer endereço de Ip ou domínio"
            />
            <button onClick={buscarDados} disabled={!ipInformado}>buscar</button>

            <div>
                <p>Endereço de Ip</p>
                <label id="resultadoEnderecoIp">{ipInformado}</label>
            </div>
            <div>
                <p>Localização</p>
                <label id="resultadoLocalizacao">{`${cidade}, ${estado} ${postalCode}`}</label>
            </div>
            <div>
                <p>Fuso horário</p>
                <label id="resultadoFusoHorario">{fusoHorario}</label>
            </div>
            <div>
                <p>Provedor de internet</p>
                <label id="resultadoProvedorInternet">{provedorInternet}</label>
            </div>
        </div>
    )
}
