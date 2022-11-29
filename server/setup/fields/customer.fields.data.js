const phoneTypes = ["Mobile", "Home", "Office", "Fax", "Other"];
const customerTypes = ["Individual", "Business", "School"];

const customerFields = [
    {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "First Name",
        icon: "bi bi-person",
        data: 'STRING'
    },
    {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Last Name",
        icon: "bi bi-person",
        data: 'STRING'
    },
    {
        name: "customerType",
        label: "Customer Type",
        type: "checkbox",
        icon: "bi bi-bar-chart-steps",
        data: 'STRING',
        options: JSON.stringify(customerTypes)
    },
    {
        name: "businessName",
        label: "Business Name",
        type: "text",
        placeholder: "Business Name",
        icon: "bi bi-building",
    },
    {
        name: "schoolName",
        label: "School Name",
        type: "text",
        placeholder: "School Name",
        icon: "bi bi-mortarboard",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email Address",
        icon: "bi bi-envelope",
        data: 'STRING'
    },
    {
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Phone Number",
        icon: "bi bi-telephone",
        data: 'STRING',
        options: JSON.stringify(phoneTypes)
    },
    /*
    {
        name: "referredBy",
        label: "Referred By",
        type: "text",
        placeholder: "Referral",
        icon: "bi bi-arrow-right-circle",
        side: 1,
    },
    */
];

module.exports = customerFields