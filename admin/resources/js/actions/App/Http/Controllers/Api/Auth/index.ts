import TenantRegistrationController from './TenantRegistrationController'
import AuthenticationController from './AuthenticationController'
const Auth = {
    TenantRegistrationController: Object.assign(TenantRegistrationController, TenantRegistrationController),
AuthenticationController: Object.assign(AuthenticationController, AuthenticationController),
}

export default Auth