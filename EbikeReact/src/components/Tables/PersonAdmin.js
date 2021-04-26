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
import {reFetchBatteries, reFetchBikes, reFetchPerson} from "../../globalState/atom";

const ContextMenuCell = ({row}) => {

    const [refetch, setRefetch] = useRecoilState(reFetchPerson);
    let history = useHistory()
    // row.bId;
    return (
        <div>
            {/*<span onClick={(e)=>{*/}
            {/*    e.preventDefault();*/}
            {/*    history.push('/PersonAdminEdit?BatteryId='+row.bId+'&BatteryCapacity='+row.capacity+'&BatteryType='+row.type);*/}
            {/*}}><a href=""><CreateIcon alt="Edit" width="100" height="70"></CreateIcon></a> |</span>*/}

            <span onClick={(e)=>{
                e.preventDefault();
                Api.postDeletePerson(row.pId, (response) => {
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
                            else{console.log('delete person errror');}

                        })
                    } else {
                        console.log('an error occured');
                    }
                })
            }}><a href=""><DeleteIcon alt="Edit" width="100" height="70"></DeleteIcon></a> |</span>

            <span onClick={(e)=>{
                e.preventDefault();
                history.push('/PersonAdminCreate')
            }}><a href=""><AddIcon alt="Edit" width="100" height="70"></AddIcon></a></span>

        </div>
    )
}
const columns = [
    {
        name: "fname",
        selector: "fname",
        sortable: true,
        // width:'2%',

    },
    {
        name: "lname",
        selector: "lname",
        // width:'10%',
    },
    {
        name: "pass",
        selector: "pass",
        // width:'10%',
    },
    {
        name: "contact",
        selector: "contact",
        sortable: true,
        // width:'2%',

    },
    {
        name: "email",
        selector: "email",
        // width:'10%',
    },
    {
        name: "city",
        selector: "city",
        // width:'10%',
    },
    {
        name: "province",
        selector: "province",
        sortable: true,
        // width:'2%',

    },
    {
        name: "postalcode",
        selector: "postalcode",
        // width:'10%',
    },
    {
        name: "country",
        selector: "country",
        // width:'10%',
    },
    {
        name: "isadmin",
        selector: "isadmin",
        // width:'10%',
    },
    {
        name: "ismember",
        selector: "ismember",
        // width:'10%',
    },
    {
        name: "Actions",
        cell: row => <ContextMenuCell row={row}></ContextMenuCell>
    },
];

export default function PersonAdmin({MasterAccountCode}) {

    const [apiData, setapiData] = React.useState([]);
    const [refetch, setRefetch] = useRecoilState(reFetchPerson);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        console.log('yes');
        setLoading(!loading)
        Api.getPerson((response) => {
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                console.log(res.status, res.data)
                setapiData(res.data);
                setLoading(false);
            })
        });
    }, [refetch]);
    return (
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
    );
}
