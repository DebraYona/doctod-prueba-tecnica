import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Form, Button} from 'react-bulma-components';
import {validate as validacionRUT} from 'rut.js';
import styled from "styled-components";


const {Field, Control, Label, Input, Select, Help} = Form;

const MAX_CARACTERES = 40;
const ERROR_CAMPO_REQUERIDO = 'Debes llenar este campo';
const ERROR_RUT_INVALIDO = 'RUT Invalido';
const ERROR_MAXIMOS_CARACTERES = 'Maximo de ' + MAX_CARACTERES + ' caracteres';

const getEspecialidades = ({especialidades}) => (
    especialidades.map(especialidad => (
        <option key={especialidad._id} value={especialidad._id}>{especialidad.nombre}</option>))
);

const MedicoForm = ({agregarMedico,especialidades}) => {
    const {handleSubmit, errors, control, reset} = useForm();

    const onSubmit = (data, e) => {
        agregarMedico(data);
        reset();
    };

    return (
        <MedicoFormStyle onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <Label>RUT</Label>
                <Control>
                    <Controller
                        as={Input}
                        control={control}
                        rules={{
                            required: ERROR_CAMPO_REQUERIDO,
                            validate: value => validacionRUT(value) || ERROR_RUT_INVALIDO
                        }}
                        type="text" placeholder="RUT" name="rut"/>
                </Control>
                {errors.rut && <Help color="danger">{errors.rut.message}</Help>}
            </Field>
            <Field>
                <Label>Nombres</Label>
                <Control>
                    <Controller
                        as={Input}
                        control={control}
                        rules={{
                            required: ERROR_CAMPO_REQUERIDO,
                            maxLength: {value: MAX_CARACTERES, message: ERROR_MAXIMOS_CARACTERES}
                        }}
                        type="text"
                        name="nombres"
                        placeholder="Nombres"
                    />
                </Control>
                {errors.nombres && <Help color="danger">{errors.nombres.message}</Help>}
            </Field>
            <Field>
                <Label>Apellido Paterno</Label>
                <Control>
                    <Controller
                        as={Input}
                        control={control}
                        rules={{
                            required: ERROR_CAMPO_REQUERIDO,
                            maxLength: {value: MAX_CARACTERES, message: ERROR_MAXIMOS_CARACTERES}
                        }}
                        type="text" placeholder="Apellido Paterno" name="apellido_paterno"
                    />
                </Control>
                {errors.apellido_paterno && <Help color="danger">{errors.apellido_paterno.message}</Help>}
            </Field>
            <Field>
                <Label>Apellido Materno</Label>
                <Control>
                    <Controller
                        as={Input}
                        control={control}
                        rules={{
                            required: ERROR_CAMPO_REQUERIDO,
                            maxLength: {value: MAX_CARACTERES, message: ERROR_MAXIMOS_CARACTERES}
                        }}
                        type="text" placeholder="Apellido Paterno" name="apellido_materno"/>
                </Control>
                {errors.apellido_materno && <Help color="danger">{errors.apellido_materno.message}</Help>}
            </Field>
            <Field>
                <Label>Especialidad Medica</Label>
                <Control>
                    <Controller
                        as={<Select>
                            <option hidden>Especialidad Medica</option>
                            {getEspecialidades({
                                especialidades
                            })}
                        </Select>}
                        control={control}
                        rules={{required: ERROR_CAMPO_REQUERIDO}}
                        name="especialidad_medica"/>

                </Control>
                {errors.especialidad_medica && <Help color="danger">{errors.especialidad_medica.message}</Help>}
            </Field>
            <Field kind="group">
                <Control>
                    <Button type="primary" color="primary">Submit</Button>
                </Control>
            </Field>
        </MedicoFormStyle>
    );
};

export default MedicoForm;


const MedicoFormStyle = styled.form`
   margin: 25px auto;
   padding-bottom: 1em;

`;
