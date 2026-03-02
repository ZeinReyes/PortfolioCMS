import styles from './Input.module.css'

export default function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  multiline = false,
  rows = 3,
  required = false,
  helpText,
  error,
  disabled = false,
  min,
  max,
  step,
}) {
  const inputProps = {
    value: value ?? '',
    onChange: e => onChange(e.target.value),
    placeholder,
    required,
    disabled,
    className: `${styles.field} ${error ? styles.hasError : ''}`,
  }

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {multiline
        ? <textarea {...inputProps} rows={rows} />
        : <input type={type} min={min} max={max} step={step} {...inputProps} />
      }
      {error    && <p className={styles.error}>{error}</p>}
      {helpText && !error && <p className={styles.help}>{helpText}</p>}
    </div>
  )
}
