const moment = require('moment'); 

const issueTypes = ["Flat-Rate Labor", "Warranty Labor", "In-House Labor"];
const technicians = ["Omar", "Manny", "Matias"];

const ticketFields = [
    {
        name: "title",
        label: "Ticket Title",
        type: "text",
        placeholder: "Ticket Title",
        icon: "bi bi-person",
        data: 'STRING'
    },
    {
        name: "type",
        label: "Issue Type",
        type: "dropdown",
        //placeholder: "Issue Type",
        icon: "bi bi-person",
        data: 'STRING',
        options: JSON.stringify(issueTypes)
    },
    {
        name: "description",
        label: "Description",
        type: "text",
        placeholder: "Description",
        icon: "bi bi-bar-chart-steps",
        data: 'STRING'
    },
    {
        name: "dueDate",
        label: "Due Date",
        type: "date",
        placeholder: moment(

        ).format('MMMM DD YYYY'),
        icon: "bi bi-bar-chart-steps",
        data: 'STRING'
    },
    {
        name: "technician",
        label: "Technician",
        type: "dropdown",
        //placeholder: "Issue Type",
        icon: "bi bi-person",
        data: 'STRING',
        options: JSON.stringify(technicians)
    },
];

module.exports = ticketFields