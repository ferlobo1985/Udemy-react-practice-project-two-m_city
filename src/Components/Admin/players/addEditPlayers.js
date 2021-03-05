import React,{ useEffect,useState } from 'react'
import AdminLayout from '../../../Hoc/AdminLayout'

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { showErrorToast,showSuccessToast } from '../../Utils/tools'
import { TextField, Select, MenuItem, FormControl , Button } from '@material-ui/core'
import { playersCollection, firebase } from '../../../firebase';

const defaultValues = {
    name:'',
    lastname:'',
    number:'',
    position:''
}

const AddEditPlayers = (props) => {
    const [formType,setFormType] = useState('');
    const [values, setValues] = useState(defaultValues)

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:values,
        validationSchema:Yup.object({
            name:Yup.string()
            .required('This input is required'),
            lastname:Yup.string()
            .required('This input is required'),
            number:Yup.number()
            .required('This input is required')
            .min('0','The minimum is cero')
            .max('100','The max is 100'),
            position:Yup.string()
            .required('This input is required'),
        })
    });

    useEffect(()=>{
        const param = props.match.params.playerid;
        if(param){

            setFormType('edit');
            setValues({name:'sjshsjs'})
        } else {
            setFormType('add');
            setValues(defaultValues)
        }

    },[props.match.params.playerid])



    console.log(formType, values)

    return(
        <AdminLayout >

            content
        </AdminLayout>
    )
}

export default AddEditPlayers;