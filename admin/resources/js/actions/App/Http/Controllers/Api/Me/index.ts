import ProfileController from './ProfileController'
import DashboardController from './DashboardController'
import BillingController from './BillingController'
const Me = {
    ProfileController: Object.assign(ProfileController, ProfileController),
DashboardController: Object.assign(DashboardController, DashboardController),
BillingController: Object.assign(BillingController, BillingController),
}

export default Me