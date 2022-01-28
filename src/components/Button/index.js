export function Button({ variant = 'primary', children, className, ...rest }) {
  const variants = {
    primary: 'bg-space-cadet hover:bg-space-cadet-darken text-white',
    secondary: 'bg-transparent hover:bg-white-darken text-space-cadet'
  }

  return (
    <button {...rest} className={`button ${variants[variant]} w-72 h-12 rounded-md font-semibold transition ease-linear duration-200 ${className}`}>
      {children}
    </button>
  )
}