import Router from 'next/router'
import axios from 'axios'
import moment from 'moment'
import map from 'lodash/map'
import cookie from 'react-cookie'
import { Row } from 'reactstrap'

import Layout from '../containers/layout'
import TweetCard from '../components/tweet_card'

export default class Index extends React.Component {
  static async getInitialProps({ req, res }) {
    if (req) {
      cookie.plugToRequest(req, res)
    }

    const token = cookie.load('token')
    const response = await axios.request({
      url: 'http://localhost:8000/tweets/',
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

    return { data: response.data }
  }

  tweet_data(tweets) {
    return {
      labels: map(tweets, 'hour').map((timestamp) => moment(timestamp).format('MMMM D h:00 A')),
      datasets: [
        {
          backgroundColor: '#0275d8',
          borderColor: '#0275d8',
          borderWidth: 1,
          hoverBackgroundColor: '#014c8c',
          hoverBorderColor: '#014c8c',
          data: map(tweets, 'count')
        }
      ]
    }
  }

  renderChart() {
    if (typeof window !== 'undefined') {
      var ChartJS = require('react-chartjs-2')
      return <ChartJS.Bar
        data={this.tweet_data(this.props.data.tweets_by_hour)}
        width={100}
        height={50}
        options={{
          legend: { display: false },
          maintainAspectRatio: true,
        }}
      />
    } else {
      return <div/>
    }
  }

  render() {
    return <Layout loggedIn>
      <h4 style={{ margin: '20px 0 30px 0', width: '100%'}}>
        Tweets By Hour
        <div className='float-right'>
          #radiohead - Last 7 Days
        </div>
      </h4>
      <Row>
        {this.renderChart()}
      </Row>
      <h4 style={{ margin: '20px 0 30px 0'}}>
        Most Retweeted By Day
      </h4>
      <Row>
        {this.props.data.most_retweeted_by_day.map((tweet) => <TweetCard key={tweet.tweet_id} data={tweet} />)}
      </Row>
    </Layout>
  }
}
