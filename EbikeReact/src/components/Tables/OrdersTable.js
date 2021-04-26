import React, {useEffect} from "react";
import {Api} from "../../configuration/config";
import DataTable from "react-data-table-component";
import {Spinner} from "react-spinner-material";
import CreateIcon from '@material-ui/icons/Create';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from "react-router-dom";
import {useRecoilState} from "recoil";
import {reFetchBikes} from "../../globalState/atom";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const columns = [
    {
        name: "Order#",
        selector: "orderId",
        sortable: true,
        // width:'2%',

    },
    {
        name: "Card ID#",
        selector: "cardId",
        // width:'10%',
    },
    {
        name: "Bike ID#",
        selector: "bikeId",
        // width:'10%',
    },
    {
        name: "Person ID#",
        selector: "personId",
        // width:'10%',
    },
];

export default function OrdersTable() {
    const classes = useStyles();

    const [apiData, setapiData] = React.useState([]);
    const [refetch, setRefetch] = useRecoilState(reFetchBikes);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        console.log('yes');
        setLoading(!loading)
        Api.getOrders((response) => {
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                console.log(res.status, res.data)
                debugger
                setapiData(res.data);
                setLoading(false);
            })
        });
    }, [refetch]);
    let history = useHistory()
    return (
        <>
            <DataTable
                highlightOnHover
                columns={columns}
                data={apiData}
                responsive={true}
                striped={true}
                selectableRows
                selectableRowsHighlight
            />
        </>
    );
}
