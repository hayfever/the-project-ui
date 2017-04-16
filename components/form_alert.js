import capitalize from 'lodash/capitalize'
import { Alert } from 'reactstrap'

const listStyle = {
  'padding': '0 25px',
  'marginBottom': '0px'
}

export default ({ errors, hideLabel }) => (
  <Alert color='danger'>
    <ul style={listStyle}>
      {
        Object.keys(errors).map((error) => {
          return errors[error].map((message) => {
            return hideLabel ? <li>{message}</li> : <li>{capitalize(error)}: {message}</li>
          })
        })
      }
    </ul>
  </Alert>
)