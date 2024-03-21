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
export const searchHotels=async(city)=>{
  try {
    let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}`,
      {
        headers: { "projectId": "ywhyenbsclpi" }
      });
    return res;

  } catch (err) { throw new Error(err) }
}
export const filterHotels=async(city,fields)=>{
  try {
    let res = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}&filter=${JSON.stringify(fields)}`,
      {
        headers: { "projectId": "ywhyenbsclpi" }
      });
    return res.data.data;

  } catch (err) { throw new Error(err) }
}
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