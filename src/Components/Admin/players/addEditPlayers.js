import React,{ useEffect,useState } from 'react'
import AdminLayout from '../../../Hoc/AdminLayout'
import Fileuploader from '../../Utils/fileUploader'

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { showErrorToast,showSuccessToast, textErrorHelper, selectErrorHelper,selectIsError } from '../../Utils/tools'
import { TextField, Select, MenuItem, FormControl , Button } from '@material-ui/core'
import { playersCollection, firebase } from '../../../firebase';

const defaultValues = {
    name:'',
    lastname:'',
    number:'',
    position:'',
    image:''
}

const AddEditPlayers = (props) => {
    const [loading,setLoading] = useState(false);
    const [formType,setFormType] = useState('');
    const [values, setValues] = useState(defaultValues);
    const [defaultImg,setDefaultImg] = useState('');

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
            .min(0,'The minimum is cero')
            .max(100,'The max is 100'),
            position:Yup.string()
            .required('This input is required'),
            image:Yup.string()
            .required('This input is required'),
        }),
        onSubmit:(values)=>{
            submitForm(values);
        }
    });


    const submitForm = (values) => {
        let dataToSubmit = values;
        setLoading(true)

        if( formType === 'add'){
            playersCollection.add(dataToSubmit)
            .then(()=>{
                showSuccessToast('Player added');
                formik.resetForm();
                props.history.push('/admin_players');
            }).catch(error => {
                showErrorToast(error);
            });
        } else {
            playersCollection.doc(props.match.params.playerid).update(dataToSubmit)
            .then(()=>{
                showSuccessToast('Player updated');
            }).catch(error=>{
                showErrorToast(error);
            }).finally(()=>{
                setLoading(false)
            })
        }
    }


    useEffect(()=>{
        const param = props.match.params.playerid;
        if(param){
            playersCollection.doc(param).get().then( snapshot => {
                if(snapshot.data()){
                    //// 
                    firebase.storage().ref('players')
                    .child(snapshot.data().image).getDownloadURL()
                    .then( url => {
                        updateImageName(snapshot.data().image)
                        setDefaultImg(url)
                    });

                    setFormType('edit');
                    setValues(snapshot.data())
                } else {
                    showErrorToast('Sorry, nothing was found')
                }
            }).catch(error=>{
                showErrorToast(error)
            })
        } else {
            setFormType('add');
            setValues(defaultValues)
        }

    },[props.match.params.playerid])


    const updateImageName = (filename) => {
        formik.setFieldValue('image',filename)
    }

    const resetImage = () => {
        formik.setFieldValue('image','');
        setDefaultImg('')
    }


    return(
        <AdminLayout title={formType === 'add'? 'Add player':'Edit player'} >
            <div className="editplayers_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>

                        <FormControl  error={selectIsError(formik,'image')}>
                            <Fileuploader
                                dir="players"
                                defaultImg={defaultImg} /// image url
                                defaultImgName={formik.values.image} /// name of file
                                filename={(filename)=> updateImageName(filename)}
                                resetImage={()=> resetImage()}
                            />
                             {selectErrorHelper(formik,'image')}
                        </FormControl>
                        

                        <hr/>
                        <h4>Player info</h4>
                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="name"
                                    name="name"
                                    variant="outlined"
                                    placeholder="Add firstname"
                                    {...formik.getFieldProps('name')}
                                    {...textErrorHelper(formik,'name')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    variant="outlined"
                                    placeholder="Add lastname"
                                    {...formik.getFieldProps('lastname')}
                                    {...textErrorHelper(formik,'lastname')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    type="number"
                                    id="number"
                                    name="number"
                                    variant="outlined"
                                    placeholder="Add number"
                                    {...formik.getFieldProps('number')}
                                    {...textErrorHelper(formik,'number')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'position')}>
                                <Select
                                    id="position"
                                    name="position"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('position')}
                                >
                                    <MenuItem value="" disabled>Select a position</MenuItem>
                                    <MenuItem value="Keeper">Keeper</MenuItem>
                                    <MenuItem value="Defence">Defence</MenuItem>
                                    <MenuItem value="Midfield">Midfield</MenuItem>
                                    <MenuItem value="Striker">Striker</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'position')}
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            { formType === 'add' ?
                                'Add player'
                            :
                                'Edit player'
                            }
                        </Button>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditPlayers;