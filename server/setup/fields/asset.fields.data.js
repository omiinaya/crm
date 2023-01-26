//LOAD THESE FROM DB
const assetTypes = ['Laptop', 'Desktop', 'Tablet', 'Phone']
const manufacturers = ['Lenovo', 'Fujitsu', 'DELL', 'Apple', 'HP', 'MSI']

const assetFields = [
  {
    name: "assetCustomerName",
    label: "Customer",
    type: "typeahead",
    placeholder: "Customer Name",
    icon: "bi bi-person",
    data: 'STRING',
    allowNull: false,
    show: true
  },
  {
    name: "assetCustomerId",
    label: "Customer Id",
    type: "text",
    placeholder: "Customer Id",
    icon: "bi bi-person",
    data: 'INTEGER',
    allowNull: false,
    show: false
  },
  {
    name: "assetTicketId",
    label: "Ticket #",
    type: "text",
    placeholder: "Ticket #",
    icon: "bi bi-tag",
    data: 'INTEGER',
    allowNull: false,
    show: true
  },
  {
    name: "assetType",
    label: "Asset Type",
    type: "dropdown",
    placeholder: "Asset Type",
    icon: "bi bi-list-check",
    data: 'STRING',
    allowNull: false,
    show: true,
    options: JSON.stringify(assetTypes)
  },
  {
    name: "assetBrand",
    label: "Asset Brand",
    type: "dropdown",
    placeholder: "Asset Brand",
    icon: "bi bi-nut",
    data: 'STRING',
    allowNull: false,
    show: true,
    options: JSON.stringify(manufacturers)
  },
  {
    name: "assetName",
    label: "Asset Name",
    type: "text",
    placeholder: "Asset Name",
    icon: "bi bi-laptop",
    data: 'STRING',
    allowNull: false,
    show: true,
  },
  {
    name: "assetSerial",
    label: "Asset Serial",
    type: "text",
    placeholder: "Asset Serial",
    icon: "bi bi-laptop",
    data: 'STRING',
    allowNull: false,
    show: true,
  },
  {
    name: "assetTag",
    label: "Asset Tag",
    type: "text",
    placeholder: "Asset Tag",
    icon: "bi bi-tag",
    data: 'STRING',
    allowNull: true,
    show: true,
  },
];

module.exports = assetFields;
