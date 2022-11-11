const customerSettingsFields = [
    {
        name: "taxRate",
        label: "Tax Rate",
        type: "checkbox",
        placeholder: "Tax Rate",
        icon: "bi bi-percent",
        side: 0,
    },
    {
        name: "taxFree",
        label: "Tax Free",
        type: "checkbox",
        placeholder: "Tax Free",
        icon: "bi bi-gift",
        side: 0,
    },
    {
        name: "enablePortal",
        label: "Enable Portal User",
        type: "checkbox",
        placeholder: "Enable Portal",
        icon: "bi bi-sliders",
        side: 0,
    },
    {
        name: "smsEnabled",
        label: "SMS Service Enabled",
        type: "checkbox",
        placeholder: "SMS Service Enabled",
        icon: "bi bi-phone",
        side: 1,
    },
    {
        name: "billingEmails",
        label: "Receive Billing Emails",
        type: "checkbox",
        placeholder: "Receive Billing Emails",
        icon: "bi bi-envelope-plus",
        side: 1,
    },
    {
        name: "marketingEmails",
        label: "Receive Marketing Emails",
        type: "checkbox",
        placeholder: "Receive Marketing Emails",
        icon: "bi bi-envelope-plus",
        side: 1,
    },
    {
        name: "reportEmails",
        label: "Receive Report Emails",
        type: "checkbox",
        placeholder: "Receive Report Emails",
        icon: "bi bi-envelope-exclamation",
        side: 1,
    },
    {
        name: "noEmails",
        label: "No Emails Of Any Kind",
        type: "checkbox",
        placeholder: "No Emails Of Any Kind",
        icon: "bi bi-envelope-slash",
        side: 1,
    }
];

module.exports = customerSettingsFields