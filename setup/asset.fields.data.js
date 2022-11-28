//LOAD THESE FROM DB
const assetTypes = ['Laptop', 'Desktop', 'Tablet', 'Phone']
const manufacturers = ['Lenovo', 'Fujitsu', 'DELL', 'Apple', 'HP', 'MSI']

const assetFields = [
  {
    name: "customerName",
    label: "Customer Name",
    type: "text",
    placeholder: "Customer Name",
    icon: "bi bi-person",
    side: 0,
    data: 'STRING',
    show: true
  },
  {
    name: "customerId",
    label: "Customer Id",
    type: "text",
    placeholder: "Customer Id",
    icon: "bi bi-person",
    side: 0,
    data: 'INTEGER',
    show: false
  },
  {
    name: "ticketNumber",
    label: "Ticket Number",
    type: "text",
    placeholder: "Ticket Number",
    icon: "bi bi-tag",
    side: 0,
    data: 'INTEGER',
    show: true
  },
  {
    name: "type",
    label: "Asset Type",
    type: "dropdown",
    placeholder: "Asset Type",
    icon: "bi bi-list-check",
    side: 0,
    data: 'STRING',
    show: true,
    options: JSON.stringify(assetTypes)
  },
  {
    name: "name",
    label: "Asset Name",
    type: "text",
    placeholder: "Asset Name",
    icon: "bi bi-laptop",
    side: 0,
    data: 'STRING',
    show: true,
  },
  {
    name: "serial",
    label: "Asset Serial",
    type: "text",
    placeholder: "Asset Serial",
    icon: "bi bi-laptop",
    side: 0,
    data: 'STRING',
    show: true,
  },
  {
    name: "manufacturer",
    label: "Manufacturer",
    type: "dropdown",
    placeholder: "Manufacturer",
    icon: "bi bi-nut",
    side: 0,
    data: 'STRING',
    show: true,
    options: JSON.stringify(manufacturers)
  },
  {
    name: "tag",
    label: "Asset Tag",
    type: "text",
    placeholder: "Asset Tag",
    icon: "bi bi-tag",
    data: 'STRING',
    show: true,
    side: 0,
  },
];

module.exports = assetFields;
