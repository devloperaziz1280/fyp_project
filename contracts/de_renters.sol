// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract fyp_contract is Ownable, ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _totalAppartments;

  struct ApartmentStruct {
    uint id;
    string name;
    string description;
    string location;
    string images;
    uint rooms;
    uint price;
    address owner;
    bool booked;
    bool deleted;
    uint timestamp;
  }

  struct BookingStruct {
    uint id;
    uint aid;
    address tenant;
    uint date;
    uint price;
    bool checked;
    bool cancelled;
    bool paidToOwner;
  }

  struct ReviewStruct {
    uint id;
    uint aid;
    string reviewText;
    uint timestamp;
    address owner;
  }

  // ============= NEW: EVENTS SECTION =============
  // Apartment Management Events
  event ApartmentCreated(
    uint indexed id,
    address indexed owner,
    string name,
    uint price,
    uint timestamp
  );
  event ApartmentDeleted(uint indexed id, address indexed owner, uint timestamp);

  // Booking Events
  event ApartmentBooked(
    uint indexed apartmentId,
    uint indexed bookingId,
    address indexed tenant,
    uint[] dates,
    uint totalPrice,
    uint timestamp
  );
  event CheckedIn(
    uint indexed apartmentId,
    uint indexed bookingId,
    address indexed tenant,
    uint date,
    uint timestamp
  );
  event BookingCancelled(
    uint indexed apartmentId,
    uint indexed bookingId,
    address indexed tenant,
    uint refundAmount,
    uint timestamp
  );

  // Payment Events
  event PaymentReleased(
    uint indexed apartmentId,
    uint indexed bookingId,
    address indexed owner,
    uint amount,
    uint timestamp
  );
  event PaymentRefunded(
    uint indexed apartmentId,
    uint indexed bookingId,
    address indexed tenant,
    uint amount,
    uint timestamp
  );

  // Review Events
  event ReviewAdded(
    uint indexed apartmentId,
    uint indexed reviewId,
    address indexed reviewer,
    uint timestamp
  );

  // debugs events
  //   event DebugBookingDetails(
  //     uint indexed apartmentId,
  //     address indexed tenant,
  //     uint bookingDate,
  //     uint currentTime,
  //     uint timestamp
  // );
  // event DebugRefundDetails(
  //     uint indexed apartmentId,
  //     uint indexed bookingId,
  //     uint bookingDate,
  //     uint currentTime,
  //     bool canRefund,
  //     uint timestamp
  // );
  // ============= END OF EVENTS SECTION =============

  mapping(uint => ApartmentStruct) apartments;
  mapping(uint => BookingStruct[]) bookingsOf;
  mapping(uint => ReviewStruct[]) reviewsOf;
  mapping(uint => bool) appartmentExist;
  mapping(uint => uint[]) bookedDates;
  mapping(uint => mapping(uint => bool)) isDateBooked;
  mapping(address => mapping(uint => bool)) hasBooked;

  constructor() {}

  function createAppartment(
    string memory name,
    string memory description,
    string memory location,
    string memory images,
    uint rooms,
    uint price
  ) public {
    require(bytes(name).length > 0, 'Name cannot be empty');
    require(bytes(description).length > 0, 'Description cannot be empty');
    require(bytes(location).length > 0, 'Location cannot be empty');
    require(bytes(images).length > 0, 'Images cannot be empty');
    require(rooms > 0, 'Rooms cannot be zero');
    require(price > 0 ether, 'Price cannot be zero');

    _totalAppartments.increment();
    ApartmentStruct memory lodge;
    lodge.id = _totalAppartments.current();
    lodge.name = name;
    lodge.description = description;
    lodge.location = location;
    lodge.images = images;
    lodge.rooms = rooms;
    lodge.price = price;
    lodge.owner = msg.sender;
    lodge.timestamp = currentTime();

    appartmentExist[lodge.id] = true;
    apartments[_totalAppartments.current()] = lodge;

    // ============= NEW: EMIT EVENT =============
    emit ApartmentCreated(lodge.id, msg.sender, name, price, lodge.timestamp);
  }

  function deleteAppartment(uint id) public {
    require(appartmentExist[id] == true, 'Appartment not found');
    require(apartments[id].owner == msg.sender, 'Unauthorized entity');

    appartmentExist[id] = false;
    apartments[id].deleted = true;

    // ============= NEW: EMIT EVENT =============
    emit ApartmentDeleted(id, msg.sender, currentTime());
  }

  function getApartments() public view returns (ApartmentStruct[] memory Apartments) {
    uint256 available;
    for (uint i = 1; i <= _totalAppartments.current(); i++) {
      if (!apartments[i].deleted) available++;
    }

    Apartments = new ApartmentStruct[](available);

    uint256 index;
    for (uint i = 1; i <= _totalAppartments.current(); i++) {
      if (!apartments[i].deleted) {
        Apartments[index++] = apartments[i];
      }
    }
  }

  function getApartment(uint id) public view returns (ApartmentStruct memory) {
    return apartments[id];
  }

  function bookApartment(uint aid, uint[] memory dates) public payable {
    require(appartmentExist[aid], 'Apartment not found!');
    require(msg.value >= apartments[aid].price * dates.length, 'Insufficient fund!');
    require(datesAreCleared(aid, dates), 'Booked date found among dates!');

    uint totalPrice = apartments[aid].price * dates.length;
    uint bookingId = bookingsOf[aid].length;

    for (uint i = 0; i < dates.length; i++) {
      BookingStruct memory booking;
      booking.aid = aid;
      booking.id = bookingsOf[aid].length;
      booking.tenant = msg.sender;
      booking.date = dates[i];
      booking.price = apartments[aid].price;
      booking.paidToOwner = false;
      bookingsOf[aid].push(booking);
      isDateBooked[aid][dates[i]] = true;
      bookedDates[aid].push(dates[i]);

      //debug emit
      // emit DebugBookingDetails(
      //         aid,
      //         msg.sender,
      //         dates[i],
      //         currentTime(),
      //         currentTime()
      //     );
    }

    // ============= NEW: EMIT EVENT =============
    emit ApartmentBooked(aid, bookingId, msg.sender, dates, totalPrice, currentTime());
  }

  function datesAreCleared(uint aid, uint[] memory dates) internal view returns (bool) {
    bool lastCheck = true;
    for (uint i = 0; i < dates.length; i++) {
      for (uint j = 0; j < bookedDates[aid].length; j++) {
        if (dates[i] == bookedDates[aid][j]) lastCheck = false;
      }
    }
    return lastCheck;
  }

  function checkInApartment(uint aid, uint bookingId) public {
    BookingStruct storage booking = bookingsOf[aid][bookingId];
    require(msg.sender == booking.tenant, 'Unauthorized tenant!');
    require(!booking.checked, 'Apartment already checked on this date!');

    bookingsOf[aid][bookingId].checked = true;
    booking.paidToOwner = true;
    hasBooked[msg.sender][aid] = true;

    payTo(apartments[aid].owner, booking.price);

    // ============= NEW: EMIT EVENTS =============
    emit CheckedIn(aid, bookingId, msg.sender, booking.date, currentTime());

    emit PaymentReleased(aid, bookingId, apartments[aid].owner, booking.price, currentTime());
  }

  function refundBooking(uint aid, uint bookingId) public nonReentrant {
    BookingStruct storage booking = bookingsOf[aid][bookingId];
    // Debugging: Log the refund details
    // bool canRefund = (booking.date > currentTime());
    // emit DebugRefundDetails(
    //     aid,
    //     bookingId,
    //     booking.date,
    //     currentTime(),
    //     canRefund,
    //     currentTime()
    // );
    require(!booking.checked, 'Apartment already checked on this date!');
    require(!booking.paidToOwner, 'Payment already released to owner, no refund possible');
    require(isDateBooked[aid][booking.date], 'Did not book on this date!');

    if (msg.sender != owner()) {
      require(msg.sender == booking.tenant, 'Unauthorized tenant!');
      require(booking.date > currentTime(), 'Can no longer refund, booking date started');
    }

    bookingsOf[aid][bookingId].cancelled = true;
    isDateBooked[aid][booking.date] = false;

    for (uint i = 0; i < bookedDates[aid].length; i++) {
      if (bookedDates[aid][i] == booking.date) {
        bookedDates[aid][i] = bookedDates[aid][bookedDates[aid].length - 1];
        bookedDates[aid].pop();
        break;
      }
    }

    payTo(msg.sender, booking.price);

    // ============= NEW: EMIT EVENTS =============
    emit BookingCancelled(aid, bookingId, booking.tenant, booking.price, currentTime());

    emit PaymentRefunded(aid, bookingId, booking.tenant, booking.price, currentTime());
  }

  function getUnavailableDates(uint aid) public view returns (uint[] memory) {
    return bookedDates[aid];
  }

  function getBookings(uint aid) public view returns (BookingStruct[] memory) {
    return bookingsOf[aid];
  }

  function getQualifiedReviewers(uint aid) public view returns (address[] memory Tenants) {
    uint256 available;
    for (uint i = 0; i < bookingsOf[aid].length; i++) {
      if (bookingsOf[aid][i].checked) available++;
    }

    Tenants = new address[](available);

    uint256 index;
    for (uint i = 0; i < bookingsOf[aid].length; i++) {
      if (bookingsOf[aid][i].checked) {
        Tenants[index++] = bookingsOf[aid][i].tenant;
      }
    }
  }

  function getBooking(uint aid, uint bookingId) public view returns (BookingStruct memory) {
    return bookingsOf[aid][bookingId];
  }

  function payTo(address to, uint256 amount) internal {
    (bool success, ) = payable(to).call{ value: amount }('');
    require(success);
  }

  function addReview(uint aid, string memory reviewText) public {
    require(appartmentExist[aid], 'Appartment not available');
    require(hasBooked[msg.sender][aid], 'Book first before review');
    require(bytes(reviewText).length > 0, 'Review text cannot be empty');

    ReviewStruct memory review;

    review.aid = aid;
    review.id = reviewsOf[aid].length;
    review.reviewText = reviewText;
    review.timestamp = currentTime();
    review.owner = msg.sender;

    reviewsOf[aid].push(review);

    // ============= NEW: EMIT EVENT =============
    emit ReviewAdded(aid, review.id, msg.sender, currentTime());
  }

  function getReviews(uint aid) public view returns (ReviewStruct[] memory) {
    return reviewsOf[aid];
  }

  function tenantBooked(uint appartmentId) public view returns (bool) {
    return hasBooked[msg.sender][appartmentId];
  }

  function currentTime() internal view returns (uint256) {
    return block.timestamp; // Normal seconds
  }

  receive() external payable {
    // Handle plain ETH transfers
  }

  fallback() external payable {
    revert('Function does not exist');
  }
}
