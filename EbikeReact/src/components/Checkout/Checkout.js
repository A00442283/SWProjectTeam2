import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import {useHistory} from "react-router-dom";
import {Api} from "../../configuration/config";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    cardAtom,
    NextAtom,
    loginAtom,
    orderTrackAtom,
    priceTrackAtom,
    savedConfigJsonAtom
} from "../../globalState/atom";
import Bootbox from "bootbox-react/src";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Halifax E Bikes Corp.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    zindexAppBar: {
        zIndex: 10
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step,next) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm ref={next}/>;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [savedConfig,setSavedConfig] = useRecoilState(savedConfigJsonAtom);
    const [disableNext,setDisableNext] = useRecoilState(NextAtom);
    const [user, setUser] = useRecoilState(loginAtom);
    const [order, setOrder] = useRecoilState(orderTrackAtom);
    const [card,setCard] = useRecoilState(cardAtom);
    const [showAlert, setShowAlert] = React.useState(false)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var time = today.getHours()+':'+today.getMinutes();
    today = mm + '/' + dd + '/' + yyyy;

    const handleClose = () => {
        console.log("You closed Alert!");
        return setShowAlert(false);
    }
    const childRef = React.useRef();

    const handleNext = React.useCallback(() => {
        // cardName, cardNumber, cardExpiryDate, cardCVV
        // card{'cardName'}, card{'cardNumber'}, card{'cardExpiryMonth'},card{'cardExpiryYear'}, card{'cardCVV'}

        if(activeStep === steps.length - 3) {
            setDisableNext(true);
            setShowAlert(true)
        }

        if(activeStep === steps.length - 2){
            // childRef.current.formSubmit();
            Api.postAddCardDetailsValidationApi(card['cardType'], card['cardName'], card['cardNumber'], card['cardExpiryMonth'],card['cardExpiryYear'], card['cardCVV'], (response) => {
                if (response.status == 200) {
                    response.json().then(data => ({
                            data: data,
                            status: response.status
                        })
                    ).then(res => {
                        console.log(res.status, res.data)
                        console.log(res.data)
                        setCard({
                            "cardId": res.data
                        })
                        debugger
                        // history.push('/BikesAdmin');
                    })
                } else {
                }
            })
            // let creditCardWindow = window.open("", "myWindow", "width=200,height=100");
        }

        //Checkout
        if(activeStep === steps.length - 1){
            console.log(savedConfig);
            debugger
            Api.postOrder(user['personId'],savedConfig['bikeId'],card['cardId'],savedConfig['batteryId']
                ,savedConfig['accelerationModeId'],savedConfig['brakesId'],savedConfig['wheelId'],savedConfig['accessoriesId'],
                (response) => {
                response.json().then(data => ({
                        data: data,
                        status: response.status
                    })
                ).then(res => {
                    setTimeout(function(){setOrder(res.data);}, 1500);
                    console.log(res.status, res.data)
                    debugger
                    // setLoading(false);
                })
            });
            setActiveStep(activeStep + 1);
        }
        //Review
        setActiveStep(activeStep + 1);
    },[card]);

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    let history = useHistory();

    return (
        <>
            <Bootbox show={showAlert}
                     type={"alert"}
                     message={"Card Details entered here are saved. Please make a purchase at storefront if you're not comfortable with this"}
                     onClose={handleClose}
            />
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={[classes.appBar,classes.zindexAppBar].join(' ')}>
                <Toolbar className="wizard">
                    <Typography variant="h6" color="inherit" noWrap>
                        Halifax E Bikes Payment Gateway - Powered By Solaris!
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thanks for shopping with us {user.firstName}!. If this is your first time, you're free membership gives you a
                                    5% off on future purchases. Do check out our membership options!
                                </Typography>
                                <Typography variant="subtitle1">
                                    {/*Your order number is {savedConfig.bike.substring(0, 3)-time}-{order}. We have emailed your order confirmation, and will*/}
                                    {/*send you an update when your order has shipped.*/}
                                    Your order number is #{order}. We have emailed your order confirmation, and will
                                    send you an update when your order has shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep,childRef)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                        disabled={disableNext}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={()=>history.push('/BikesPage')}
                                        className={classes.button}
                                    >
                                        Start Over?
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
        </>
    );
}