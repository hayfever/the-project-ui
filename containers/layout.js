import Head from 'next/head'
import { Container } from 'reactstrap'

import Navbar from '../components/navbar'

export default ({ children, title = 'THE PROJECT', loggedIn }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' />
      <link rel='stylesheet' href='/static/bootstrap.min.css' />
    </Head>
    <Navbar loggedIn={loggedIn} />
    <Container>
      {children}
    </Container>
  </div>
)