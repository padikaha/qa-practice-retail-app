# GreenBasket Software Requirements Specification

## 1. Document Information

| Item | Details |
| --- | --- |
| Document Name | GreenBasket Software Requirements Specification |
| Application Name | GreenBasket |
| Version | Version 1 |
| Primary Audience | Manual QA trainees and returning manual testers |
| Frontend | React |
| Backend | Node.js with Express |
| Database | SQLite |
| Development Environment | Runs locally on a MacBook |
| Version Control | Git and GitHub |
| Document Status | Draft for Version 1 planning |

## 2. Purpose

GreenBasket is a beginner-friendly retail order management web application created for manual software testing practice.

The purpose of this document is to explain what GreenBasket Version 1 is expected to do. A manual QA tester should be able to read this document and understand the application's expected behavior, write test cases, execute tests, report defects, and perform regression testing.

This document focuses only on Version 1. It does not describe future advanced features or technical implementation details.

## 3. Business Context

GreenBasket simulates a small online retail shopping experience. The user can browse products, search for products, view product details, add products to a cart, update the cart, and complete a simple checkout.

The application is not intended to be a real production shopping website. It is a learning tool. Its main business value is that it gives manual QA trainees realistic workflows to test without the complexity of payment systems, login, cloud hosting, or enterprise-level features.

GreenBasket should include enough behavior to support positive testing, negative testing, boundary testing, regression testing, and defect reporting.

## 4. Product Scope

Version 1 includes only the following features:

- View products
- Search products
- View product details
- Add product to cart
- Update cart quantity
- Remove product from cart
- Checkout
- Order confirmation

Version 1 should be simple, stable, and easy to run locally. The application should help testers practice common retail workflows from product browsing through order confirmation.

## 5. Users

### Manual QA Trainee

The main user is a beginner or returning manual QA tester. This user needs clear application behavior so they can create and execute test cases.

### QA Instructor Or Mentor

A QA instructor or mentor may use GreenBasket to assign practice exercises, review test cases, and explain common defects.

### Practice Shopper

The practice shopper is the person using the application as if they are buying products. In most cases, this will also be the QA trainee during testing.

## 6. Assumptions

- The application runs locally on a MacBook.
- The frontend is built with React.
- The backend is built with Node.js and Express.
- SQLite is used as the local database.
- Product data is available before the tester starts testing.
- No real payment is collected.
- No login is required.
- The same browser session may keep cart data while the user is using the app.
- The application is designed for learning, not production retail use.

## 7. Dependencies

- React must be available for the frontend application.
- Node.js and npm must be available for the backend application.
- Express is used to create backend API endpoints.
- SQLite is used to store product and order-related data locally.
- Git is used for version control.
- GitHub is used for remote repository hosting.
- A modern browser such as Chrome, Safari, Firefox, or Edge is needed for testing.

## 8. Functional Requirements

| Requirement ID | Requirement | Description | Acceptance Criteria | Possible Test Ideas |
| --- | --- | --- | --- | --- |
| FR-001 | View Products | The user shall be able to view a list of available products on the product listing page. Each product should show basic information such as name, price, category, and availability status. | Products are displayed when product data exists.<br>If no products are available, a clear empty state message is displayed.<br>Each product shows enough information for the user to understand what it is. | Verify products display when data exists.<br>Verify name, price, category, and availability are visible.<br>Verify the empty state when no products are available. |
| FR-002 | Search Products | The user shall be able to search products by entering text into a search field. The search should help the user find products by product name or related text. | The user can enter search text.<br>Matching products are displayed.<br>If no products match, a clear no-results message is displayed.<br>Clearing search shows the product list again. | Search using a full product name.<br>Search using text that does not match any product.<br>Clear search and verify the full product list returns. |
| FR-003 | View Product Details | The user shall be able to open a product detail page or detail view from the product listing page. The detail view should show more information about the selected product. | The user can select a product from the list.<br>The detail view displays product name, description, price, category, and availability.<br>The user can return to the product list.<br>An invalid product shows a helpful error message. | Open details for a valid product.<br>Try to open an invalid product URL.<br>Return from the detail view to the product list. |
| FR-004 | Add Product To Cart | The user shall be able to add an available product to the shopping cart. The cart should show the selected product and correct quantity. | The user can add an available product.<br>The cart count or summary updates.<br>Adding the same product again increases quantity.<br>An unavailable product cannot be added. | Add one available product and verify it appears in the cart.<br>Add the same product twice and verify quantity increases.<br>Try to add an unavailable product. |
| FR-005 | Update Cart Quantity | The user shall be able to change the quantity of a product in the cart. The cart total should update when quantity changes. | The user can increase and decrease cart item quantity.<br>Cart subtotal and total update correctly.<br>Quantity cannot be less than 1.<br>Quantity cannot exceed the allowed maximum or available stock limit. | Increase quantity and verify total updates.<br>Decrease quantity to 1.<br>Try 0, a negative number, or a quantity above the limit. |
| FR-006 | Remove Product From Cart | The user shall be able to remove a product from the cart. If all items are removed, the cart should show an empty cart message. | The user can remove one item from the cart.<br>Removed items no longer appear.<br>Cart totals update after removal.<br>An empty cart message is shown when no items remain. | Remove one item from a cart with multiple items.<br>Remove the only item and verify the empty cart message.<br>Verify the total changes after removal. |
| FR-007 | Checkout | The user shall be able to checkout with the items in the cart by entering required customer and shipping information. The checkout form should validate required fields before submission. | Checkout can start only when the cart has at least one item.<br>The checkout page displays selected items and total amount.<br>Required fields are validated.<br>Invalid or missing information shows clear validation messages. | Submit checkout with valid required fields.<br>Submit checkout with required fields blank.<br>Enter invalid email or ZIP code formats. |
| FR-008 | Order Confirmation | After successful checkout, the user shall see an order confirmation page with enough information to verify the correct order was created. | Successful checkout creates an order confirmation.<br>The confirmation displays an order number or confirmation ID.<br>Ordered items and total amount are shown.<br>The cart is cleared after successful checkout.<br>Failed order submission shows a clear error message. | Complete checkout and verify the confirmation page.<br>Verify ordered items and total match the cart.<br>Simulate or test an order failure. |

