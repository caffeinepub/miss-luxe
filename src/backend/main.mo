import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  ////////////////////////////////////////////////////
  //// Types
  ////////////////////////////////////////////////////
  type OrderStatus = {
    #PENDING;
    #DELIVERED;
  };

  type Order = {
    id : Nat;
    principal : Principal;
    itemName : Text;
    quantity : Nat;
    status : OrderStatus;
    createdAt : Time.Time;
  };

  type CustomerProfile = {
    primaryName : Text;
    primaryPhone : Text;
    primaryEmail : Text;
  };

  type Address = {
    street : Text;
    city : Text;
    zipCode : Text;
    country : Text;
    phone : Text;
  };

  type OrderUpdate = {
    orderId : Nat;
    newStatus : OrderStatus;
  };

  let orders = Map.empty<Nat, Order>();
  let customerProfiles = Map.empty<Principal, CustomerProfile>();
  let addresses = Map.empty<Text, Address>();

  var nextOrderId = 0;

  ////////////////////////////////////////////////////
  //// Order Management
  ////////////////////////////////////////////////////

  public shared ({ caller }) func submitOrder(itemName : Text, quantity : Nat) : async Nat {
    if (quantity == 0) {
      Runtime.trap("Quantity cannot be zero");
    };

    let orderId = nextOrderId;
    let order : Order = {
      id = orderId;
      principal = caller;
      itemName;
      quantity;
      status = #PENDING;
      createdAt = Time.now();
    };

    orders.add(orderId, order);
    nextOrderId += 1;
    orderId;
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get orders");
    };
    orders.values().filter(
      func(order) {
        order.principal == caller;
      }
    ).toArray();
  };

  public shared ({ caller }) func updateOrderStatuses(_updates : [OrderUpdate]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update orders");
    };

    let updates = List.fromArray<OrderUpdate>(_updates);
    updates.forEach(
      func(update) {
        switch (orders.get(update.orderId)) {
          case (null) {};
          case (?order) {
            let updatedOrder = { order with status = update.newStatus };
            orders.add(update.orderId, updatedOrder);
          };
        };
      }
    );
  };

  public shared ({ caller }) func updateSingleOrder(_orderId : Nat, _newStatus : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update orders");
    };
    switch (orders.get(_orderId)) {
      case (null) {};
      case (?order) {
        let updatedOrder = { order with status = _newStatus };
        orders.add(_orderId, updatedOrder);
      };
    };
  };

  public query ({ caller }) func getOrderStatus(orderId : Nat) : async ?OrderStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check order status");
    };
    switch (orders.get(orderId)) {
      case (null) { null };
      case (?order) { ?order.status };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can restrict different logging mechanisms");
    };
    orders.values().toArray();
  };

  ////////////////////////////////////////////////////
  //// Profile Management
  ////////////////////////////////////////////////////

  public shared ({ caller }) func saveProfile(fullName : Text, phone : Text, email : Text) : async () {
    switch (validateProfile(fullName, phone, email)) {
      case (#ok) {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
          Runtime.trap("Unauthorized: Only users can get profiles");
        };
        let profile : CustomerProfile = {
          primaryName = fullName;
          primaryPhone = phone;
          primaryEmail = email;
        };
        customerProfiles.add(caller, profile);
      };
      case (#err(errMsg)) {
        Runtime.trap("Invalid profile: " # errMsg);
      };
    };
  };

  public query ({ caller }) func getMyProfile() : async ?CustomerProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    customerProfiles.get(caller);
  };

  public query ({ caller }) func getProfile(user : Principal) : async ?CustomerProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      switch (customerProfiles.get(caller)) {
        case (null) {
          Runtime.trap("Unauthorized: Only users can get profiles");
        };
        case (?_) {};
      };
    };
    customerProfiles.get(user);
  };

  ////////////////////////////////////////////////////
  //// Address Management
  ////////////////////////////////////////////////////

  public shared ({ caller }) func addAddress(addressId : Text, street : Text, city : Text, zipCode : Text, country : Text, phone : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add addresses");
    };
    if (street.size() == 0 or city.size() == 0 or zipCode.size() == 0 or country.size() == 0 or phone.size() == 0) {
      Runtime.trap("All address fields except for addressId must be provided");
    };
    let address : Address = {
      street;
      city;
      zipCode;
      country;
      phone;
    };
    addresses.add(addressId, address);
  };

  public query ({ caller }) func getAddress(addressId : Text) : async ?Address {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get addresses");
    };
    addresses.get(addressId);
  };

  public shared ({ caller }) func updateAddress(addressId : Text, street : Text, city : Text, zipCode : Text, country : Text, phone : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update addresses");
    };

    if (street.size() == 0 or city.size() == 0 or zipCode.size() == 0 or country.size() == 0 or phone.size() == 0) {
      Runtime.trap("All address fields must be provided");
    };

    let address : Address = {
      street;
      city;
      zipCode;
      country;
      phone;
    };
    addresses.add(addressId, address);
  };

  ////////////////////////////////////////////////////
  //// Validation
  ////////////////////////////////////////////////////

  func validateProfile(name : Text, _phone : Text, _email : Text) : { #ok } or {
    #err : Text;
  } {
    if (name.size() <= 3 or name.size() >= 38) { return #err("Name must be between 3 and 38 characters") };
    #ok;
  };
};
