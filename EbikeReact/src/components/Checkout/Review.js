import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {cardAtom, loginAtom, orderTrackAtom, priceTrackAtom, savedConfigJsonAtom} from "../../globalState/atom";
import {useRecoilState, useRecoilValue} from "recoil";
import {Api} from "../../configuration/config";

// const products = [
//     { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//     { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//     { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//     { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//     { name: 'Shipping', desc: '', price: 'Free' },
// ];
// const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//     { name: 'Card type', detail: 'Visa' },
//     { name: 'Card holder', detail: 'Mr John Smith' },
//     { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//     { name: 'Expiry date', detail: '04/2024' },
// ];

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

var products = []
var payments = []
var addresses = [];
export default function Review() {
    const classes = useStyles();
    const [priceTrack,setPriceTrack] = useRecoilState(priceTrackAtom);
    const [savedConfig,setSavedConfig] = useRecoilState(savedConfigJsonAtom);
    const [user, setUser] = useRecoilState(loginAtom);
    const [card, setCard] = useRecoilState(cardAtom);


    React.useEffect(() => {
        console.log({savedConfig});
        console.log({user});
        debugger
        products = []
        if( savedConfig['bikeId'] && savedConfig['bikeId'] !== undefined  )
            products.push({ name: 'Base Bike', desc: `${savedConfig['bike']}`, price: `${savedConfig['bikePrice']}$` })
        if( savedConfig['batteryId'] && savedConfig['batteryId'] !== undefined  )
            products.push({ name: 'Battery', desc: `${savedConfig['batteryType']}`, price: `${savedConfig['batteryPrice']}$` })
        if( savedConfig['accelerationModeId'] && savedConfig['accelerationModeId'] !== undefined  )
            products.push({ name: 'Pedal Assist', desc: `${savedConfig['accelerationModeType']}`, price: `${savedConfig['accelerationModePrice']}$` })
        if( savedConfig['brakesId'] && savedConfig['brakesId'] !== undefined  )
            products.push({ name: 'Brakes', desc: `${savedConfig['brakesType']}`, price: `${savedConfig['brakesPrice']}$` })
        if( savedConfig['wheelId'] && savedConfig['wheelId'] !== undefined  )
            products.push({ name: 'Wheels', desc: `${savedConfig['wheelType']}`, price: `${savedConfig['wheelPrice']}$` })
        if( savedConfig['accessoriesId'] && savedConfig['accessoriesId'] !== undefined  )
            products.push({ name: 'Accessories', desc: `${savedConfig['accessoriesType']}`, price: `${savedConfig['accessoriesPrice']}$` })

            products.push({ name: 'Before Taxes & Discounts', desc: ``, price: `${priceTrack}$` })

        var discountedValue=0;
        if(!(!user || typeof user === 'object' && !Object.keys(user).length)) {
            if (user['isMember'] === "Free") {
                let x = priceTrack
                // x*= 0.05;
                let y = x * 0.05;
                setPriceTrack(priceTrack - y)
                discountedValue = priceTrack - y;
                products.push({name: 'Membership', desc: `${user['isMember']}`, price: `5% off - ${priceTrack - y}`})
            }
            if (user['isMember'] === "Pro") {
                let x = priceTrack
                // x*= 0.10;
                // setPriceTrack(priceTrack - x)
                let y = x * 0.10;
                setPriceTrack(priceTrack - y)
                discountedValue = priceTrack - y;
                products.push({name: 'Membership', desc: `${user['isMember']}`, price: `10% off - ${priceTrack - y}`})
            }
            if (user['isMember'] === "Ent") {
                let x = priceTrack
                // x*= 0.15;
                // setPriceTrack(priceTrack - x)
                let y = x * 0.15;
                setPriceTrack(priceTrack - y)
                discountedValue = priceTrack - y;
                products.push({
                    name: 'Membership',
                    desc: `${user['isMember'] === "Ent" ? "Corporate" : "Ent"}`,
                    price: `15% off - ${priceTrack - y}`
                })
            }
        }
        else
            products.push({name: 'Membership', desc: `No Membership`, price: `No Discount`})

        products.push({ name: 'Tax', desc: `Goods and Services Tax`, price: `15% (Nova Scotia)` })
        if(!(!user || typeof user === 'object' && !Object.keys(user).length)) {
            debugger
            let x = discountedValue
            // x*= 0.15;
            let y = x * 0.15;
            setPriceTrack(discountedValue + y)
        }

        products.push({ name: 'Doorstep Delivery', desc: `Orders above 400$ only`, price: `${discountedValue >400 ? "Yes!" : "No"}` })

        // card['cardType'], card['cardName'], parseInt(card['cardNumber']), parseInt(card['cardExpiryMonth']),parseInt(card['cardExpiryYear'])
        payments.push({ name: 'Card type', detail: `${card['cardType']}` })
        payments.push({ name: 'Card holder', detail: `${card['cardName']}` })
        payments.push({ name: 'Card number', detail: `${card['cardNumber']}` })
        payments.push({ name: 'Expiry date', detail: `${card['cardExpiryMonth']}/${card['cardExpiryYear']}` })

        addresses.push(user['email'],user['contact'],user['city'],user['province'],user['postalcode'],user['country'],)
    },[])


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={product.desc} />
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {`${priceTrack}$`}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{user.firstName? `${user.firstName} ${user.lastName}` : "Guest"}</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}