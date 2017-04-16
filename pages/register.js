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

const inputMargin = {
  marginBottom: '10px'
}

export default class Register extends React.Component {
  static async getInitialProps({ query }) {
    return { ...query }
  }

  constructor(props) {
    super(props)
    this.state = { errors: {} }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const body = serialize(e.currentTarget, { hash: true })

    let request = axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    })

    request.post(`${process.env.API_HOST}/users/create/`, JSON.stringify(body))
    .then((response) => {
      request.post(`${process.env.API_HOST}/users/api-token-auth/`, JSON.stringify(body))
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
    })
    .catch((error) => {
      this.setState({
        errors: error.response.data.errors
      })
    })
  }

  render() {
    return <Layout message={this.props.message}>
      <form style={style} onSubmit={this.onSubmit}>
        {
          !isEmpty(this.state.errors) && <FormAlert {...this.state} />
        }
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
          Already have an account yet? <Link href='/login'><a>Log in here!</a></Link>
        </small>
      </p>
    </Layout>
  }
}
