const phoneTypes = ["Mobile", "Home", "Office", "Fax", "Other"];
const customerTypes = ["Individual", "Business", "School"];

const assetFields = [
    {
        name: "assetType",
        label: "Asset Type",
        type: "text",
        placeholder: "Asset Type",
        icon: "bi bi-person",
        side: 0,
    },
    {
        name: "customerName",
        label: "Customer Name",
        type: "text",
        placeholder: "Customer Name",
        icon: "bi bi-person",
        side: 0,
    },
    {
        name: "assetName",
        label: "Asset Name",
        type: "text",
        placeholder: "Asset Name",
        icon: "bi bi-person",
        side: 0,
    },
    {
        name: "assetSerial",
        label: "Asset Serial",
        type: "text",
        placeholder: "Asset Serial",
        icon: "bi bi-building",
        side: 0,
    },
    {
        name: "manufacturer",
        label: "Manufacturer",
        type: "text",
        placeholder: "Manufacturer",
        icon: "bi bi-mortarboard",
        side: 0,
    },
    {
        name: "assetTag",
        label: "Asset Tag",
        type: "text",
        placeholder: "Asset Tag",
        icon: "bi bi-envelope",
        side: 0,
    }
];

module.exports = assetFields