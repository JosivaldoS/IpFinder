import './App.css';
import InputProcurar from './components/inputProcurar/inputProcurar';
import ResultadoLocalizacao from './components/resultadoLocalizacao/resultadoLocalizacao';

function App() {
  return (
    <main>
      <h1>
        Ip Finder
      </h1>
      <InputProcurar/>
      <ResultadoLocalizacao/>
    </main>
  );
}

export default App;
