import DashboardController from './DashboardController'
import RoomController from './RoomController'
import TenantController from './TenantController'
import BillingController from './BillingController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
RoomController: Object.assign(RoomController, RoomController),
TenantController: Object.assign(TenantController, TenantController),
BillingController: Object.assign(BillingController, BillingController),
}

export default Admin