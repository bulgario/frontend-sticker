import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'

const tron = Reactotron.configure()

if(process.env.NODE_ENV === 'development') {
  tron
  .use(reactotronRedux())
  .connect()

  tron.clear()

  console.tron = tron
}

export default tron