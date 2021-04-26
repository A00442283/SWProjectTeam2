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
import {Link} from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import netcomp from '../Iframe/netcomp.js';


const ContextMenuCell = ({row}) => {
    let editId = '/Customers/Edit/'+row.id;
    let detailsId = '/Customers/Details/'+row.id;
    let deleteId = '/Customers/Delete/'+row.id;
    console.log(editId);

    return (
        <div>
            {/*<Link tag={Link} className="text-dark" to={editId}>Edit</Link>*/}
            <a target="iframe_a" href={editId}><CreateIcon alt="Edit" width="100" height="70"></CreateIcon></a> |
            <a target="iframe_a" href={detailsId}><DescriptionIcon alt="Edit" width="100" height="70"></DescriptionIcon></a> |
            <a target="iframe_a" href={deleteId}><DeleteIcon alt="Edit" width="100" height="70"></DeleteIcon></a> |
            <a target="iframe_a" href='/Customers/Create/'><AddIcon alt="Edit" width="100" height="70"></AddIcon></a> |
            {/*<a href="/Customers/Details"+id>Details</a> |*/}
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

export default function CustomerTableReact({MasterAccountCode}) {

    const [apiData, setapiData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);


    useEffect(() => {
        console.log('yes');
        setLoading(!loading)
        Api.getAllCustomers((response) => {
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

        // ApiUtils.bookmark(MasterAccountCode, (data) => {
        //         if(data.data.Message === "No Records Found!") {        }
        //         else{
        //             setapiData(data.data)
        //         }
        //     }
        // );

        // const response = await fetch('weatherforecast');
        // const data = await response.json();
        // this.setState({ forecasts: data, loading: false });

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
         <netcomp/>
            <iframe name="iframe_a" height="600px" width="100%" title="You actions reflect here.."></iframe>
            {/*<p><a href="https://www.w3schools.com" target="iframe_a">W3Schools.com</a></p>*/}
        </>
    );
}
