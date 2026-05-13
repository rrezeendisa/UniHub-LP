export function ButtonSpinner() {
  return (
    <svg
      className="inline-block h-5 w-5 animate-spin text-current"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.2"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="31.4 125.6"
        opacity="1"
      />
    </svg>
  )
}
