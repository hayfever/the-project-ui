import Link from 'next/link'
import { Button, Input } from 'reactstrap'

import Layout from '../containers/layout'

const style = {
  maxWidth: '330px',
  padding: '15px',
  margin: '0 auto'
}

export default class Login extends React.Component {
  static async getInitialProps ({}) {
    return {}
  }

  onSubmit(e) {
    e.preventDefault()
    console.log('submit called')
  }

  render() {
    return <Layout>
      <form style={style} onSubmit={this.onSubmit}>
        <label>Username</label>
        <Input style={{ marginBottom: '10px' }} />
        <label>Password</label>
        <Input type='password' style={{ marginBottom: '20px' }} />
        <Button color='primary' block type='submit'>Submit</Button>
      </form>
      <p className='text-center'>
        <small>
          Don't have an account yet? <Link href='/register'><a>Register here!</a></Link>
        </small>
      </p>
    </Layout>
  }
}
