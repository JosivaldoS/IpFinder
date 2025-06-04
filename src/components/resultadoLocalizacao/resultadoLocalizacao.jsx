import { useState, useEffect } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ResultadoLocalizacao.css'


export default function ResultadoLocalizacao() {
    let [ipInformado, setIpInformado] = useState('')
    // let [coorX, setCoorX] = useState('')
    // let [coorY, setCoorY] = useState('')

    let [cidade, setCidade] = useState('')
    let [estado, setEstado] = useState('')
    let [postalCode, setPostalCode] = useState('')
    let [fusoHorario, setFusoHorario] = useState('')
    let [provedorInternet, setProvedorInternet] = useState('')
    let [erroSpan, setErroSpan] = useState('')
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
        const map = L.map('map', {
            center: [51.505, -0.09],
            zoom: 13
        });
        // Se quiser adicionar tiles:
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Opcional: limpar o mapa ao desmontar
        return () => {
            map.remove();
        };
    }, []);

    const buscarDados = () => {
        setErroSpan('')

        if (/^[0-9.]*$/.test(ipInformado)) {
            fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_JH7C5Zg0ven1hiDeuPc6DUQCrgVeE&ipAddress=${ipInformado}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 422) {
                        throw new Error('Ip inválido ou não encontrado')
                    } else if (response.status === 429) {
                        throw new Error('Muitas requisições solicitadas, Aguarde.')
                    } else if (response.status === 403) {
                        throw new Error('Acesso negado. Porfavor verifique a chave de API.')
                    } else {
                        throw new Error('Erro ao buscar os dados')
                    }
                }
                return response.json()
            })
            .then(data => {
                setCidade(data.location.city)
                setEstado(data.location.region)
                setPostalCode(data.location.postalCode)
                setFusoHorario(data.location.timezone)
                setProvedorInternet(data.isp)
            })
            // Caso eu queira puxar algum valor, por exemplo a cidade é só mudar o data.location para data.location.city

            .catch(err => setErroSpan(err.message))
        } else {
            setErroSpan('Ip digitado inválido, digite novamente')
        }


    }

    return (
        <div id='ResultadoLocalizacao'>
            <input
                value={ipInformado}
                onChange={(e) => setIpInformado(e.target.value)}
                placeholder="Busque por qualquer endereço de Ip ou domínio"
                id='inputBuscar'
            />
            <button onClick={buscarDados} disabled={!ipInformado} id='botaoBuscar'>{'>'}</button>
            <span>{erroSpan}</span>

            <div id='campoResultado'>
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
            <div id="map"></div>
        </div>
    )
}
