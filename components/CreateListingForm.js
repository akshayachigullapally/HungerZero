import {useContext, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {
    Button,
    Alert,
    TextField,
    Box,
    Typography,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    Backdrop,
    CircularProgress,
    Portal,
    InputAdornment,
    Autocomplete,
  } from '@mui/material'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import {
  Controller,
  useForm,
  useFormContext,
  FormProvider,
} from 'react-hook-form'
import Card from './Card'
import { GlobalContext } from "../utils/GlobalContextProvider"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { CoverImage } from './CoverImage'
import useDatabase from '../hooks/useDatabase'

const FormSelect = ({name, label, InputProps, defaultValue, ...otherProps}) => {
    const {
      control,
      formState: {errors},
    } = useFormContext()
    return (
      <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        render={({field: {onChange, ref, ...field}}) => {
          return (
            <Autocomplete
              onChange={(e, data) => {
                onChange(data)
              }}
              onInputChange={(e, data) => {
                if (data) {
                  onChange(data)
                }
              }}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  {...params}
                  label={label}
                  inputRef={ref}
                  error={!!errors[name]}
                  helperText={errors[name] ? errors[name].message : ''}
                  InputProps={{
                    ...params.InputProps,
                    ...InputProps,
                  }}
                />
              )}
              {...otherProps}
              {...field}
            />
          )
        }}
      />
    )
}

const FormInput = ({name, defaultValue, ...otherProps}) => {
    const {
      control,
      formState: {errors},
    } = useFormContext()
  
    return (
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue || ''}
        render={({field}) => {
          const onChange =
            otherProps.type === 'number'
              ? (e) => {
                  field.onChange(
                    e.target.value === '' ? '' : parseInt(e.target.value, 10),
                  )
                }
              : field.onChange
  
          return (
            <TextField
              variant="standard"
              onKeyPress={(e) => {
                if (
                  otherProps.type === 'number' &&
                  (e.key === 'e' || e.key === '-')
                ) {
                  e.preventDefault()
                }
              }}
              {...otherProps}
              {...field}
              onChange={onChange}
              error={!!errors[name]}
              helperText={errors[name] ? errors[name].message : ''}
            />
          )
        }}
      />
    )
}

const FIELD_REQUIRED_ERROR = 'Field is required.'
const FIELD_INVALID_TYPE_ERROR = 'Invalid value.'
const NUMBER_FIELD_BASE_VALIDATION = {
  invalid_type_error: FIELD_INVALID_TYPE_ERROR,
  required_error: FIELD_REQUIRED_ERROR,
}

const createListingSchema = () => {
    return yup.object().shape({
      foodName: yup
        .string()
        .required(FIELD_REQUIRED_ERROR)
        .max(32, 'Food Name must be shorter than 32 characters.'),
      location: yup.string().required(FIELD_REQUIRED_ERROR),
      dietaryInfo: yup
        .string()
        .max(1024, 'Info must be shorter than 1024 characters.'),
      // custom token fields
      quantity: yup.string().required(FIELD_REQUIRED_ERROR),
      quality: yup.string().required(FIELD_REQUIRED_ERROR),
    })
  }

export function CreateListingForm({onSubmit: _onSubmit}) {
    const [alertMsg, setAlertMsg] = useState(null)
    const [image, setImage] = useState(null)

    const [submitted, setSubmitted] = useState(false)

    const currentDate = new Date().toISOString().split('T')[0]
    const minDate = currentDate
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 7)
    const maxDateString = maxDate.toISOString().split('T')[0]

    const [date, setDate] = useState(currentDate)

    const database = useDatabase()
    const router = useRouter()
    const {user} = useContext(GlobalContext)

    const handleDateChange = (event) => {
      console.log(event.target.value)
      setDate(event.target.value)
    }

    const schema = createListingSchema()

    const form = useForm({
        resolver: yupResolver(schema)
    })

    const {
        handleSubmit,
        formState: {isSubmitting},
        watch,
        trigger,
        reset,
    } = form

    const proceedNext = () => {
      router.push('/dashboard')
    }

    const onSubmit = async (data) => {
      // console.log({
      //   ...data,
      //   providerId: user.userId,
      //   expiryDate: date
      // })

      const res = await database.createFoodListing({
        ...data,
        providerId: user.userId,
        expiryDate: date,
        img: image
      })

      console.log(res)

      if(res){
        setSubmitted(true)
      }else{
        setSubmitted(false)
      }
    }

    return (
        <>
          {
            !submitted ? (
              <>
                <Card title="Create New Food Listing">
                  <Alert severity="info" sx={{my: 1}}>
                    [Hackathon version limitation]
                  </Alert>
                  <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          '& > *:not(:first-child)': {mt: 2},
                        }}
                      >
                        <CoverImage setImage={setImage} />
                        <FormInput name="foodName" label="Food Name" />
                      </Box>
          
                      {/* <Typography
                        variant="subtitle1"
                        mt={5}
                        align="center"
                        fontWeight="bold"
                      >
                        Optional fields
                      </Typography> */}
          
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          '& > *:not(:first-child)': {mt: 2},
                        }}
                      >
                        <FormInput name="quantity" label="Food Quantity" />
                        <FormInput name="location" label="Location" />
                        <FormInput name="quality" label="Quality" />
                        {/* <FormInput name="quality" label="" /> */}
                        <div>
                          <TextField
                            type="date"
                            value={date}
                            inputProps={{ min: minDate, max: maxDateString}}
                            onChange={handleDateChange}
                          />
                        </div>
                        <FormInput
                          name="dietaryInfo"
                          label="Dietary Information"
                          multiline
                          minRows={2}
                          maxRows={5}
                        />
                      </Box>
          
                      <Box display="flex" flexDirection="column">
                        <Button
                          variant="gradient"
                          disabled={isSubmitting}
                          type="submit"
                          sx={{width: 'fit-content', alignSelf: 'center', mt: 3}}
                        >
                          Submit
                        </Button>
                      </Box>
                      {alertMsg && (
                        <Box mt={2}>
                          <Alert severity="error" onClose={() => setAlert(null)}>
                            {alertMsg}
                          </Alert>
                        </Box>
                      )}
                    </form>
                  </FormProvider>
                </Card>
                <Portal>
                  <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={isSubmitting}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </Portal>
              </>
            )
            :
            (
              <Box
                sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
              >
                <Typography variant="h4" mb={1}>
                  Food Listing successfully created!
                </Typography>
                <Button onClick={proceedNext} variant="gradient" sx={{mt: 1}}>
                  Continue
                </Button>
              </Box>
            )
          }
        </>
    )
}