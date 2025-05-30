import { useEffect, useState } from 'react'


export default function ResultadoLocalizacao() {

    let resultadoEnderecoIp
    let resultadoLocalizacao
    let resultadoFusoHorario
    let resultadoProvedorInternet

    let [ipInformado, setIpInformado] = useState(0)
    let [botaoBuscar, setBotaoBuscar] = useState(false)

    useEffect (() => {
        if (botaoBuscar){
            alert()
        }

        setBotaoBuscar(false);
    }, [botaoBuscar])

    return (
        <div>
            <input value={ipInformado} onChange={(e) => setIpInformado(e.target.value)} placeholder="Busque por qualquer endereço de Ip ou domínio"></input>
            <button onClick={() => setBotaoBuscar(true)}>buscar</button>
            <div>
                <p>Endereço de Ip</p>
                <label id="resultadoEnderecoIp">{resultadoEnderecoIp}</label>
            </div>
            <div>
                <p>Localização</p>
                <label id="resultadoLocalizacao">{resultadoLocalizacao}</label>
            </div>
            <div>
                <p>Fuso horário</p>
                <label id="resultadoFusoHorario">{resultadoFusoHorario}</label>
            </div>
            <div>
                <p>Provedor de internet</p>
                <label id="resultadoProvedorInternet">{resultadoProvedorInternet}</label>
            </div>
        </div>
    )
}
