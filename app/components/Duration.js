import React, {Component} from 'react'
import moment from 'moment'
import styles from './Duration.css'

const TIME_FORMAT = 'h:mma'

export default class Duration extends Component {
  render() {
    const now = moment()
    const future = moment().add(this.props.seconds, 'seconds')
    return (
      <div className={styles.root}>
        <h2 className={styles.duration}>~{future.fromNow(true)}</h2>
        <div className={styles.actualTimes}>
          <span className={styles.now}>{now.format(TIME_FORMAT)}</span>
          <span className={styles.then}>{future.format(TIME_FORMAT)}</span>
        </div>
      </div>
    )
  }
}

Duration.propTypes = {
  seconds: React.PropTypes.number.isRequired
}
