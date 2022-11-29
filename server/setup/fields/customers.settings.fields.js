const customerSettingsFields = [
    {
        name: "taxRate",
        label: "Tax Rate",
        type: "checkbox",
        placeholder: "Tax Rate",
        icon: "bi bi-clipboard-pulse",
        side: 0,
        data: { type:'BOOLEAN', default: false },
        options: JSON.stringify({ default: true })
    },
    {
        name: "taxFree",
        label: "Tax Free",
        type: "checkbox",
        placeholder: "Tax Free",
        icon: "bi bi-clipboard-x",
        side: 0,
        data: { type:'BOOLEAN', default: false },
        options: JSON.stringify({ default: false })
    },
    {
        name: "enablePortal",
        label: "Enable Portal",
        type: "checkbox",
        placeholder: "Enable Portal",
        icon: "bi bi-sliders",
        side: 0,
        data: { type:'BOOLEAN', default: false },
        options: JSON.stringify({ default: false })
    },
    {
        name: "enableSMS",
        label: "SMS Service Enabled",
        type: "checkbox",
        placeholder: "SMS Service Enabled",
        icon: "bi bi-phone",
        side: 1,
        data: { type:'BOOLEAN', default: true },
        options: JSON.stringify({ default: true })
    },
    {
        name: "billingEmails",
        label: "Receive Billing Emails",
        type: "checkbox",
        placeholder: "Receive Billing Emails",
        icon: "bi bi-envelope-plus",
        side: 1,
        data: { type:'BOOLEAN', default: true },
        options: JSON.stringify({ default: true })
    },
    {
        name: "marketingEmails",
        label: "Receive Marketing Emails",
        type: "checkbox",
        placeholder: "Receive Marketing Emails",
        icon: "bi bi-envelope-plus",
        side: 1,
        data: { type:'BOOLEAN', default: true },
        options: JSON.stringify({ default: true })
    },
    {
        name: "reportEmails",
        label: "Receive Report Emails",
        type: "checkbox",
        placeholder: "Receive Report Emails",
        icon: "bi bi-envelope-exclamation",
        side: 1,
        data: { type:'BOOLEAN', default: true },
        options: JSON.stringify({ default: true })
    },
    {
        name: "noEmails",
        label: "No Emails Of Any Kind",
        type: "checkbox",
        placeholder: "No Emails Of Any Kind",
        icon: "bi bi-envelope-slash",
        side: 1,
        data: { type:'BOOLEAN', default: false },
        options: JSON.stringify({ default: false })
    }
];

module.exports = customerSettingsFields