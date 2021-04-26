import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useRecoilState} from "recoil";
import {cardAtom, NextAtom} from "../../globalState/atom";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import Bootbox from "bootbox-react/src";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const  PaymentForm = React.forwardRef((props,ref) => {
    const classes = useStyles();
    const [disableNext,setDisableNext] = useRecoilState(NextAtom);
    const [card, setCard] = useRecoilState(cardAtom);

    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cardExpiryMonth, setCardExpiryMonth] = useState("")
    const [cardExpiryYear, setCardExpiryYear] = useState("")
    const [cardCVV, setCardCVV] = useState("")
    const [cardType, setCardType] = useState("")

    const [showAlert, setShowAlert] = React.useState(false)
    const [bootboxMessage, setBootBoxMessage] = React.useState("Validation Success")
    const handleClose = () => {
        return setShowAlert(false);
    }

    React.useEffect(() => {
        setCard({
            cardName, cardNumber, cardExpiryMonth,cardExpiryYear, cardCVV,cardType
        })
    }, [cardName, cardNumber,cardExpiryMonth,cardExpiryYear, cardCVV,cardType])


    function ValidateAndEnableNext() {
        console.log(cardName);
        console.log(cardNumber);
        console.log(cardExpiryMonth);
        console.log(cardExpiryYear);
        console.log(cardCVV);
        console.log(cardType);
        let validCard = true;
        let lettersOnly = new RegExp(/^[A-Za-z]+$/);
        let integersOnly = new RegExp(/^[0-9]+$/);
        let credit_card_visa = new RegExp(/^((4[0-9]{15}))$/);
        let credit_card_mastercard = new RegExp(/^((5[1-5][0-9]{14}))$/);
        let credit_card_american = new RegExp(/^((3[4,7][0-9]{13}))$/);
        let expiration_month = new RegExp(/^([1-9]|0[1-9]|1[012])$/);
        let expiration_year = new RegExp(/^(20[2][1-9]|20[3][0-6])$/);

        if(cardName.length <3 && cardName.length >20 && !lettersOnly.test(cardName)){
            setShowAlert(true)
            setBootBoxMessage("Min 3 and Max 20 characters(No Digits/Special Characters allowed)")
            validCard=false;
        }
        //if(cardNumber.length !=16 && !integersOnly.test(cardNumber)){
          //  setShowAlert(true)
            //setBootBoxMessage("Min 3 and Max 20 Digits(No Characters/Special Characters allowed)")
        // vali=dCar(alse);
       // }
        //if(cardExpiryMonth !=16 && !integersOnly.test(cardExpiryMonth)){
          //  setShowAlert(true)
            //setBootBoxMessage("Min 3 and Max 20 Digits(No Characters/Special Characters allowed)")
        // vali=dCar(alse);
        //}
        if(!expiration_month.test(cardExpiryMonth)){
            setShowAlert(true)
            setBootBoxMessage("Please enter a valid month")
            validCard=false;
        }
        if(!expiration_year.test(cardExpiryYear)){
            setShowAlert(true)
            setBootBoxMessage("Please enter a year between 2021 and 2036")
            validCard=false;
        }
        if(cardType==="Visa" && !credit_card_visa.test(cardNumber) && cardNumber.length !== 16){
            setShowAlert(true)
            setBootBoxMessage("Please enter valid Visa card number")
            validCard=false;
        }
        if(cardType==="MasterCard" && !credit_card_mastercard.test(cardNumber) && cardNumber.length !== 16){
            setShowAlert(true)
            setBootBoxMessage("Please enter valid Master card number")
            validCard=false;
        }
        if(cardType==="AmericanExpress" && !credit_card_american.test(cardNumber) && cardNumber.length !== 15){
            setShowAlert(true)
            setBootBoxMessage("Please enter valid American card number")
            validCard=false;
        }
        if(validCard)
            setDisableNext(false);
        else
            setDisableNext(true);
        //setEnableNext
    }

    return (
        <>
        <Bootbox show={showAlert}
                 type={"alert"}
                 message={bootboxMessage}
                 onClose={handleClose}
        />
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <ValidatorForm className={classes.form} onSubmit={() => {
                console.log("Submit")
            }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextValidator required id="cardName" label="Name on card" fullWidth autoComplete="cc-name"
                               onChange={e => setCardName(e.target.value)}
                               validators={['isString','minNumber:0', 'maxNumber:20', 'matchRegexp:^[0-9]$']}
                               errorMessages={['Only Characters', 'Not Enough Characters', 'Extra Characters', 'No Special Characters Allowed']}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextValidator
                        required
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        onChange={e => setCardNumber(e.target.value)}
                        validators={['isNumber','isPositive','minNumber:16', 'maxNumber:16']}
                        errorMessages={['Numbers Only', 'Positive Numbers', 'Not Enough Digits', 'Extra Digits']}
                    />
                </Grid>
                {/*<Grid item xs={12} md={6}>*/}
                {/*    /!*<TextField required id="expDate" label="Expiry date MM/YYYY" fullWidth autoComplete="cc-exp"*!/*/}
                {/*    /!*           onChange={e => setCardExpiryDate(e.target.value)}/>*!/*/}
                {/*    <TextField required id="expDate" label="Expiry MM" fullWidth autoComplete="cc-exp"*/}
                {/*               onChange={e => setCardExpiryMonth(e.target.value)}/>*/}
                {/*    <TextField required id="expDate" label="Expiry YYYY" fullWidth autoComplete="cc-exp"*/}
                {/*               onChange={e => setCardExpiryYear(e.target.value)}/>*/}
                {/*</Grid>*/}
                <Grid item xs={6} md={3}>
                    {/*<TextValidator required id="expDate" label="Expiry MM" fullWidth autoComplete="cc-exp"*/}
                    {/*           onChange={e => setCardExpiryMonth(e.target.value)}*/}
                    {/*           validators={['isNumber','isPositive','minNumber:1', 'maxNumber:2', 'matchRegexp:^[0-9]$']}*/}
                    {/*           errorMessages={['Numbers Only', 'Positive Numbers', 'Not Enough Digits', 'Extra Digits', 'Must be between 5 & 12']}/>*/}
                    <InputLabel id="cardTypeSelect">Expiry MM</InputLabel>
                    <Select
                        required
                        width={'100%'}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        placeholder='Expiry MM'
                        // value={age}
                        onChange={e => {
                            debugger;
                            setCardExpiryMonth(e.target.value)
                        }}
                    >
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                        <MenuItem value={'6'}>6</MenuItem>
                        <MenuItem value={'7'}>7</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'9'}>9</MenuItem>
                        <MenuItem value={'10'}>10</MenuItem>
                        <MenuItem value={'11'}>11</MenuItem>
                        <MenuItem value={'12'}>12</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextValidator required id="expDate" label="Expiry YYYY" fullWidth autoComplete="cc-exp"
                               onChange={e => setCardExpiryYear(e.target.value)}
                               validators={['isNumber','isPositive','minNumber:4', 'maxNumber:4', 'matchRegexp:^[0-9]$']}
                               errorMessages={['Numbers Only', 'Positive Numbers', 'Not Enough Digits', 'Extra Digits', 'Must be between 2021 & 2041']}/>
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextValidator
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        onChange={e => setCardCVV(e.target.value)}
                        validators={['isNumber','isPositive','minNumber:3', 'maxNumber:3', 'matchRegexp:^[0-9]$']}
                        errorMessages={['Numbers Only', 'Positive Numbers', 'Not Enough Digits', 'Extra Digits', 'Special Characters Not Allowed']}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <InputLabel id="cardTypeSelect">Card Type</InputLabel>
                    <Select
                        required
                        width={'100%'}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        onChange={e => {setCardType(e.target.value)}}
                    >
                        <MenuItem value={'Visa'}>Visa</MenuItem>
                        <MenuItem value={'MasterCard'}>Master Card</MenuItem>
                        <MenuItem value={'AmericanExpress'}>American Exp</MenuItem>
                    </Select>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=>ValidateAndEnableNext()}
                >
                    Validate Card
                </Button>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes"/>}
                        label="Remember credit card details for next time"
                    />
                </Grid>
            </Grid>
            </ValidatorForm>
        </React.Fragment>
        </>
    );
})

export default PaymentForm;