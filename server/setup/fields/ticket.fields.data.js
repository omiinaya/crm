const moment = require('moment'); 

const issueTypes = ["Flat-Rate Labor", "Warranty Labor", "In-House Labor"];
const technicians = ["Omar", "Manny", "Matias"];

const ticketFields = [
    {
        name: "ticketCustomerName",
        label: "Customer",
        type: "typeahead",
        placeholder: "Customer Name",
        icon: "bi bi-person",
        data: 'STRING',
        show: true,
    },
    {
        name: "ticketCustomerId",
        label: "Customer Id",
        type: "text",
        placeholder: "Customer Id",
        icon: "bi bi-person",
        data: 'STRING',
        show: false,
    },
    {
        name: "ticketTitle",
        label: "Ticket Title",
        type: "text",
        placeholder: "Ticket Title",
        icon: "bi bi-card-heading",
        data: 'STRING',
        show: true,
    },
    {
        name: "ticketStatus",
        label: "Ticket Status",
        type: "text",
        placeholder: "Ticket Status",
        icon: "bi bi-card-heading",
        show: false,
        data: 'STRING'
    },
    {
        name: "ticketType",
        label: "Issue Type",
        type: "dropdown",
        icon: "bi bi-card-list",
        show: true,
        data: 'STRING',
        options: JSON.stringify(issueTypes)
    },
    {
        name: "ticketDesc",
        label: "Description",
        type: "textarea",
        placeholder: "Description",
        icon: "bi bi-card-text",
        show: true,
        data: 'STRING'
    },
    {
        name: "ticketDue",
        label: "Due Date",
        type: "date",
        icon: "bi bi-calendar-event",
        show: true,
        allowNull: true,
        data: 'STRING'
    },
    {
        name: "ticketTech",
        label: "Technician",
        type: "dropdown",
        icon: "bi bi-person",
        show: true,
        data: 'STRING',
        options: JSON.stringify(technicians)
    },
];

module.exports = ticketFields