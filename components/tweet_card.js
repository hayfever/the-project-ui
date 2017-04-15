import moment from 'moment'
import { Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Col } from 'reactstrap'

export default ({ data }) => (
  <Col xs={12} md={6}>
    <Card style={{ marginBottom: '20px' }}>
      <CardBlock>
        <CardTitle>
          <a href={`https://twitter.com/statuses/${data.tweet_id}`}
            target='_blank'
            style={{ fontSize: '16px' }}
          >
            @{data.handle}
          </a>
        </CardTitle>
        <blockquote className='blockquote' style={{ minHeight: '85px' }}>
          <p className='mb-0' style={{ fontSize: '14px' }}>{data.text}</p>
        </blockquote>
        <div style={{ fontSize: '12px' }}>
          <i className='fa fa-retweet' aria-hidden='true'></i> {data.retweet_count}
          <div className='float-right'>
            {moment(data.created_at).format('MMMM D, YYYY h:mm A')}
          </div>
        </div>
      </CardBlock>
    </Card>
  </Col>
)