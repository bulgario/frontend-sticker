import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'

const tron = Reactotron.configure()
  tron
  .use(reactotronRedux())
  .connect()

  tron.clear()

  console.tron = tron

export default tron