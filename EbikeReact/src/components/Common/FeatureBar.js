import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useRecoilState} from "recoil";
import {featureAtom, priceTrackAtom} from "../../globalState/atom";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

export default function FeatureBar(){
    const [feature,setFeature] = useRecoilState(featureAtom);
    const [priceTrack,setPriceTrack] = useRecoilState(priceTrackAtom);
    const useStyles = makeStyles((theme) => ({
        icon: {
            marginRight: theme.spacing(2),
        },
        heroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
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

    const classes = useStyles();
    let history = useHistory();
    return(
        <AppBar position="relative" color="secondary">
            <Toolbar className="wizard">
                <Typography variant="h6" color="red" noWrap styl>
                    Weight - {feature.weight}Kgs
                </Typography>
                <FitnessCenterIcon className={classes.icon} />
                <Typography variant="h6" color="red" noWrap styl>
                    RunningCost - {feature.runningCost}
                </Typography>
                <AttachMoneyIcon className={classes.icon} />
                <Typography variant="h6" color="red" noWrap styl>
                    Range - {feature.range}Miles
                </Typography>
                <MotorcycleIcon className={classes.icon} />
                <Typography variant="h6" color="red" noWrap styl>
                    {priceTrack}$
                </Typography>
                <ShoppingCartIcon />
                <Button
                    style={{marginLeft: "10px"}}
                    variant="contained"
                    color="action"
                    onClick={()=>history.push('/BikesPage')}
                    className={classes.button}
                >
                    Reset?
                </Button>
            </Toolbar>
        </AppBar>
    )

}