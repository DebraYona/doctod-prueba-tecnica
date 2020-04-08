import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useTracker} from 'meteor/react-meteor-data';
import {Medicos} from "../api/medicos";
import MedicoForm from "./components/MedicoForm";
import MedicosTable from "./components/MedicosTable";
import {Heading} from "react-bulma-components";
import axios from 'axios';


const App = () => {
    const medicos = useTracker(() => Medicos.find({}).fetch(), []);

    const [especialidades, setEspecialidades] = useState([]);

    const url = 'https://gist.githubusercontent.com/rodcisal/ef7839215d8d17ff9cf07b19e5e7593d/raw/718370f384f8dbcff1548933df45ea3394a223d3/especialidadesMedicas.json';

    useEffect(() => {
        const fecthData = async () => {

            try {
                const result = await axios(url);
                const especialidades = result.data.filter(especialidad => !!especialidad._id && !!especialidad.nombre && especialidad.nombre.length > 0);
                setEspecialidades(especialidades);

            } catch (error) {
                console.log(error);
            }
        };
        fecthData();
    }, []);


    const agregarMedico = (medico) => Medicos.insert(medico);

    return (
        <AppWrapper>
            <Heading>
                Medicos
            </Heading>
            <MedicoForm agregarMedico={agregarMedico} especialidades={especialidades}/>
            <MedicosTable medicos={medicos} especialidades={especialidades}/>
        </AppWrapper>
    );

};

export default App;

const AppWrapper = styled.div`
  background-color: white;
  width: 80%;
  max-width: 750px;
  margin: 0 auto;
  padding: 3em;
`;
