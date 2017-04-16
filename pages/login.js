import Link from 'next/link'
import Router from 'next/router'
import cookie from 'react-cookie'
import axios from 'axios'
import serialize from 'form-serialize'
import isEmpty from 'lodash/isEmpty'
import { Button, Input } from 'reactstrap'

import Layout from '../containers/layout'
import FormAlert from '../components/form_alert'

const style = {
  maxWidth: '330px',
  padding: '15px',
  margin: '0 auto'
}

export default class Login extends React.Component {
  static async getInitialProps({ query }) {
    return { ...query }
  }

  constructor(props) {
    super(props)
    this.state = { errors: {} }
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      errors: {}
    })

    const body = serialize(e.currentTarget, { hash: true })

    axios.request({
      url: `${process.env.API_HOST}/users/api-token-auth/`,
      method: 'post',
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      let date = new Date()
      date.setDate(date.getDate() + 7)
      const weekInSeconds = 60 * 60 * 24 * 7
      const options = {
        path: '/',
        expires: date,
        maxAge: weekInSeconds
      }
      cookie.save('token', response.data.token, options)
      cookie.save('username', body.username, options)

      Router.push('/')
    })
    .catch((error) => {
      this.setState({
        errors: error.response.data
      })
    })
  }

  render() {
    return <Layout message={this.props.message}>
      <form style={style} onSubmit={this.onSubmit}>
        {
          !isEmpty(this.state.errors) && <FormAlert {...this.state} hideLabel />
        }
        <label>Username</label>
        <Input name='username' style={{ marginBottom: '10px' }} />
        <label>Password</label>
        <Input name='password' type='password' style={{ marginBottom: '10px' }} />
        <Button color='primary' block type='submit' style={{ cursor: 'pointer', marginTop: '20px' }}>Submit</Button>
      </form>
      <p className='text-center'>
        <small>
          Don't have an account yet? <Link href='/register'><a>Register here!</a></Link>
        </small>
      </p>
    </Layout>
  }
}
