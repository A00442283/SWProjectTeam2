import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import SpeedIcon from '@material-ui/icons/Speed';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {useHistory} from "react-router-dom";
import {Api} from "../configuration/config";
import {useRecoilState} from "recoil";
import {featureAtom, priceTrackAtom, savedConfigJsonAtom} from "../globalState/atom";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FeatureBar from "../components/Common/FeatureBar";
import ConfigurationCard from "../components/Common/ConfigurationCard";
import acceleration from '../assets/acceleration.jpg';
import acl1 from '../assets/acl1.jpg';
import acl2 from '../assets/acl2.jpg';

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
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        backgroundImage: `url(${acceleration})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: theme.spacing(8, 0, 6),
    },
    bikehead: {
        background: 'rgb(63,81,181, 0.85)',
        color: 'white',
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    biketext: {
        background: 'rgb(245,0,87,0.85)',
        color: 'white',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function AccelerationModesPage() {
    const [cards,setCards] = React.useState([]);
    const [priceTrack,setPriceTrack] = useRecoilState(priceTrackAtom);
    const [savedConfig,setSavedConfig] = useRecoilState(savedConfigJsonAtom);
    const [feature,setFeature] = useRecoilState(featureAtom);
    React.useEffect(() => {
        console.log(priceTrack);
        console.log(feature);
        debugger
        Api.getAccelerationModes((response) => {
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                console.log(res.status, res.data)
                setCards(res.data);
            })
        });
    },[])

    const classes = useStyles();
    let history = useHistory()

    function saveCustomizationAndRedirect(page,card) {
        let x = { ...savedConfig };
        x['accelerationModeId'] = card.accelerationModeId;
        x['accelerationModePrice'] = card.price;
        x['accelerationModeType'] = card.type;
        setSavedConfig(x);
        debugger
        let y = { ...feature };
        debugger
        y['weight']+= card.weight;
        y['runningCost']+= card.runningCost;
        y['range']+= card.range;
        setFeature(y);

        setPriceTrack(priceTrack+card.price);
        if(page == 'Checkout')
            history.push('/Checkout')
        else
            history.push('/Brakes')
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar className="wizard">
                    <SpeedIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Choose the Acceleration Mode
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.bikehead}>
                            It's all about Acceleration!
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.biketext}>
                            Choose between the basic "Pedal Assisted" mode and a manual "Throttle" mode.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Read Past Customer Reviews
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Other Vendors
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={card.accelerationModeId % 3 === 1 ? acl1 : acl2}
                                        title="Image title"
                                    />
                                    <ConfigurationCard card={card}/>
                                    <CardActions>
                                        <Button onClick={()=>{saveCustomizationAndRedirect('Checkout',card)}} size="small" color="primary">
                                            Checkout
                                        </Button>
                                        <Button onClick={()=>{saveCustomizationAndRedirect('Brakes',card)}}
                                                size="small" color="primary">
                                            Customize Further
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        <FeatureBar/>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Halifax E Bikes Corp
                </Typography>
                {/*<Typography variant="subtitle1" align="center" color="textSecondary" component="p">*/}
                {/*    Something here to give the footer a purpose!*/}
                {/*</Typography>*/}
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}