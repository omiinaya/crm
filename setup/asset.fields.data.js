const phoneTypes = ["Mobile", "Home", "Office", "Fax", "Other"];
const customerTypes = ["Individual", "Business", "School"];

const assetFields = [
    {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "First Name",
        icon: "bi bi-person",
        side: 0,
    },
    {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Last Name",
        icon: "bi bi-person",
        side: 0,
    },
    {
        name: "customerType",
        label: "Customer Type",
        type: "checkbox",
        icon: "bi bi-bar-chart-steps",
        side: 0,
        options: JSON.stringify(customerTypes)
    },
    {
        name: "businessName",
        label: "Business Name",
        type: "text",
        placeholder: "Business Name",
        icon: "bi bi-building",
        side: 0,
    },
    {
        name: "schoolName",
        label: "School Name",
        type: "text",
        placeholder: "School Name",
        icon: "bi bi-mortarboard",
        side: 0,
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email Address",
        icon: "bi bi-envelope",
        side: 0,
    },
    {
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Phone Number",
        icon: "bi bi-telephone",
        side: 0,
        options: JSON.stringify(phoneTypes)
    },
    {
        name: "address1",
        label: "Address 1",
        type: "text",
        placeholder: "Address 1 (Street Address or P.O. Box)",
        icon: "bi bi-geo-alt",
        side: 1,
    },
    {
        name: "address2",
        label: "Address 2",
        type: "text",
        placeholder: "Address 2 (Apt, Suite, Unit, Building)",
        icon: "bi bi-geo-alt",
        side: 1,
    },
    {
        name: "city",
        label: "City",
        type: "text",
        placeholder: "City",
        icon: "bi bi-geo-alt",
        side: 1,
    },
    {
        name: "state",
        label: "State",
        type: "text",
        placeholder: "State",
        icon: "bi bi-geo-alt",
        side: 1,
    },
    {
        name: "zip",
        label: "Zip Code",
        type: "text",
        placeholder: "Zip Code",
        icon: "bi bi-geo-alt",
        side: 1,
    },
    {
        name: "referredBy",
        label: "Referred By",
        type: "text",
        placeholder: "Referral",
        icon: "bi bi-arrow-right-circle",
        side: 1,
    },
];

module.exports = assetFields