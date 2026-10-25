export type RoomStatus = 0 | 1 | 2;
export type TenantStatus = 0 | 1 | 2;
export type BillingStatus = 0 | 1 | 2;

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
};

export type Room = {
    id: number;
    room_number: string;
    type: string;
    capacity: number;
    price_per_month: string | number;
    occupied: number;
    status: RoomStatus;
    created_at: string;
    updated_at: string;
    tenants?: Pick<Tenant, 'id' | 'room_id' | 'first_name' | 'last_name'>[];
};

export type Tenant = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    room_id: number;
    move_in_date: string;
    ended_at: string | null;
    status: TenantStatus;
    created_at: string;
    updated_at: string;
    room?: Room;
};

export type Billing = {
    id: number;
    tenant_id: number;
    billing_period: string;
    rent: string | number;
    water: string | number;
    electricity: string | number;
    total: string | number;
    due_date: string;
    paid_at: string | null;
    payment_method: string | null;
    status: BillingStatus;
    created_at: string;
    updated_at: string;
    tenant?: Tenant;
};
