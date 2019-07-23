import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [techs, setTech] = useState(['ReactJS', 'Node.js', 'React native']);
  const [newTech, setNewTech] = useState('');

  // a cada mudanca de estado esta funcao é criada novamente
  // dispercando processamento
  // para isso usamos o hook useCallback
  // desta forma a funcao so sera recriada quando os valores mudarem
  const handleAdd = useCallback(() => {
    setTech([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

  // executado uma unica vez, pois nao monitora nenhuma variavel
  // equivalente ao ComponentDidMount
  useEffect(() => {
    const techExist = localStorage.getItem('techs');

    if (techExist) setTech(JSON.parse(techExist));

    // return () => {} execurtado quando o comonente deixae de existir
  }, []);

  // será executado uma unica vez,
  // depois só será executado quando a lista for modificada
  // Equivalente ao componente ComponentDidUpdate
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));

    // return () => {} execurtado quando o comonente deixae de existir
  }, [techs]);

  // usado para realizar calculos uma unica vez antes
  // do componente ser criado
  const techSize = useMemo(() => techs.length, [techs]);

  return (
    <>
      <div>
        <ul>
          {techs.map(tech => (
            <li key={Math.random()}>{tech}</li>
          ))}
        </ul>
        <strong>Voce tem {techSize} tecnologias</strong>
        <input
          type="text"
          value={newTech}
          onChange={e => setNewTech(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          Adicionar
        </button>
      </div>
    </>
  );
}

export default App;
