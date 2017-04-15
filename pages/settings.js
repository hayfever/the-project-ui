import Link from 'next/link'
import Router from 'next/router'
import cookie from 'react-cookie'
import axios from 'axios'
import serialize from 'form-serialize'
import { Button, Input } from 'reactstrap'

import Layout from '../containers/layout'

const style = {
  maxWidth: '330px',
  padding: '15px',
  margin: '0 auto'
}

export default class Settings extends React.Component {
  static async getInitialProps({ req, res }) {
    if (req) {
      cookie.plugToRequest(req, res)
    }

    const token = cookie.load('token')
    const response = await axios.request({
      url: 'http://localhost:8000/users/',
      method: 'get',
      headers: {
        'Authorization': `JWT ${token}`
      }
    }).catch((error) => {
      if (req){
        res.writeHead(302, { 'Location': '/login' })
      } else {
        Router.push('/login')
      }
    })

    return { user: response.data.user }
  }

  onSubmit(e) {
    e.preventDefault()
    const body = serialize(e.currentTarget, { hash: true })
    const token = cookie.load('token')

    axios.request({
      url: 'http://localhost:8000/users/',
      method: 'put',
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    })
    .then((response) => {
      Router.push('/login')
    })
  }

  render() {
    return <Layout loggedIn>
      <form style={style} onSubmit={this.onSubmit}>
        <label>Username</label>
        <Input name='username' style={{ marginBottom: '10px' }} defaultValue={this.props.user.username} />
        <label>New Password</label>
        <Input name='password' type='password' style={{ marginBottom: '10px' }} />
        <label>Confirm New Password</label>
        <Input name='confirm_password' type='password' style={{ marginBottom: '10px' }} />
        <Button color='primary' block type='submit' style={{ cursor: 'pointer', marginTop: '20px' }}>Submit</Button>
      </form>
    </Layout>
  }
}
