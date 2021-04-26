import {atom,selector} from "recoil"

export const loginAtom = atom({
    key: "login",
    default: {}
})
// Price
export const priceTrackAtom = atom({
    key: "priceTrack",
    default: 0
})
// Configurations
export const savedConfigJsonAtom = atom({
    key: "saveJson",
    default: {}
})
// Weight Running Costs && Range
export const featureAtom = atom({
    key: "featureJson",
    default: {}
})
// Card
export const cardAtom = atom({
    key: "cardJson",
    default: {}
})
// Price
export const orderTrackAtom = atom({
    key: "orderTrack",
    default: 0
})
export const NextAtom = atom({
    key: "enableNext",
    default: false
})
export const reFetchBikes = atom({
    key: "bikes",
    default: false
})
export const reFetchBatteries = atom({
    key: "batteries",
    default: false
})
export const reFetchPerson = atom({
    key: "person",
    default: false
})

// export const savedConfigDynamicAtom = selector({
//     key: "savedConfig",
//     get: ({get}) => {
//         const bike = get(chosenBikeAtom)
//         const bikeprice = get(chosenBikePriceAtom)
//         const battery = get(chosenBikePriceAtom)
//         return {
//             "bike": bike,
//             "bikeprice": bikeprice,
//             "battery": battery
//         }
//     }
// })