## 9. Non-Functional Requirements

| Requirement ID | Category | Requirement | Measurement / Expected Behavior |
| --- | --- | --- | --- |
| NFR-001 | Performance | Product listing and cart actions should respond quickly during local testing. | Simple pages and common actions should complete within a few seconds on a typical MacBook development setup. |
| NFR-002 | Usability | Labels, buttons, messages, and validation errors should be easy for a beginner tester to understand. | Important actions such as add to cart, remove item, and checkout should be easy to find and clearly named. |
| NFR-003 | Compatibility | The application should work in modern desktop browsers. | The app should be usable in Chrome, Safari, Firefox, and Edge on common laptop screen sizes. |
| NFR-004 | Reliability | The application should handle common errors without crashing. | Failed searches, empty carts, missing products, and failed order submissions should show clear messages. |
| NFR-005 | Maintainability | Frontend, backend, documentation, and QA materials should stay organized in separate folders. | Code and documentation should use clear names so beginner developers and testers can understand the project. |

## 10. Business Rules

| Business Rule ID | Rule | Reason |
| --- | --- | --- |
| BR-001 | A user can browse products without logging in. | Login is not included in Version 1. |
| BR-002 | A user can only add available products to the cart. | The cart should represent products that can be ordered. |
| BR-003 | Cart quantity must be at least 1. | A cart item with zero or negative quantity is not valid. |
| BR-004 | Cart quantity must not exceed the allowed maximum or available stock limit. | This gives testers clear boundary conditions to validate. |
| BR-005 | Checkout cannot be completed with an empty cart. | An order must contain at least one product. |
| BR-006 | Checkout requires valid customer and shipping information. | The order needs enough information to create a valid confirmation. |
| BR-007 | An order confirmation is shown only after successful checkout. | Confirmation should represent a completed order action. |
| BR-008 | No real payment is collected in Version 1. | Payment processing is intentionally out of scope. |
| BR-009 | No email confirmation is sent in Version 1. | Email notifications are intentionally out of scope. |

## 11. Out Of Scope

The following items are not included in Version 1:

- Login
- User registration
- Payment gateway
- Email notifications
- Cloud deployment
- Inventory management
- Coupons
- Returns
- Recommendation engine
- Reporting dashboard
- Admin portal
- Order history
- Product reviews

These items should not be treated as defects if they are missing from Version 1.

## 12. Acceptance Criteria

GreenBasket Version 1 is acceptable when:

- A user can view available products.
- A user can search for products.
- A user can view product details.
- A user can add available products to the cart.
- A user can update product quantities in the cart.
- A user can remove products from the cart.
- A user can complete checkout with valid information.
- A user receives an order confirmation after successful checkout.
- Required validation messages are shown during checkout.
- Empty, invalid, and error states are handled with clear messages.
- The application runs locally using the selected Version 1 technology stack.

## 13. Future Enhancements (Version 2+)

The following features are planned for future versions because they would add useful practice scenarios but are not needed for the first learning release:

- Login: Deferred so Version 1 can focus on shopping and checkout workflows.
- User Registration: Deferred because account creation adds extra validation and security scenarios.
- Admin Portal: Deferred because Version 1 does not require product or order management screens.
- Inventory Management: Deferred because Version 1 only needs simple availability behavior.
- Payment Gateway: Deferred because real or simulated payment flows add complexity.
- Order History: Deferred because Version 1 only confirms the current order.
- Product Reviews: Deferred because reviews require additional user input and moderation rules.
- Email Notifications: Deferred because Version 1 should not depend on email services.
- Cloud Deployment: Deferred because Version 1 is intended to run locally on a MacBook.
