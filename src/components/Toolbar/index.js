import { Button } from "../Button";
import { Field } from "../Field";
import {Link} from 'react-router-dom';
import {RoutesList} from '../../Routes'

export function Toolbar() {
  return (
    <div className="flex justify-end flex-row items-center gap-8 mt-8 gap">
      <Field placeholder="pesquisar" className="max-w-18" />
      <Button>
        <Link to={RoutesList.REGISTER}>novo cadastro</Link>
      </Button>
    </div>
  )
}