import axios from "axios";
export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export const weekName = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];

export const flightCodeArray = [
  { city: "Delhi", code: "DEL" },
  { city: "Mumbai", code: "BOM" },
  { city: "Chennai", code: "MAA" },
  { city: "Hyderabad", code: "HYD" },
  { city: "Kolkata", code: "CCU" },
  { city: "Kochi", code: "COK" },
  { city: "Ahmedabad", code: "AMD" },
  { city: "Pune", code: "PNQ" },
  { city: "Goa", code: "GOI" },
  { city: "Patna", code: "PAT" },
  { city: "Chandigarh", code: "IXC" },
  { city: "Mangalore", code: "IXE" },
  { city: "Nagpur", code: "NAG" },
  { city: "Bhubaneshwar", code: "BBI" },
  { city: "Jaipur", code: "JAI" },
  { city: "Coimbatore", code: "CJB" },
  { city: "Madurai", code: "IXM" },
  { city: "Lucknow", code: "LKO" },
  { city: "Thiruvananthapuram", code: "TRV" },
  { city: "Guwahati", code: "GAU" },
  { city: "Bangalore", code: "BLR" },
];
export const flightTravellersAndClass = [
  { adult: [] }
];

export const cityListArray = [
  { name: "Delhi", location: "Delhi, National Capital Territory of Delhi" },
  { name: "Chennai", location: "Chennai, Tamil Nadu" },
  { name: "Ahmedabad", location: "Ahmedabad, Gujarat" },
  { name: "Hyderabad", location: "Hyderabad, Telangana" },
  { name: "Jaipur", location: "Jaipur, Rajasthan" },
  { name: "Bangalore", location: "Bangalore, Karnataka" },
  { name: "Pune", location: "Pune, Maharashtra" },
  { name: "Kolkata", location: "Kolkata, West Bengal" },
  { name: "Surat", location: "Surat, Gujarat" },
  { name: "Lucknow", location: "Lucknow, Uttar Pradesh" },
  { name: "Kanpur", location: "Kanpur, Uttar Pradesh" },
  { name: "Nagpur", location: "Nagpur, Maharashtra" },
  { name: "Mumbai", location: "Mumbai, Maharashtra" },
  { name: "Lucknow", location: "Lucknow, Uttar Pradesh" },
  { name: "Bhopal", location: "Bhopal, Madhya Pradesh" },
  { name: "Patna", location: "Patna, Bihar" },
  { name: "VisakhaPatanam", location: "Visakhapatnam, Andhra Pradesh" },
  { name: "Allahabad", location: "Allahabad, Uttar Pradesh" },
];
export const hotelPerNightPrice = [
  "₹0-₹1500", "₹1500-₹2500", "₹2500-₹5000", "₹5000+"
];
export const trainClassArray = [
  { class: "All Class", code: "ALL" },
  { class: "Sleeper Class", code: "SL" },
  { class: "Third AC", code: "3A" },
  { class: "Second AC", code: "2A" },
  { class: "First AC", code: "1A" },
  { class: "Second Seating", code: "2S" },
  { class: "Vistadome AC", code: "EV" },
  { class: "AC Chair Ca", code: "CC" },
  { class: "First Class", code: "FC" },
  { class: "Third AC Economy", code: "3E" },
];
export const weekInitials=["S","M","T","W","T","F","S"];
export const trainTickets=[
  {
    "_id": "651d4ffa8c0d859355224b89",
    name:"Csmt Tejas Exp",
    trainCode:"#22120",
    departOn:["S",0,"T","W",0,"F","S"],
    arrivalTime: "4:07 PM",
    duration:"8 hrs 13 mins",
    departureTime:"12:20 AM",
    travelDayDuration:1,
    ac:true,
    nonAc:false,
    tripFree:true,
    tripGuarantee:true,
    availableTicket:[
      {
        class:"CC",
        price:1515,
        seats: 108,
        extra: "Free Cancellation",
        updated: "6 hrs ago",
      },
      {
        class:"EC",
        price:2985,
        seats: 10,
        extra: "Trip Guarantee",
        updated: "2 hrs ago",
      },
      {
        class:"EV",
        price:3110,
        seats: 50,
        extra: "Free Cancellation",
        updated: "few mins ago",
      },
    ]
  },
  {
    "_id": "651d50148c0d859355225255",
    name:"Mangladweep Exp",
    trainCode:"#12617",
    departOn:["S","M","T","W","T","F","S"],
    arrivalTime: "3:10 AM",
    duration:"10 hrs 17 mins",
    departureTime:"1:27 PM",
    travelDayDuration:0,
    ac:true,
    nonAc:true,
    tripFree:true,
    tripGuarantee:false,
    availableTicket:[
      {
        class:"3E",
        price:1220,
        seats: 19,
        extra: "Free Cancellation",
        updated: "30 mins ago",
      },
      {
        class:"SL",
        price:425,
        seats: 243,
        extra: "Free Cancellation",
        updated: "7 hrs ago",
      },
      {
        class:"3A",
        price:1120,
        seats: 26,
        extra: "Free Cancellation",
        updated: "few mins ago",
      },
    ]
  },
  {
    "_id": "651d50488c0d859355225fed",
    name:"Madgaon Ltt Exp",
    trainCode:"#11100",
    departOn:["S",0,"T",0,0,"F","S"],
    arrivalTime: "1:04 PM",
    duration:"10 hrs 31 mins",
    departureTime:"11:35 PM",
    travelDayDuration:0,
    ac:true,
    nonAc:true,
    tripFree:true,
    tripGuarantee:false,
    availableTicket:[
      {
        class:"SL",
        price:385,
        seats: 37,
        extra: "Free Cancellation",
        updated: "5 hrs ago",
      },
      {
        class:"3A",
        price:1040,
        seats: 43,
        extra: "Free Cancellation",
        updated: "4 hrs ago",
      },
      {
        class:"2A",
        price:1485,
        seats: 11,
        extra: "Free Cancellation",
        updated: "30 mins ago",
      },
    ]
  },
  {
    "_id": "651d50618c0d8593552266b9",
    name:"Mandovi Express",
    trainCode:"#10104",
    departOn:["S","M","T","W","T","F","S"],
    arrivalTime: "9:46 AM",
    duration:"11 hrs 59 mins",
    departureTime:"9:45 PM",
    travelDayDuration:0,
    ac:true,
    nonAc:true,
    tripFree:true,
    tripGuarantee:true,
    availableTicket:[
      {
        class:"3E",
        price:980,
        seats: 24,
        extra: "Free Cancellation",
        updated: "8 hrs ago",
      },
      {
        class:"SL",
        price:395,
        seats: 33,
        extra: "Trip Guarantee",
        updated: "15 mins ago",
      },
      {
        class:"3A",
        price:1485,
        seats: 8,
        extra: "Trip Guarantee",
        updated: "17 hrs ago",
      },
    ]
  },
  {
    "_id": "651d50948c0d859355227451",
    name:"Csmt Vandebharat",
    trainCode:"#22230",
    departOn:["S","M","T","W","T",0,"S"],
    arrivalTime: "2:40 PM",
    duration:"7 hrs 45 mins",
    departureTime:"10:25 PM",
    travelDayDuration:0,
    ac:true,
    nonAc:false,
    tripFree:false,
    tripGuarantee:true,
    availableTicket:[
      {
        class:"CC",
        price:1745,
        seats: 46,
        extra: "Trip Guarantee",
        updated: "1 hrs ago",
      },
      {
        class:"EC",
        price:3295,
        seats: 56,
        extra: "Trip Guarantee",
        updated: "10 mins ago",
      },
    ]
  },
  {
    "_id": "651d50c88c0d8593552281e9",
    name:"Csmt Janshtabdi",
    trainCode:"#12052",
    departOn:["S","M",0,"W",0,"F","S"],
    arrivalTime: "3:05 PM",
    duration:"8 hrs 50 mins",
    departureTime:"11:55 PM",
    travelDayDuration:0,
    ac:true,
    nonAc:true,
    tripFree:true,
    tripGuarantee:true,
    availableTicket:[
      {
        class:"2S",
        price:285,
        seats: 356,
        extra: "Trip Guarantee",
        updated: "3 hrs ago",
      },
      {
        class:"CC",
        price:990,
        seats: 28,
        extra: "Trip Guarantee",
        updated: "1 hrs ago",
      },
      {
        class:"EV",
        price:2495,
        seats: 17,
        extra: "Free Cancellation",
        updated: "5 hrs ago",
      },
    ]
  },
  {
    "_id": "651d50e28c0d8593552288b5",
    name:"Konkan Kanya Exp",
    trainCode:"#20112",
    departOn:[0,"M","T","W",0,"F",0],
    arrivalTime: "7:40 PM",
    duration:"10 hrs 0 mins",
    departureTime:"5:40 AM",
    travelDayDuration:1,
    ac:true,
    nonAc:true,
    tripFree:true,
    tripGuarantee:true,
    availableTicket:[
      {
        class:"SL",
        price:425,
        seats: 73,
        extra: "Free Cancellation",
        updated: "3 hrs ago",
      },
      {
        class:"3A",
        price:1110,
        seats: 20,
        extra: "Trip Guarantee",
        updated: "few mins ago",
      },
      {
        class:"2A",
        price:1565,
        seats: 17,
        extra: "Trip Guarantee",
        updated: "5 hrs ago",
      },
    ]
  },
];
export const roomAndGuestArr=[
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40
]

