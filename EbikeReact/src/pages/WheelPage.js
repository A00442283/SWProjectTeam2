import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
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
import wheels from '../assets/wheels.jpg';
import wheel1 from '../assets/spokes.png';
import wheel2 from '../assets/alloy.jpg';
import wheel3 from '../assets/carbonfiber.jpg';

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
        backgroundImage: `url(${wheels})`,
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

export default function WheelPage() {
    const [cards,setCards] = React.useState([]);
    const [priceTrack,setPriceTrack] = useRecoilState(priceTrackAtom);
    const [savedConfig,setSavedConfig] = useRecoilState(savedConfigJsonAtom);
    const [feature,setFeature] = useRecoilState(featureAtom);
    React.useEffect(() => {
        console.log(priceTrack);
        Api.getWheels((response) => {
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                console.log(res.status, res.data)
                setCards(res.data);
                // setLoading(false);
            })
        });
    },[])

    const classes = useStyles();
    let history = useHistory()

    function saveCustomizationAndRedirect(page,card) {
        var x = { ...savedConfig };
        x['wheelId'] = card.wheelId;
        x['wheelPrice'] = card.price;
        x['wheelType'] = card.type;
        setSavedConfig(x);
        debugger
        let y = { ...feature };
        y['weight']+= card.weight;
        y['runningCost']+= card.runningCost;
        y['range']+= card.range;
        setFeature(y);
        setPriceTrack(priceTrack+card.price);
        if(page == 'Checkout')
            history.push('/Checkout')
        else
            history.push(`/${page}`)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar className="wizard">
                    <DonutLargeIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Wheel Customization
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.bikehead}>
                            Wheels, to take you miles!
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.biketext}>
                            Choose from the classic Spoked wheels all the way to super-strong yet light-weight Carbon Fiber wheels!
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
                                        image={card.wheelId % 3 === 1 ? wheel1 : card.wheelId % 3 === 2 ? wheel2 : wheel3}
                                        title="Image title"
                                    />
                                    <ConfigurationCard card={card}/>
                                    <CardActions>
                                        <Button onClick={()=>{saveCustomizationAndRedirect('Checkout',card)}} size="small" color="primary">
                                            Checkout
                                        </Button>
                                        <Button onClick={()=>{saveCustomizationAndRedirect('Accessories',card)}}
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
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}