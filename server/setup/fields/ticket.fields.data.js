const moment = require('moment'); 

const issueTypes = ["Flat-Rate Labor", "Warranty Labor", "In-House Labor"];
const technicians = ["Omar", "Manny", "Matias"];

const ticketFields = [
    {
        name: "customerName",
        label: "Customer Name",
        type: "typeahead",
        placeholder: "Customer Name",
        icon: "bi bi-person",
        show: true,
        data: 'STRING'
    },
    {
        name: "customerId",
        label: "Customer Id",
        type: "text",
        placeholder: "Customer Id",
        icon: "bi bi-person",
        show: false,
        data: 'STRING'
    },
    {
        name: "title",
        label: "Ticket Title",
        type: "text",
        placeholder: "Ticket Title",
        icon: "bi bi-card-heading",
        show: true,
        data: 'STRING'
    },
    {
        name: "type",
        label: "Issue Type",
        type: "dropdown",
        //placeholder: "Issue Type",
        icon: "bi bi-card-list",
        show: true,
        data: 'STRING',
        options: JSON.stringify(issueTypes)
    },
    {
        name: "description",
        label: "Description",
        type: "text",
        placeholder: "Description",
        icon: "bi bi-card-text",
        show: true,
        data: 'STRING'
    },
    {
        name: "dueDate",
        label: "Due Date",
        type: "date",
        placeholder: moment(

        ).format('MMMM DD YYYY'),
        icon: "bi bi-calendar-event",
        show: true,
        data: 'STRING'
    },
    {
        name: "technician",
        label: "Technician",
        type: "dropdown",
        //placeholder: "Issue Type",
        icon: "bi bi-person",
        show: true,
        data: 'STRING',
        options: JSON.stringify(technicians)
    },
];

module.exports = ticketFields