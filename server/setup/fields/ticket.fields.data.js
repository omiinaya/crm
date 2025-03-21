const issueTypes = ["Flat-Rate", "Warranty", "In-House"];
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
        name: "ticketAssetId",
        label: "Asset Id",
        type: "text",
        icon: "bi bi-calendar-event",
        show: false,
        allowNull: true,
        data: 'STRING'
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
        name: "ticketTech",
        label: "Technician",
        type: "dropdown",
        icon: "bi bi-person",
        show: true,
        data: 'STRING',
        options: JSON.stringify(technicians)
    },
    {
        name: "ticketTechId",
        label: "Technician",
        type: "dropdown",
        icon: "bi bi-person",
        show: false,
        data: 'STRING',
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
];

module.exports = ticketFields