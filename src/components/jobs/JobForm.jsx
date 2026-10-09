import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CONTRACTS,
  LEVELS,
  ROLES,
  toPayload,
  validateJobValues,
} from '../../lib/jobForm'

function TextField({ name, label, value, error, onChange, hint, wide }) {
  const hintId = `${name}-hint`
  const errorId = `${name}-error`
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') ||
    undefined

  return (
    <div className={`job-form__field${wide ? ' job-form__field--wide' : ''}`}>
      <label className="job-form__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="job-form__input"
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
      />
      {hint && (
        <p className="job-form__hint" id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className="error-text job-form__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

function SelectField({ name, label, value, options, onChange }) {
  return (
    <div className="job-form__field">
      <label className="job-form__label" htmlFor={name}>
        {label}
      </label>
      <select
        className="job-form__input"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function JobForm({ initialValues, submitLabel, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event) {
    const { name, type, checked, value } = event.target
    setValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateJobValues(values)
    setErrors(nextErrors)
    setSubmitError('')

    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      await onSubmit(toPayload(values))
    } catch (error) {
      setSubmitError(error.message)
      setSubmitting(false)
    }
  }

  return (
    <form className="job-form" onSubmit={handleSubmit} noValidate>
      <TextField
        name="company"
        label="Company"
        value={values.company}
        error={errors.company}
        onChange={handleChange}
      />
      <TextField
        name="position"
        label="Position"
        value={values.position}
        error={errors.position}
        onChange={handleChange}
      />
      <TextField
        name="logo_url"
        label="Logo URL (optional)"
        value={values.logo_url}
        error={errors.logo_url}
        onChange={handleChange}
        hint="A link to an image. Leave empty to show a letter placeholder."
        wide
      />
      <SelectField
        name="role"
        label="Role"
        value={values.role}
        options={ROLES}
        onChange={handleChange}
      />
      <SelectField
        name="level"
        label="Level"
        value={values.level}
        options={LEVELS}
        onChange={handleChange}
      />
      <SelectField
        name="contract"
        label="Contract"
        value={values.contract}
        options={CONTRACTS}
        onChange={handleChange}
      />
      <TextField
        name="location"
        label="Location"
        value={values.location}
        error={errors.location}
        onChange={handleChange}
      />
      <TextField
        name="languages"
        label="Languages"
        value={values.languages}
        onChange={handleChange}
        hint="Separate with commas, for example: JavaScript, Python"
        wide
      />
      <TextField
        name="tools"
        label="Tools"
        value={values.tools}
        onChange={handleChange}
        hint="Separate with commas, for example: React, Sass"
        wide
      />

      <fieldset className="job-form__switches job-form__field--wide">
        <legend className="job-form__label">Badges</legend>
        <label className="job-form__switch">
          <input
            type="checkbox"
            role="switch"
            name="is_new"
            checked={values.is_new}
            onChange={handleChange}
          />
          <span>New</span>
        </label>
        <label className="job-form__switch">
          <input
            type="checkbox"
            role="switch"
            name="is_featured"
            checked={values.is_featured}
            onChange={handleChange}
          />
          <span>Featured</span>
        </label>
      </fieldset>

      {submitError && (
        <p className="error-text job-form__field--wide" role="alert">
          {submitError}
        </p>
      )}

      <div className="job-form__actions job-form__field--wide">
        <button className="job-form__submit" type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
        <Link className="job-form__cancel" to="/">
          Cancel
        </Link>
      </div>
    </form>
  )
}