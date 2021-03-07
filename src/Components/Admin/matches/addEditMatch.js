import React,{ useEffect, useState } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
    showErrorToast,showSuccessToast, textErrorHelper, selectErrorHelper,selectIsError 
} from '../../Utils/tools';
import { TextField, Select, MenuItem, FormControl , Button } from '@material-ui/core'

import { matchesCollection, teamsCollection } from '../../../firebase';


const defaultValues = {
    date:'',
    local:'',
    resultLocal:'',
    away:'',
    resultAway:'',
    referee:'',
    stadium:'',
    result:'',
    final:''
}


const AddEditMatch = (props) => {
    const [loading, setLoading] = useState(false);
    const [formType,setFormType] = useState('');
    const [teams, setTeams] = useState(null);
    const [values,setValues] = useState(defaultValues)

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: values,
        validationSchema: Yup.object({
            date:Yup.string()
            .required('This input is required'),
            local:Yup.string()
            .required('This input is required'),
            resultLocal:Yup.number()
            .required('This input is required')
            .min(0,'The minimum is 0')
            .max(99,'The maximum is 30'),
            away:Yup.string()
            .required('This input is required'),
            resultAway:Yup.number()
            .required('This input is required')
            .min(0,'The minimum is 0')
            .max(99,'The maximum is 30'),
            referee: Yup.string()
            .required('This input is required'),
            stadium: Yup.string()
            .required('This input is required'),
            result: Yup.mixed()
            .required('This input is required')
            .oneOf(['W','D','L','n/a']),
            final: Yup.mixed()
            .required('This input is required')
            .oneOf(['yes','no'])
        }),
        onSubmit:(values)=>{
            // submit form
           submitForm(values)
        }
    });


    const showTeams = () => (
        teams ?
            teams.map((item)=>(
                <MenuItem key={item.id} value={item.shortName}>
                    {item.shortName}
                </MenuItem>
            ))
        :null
    )


    const submitForm = (values) => {
        let dataToSubmit = values;

        teams.forEach((team)=>{
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb
            }   
            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb
            }            
        })

        setLoading(true);
        if( formType === 'add'){
            matchesCollection.add(dataToSubmit)
            .then(()=>{
                showSuccessToast('Match added :)');
                formik.resetForm();
            }).catch(error=>{
                showErrorToast('Sorry, something went wrong',error);
            }).finally(()=>{
                setLoading(false);
            });
        } else {
            matchesCollection.doc(props.match.params.matchid)
            .update(dataToSubmit)
            .then(()=>{
                showSuccessToast('Match Updated');
            }).catch(error => {
                showErrorToast('Sorry, something went wrong',error)
            }).finally(()=>{
                setLoading(false);
            });
        }
    }


    useEffect(()=>{
        if(!teams){
            teamsCollection.get().then( snapshot => {
                const teams = snapshot.docs.map( doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTeams(teams);
            }).catch( error => {
                showErrorToast(error)
            })
        }
    },[teams])


    useEffect(()=>{
        const param = props.match.params.matchid;
        if(param){
            /// edit
            matchesCollection.doc(param).get().then(snapshot=>{
                if(snapshot.data()){
                    setFormType('edit');
                    setValues(snapshot.data());
                } else {
                    showErrorToast('No records found')
                }
            })
        } else {
            // add
            setFormType('add');
            setValues(defaultValues)
        }
    },[props.match.params.matchid])


    return(
        <AdminLayout title={ formType === 'add' ? 'Add match': 'Edit match' }>
            <div className="editmatch_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>

                        <div>
                            <h4>Select date</h4>
                            <FormControl>
                                <TextField
                                    id="date"
                                    name="date"
                                    type="date"
                                    variant="outlined"
                                    {...formik.getFieldProps('date')}
                                    {...textErrorHelper(formik,'date')}
                                />
                            </FormControl>
                        </div>

                        <hr/>

                        <div>
                            <h4>Result local</h4>
                            <FormControl error={selectIsError(formik,'local')}>
                                <Select
                                    id="local"
                                    name="local"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('local')}
                                >
                                    <MenuItem value="" disabled>Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik,'local')}
                            </FormControl>

                            <FormControl
                                style={{marginLeft:'10px'}}
                            >
                                <TextField
                                    id="resultLocal"
                                    name="resultLocal"
                                    type="number"
                                    variant="outlined"
                                    {...formik.getFieldProps('resultLocal')}
                                    {...textErrorHelper(formik,'resultLocal')}
                                />
                            </FormControl>
                        </div>


                        <div>
                            <h4>Result away</h4>
                            <FormControl error={selectIsError(formik,'away')}>
                                <Select
                                    id="away"
                                    name="away"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('away')}
                                >
                                    <MenuItem value="" disabled>Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik,'away')}
                            </FormControl>

                            <FormControl
                                style={{marginLeft:'10px'}}
                            >
                                <TextField
                                    id="resultAway"
                                    name="resultAway"
                                    type="number"
                                    variant="outlined"
                                    {...formik.getFieldProps('resultAway')}
                                    {...textErrorHelper(formik,'resultAway')}
                                />
                            </FormControl>
                        </div>

                        <hr/>

                        <div>
                            <h4>Match info</h4>
                            <div className="mb-5">
                                <FormControl>
                                    <TextField
                                        id="referee"
                                        name="referee"
                                        variant="outlined"
                                        placeholder="Add the referee name"
                                        {...formik.getFieldProps('referee')}
                                        {...textErrorHelper(formik,'referee')}
                                    />
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl>
                                    <TextField
                                        id="stadium"
                                        name="stadium"
                                        variant="outlined"
                                        placeholder="Add the stadium name"
                                        {...formik.getFieldProps('stadium')}
                                        {...textErrorHelper(formik,'stadium')}
                                    />
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl error={selectIsError(formik,'result')}>
                                    <Select
                                        id="result"
                                        name="result"
                                        variant="outlined"
                                        displayEmpty
                                        {...formik.getFieldProps('result')}
                                    >
                                        <MenuItem value="" disabled>Select a result</MenuItem>
                                        <MenuItem value="W">Win</MenuItem>
                                        <MenuItem value="D">Draw</MenuItem>
                                        <MenuItem value="L">Lose</MenuItem>
                                        <MenuItem value="n/a">Non available</MenuItem>
                                    </Select>
                                    {selectErrorHelper(formik,'result')}
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl error={selectIsError(formik,'final')}>
                                    <Select
                                        id="final"
                                        name="final"
                                        variant="outlined"
                                        displayEmpty
                                        {...formik.getFieldProps('final')}
                                    >
                                        <MenuItem value="" disabled>Was the game played ?</MenuItem>
                                        <MenuItem value="yes">Yes</MenuItem>
                                        <MenuItem value="no">No</MenuItem>
                                    </Select>
                                    {selectErrorHelper(formik,'final')}
                                </FormControl>
                            </div>


                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                { formType === 'add' ?
                                    'Add match'
                                :
                                    'Edit match'
                                }
                            </Button>
                           
                        </div>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}

export default AddEditMatch;