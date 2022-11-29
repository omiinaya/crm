const moment = require('moment'); 

const issueTypes = ["Flat-Rate Labor", "Warranty Labor", "In-House Labor"];
const technicians = ["Omar", "Manny", "Matias"];

const ticketFields = [
    {
        name: "search",
        label: "Search",
        type: "typeahead",
        placeholder: "Search existing assets",
        icon: "bi bi-card-list",
        data: 'STRING'
    },
    {
        name: "type",
        label: "Asset Type",
        type: "dropdown",
        //placeholder: "Issue Type",
        icon: "bi bi-card-list",
        data: 'STRING',
        options: JSON.stringify(issueTypes)
    },
    {
        name: "name",
        label: "Asset Name",
        type: "text",
        placeholder: "Asset Name",
        icon: "bi bi-card-text",
        data: 'STRING'
    },
    {
        name: "serial",
        label: "Serial Name",
        type: "text",
        placeholder: "Serial Name",
        icon: "bi bi-card-text",
        data: 'STRING'
    },
];

module.exports = ticketFields