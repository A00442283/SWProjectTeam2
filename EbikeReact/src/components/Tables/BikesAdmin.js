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

const ContextMenuCell = ({row}) => {
    const [refetch, setRefetch] = useRecoilState(reFetchBikes);
    let history = useHistory()

    let editId = '/Bikes/Edit/'+row.bikeId;

    return (
        <div>
            <span onClick={(e)=>{
                e.preventDefault();
                history.push(`/BikesAdminCredit?Type=EditView&BikeName=${row.name}&BikeId=${row.bikeId}&BikePrice=${row.price}&BikeDescription=${row.description}&BikeWeight=${row.weight}&BikeRunningCost=${row.runningCost}&BikeBikeRange=${row.range}`);
            }}><a href=""><CreateIcon alt="Edit" width="100" height="70"></CreateIcon></a> |</span>

            <span onClick={(e)=>{
                e.preventDefault();
                Api.postDeleteBikes(row.bikeId, (response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            if(res.data === 'Success') {
                                setRefetch(!refetch);
                                // history.push('/AdminDashboard');
                            }
                            else{console.log('delete bike errror');}

                        })
                    } else {
                        console.log('an error occured');
                    }
                })
            }}><a href=""><DeleteIcon alt="Edit" width="100" height="70"></DeleteIcon></a> |</span>

            <span onClick={(e)=>{
                e.preventDefault();
                history.push('/BikesAdminCredit')
            }}><a href=""><AddIcon alt="Edit" width="100" height="70"></AddIcon></a></span>

        </div>
    )
}
const columns = [
    {
        name: "#",
        selector: "bikeId",
        sortable: true,
        // width:'2%',

    },
    {
        name: "Bike Name",
        selector: "name",
        // width:'10%',
    },
    {
        name: "Price",
        selector: "price",
        // width:'10%',
    },
    {
        name: "Description",
        selector: "description",
        // width:'10%',
    },
    {
        name: "Weight",
        selector: "weight",
        // width:'10%',
    },
    {
        name: "Running Costs",
        selector: "runningCost",
        // width:'10%',
    },
    {
        name: "Range",
        selector: "range",
        // width:'10%',
    },
    {
        name: "Actions",
        cell: row => <ContextMenuCell row={row}></ContextMenuCell>
    },
];

export default function BikesAdmin() {
    const classes = useStyles();

    const [apiData, setapiData] = React.useState([]);
    const [refetch, setRefetch] = useRecoilState(reFetchBikes);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        console.log('yes');
        setLoading(!loading)
        Api.getBikes((response) => {
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
                // customStyles={customStyles}
                // onRowClicked={rowClicked}
                // style={{minHeight : '35vh'}}

                // fixedHeader
                // fixedHeaderScrollHeight="35vh"
                // progressComponent={<div  className="mt-2"><Loader active inline='centered'/></div>}
                // progressPending={loading}
                responsive={true}
                striped={true}
                selectableRows
                selectableRowsHighlight
                // progressPending={pending}
                // overflowY={true}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{
                history.push('/BikesPage')}
            }
        >
            View Bikes Page!
        </Button>
        </>
    );
}
