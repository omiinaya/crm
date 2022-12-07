const phoneTypes = ["Mobile", "Home", "Office", "Fax", "Other"];
const customerTypes = ["Individual", "Business", "School"];

const customerFields = [
    {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "First Name",
        icon: "bi bi-person",
        data: 'STRING',
        show: true,
    },
    {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Last Name",
        icon: "bi bi-person",
        data: 'STRING',
        show: true,
    },
    {
        name: "customerType",
        label: "Customer Type",
        type: "checkbox",
        icon: "bi bi-bar-chart-steps",
        data: 'STRING',
        show: true,
        options: JSON.stringify(customerTypes)
    },
    {
        name: "businessName",
        label: "Business Name",
        type: "text",
        placeholder: "Business Name",
        icon: "bi bi-building",
        show: true,
    },
    {
        name: "schoolName",
        label: "School Name",
        type: "text",
        placeholder: "School Name",
        icon: "bi bi-mortarboard",
        show: true,
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email Address",
        icon: "bi bi-envelope",
        data: 'STRING',
        show: true,
    },
    {
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Phone Number",
        icon: "bi bi-telephone",
        data: 'STRING',
        show: true,
        options: JSON.stringify(phoneTypes)
    },
    {
        name: "primaryPhone",
        label: "Primary Phone",
        type: "text",
        placeholder: "Primary Phone",
        icon: "bi bi-telephone",
        data: 'STRING',
        show: false,
    },
    {
        name: "primaryAddress",
        label: "Primary Address",
        type: "text",
        placeholder: "Primary Address",
        icon: "bi bi-telephone",
        data: 'STRING',
        show: false,
    }
];

module.exports = customerFields