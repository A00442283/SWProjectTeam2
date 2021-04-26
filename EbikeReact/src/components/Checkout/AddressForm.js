
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useRecoilState} from "recoil";
import {loginAtom} from "../../globalState/atom";

export default function AddressForm() {
    const [user, setUser] = useRecoilState(loginAtom);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [address1, setAddress1] = React.useState("38");
    const [address2, setAddress2] = React.useState("Sobey Street");
    const [city, setCity] = React.useState("");
    const [province, setProvince] = React.useState("");
    const [postalcode, setPostalcode] = React.useState("");
    const [country, setCountry] = React.useState("");

    React.useEffect(() =>{
        //If Guest
        if((!user || typeof user === 'object' && !Object.keys(user).length)) {
            setAddress1("")
            setAddress2("")
        }
        } ,[])
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Billing address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        value={user.firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        value={user.lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        value={address1}
                        onChange={e => setAddress1(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        value={address2}
                        onChange={e => setAddress2(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        value={user.city}
                        onChange={e => setCity(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="state" name="state" label="State/Province/Region"  value={user.province}
                               onChange={e => setProvince(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        value={user.postalcode}
                        onChange={e => setPostalcode(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        value={user.country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}