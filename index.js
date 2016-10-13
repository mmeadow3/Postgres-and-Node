'use strict'

// const knex = require('knex')({
//     client: 'sqlite3',
//     connection: {
//         filename: 'db/Chinook_Sqlite.sqlite',
//     },
//     useNullAsDefault: true,
// })

const knex = require('knex')({
    client: 'pg',
    connection: "postgres://localhost:5432/Chinook"
})


// console.log('5. Provide a query showing a unique list of billing countries from the Invoice table.')
knex('Invoice').distinct('BillingCountry').orderBy('BillingCountry').then(console.log)

// console.log('6. Provide a query showing the invoices of customers who are from Brazil.')
// knex('Invoice').where('BillingCountry', 'Brazil').then(console.log)

// console.log(`7. Provide a query that shows the invoices associated with each sales agent. The resultant table should include the Sales Agent's full name.`)
// knex('Invoice')
//     .select(knex.raw(`
//     Employee.FirstName || ' ' || Employee.LastName as SalesAgent,
//     Invoice.*
//   `))
//     .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
//     .join('Employee', 'Customer.SupportRepId', 'Employee.EmployeeId')
//     .then(console.log)

// console.log(`8. Provide a query that shows the Invoice Total, Customer name, Country and Full Sales Agent name for all invoices and customers.`)
// knex("Invoice")
//     .select(knex.raw('Invoice.Total, Customer.FirstName, Customer.Country, Employee.LastName'))
//     .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
//     .join('Employee', 'Customer.SupportRepId', 'Employee.EmployeeId')
//     .then(console.log)


/////////Prettier version of my answer/////////////
// console.log(`8. Provide a query that shows the Invoice Total, Customer name, Country and Full Sales Agent name for all invoices and customers.`)
// knex('Invoice')
//     .select(knex.raw(`Employee.FirstName || ' ' || Employee.LastName as SalesAgent`))
//     .select(knex.raw(`Customer.FirstName || ' ' || Customer.LastName as Customer`))
//     .select('Customer.Country')
//     .sum('Invoice.Total as Total')
//     .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
//     .join('Employee', 'SupportRepId', 'EmployeeId')
//     .groupBy('Customer.CustomerId')
//     .orderBy('Total', 'desc')
//     .then(console.log)


knex.destroy()