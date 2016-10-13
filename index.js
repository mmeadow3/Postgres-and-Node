'use strict'

// const { Database } = require('sqlite3').verbose()
// const Table = require('cli-table')

// const db = new Database('db/Chinook_Sqlite.sqlite')

// db.serialize(() => {

//   db.all(`
//     SELECT FirstName || " " || LastName AS "Name",
//            CustomerId,
//            Country
//     FROM   Customer
//     WHERE  Country IS NOT "USA"
//   `, (err, customers) => {
//     console.log('1. Provide a query showing Customers (just their full names, customer ID and country) who are not in the US.')
//     console.log(customers)
//   })

//   // db.all(`
//   //   SELECT FirstName || ' ' || LastName AS 'Name',
//   //          CustomerId,
//   //          Country
//   //   FROM   Customer
//   //   WHERE  Country IS 'Brazil'
//   // `, (err, customers) => {
//   //   customers.forEach(({ CustomerId, Name, Country }) => {
//   //     console.log(`${CustomerId}: ${Name} (${Country})`)
//   //   })
//   // })

//   db.each(`
//     SELECT FirstName || " " || LastName AS "Name",
//            CustomerId,
//            Country
//     FROM   Customer
//     WHERE  Country IS "Brazil"
//   `, (err, { CustomerId, Name, Country }) => {
//     console.log('2. Provide a query only showing the Customers from Brazil.') // TODO: fix
//     console.log(`${CustomerId}: ${Name} (${Country})`)
//   })

//   // db.all(`
//   //   SELECT FirstName || " " || LastName AS "Name",
//   //          InvoiceId,
//   //          InvoiceDate,
//   //          BillingCountry
//   //   FROM   Invoice
//   //   JOIN   Customer
//   //   ON     Invoice.CustomerId = Customer.CustomerId
//   //   WHERE  Country = "Brazil"
//   // `, (err, invoices) => {
//   //   const head = ['InvoiceId', 'Name', 'InvoiceDate', 'BillingCountry']
//   //   const tbl = new Table({ head, style : { compact : true } })

//   //   tbl.push(...invoices.map(i => [i.InvoiceId, i.Name, i.InvoiceDate, i.BillingCountry]))
//   //   console.log(tbl.toString())
//   // })

//   {
//     const head = ['InvoiceId', 'Name', 'InvoiceDate', 'BillingCountry']
//     const tbl = new Table({ head, style: { compact: true } })

//     db.each(`
//         SELECT FirstName || " " || LastName AS "Name",
//                InvoiceId,
//                InvoiceDate,
//                BillingCountry
//         FROM   Invoice
//         JOIN   Customer
//         ON     Invoice.CustomerId = Customer.CustomerId
//         WHERE  Country = "Brazil"
//       `,
//       (err, i) => {
//         tbl.push([i.InvoiceId, i.Name, i.InvoiceDate, i.BillingCountry])
//       },
//       () => {
//         console.log(`3. Provide a query showing the Invoices of customers who are from Brazil. The resultant table should show the customer's full name, Invoice ID, Date of the invoice and billing country.`)
//         console.log(tbl.toString())
//       }
//     )
//   }

//   {
//     const head = ['Name']
//     const tbl = new Table({ head, style: { compact: true } })

//     db.each(`
//         SELECT FirstName || " " || LastName AS "Name"
//         FROM   Employee
//         WHERE  Employee.Title = "Sales Support Agent"
//       `,
//       (err, emp) => tbl.push([emp.Name]),
//       () => {
//         console.log('4. Provide a query showing only the Employees who are Sales Agents.')
//         console.log(tbl.toString())
//       }
//     )
//   }
// })

// db.close()

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'db/Chinook_Sqlite.sqlite',
    },
    useNullAsDefault: true,
})

// console.log('5. Provide a query showing a unique list of billing countries from the Invoice table.')
// knex('Invoice').distinct('BillingCountry').orderBy('BillingCountry').then(console.log)

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
console.log(`8. Provide a query that shows the Invoice Total, Customer name, Country and Full Sales Agent name for all invoices and customers.`)
knex('Invoice')
    .select(knex.raw(`Employee.FirstName || ' ' || Employee.LastName as SalesAgent`))
    .select(knex.raw(`Customer.FirstName || ' ' || Customer.LastName as Customer`))
    .select('Customer.Country')
    .sum('Invoice.Total as Total')
    .join('Customer', 'Invoice.CustomerId', 'Customer.CustomerId')
    .join('Employee', 'SupportRepId', 'EmployeeId')
    .groupBy('Customer.CustomerId')
    .orderBy('Total', 'desc')
    .then(console.log)


knex.destroy()