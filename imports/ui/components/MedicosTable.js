import React from 'react';
import {Table} from 'react-bulma-components';
import styled from "styled-components";

const MedicoRow = ({medico, index, especialidad}) => (

    <tr>
        <th>{index + 1}</th>
        <td>{medico.rut}</td>
        <td>{medico.nombres}</td>
        <td>{medico.apellido_paterno}</td>
        <td>{medico.apellido_materno}</td>
        <td>{especialidad}</td>
    </tr>
);

const MedicosTableIdentificadores = () => (
    <tr>
        <th>ID</th>
        <th>RUT</th>
        <th>Nombres</th>
        <th>Apellido Paterno</th>
        <th>Apellido Materno</th>
        <th>Especialidad Medica</th>
    </tr>
);

const MedicosTable = ({medicos, especialidades}) => {
    const getEspecialidadNombre = especialidadID => {
        const especialidadesEncontradas = especialidades.filter(especialidad => especialidad._id === especialidadID);
        return especialidadesEncontradas[0]?.nombre || '';
    }
    return (
        <MedicosTableWrapper>
            <Table>
                <thead>
                <MedicosTableIdentificadores/>
                </thead>
                <tbody>
                {medicos.map(
                    (medico, index) => (
                        <MedicoRow index={index} especialidad={getEspecialidadNombre(medico.especialidad_medica)}
                                   medico={medico} key={medico._id}/>)
                )}
                </tbody>
            </Table>
        </MedicosTableWrapper>
    )
};

export default MedicosTable;

const MedicosTableWrapper = styled.div`
  overflow: auto;
  border-top: 2px solid black;
`;
