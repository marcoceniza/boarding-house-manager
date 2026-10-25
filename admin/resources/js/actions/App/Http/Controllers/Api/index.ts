import Auth from './Auth'
import Me from './Me'
const Api = {
    Auth: Object.assign(Auth, Auth),
Me: Object.assign(Me, Me),
}

export default Api