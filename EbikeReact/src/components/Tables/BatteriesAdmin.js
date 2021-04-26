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
import {reFetchBatteries, reFetchBikes} from "../../globalState/atom";

const ContextMenuCell = ({row}) => {

    const [refetch, setRefetch] = useRecoilState(reFetchBatteries);
    let history = useHistory()
    // row.bId;
    return (
        <div>
            <span onClick={(e)=>{
                e.preventDefault();
                history.push('/BatteriesAdminEdit?BatteryId='+row.bId+'&BatteryCapacity='+row.capacity+'&BatteryType='+row.type);
            }}><a href=""><CreateIcon alt="Edit" width="100" height="70"></CreateIcon></a> |</span>

            <span onClick={(e)=>{
                e.preventDefault();
                Api.postDeleteBattery(row.bId, (response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            if(res.data === 'Success') {
                                setRefetch(true);
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
                history.push('/BatteriesAdminCreate')
            }}><a href=""><AddIcon alt="Edit" width="100" height="70"></AddIcon></a></span>

        </div>
    )
}
const columns = [
    {
        name: "Battery#",
        selector: "bId",
        sortable: true,
        // width:'2%',

    },
    {
        name: "Battery Capacity",
        selector: "capacity",
        // width:'10%',
    },
    {
        name: "Battery Type",
        selector: "type",
        // width:'10%',
    },
    {
        name: "Actions",
        cell: row => <ContextMenuCell row={row}></ContextMenuCell>
    },
];

export default function BatteriesAdmin({MasterAccountCode}) {

    const [apiData, setapiData] = React.useState([]);
    const [refetch, setRefetch] = useRecoilState(reFetchBikes);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        console.log('yes');
        setLoading(!loading)
        Api.getBatterries((response) => {
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
