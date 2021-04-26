import React, {useEffect} from "react";
import {ApiUtils} from "../../configuration/config";
// import {BaseContext} from "../../pages/context/GlobalContext";
// import Moment from "moment";
// import {Loader} from "semantic-ui-react";
import DataTable from "react-data-table-component";
// import customStyles from "./Config";
import {Api} from "../../configuration/config";
import {Spinner} from "react-spinner-material";
import {NavItem, NavLink} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import netcomp from '../Iframe/netcomp.js';


const ContextMenuCell = ({row}) => {
    let history = useHistory()
    console.log(row);
    console.table(row);
    let editId = '/Customers/Edit/'+row.id;

    return (
        <div>
            <span onClick={(e)=>{
                e.preventDefault();
                history.push(`/PeopleAdminCredit?Type=EditView&PersonId=${row.personId}&FirstName=${row.firstName}&LastName=${row.lastName}&Password=${row.password}&Contact=${row.contact}&Email=${row.email}&City=${row.city}&Province=${row.province}&Postalcode=${row.postalcode}&Country=${row.country}&IsAdmin=${row.isAdmin}&IsMember=${row.isMember}`);
            }}><a href=""><CreateIcon alt="Edit" width="100" height="70"></CreateIcon></a> |</span>

            <span onClick={(e)=>{
                e.preventDefault();
                Api.postDeletePeople(row.personId, (response) => {
                    if (response.status == 200) {
                        response.json().then(data => ({
                                data: data,
                                status: response.status
                            })
                        ).then(res => {
                            console.log(res.status, res.data)
                            if(res.data === 'Success') {
                                // setRefetch(!refetch);
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
                history.push('/PeopleAdminCredit')
            }}><a href=""><AddIcon alt="Edit" width="100" height="70"></AddIcon></a></span>

        </div>
    )
}

const columns = [
    // {
    //     name: "#",
    //     selector: "id",
    //     sortable: true,
    //     width:'2%',
    //
    // },
    {
        name: "firstName",
        selector: "firstName",
        // width:'10%',
    },
    {
        name: "lastName",
        selector: "lastName",
        sortable: true,

    },
    // {
    //     name: "password",
    //     selector: "password",
    //     // width:'10%',
    // },
    {
        name: "contact",
        selector: "contact",
        sortable: true,

    },
    {
        name: "email",
        selector: "email",
        // width:'10%',
    },
    {
        name: "city",
        selector: "city",
        sortable: true,

    },
    {
        name: "province",
        selector: "province",
        // width:'10%',
    },
    {
        name: "postalcode",
        selector: "postalcode",
        sortable: true,

    },
    {
        name: "country",
        selector: "country",
        // width:'10%',
    },
    {
        name: "isAdmin",
        selector: "isAdmin",
        // width:'10%',
    },
    {
        name: "isMember",
        selector: "isMember",
        // width:'10%',
    },
    {
        name: "Actions",
        // selector: "email",
        // width:'10%',
        cell: row => <ContextMenuCell row={row}></ContextMenuCell>

    },
];

export default function PeopleAdmin({MasterAccountCode}) {

    const [apiData, setapiData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);


    useEffect(() => {
        console.log('yes');
        setLoading(!loading)
        Api.getPeople((response) => {
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
        // setapiData(data);
        console.log('done?');
    }, []);

    const populateWeatherData = async () => {

    }

    return (
        <>
        <DataTable
            // highlightOnHover
            // columns={columns}
            // data={apiData}
            // progressComponent={<div  className="mt-2"><Spinner radius={120} color={"#333"} stroke={2} visible={true} />}
            // progressPending={loading}
            // // customStyles={customStyles}
            // // onRowClicked={rowClicked}
            // // style={{minHeight : '35vh'}}
            // // fixedHeader
            // // fixedHeaderScrollHeight="35vh"
            // // progressComponent={<div  className="mt-2"><Loader active inline='centered'/></div>}
            // // progressPending={loading}
            // responsive={true}
            // striped={true}
            // selectableRows
            // selectableRowsHighlight
            // // progressPending={pending}
            // // overflowY={true}

                // highlightOnHover
                // columns={columns}
                // data={apiData}
                // progressComponent={<div  className="mt-2"><Loader active inline='centered'/></div>}
                // progressPending={loading}
                // // customStyles={customStyles}
                // // onRowClicked={rowClicked}
                // // style={{minHeight : '35vh'}}
                //
                // // fixedHeader
                // // fixedHeaderScrollHeight="35vh"
                // // progressComponent={<div  className="mt-2"><Loader active inline='centered'/></div>}
                // // progressPending={loading}
                // responsive={true}
                // striped={true}
                // selectableRows
                // selectableRowsHighlight
                // // progressPending={pending}
                // // overflowY={true}



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
        </>
    );
}
