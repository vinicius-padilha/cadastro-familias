import { ConnectForm } from "../ConnectForm";

export function Field({ register, name, className, ...rest }) {
  return (
    <ConnectForm>
      {({ register }) => <input {...(register && register(name))} {...rest} className={`w-full h-12 bg-white border-2 border-light-silver rounded-md p-2 text-dark-jungle-green font-semibold placeholder:text-light-silver ${className}`} />}
    </ConnectForm>
  )
}