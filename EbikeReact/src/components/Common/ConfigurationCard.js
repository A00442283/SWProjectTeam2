import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

export default function ConfigurationCard({card}){
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

    return( <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
            {card.type}
        </Typography>
        <Typography>
            {`Capacity - ${card.capacity}Kw ||
                                            Price ${card.price}$          ||
                                            Weight ${card.weight}Kgs||
                                            Running Cost +${card.runningCost}$||
                                            Range ${card.range}Miles`}
        </Typography>
    </CardContent>)
}