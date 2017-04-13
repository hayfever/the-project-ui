import Head from 'next/head'
import { Container } from 'reactstrap'

export default ({ children, title = 'THE PROJECT' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/static/bootstrap.min.css" />
    </Head>
    <Container>
      {children}
    </Container>
  </div>
)