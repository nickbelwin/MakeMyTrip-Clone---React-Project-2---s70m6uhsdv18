import axios from "axios";

export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export const weekName=["Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ,"Sun",];

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
export const flightTravellersAndClass=[
  {adult:[]}
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
export const hotelPerNightPrice=[
  "₹0-₹1500","₹1500-₹2500","₹2500-₹5000","₹5000+"
];
export const trainClassArray=[
  {class:"All Class",code:"ALL"},
  {class:"Sleeper Class",code:"SL"},
  {class:"Third AC",code:"3A"},
  {class:"Second AC",code:"2A"},
  {class:"First AC",code:"1A"},
  {class:"Second Seating",code:"2S"},
  {class:"Vistadome AC",code:"EV"},
  {class:"AC Chair Ca",code:"CC"},
  {class:"First Class",code:"FC"},
  {class:"Third AC Economy",code:"3E"},
];

//below API for getting airports name using city name
export const getAirportName=async()=>{
  try{
    let res= await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/airport`,
    {
      headers:{"projectId":"ywhyenbsclpi"}
    });
    return res.data.data.airports;

  }catch(err){throw new Error(err)}
}
export const getHotelName=async()=>{
  try{
    let res= await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel`,
    {
      headers:{"projectId":"ywhyenbsclpi"}
    });
    return res;

  }catch(err){throw new Error(err)}
}