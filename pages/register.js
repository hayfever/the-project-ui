import Link from 'next/link'
import { Button, Input } from 'reactstrap'
import serialize from 'form-serialize'
import axios from 'axios'

import Layout from '../containers/layout'

const style = {
  maxWidth: '330px',
  padding: '15px',
  margin: '0 auto'
}

const inputMargin = {
  marginBottom: '10px'
}

export default class Register extends React.Component {
  onSubmit(e) {
    e.preventDefault()
    const body = serialize(e.currentTarget, { hash: true })

    axios.request({
      url: 'http://localhost:8000/users/create/',
      method: 'post',
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }

  render() {
    return <Layout>
      <form style={style} onSubmit={this.onSubmit}>
        <label>Username</label>
        <Input name='username' style={inputMargin} />
        <label>Password</label>
        <Input name='password' type='password' style={inputMargin} />
        <label>Confirm Password</label>
        <Input name='confirm_password' type='password' style={inputMargin} />
        <Button color='primary' block type='submit' style={{ cursor: 'pointer', marginTop: '20px' }}>Submit</Button>
      </form>
      <p className='text-center'>
        <small>
          Already have an account yet? <Link href='/login'><a>Login here!</a></Link>
        </small>
      </p>
    </Layout>
  }
}
