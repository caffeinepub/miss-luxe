import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Address {
    street: string;
    country: string;
    city: string;
    zipCode: string;
    phone: string;
}
export type Time = bigint;
export interface Order {
    id: bigint;
    customerName: string;
    status: OrderStatus;
    principal: Principal;
    createdAt: Time;
    totalAmount: bigint;
    quantity: bigint;
    items: string;
    phoneNumber: string;
}
export interface UserProfile {
    primaryName: string;
    primaryEmail: string;
    primaryPhone: string;
}
export enum OrderStatus {
    DISPATCHED = "DISPATCHED",
    PACKED = "PACKED",
    PENDING = "PENDING",
    DELIVERED = "DELIVERED",
    CONFIRMED = "CONFIRMED"
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
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<Order>>;
    getMyProfile(): Promise<UserProfile | null>;
    getOrderStatus(orderId: bigint): Promise<OrderStatus>;
    getProfile(user: Principal): Promise<UserProfile | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveProfile(fullName: string, phone: string, email: string): Promise<void>;
    submitOrder(customerName: string, phone: string, items: string, quantity: bigint, totalAmount: bigint): Promise<bigint>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
}
