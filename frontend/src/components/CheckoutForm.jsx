import { useState } from 'react'

const initialFormValues = {
  fullName: '',
  email: '',
  phone: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
}

function validateCheckoutForm(values) {
  const errors = {}
  const trimmedValues = {
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    streetAddress: values.streetAddress.trim(),
    city: values.city.trim(),
    state: values.state.trim(),
    zipCode: values.zipCode.trim(),
  }
  const phoneDigits = trimmedValues.phone.replace(/[()\-\s]/g, '')

  if (trimmedValues.fullName.length < 2) {
    errors.fullName = 'Full Name must contain at least 2 non-space characters.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValues.email)) {
    errors.email = 'Email Address must use a valid email format.'
  }

  if (!/^\d{10}$/.test(phoneDigits)) {
    errors.phone = 'Phone Number must contain exactly 10 digits.'
  }

  if (trimmedValues.streetAddress.length < 5) {
    errors.streetAddress = 'Street Address must contain at least 5 characters.'
  }

  if (trimmedValues.city.length < 2) {
    errors.city = 'City must contain at least 2 characters.'
  }

  if (!/^[A-Za-z]{2}$/.test(trimmedValues.state)) {
    errors.state = 'State must contain exactly 2 alphabetic characters.'
  }

  if (!/^\d{5}$/.test(trimmedValues.zipCode)) {
    errors.zipCode = 'ZIP Code must contain exactly 5 digits.'
  }

  return {
    errors,
    trimmedValues: {
      ...trimmedValues,
      phone: phoneDigits,
      state: trimmedValues.state.toUpperCase(),
    },
  }
}

function CheckoutForm({ onPlaceOrder, onCancelCheckout }) {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationResult = validateCheckoutForm(formValues)
    setErrors(validationResult.errors)

    if (Object.keys(validationResult.errors).length === 0) {
      onPlaceOrder(validationResult.trimmedValues)
    }
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <h2>Delivery Information</h2>

      <div className="checkout-form__field">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formValues.fullName}
          onChange={handleInputChange}
        />
        {errors.fullName && <p className="field-error">{errors.fullName}</p>}
      </div>

      <div className="checkout-form__field">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className="checkout-form__field">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formValues.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <p className="field-error">{errors.phone}</p>}
      </div>

      <div className="checkout-form__field">
        <label htmlFor="streetAddress">Street Address</label>
        <input
          id="streetAddress"
          name="streetAddress"
          type="text"
          value={formValues.streetAddress}
          onChange={handleInputChange}
        />
        {errors.streetAddress && (
          <p className="field-error">{errors.streetAddress}</p>
        )}
      </div>

      <div className="checkout-form__field">
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          value={formValues.city}
          onChange={handleInputChange}
        />
        {errors.city && <p className="field-error">{errors.city}</p>}
      </div>

      <div className="checkout-form__row">
        <div className="checkout-form__field">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            type="text"
            value={formValues.state}
            onChange={handleInputChange}
          />
          {errors.state && <p className="field-error">{errors.state}</p>}
        </div>

        <div className="checkout-form__field">
          <label htmlFor="zipCode">ZIP Code</label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={formValues.zipCode}
            onChange={handleInputChange}
          />
          {errors.zipCode && <p className="field-error">{errors.zipCode}</p>}
        </div>
      </div>

      <div className="checkout-form__actions">
        <button type="submit" className="primary-button">
          Place Order
        </button>
        <button type="button" className="secondary-button" onClick={onCancelCheckout}>
          Cancel Checkout
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