//below API for getting airports name 
export const getAirportName = async () => {
  try {
    let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/airport`,
      {
        headers: { "projectId": "ywhyenbsclpi" }
      });
    return res.data.data.airports;

  } catch (err) { throw new Error(err) }
}
// below api for get all flight tickets
export const getAirports = async (from,to,weekDay) => {
  try {
    let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${from}","destination":"${to}"}&day=${weekDay}`,
      {
        headers: { "projectId": "ywhyenbsclpi" }
      });
      console.log(res);
    if(res.status=== 200){
      return res.data.data;
    }

  } catch (err) { console.log(err); }
}
// below api for get flight ticket details
export const getFLightTicket = async (id) => {
  try {
      let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${id}`,
          {
              headers: { "projectId": "ywhyenbsclpi" }
          });
      return res.data.data;
  } catch (err) {
      console.log(err);
  }
}
//below API for getting hotels name 
export const getHotelName = async () => {
  try {
    let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/city?limit=40`,
      {
        headers: { "projectId": "ywhyenbsclpi" }
      });
    return res;

  } catch (err) { throw new Error(err) }
}
// below api for get all hotels
export const searchHotels=async(city)=>{
  try {
    let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}`,
      {
        headers: { "projectId": "ywhyenbsclpi" }
      });
    return res;

  } catch (err) { throw new Error(err) }
}
// filter hotels
export const filterHotels=async(city,fields)=>{
  try {
    let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}&filter=${JSON.stringify(fields)}`,
      {
        headers: { "projectId": "ywhyenbsclpi" }
      });
    return res.data.data;

  } catch (err) { throw new Error(err) }
}
// get hotel details
export const getHotelDetails=async(hotelId)=>{
  try {
    let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelId}`,
      {
        headers: { "projectId": "ywhyenbsclpi" }
      });
    return res.data.data;

  } catch (err) { throw new Error(err) }
}
// below api is related to Buses
export const getBuses = async (from,to,weekDay) => {
  try {
    let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${from}","destination":"${to}"}&day=${weekDay}`,
      {
        headers: { "projectId": "ywhyenbsclpi" }
      });
      console.log(res);
    if(res.status=== 200){
      return res.data.data;
    }

  } catch (err) { console.log(err); }
} 
// get bus ticket details
export const getBusTicket = async (id) => {
  try {
      let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/bus/${id}`,
          {
              headers: { "projectId": "ywhyenbsclpi" }
          });
      return res.data.data;
  } catch (err) {
      console.log(err);
  }
}
export const headerNavlist = [
  {id:"FLIGHTS",name:"Flights", imageOff:"/img/flightOff.png",imageOn:"/img/flightOn.png"},
  {id:"HOTELS",name:"Hotels", imageOff:"/img/hotelOff.png",imageOn:"/img/hotelOn.png"},
  {id:"RAILS",name:"Trains", imageOff:"/img/trainOff.png",imageOn:"/img/trainOn.png"},
  {id:"BUSES",name:"Buses", imageOff:"/img/busOff.png",imageOn:"/img/busOn.png"},

]
export const offerNavlist = [
  {id:"ALL",name:"All Offers"},
  {id:"FLIGHTS",name:"Flights"},
  {id:"HOTELS",name:"Hotels"},
  {id:"RAILS",name:"Trains"},
]
export const suggetionFilterArray=[
  {id:"pool", name:"Swimming Pool"},
  {id:"bar", name:"Bar"},
  {id:"wifi", name:"Free WiFi"},
  {id:"restaurant", name:"Restaurant"},
  {id:"gym", name:"Gym"},
] 