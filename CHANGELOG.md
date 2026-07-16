# Changelog

All notable changes to the GreenBasket QA Practice Retail Application will be documented in this file.

---

# Version 0.1.0 (Current Development)

## Sprint 1 – Software Requirements Specification

### Added
- Initial Software Requirements Specification (SRS)
- Functional Requirements (FR)
- Non-Functional Requirements (NFR)
- Business Rules
- Assumptions and Dependencies
- Acceptance Criteria
- Future Enhancements section

---

## Sprint 2 – React Frontend Foundation

### Added
- React + Vite frontend project
- Initial GreenBasket landing page
- Local development environment
- Responsive project structure

---

## Sprint 3 – Product Catalog

### Added
- Product catalog
- ProductList component
- ProductCard component
- Product data source (`products.js`)
- Responsive product grid

### React Concepts
- Components
- Props
- Rendering Lists using `map()`
- Separation of Data and UI

---

## Sprint 4 – Product Search

### Added
- Live product search
- SearchBar component
- Case-insensitive search
- Partial text matching
- Whitespace trimming
- "No products found" message

### React Concepts
- useState
- Controlled Components
- Conditional Rendering
- Dynamic Filtering

---

## Sprint 5 – Product Details

### Added
- Product Details panel
- Product selection
- Selected product highlighting
- Product category
- SKU
- Product description

### React Concepts
- Event Handling
- Component Communication
- State Management
- Conditional Rendering

---

## Sprint 6 – Shopping Cart

### Added
- Shopping Cart
- CartItem component
- Add to Cart
- Quantity management
- Remove item
- Cart subtotal
- Item count
- Empty cart message

### Improved
- Responsive Shopping Cart layout
- Sticky cart on desktop
- Compact Product Details empty state
- Improved cart item spacing and layout

### Business Rules
- Out-of-stock products cannot be added
- Duplicate products increase quantity
- Quantity never falls below one
- Cart subtotal calculated dynamically

### React Concepts
- Array state management
- Immutable state updates
- Derived state
- Event callbacks
- Business logic in React

---

## Sprint 7 – Checkout (In Progress)

### Planned
- Checkout form
- Customer information
- Form validation
- Order summary
- Order confirmation
- Continue Shopping
- Expanded product catalog (10 products)

---

# Roadmap

| Version | Status | Major Milestone |
|----------|--------|-----------------|
| 0.1.0 | In Progress | Interactive Frontend |
| 0.2.0 | Planned | Express Backend |
| 0.3.0 | Planned | SQLite Database |
| 0.4.0 | Planned | Authentication |
| 0.5.0 | Planned | QA Learning Platform |
| 1.0.0 | Vision | Production-Ready GreenBasket |