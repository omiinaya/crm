//LOAD THESE FROM DB
const assetTypes = ['Laptop', 'Desktop', 'Tablet', 'Phone']
const manufacturers = ['Lenovo', 'Fujitsu', 'DELL', 'Apple', 'HP', 'MSI']

const assetFields = [
  {
    name: "assetCustomerName",
    label: "Customer Name",
    type: "typeahead",
    placeholder: "Customer Name",
    icon: "bi bi-person",
    data: 'STRING',
    show: true
  },
  {
    name: "assetCustomerId",
    label: "Customer Id",
    type: "text",
    placeholder: "Customer Id",
    icon: "bi bi-person",
    data: 'INTEGER',
    show: false
  },
  {
    name: "assetTicketNumber",
    label: "Ticket Number",
    type: "text",
    placeholder: "Ticket Number",
    icon: "bi bi-tag",
    data: 'INTEGER',
    show: true
  },
  {
    name: "assetType",
    label: "Asset Type",
    type: "dropdown",
    placeholder: "Asset Type",
    icon: "bi bi-list-check",
    data: 'STRING',
    show: true,
    options: JSON.stringify(assetTypes)
  },
  {
    name: "assetName",
    label: "Asset Name",
    type: "text",
    placeholder: "Asset Name",
    icon: "bi bi-laptop",
    data: 'STRING',
    show: true,
  },
  {
    name: "assetSerial",
    label: "Serial Number",
    type: "text",
    placeholder: "Serial Number",
    icon: "bi bi-laptop",
    data: 'STRING',
    show: true,
  },
  {
    name: "assetManufacturer",
    label: "Manufacturer",
    type: "dropdown",
    placeholder: "Manufacturer",
    icon: "bi bi-nut",
    data: 'STRING',
    show: true,
    options: JSON.stringify(manufacturers)
  },
  {
    name: "assetTag",
    label: "Asset Tag",
    type: "text",
    placeholder: "Asset Tag",
    icon: "bi bi-tag",
    data: 'STRING',
    show: true,
  },
];

module.exports = assetFields;
