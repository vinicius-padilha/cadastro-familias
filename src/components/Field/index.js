export function Field({ className, ...rest }) {
  return <input {...rest} className={`w-full h-12 bg-white border-2 border-light-silver rounded-md p-2 text-dark-jungle-green font-semibold placeholder:text-light-silver ${className}`} />
}