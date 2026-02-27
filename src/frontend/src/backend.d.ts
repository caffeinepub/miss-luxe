import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface OrderUpdate {
    orderId: bigint;
    newStatus: OrderStatus;
}
export interface CustomerProfile {
    primaryName: string;
    primaryEmail: string;
    primaryPhone: string;
}
export interface Order {
    id: bigint;
    status: OrderStatus;
    principal: Principal;
    createdAt: Time;
    itemName: string;
    quantity: bigint;
}
export interface Address {
    street: string;
    country: string;
    city: string;
    zipCode: string;
    phone: string;
}
export enum OrderStatus {
    PENDING = "PENDING",
    DELIVERED = "DELIVERED"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAddress(addressId: string, street: string, city: string, zipCode: string, country: string, phone: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAddress(addressId: string): Promise<Address | null>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<Order>>;
    getMyProfile(): Promise<CustomerProfile | null>;
    getOrderStatus(orderId: bigint): Promise<OrderStatus | null>;
    getProfile(user: Principal): Promise<CustomerProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveProfile(fullName: string, phone: string, email: string): Promise<void>;
    submitOrder(itemName: string, quantity: bigint): Promise<bigint>;
    updateAddress(addressId: string, street: string, city: string, zipCode: string, country: string, phone: string): Promise<void>;
    updateOrderStatuses(_updates: Array<OrderUpdate>): Promise<void>;
    updateSingleOrder(_orderId: bigint, _newStatus: OrderStatus): Promise<void>;
}
