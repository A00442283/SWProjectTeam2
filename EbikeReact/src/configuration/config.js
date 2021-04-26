export const Api = {
    getPeople : async(handler) => {
        fetch('/People/GetPersonInfo').then(handler);
    },
    getBikes : async(handler) => {
        fetch('/Bikes/GetBikesInfo').then(handler);
    },
    getOrders : async(handler) => {
        fetch('/Orders/GetOrdersInfo').then(handler);
    },

    getBatterries : async(handler) => {
        fetch('/Batteries/GetBatteryInfo').then(handler);
    },
    getBrakes : async(handler) => {
        fetch('/Brakes/GetBrakesInfo').then(handler);
    },
    getAccelerationModes : async(handler) => {
        fetch('/AccelerationModes/GetAccelerationModeInfo').then(handler);
    },
    getWheels : async(handler) => {
        fetch('/Wheels/GetWheelInfo').then(handler);
    },
    getAccessories : async(handler) => {
        fetch('/Accessories/GetAccessoriesInfo').then(handler);
    },

    getSavedConfig : async(PId,handler) => {
        fetch('/SavedConfigurations/GetSavedConfigurationInfo/'+PId).then(handler);
    },

    postLogin : async(email,password,handler) => {
        let data = {
            "email": email,
            "password": password,
        };
        fetch('/People/PostSignInApiJson',{ method: "POST",body: JSON.stringify(data),headers: {
                'Content-Type': 'application/json'
            },
        },
        ).then(handler);
    },
    postLoginCustomers : async(firstname,handler) => {
        let data = {'firstName': firstname};
        fetch('/Customers/PostSignInApiJson',{ method: "POST",body: JSON.stringify(data),headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
        ).then(handler);

        // fetch('/Customers/PostSignInApiJson',{ method: "POST",body: JSON.stringify(form)}).then(handler);
    },
    postCardDetails : async(type,name, digits, expirationMonth, expirationYear, cvv,handler) => {
        debugger
        var data ={
            "type": type,
            "digits": digits,
            "expirationMonth": expirationMonth,
            "expirationYear": expirationYear
        }
        debugger
        fetch('/CardDetails/PostAddCardDetailsApi',{ method: "POST",body: JSON.stringify(data),headers: {
                    'Content-Type': 'application/json'
                },
            },
        ).then(handler);
    },
    postAddCardDetailsValidationApi : async(type,name, digits, expirationMonth, expirationYear, cvv,handler) => {
        debugger
        var data ={
            "type": type,
            "digits": digits,
            "expirationMonth": expirationMonth,
            "expirationYear": expirationYear
        }
        debugger
        fetch('/CardDetails/PostAddCardDetailsValidationApi',{ method: "POST",body: JSON.stringify(data),headers: {
                    'Content-Type': 'application/json'
                },
            },
        ).then(handler);
    },
    postOrder : async(personId,bikeId,cardId,batteryId,accelerationModeId,brakesId,wheelId,accessoriesId,handler) => {
        debugger
        var data = {
            "personId": personId,
            "bikeId": bikeId,
            "cardId": 1,
            "batteryId": batteryId,
            "accelerationModeId": accelerationModeId,
            "brakesId": brakesId,
            "wheelId": wheelId,
            "accessoriesId": accessoriesId,
        }
        debugger
        fetch('/Orders/PostAddOrdersApi',{ method: "POST",body: JSON.stringify(data),headers: {
                    'Content-Type': 'application/json'
                },
            },
        ).then(handler);
    },
    postUpdateMembership : async(personId,IsMember,handler) => {
        debugger
        var data = {
            "personId": personId,
            "isMember": IsMember,
        }
        debugger
        fetch('/People/PostEditPersonApi',{ method: "POST",body: JSON.stringify(data),headers: {
                    'Content-Type': 'application/json'
                },
            },
        ).then(handler);
    },


    postAddBikes : async(bikename,bikeprice,bikedescription,bikeWeight,bikeRunningCosts,bikeRange,handler) => {
        var data =  {
            "name": bikename,
            "price": bikeprice,
            "description": bikedescription,
            "weight": bikeWeight,
            "runningCost": bikeRunningCosts,
            "range": bikeRange
        }
        fetch('/Bikes/PostAddBikesApi',{ method: "POST",body: JSON.stringify(data),headers: {
                'Content-Type': 'application/json'
            },
        },
        ).then(handler);

        // fetch('/Customers/PostSignInApiJson',{ method: "POST",body: JSON.stringify(form)}).then(handler);

    },
    postDeleteBikes : async(BikeId,handler) => {
        // let data = {BikeId};
        fetch('/Bikes/PostDeleteBikesApi/'+BikeId,{ method: "POST",headers: {
                'Content-Type': 'application/json'
            },
        },
        ).then(handler);

        // fetch('/Customers/PostSignInApiJson',{ method: "POST",body: JSON.stringify(form)}).then(handler);

    },
    postEditBikes : async(BikeId,bikename,bikeprice,bikedescription,bikeWeight,bikeRunningCosts,bikeRange,handler) => {
        var data =  {
            "name": bikename,
            "price": bikeprice,
            "description": bikedescription,
            "weight": bikeWeight,
            "runningCost": bikeRunningCosts,
            "range": bikeRange
        }
        fetch('/Bikes/PostEditBikesApi/'+BikeId,{ method: "POST",body: JSON.stringify(data),headers: {
                'Content-Type': 'application/json'
            },
        },
        ).then(handler);

        // fetch('/Customers/PostSignInApiJson',{ method: "POST",body: JSON.stringify(form)}).then(handler);

    },
    postAddPeople : async(firstName, lastName, password, contact, email, city, province, postalcode, country, isAdmin, isMember,handler) => {
        var data =  {
            "firstName": firstName,
            "lastName": lastName,
            "password": password,
            "contact": contact,
            "email": email,
            "city": city,
            "province": province,
            "postalcode": postalcode,
            "country": country,
            "isAdmin": isAdmin,
            "isMember": isMember
        }
        fetch('/People/PostAddPersonApi',{ method: "POST",body: JSON.stringify(data),headers: {
                'Content-Type': 'application/json'
            },
        },
        ).then(handler);
    },
    postAddValidationPeople : async(firstName, lastName, password, contact, email, city, province, postalcode, country, isAdmin, isMember,handler) => {
        var data =  {
            "firstName": firstName,
            "lastName": lastName,
            "password": password,
            "contact": contact,
            "email": email,
            "city": city,
            "province": province,
            "postalcode": postalcode,
            "country": country,
            "isAdmin": isAdmin,
            "isMember": isMember
        }
        fetch('/People/PostAddPersonValidationApi',{ method: "POST",body: JSON.stringify(data),headers: {
                    'Content-Type': 'application/json'
                },
            },
        ).then(handler);
    },
    postDeletePeople : async(BikeId,handler) => {
        // let data = {BikeId};
        fetch('/People/PostDeletePeopleApi/'+BikeId,{ method: "POST",headers: {
                'Content-Type': 'application/json'
            },
        },
        ).then(handler);

        // fetch('/Customers/PostSignInApiJson',{ method: "POST",body: JSON.stringify(form)}).then(handler);

    },
    postEditPeople : async(personId,firstName, lastName, password, contact, email, city, province, postalcode, country, isAdmin, isMember,handler) => {
        var data =  {
            "firstName": firstName,
            "lastName": lastName,
            "password": password,
            "contact": contact,
            "email": email,
            "city": city,
            "province": province,
            "postalcode": postalcode,
            "country": country,
            "isAdmin": isAdmin,
            "isMember": isMember
        }
        fetch('/People/PostEditPersonApi/'+personId,{ method: "POST",body: JSON.stringify(data),headers: {
                'Content-Type': 'application/json'
            },
        },
        ).then(handler);

        // fetch('/Customers/PostSignInApiJson',{ method: "POST",body: JSON.stringify(form)}).then(handler);

    },

    postAddBattery : async(Capacity,Type,handler) => {
        var data = {
            "Capacity": Capacity,
            "Type": Type
        }
        fetch('/Batteries/PostAddBatteryApi',{ method: "POST",body: JSON.stringify(data),headers: {
                    'Content-Type': 'application/json'
                },
            },
        ).then(handler);
    },
    postDeleteBattery : async(BatteryId,handler) => {
        fetch('/Batteries/PostDeleteBatteryApi/'+BatteryId,{ method: "POST",headers: {
                    'Content-Type': 'application/json'
                },
            },
        ).then(handler);
    },
    postEditBattery : async(BatteryId,Capacity,Type,handler) => {
        let data = {'Capacity': Capacity,'Type': Type};
        debugger;
        fetch('/Batteries/PostEditBatteryApi/'+BatteryId,{ method: "POST",body: JSON.stringify(data),headers: {
                'Content-Type': 'application/json'
            },
        },
        ).then(handler);
    },

    postAddPerson : async(fname, lname, pass, contact, email, city, province, postalcode, country, isadmin, ismember, handler) => {
        var data = {
            "fname": fname,
            "lname": lname,
            "pass": pass,
            "contact": contact,
            "email": email,
            "city": city,
            "province": province,
            "postalcode": postalcode,
            "country": country,
            "isadmin": isadmin,
            "ismember": ismember
        }
        fetch('/People/PostAddPersonApi',{ method: "POST",body: JSON.stringify(data),headers: {
                    'Content-Type': 'application/json'
                },
            },
        ).then(handler);
    },
    postDeletePerson : async(PersonId,handler) => {
        fetch('/People/PostDeletePersonApi/'+PersonId,{ method: "POST",headers: {
                    'Content-Type': 'application/json'
                },
            },
        ).then(handler);
    },
    postEditPerson : async(PersonId,fname, lname, pass, contact, email, city, province, postalcode, country, isadmin, ismember,handler) => {
        var data = {
            "PId" : PersonId,
            "fname": fname,
            "lname": lname,
            "pass": pass,
            "contact": contact,
            "email": email,
            "city": city,
            "province": province,
            "postalcode": postalcode,
            "country": country,
            "isadmin": isadmin,
            "ismember": ismember
        }
        debugger;
        fetch('/People/PostEditPersonApi/'+PersonId,{ method: "POST",body: JSON.stringify(data),headers: {
                    'Content-Type': 'application/json'
                },
            },
        ).then(handler);
    },
}