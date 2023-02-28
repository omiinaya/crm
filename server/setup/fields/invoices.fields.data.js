const ticketFields = [
    {
        name: "invoiceCustomerId",
        label: "Customer Id",
        type: "text",
        placeholder: "Customer Id",
        icon: "bi bi-person",
        show: false,
        data: 'STRING',
    },
    {
        name: "invoiceTechId",
        label: "Technician Id",
        type: "text",
        placeholder: "Customer Id",
        icon: "bi bi-person",
        show: false,
        data: 'STRING',
    },
    {
        name: "invoiceMessage",
        label: "Invoice Message",
        type: "text",
        icon: "bi bi-calendar-event",
        show: true,
        data: 'STRING'
    },
    {
        name: "invoiceItem",
        label: "Invoice Item",
        type: "text",
        placeholder: "Invoice Item",
        icon: "bi bi-card-heading",
        show: true,
        data: 'STRING',
    },
    {
        name: "invoiceItemQuantity",
        label: "Item Quantity",
        type: "text",
        placeholder: "0",
        icon: "bi bi-card-heading",
        show: true,
        data: 'STRING'
    },
    {
        name: "invoiceName",
        label: "Invoice Name",
        type: "text",
        placeholder: "0",
        icon: "bi bi-card-heading",
        show: true,
        data: 'STRING'
    },
    {
        name: "invoiceCreatedBy",
        label: "Item Quantity",
        type: "text",
        placeholder: "0",
        icon: "bi bi-card-heading",
        show: true,
        data: 'STRING'
    },
    {
        name: "invoiceDate",
        label: "Invoice Date",
        type: "text",
        placeholder: "0",
        icon: "bi bi-card-heading",
        show: true,
        data: 'STRING'
    },
    {
        name: "invoiceTaxRate",
        label: "Tax Rate",
        type: "text",
        placeholder: "0",
        icon: "bi bi-card-heading",
        show: true,
        data: 'STRING'
    },
    {
        name: "invoiceDatePaid",
        label: "Date Paid",
        type: "text",
        placeholder: "0",
        icon: "bi bi-card-heading",
        show: true,
        data: 'STRING'
    },
    {
        name: "invoiceTechNotes",
        label: "Tech Notes",
        type: "text",
        placeholder: "0",
        icon: "bi bi-card-heading",
        show: true,
        data: 'STRING'
    },
];

module.exports = ticketFields