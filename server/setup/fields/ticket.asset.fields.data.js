const issueTypes = ["Flat-Rate Labor", "Warranty Labor", "In-House Labor"];

const ticketFields = [
    {
        name: "assetSearch",
        label: "Search",
        type: "typeahead",
        placeholder: "Search existing assets",
        icon: "bi bi-card-list",
        data: 'STRING'
    },
    {
        name: "assetType",
        label: "Asset Type",
        type: "dropdown",
        //placeholder: "Issue Type",
        icon: "bi bi-card-list",
        data: 'STRING',
        options: JSON.stringify(issueTypes)
    },
    {
        name: "assetName",
        label: "Asset Name",
        type: "text",
        placeholder: "Asset Name",
        icon: "bi bi-card-text",
        data: 'STRING'
    },
    {
        name: "assetSerial",
        label: "Serial Number",
        type: "text",
        placeholder: "Serial Number",
        icon: "bi bi-card-text",
        data: 'STRING'
    },
];

module.exports = ticketFields