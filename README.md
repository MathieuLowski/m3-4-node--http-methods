# Module 3-4: Express Methods

## The Order Form

Take a look at the form that is available at [`/order-form`](http://localhost:8000/order-form). The form itself is in the `public` folder.

It is an order form for promotional products. Users need to fill out the complete form. All fields are required.

### Task

For this exercise, you will need to create the endpoint that this form submits to. You will need to validate the data you receive and respond to the request appropriately.

To be clear, **you don't need to edit any of the code in `public/order-form/scripts.js`**. This work is done for you. Your primary task is to create the server endpoint to process the order. Once your server is complete, the form should work fine.

#### Validation

1. Validate that the user has not yet placed an order (because the product is free, we limit 1 per customer). We cannot know this with 100% accuracy, but we can refuse users

   - whose name is already in our database.
   - whose email is already in our database.
   - whose address matches an address already in our database. Use only the street number and name for this.

2. Validate that delivery address is within Canada. We only ship to Canada!
3. Validate that the item selected is actually in stock.

If any of these validations fail, return an error as a response.

| Error ID          | Description                                        |
| ----------------- | -------------------------------------------------- |
| 'unavailable'     | Item out of stock                                  |
| 'repeat-customer' | Customer has already purchased an item             |
| 'undeliverable'   | Customer didn't supply a Canadian shipping address |
| 'missing-data'    | Some of the required information was not provided  |

The form expects a JSON object as a response. For example, if everything works great:

```json
{
  "status": "success"
}
```

If there is an error, you should change the `status`, as well as provide the error:

```json
{
  "status": "error",
  "error": "unavailable"
}
```

(use the error ID from the table above; for example, if the required data was missing, it should be "missing-data" instead of "unavailable")

### Details

Take a look at `promo.js` in the `data` folder. This is your _"database"_. It contains current stock levels as well as past customers... Business isn't exactly booming.

You will need to import this data wherever you need to use it. At the top of the file you can require them with

```js
const { stock, customers } = require("<PATH_TO_FILE>");
```

#### Endpoint details

The form makes a POST request to the `/order` path; you will need to create this endpoint in Express.

You don't need to change the front-end at all; it's already set up to send the correct data when the form is submitted, and to handle any error codes.

### Order Confirmed

If the order is successfully placed, the frontend will redirect the user to `/order-confirmed`. This page doesn't exist yet.

Create a new file at `/public/order-confirmed.html`. There is no provided design for this page; it is sufficient to show a no-frills confirmation message.

---

<center>🟡 - Minimally complete workshop (75%) - 🟡</center>

---

### Create a Confirmation Page

Instead of showing a "static" order-confirmed page, render a template that includes the order information. For example:

> **Thanks for ordering, [name]!**
>
> Your order of [product] will be sent to your home in [province], Canada. Thank you for participating!

To accomplish this, you'll need:

- A new GET endpoint for `/order-confirmed`
- A new template with variables for the dynamic content.

---

<center>🟢 - Complete workshop (100%) - 🟢</center>

---

## Stretch Goal

Create a todo list! (You must have seen this coming.)

**Do NOT look at yesterday's workshop to complete this.**

- create an endpoint called `/todos` to render your todo app.
- create an endpoint called `/data` to receive the data from the form `post` request.

### Super Stretch Goal

- multiple lists?
- a `done` button that crosses out the item.
- a `delete` button that deletes the item.
