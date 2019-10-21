import { Stop } from "../schedule"

const stopsGreen: Stop[] = [
  {
    id: "place-alsgr",
    name: "Allston Street",
    lat: 42.348701,
    lon: -71.137955,
  },
  { id: "place-armnl", name: "Arlington", lat: 42.351902, lon: -71.070893 },
  { id: "place-babck", name: "Babcock Street", lat: 42.35182, lon: -71.12165 },
  {
    id: "place-bckhl",
    name: "Back of the Hill",
    lat: 42.330139,
    lon: -71.111313,
  },
  { id: "place-bcnfd", name: "Beaconsfield", lat: 42.335846, lon: -71.140823 },
  {
    id: "place-bcnwa",
    name: "Washington Square",
    lat: 42.339394,
    lon: -71.13533,
  },
  {
    id: "place-bland",
    name: "Blandford Street",
    lat: 42.349293,
    lon: -71.100258,
  },
  { id: "place-bndhl", name: "Brandon Hall", lat: 42.340023, lon: -71.129082 },
  { id: "place-boyls", name: "Boylston", lat: 42.35302, lon: -71.06459 },
  {
    id: "place-brico",
    name: "Packards Corner",
    lat: 42.351967,
    lon: -71.125031,
  },
  {
    id: "place-brkhl",
    name: "Brookline Hills",
    lat: 42.331333,
    lon: -71.126999,
  },
  {
    id: "place-brmnl",
    name: "Brigham Circle",
    lat: 42.334229,
    lon: -71.104609,
  },
  {
    id: "place-bucen",
    name: "Boston University Central",
    lat: 42.350082,
    lon: -71.106865,
  },
  {
    id: "place-buest",
    name: "Boston University East",
    lat: 42.349735,
    lon: -71.103889,
  },
  {
    id: "place-buwst",
    name: "Boston University West",
    lat: 42.350941,
    lon: -71.113876,
  },
  {
    id: "place-bvmnl",
    name: "Brookline Village",
    lat: 42.332774,
    lon: -71.116296,
  },
  { id: "place-chhil", name: "Chestnut Hill", lat: 42.326653, lon: -71.165314 },
  {
    id: "place-chill",
    name: "Chestnut Hill Avenue",
    lat: 42.338169,
    lon: -71.15316,
  },
  { id: "place-chswk", name: "Chiswick Road", lat: 42.340805, lon: -71.150711 },
  {
    id: "place-clmnl",
    name: "Cleveland Circle",
    lat: 42.336142,
    lon: -71.149326,
  },
  { id: "place-coecl", name: "Copley", lat: 42.349974, lon: -71.077447 },
  {
    id: "place-cool",
    name: "Coolidge Corner",
    lat: 42.342116,
    lon: -71.121263,
  },
  { id: "place-denrd", name: "Dean Road", lat: 42.337807, lon: -71.141853 },
  { id: "place-eliot", name: "Eliot", lat: 42.319023, lon: -71.216713 },
  {
    id: "place-engav",
    name: "Englewood Avenue",
    lat: 42.336971,
    lon: -71.14566,
  },
  {
    id: "place-fbkst",
    name: "Fairbanks Street",
    lat: 42.339725,
    lon: -71.131073,
  },
  { id: "place-fenwd", name: "Fenwood Road", lat: 42.333706, lon: -71.105728 },
  { id: "place-fenwy", name: "Fenway", lat: 42.345394, lon: -71.104187 },
  {
    id: "place-gover",
    name: "Government Center",
    lat: 42.359705,
    lon: -71.059215,
  },
  { id: "place-grigg", name: "Griggs Street", lat: 42.348545, lon: -71.134949 },
  { id: "place-haecl", name: "Haymarket", lat: 42.363021, lon: -71.05829 },
  {
    id: "place-harvd",
    name: "Harvard Avenue",
    lat: 42.350243,
    lon: -71.131355,
  },
  { id: "place-hsmnl", name: "Heath Street", lat: 42.328316, lon: -71.110252 },
  { id: "place-hwsst", name: "Hawes Street", lat: 42.344906, lon: -71.111145 },
  {
    id: "place-hymnl",
    name: "Hynes Convention Center",
    lat: 42.347888,
    lon: -71.087903,
  },
  { id: "place-kencl", name: "Kenmore", lat: 42.348949, lon: -71.095169 },
  { id: "place-kntst", name: "Kent Street", lat: 42.344074, lon: -71.114197 },
  { id: "place-lake", name: "Boston College", lat: 42.340081, lon: -71.166769 },
  { id: "place-lech", name: "Lechmere", lat: 42.370772, lon: -71.076536 },
  {
    id: "place-lngmd",
    name: "Longwood Medical Area",
    lat: 42.33596,
    lon: -71.100052,
  },
  { id: "place-longw", name: "Longwood", lat: 42.341145, lon: -71.110451 },
  {
    id: "place-mfa",
    name: "Museum of Fine Arts",
    lat: 42.337711,
    lon: -71.095512,
  },
  { id: "place-mispk", name: "Mission Park", lat: 42.333195, lon: -71.109756 },
  {
    id: "place-newtn",
    name: "Newton Highlands",
    lat: 42.321735,
    lon: -71.206116,
  },
  { id: "place-newto", name: "Newton Centre", lat: 42.329391, lon: -71.192429 },
  { id: "place-north", name: "North Station", lat: 42.365577, lon: -71.06129 },
  {
    id: "place-nuniv",
    name: "Northeastern University",
    lat: 42.340401,
    lon: -71.088806,
  },
  { id: "place-pktrm", name: "Park Street", lat: 42.356395, lon: -71.062424 },
  {
    id: "place-plsgr",
    name: "Pleasant Street",
    lat: 42.351521,
    lon: -71.118889,
  },
  { id: "place-prmnl", name: "Prudential", lat: 42.34557, lon: -71.081696 },
  { id: "place-river", name: "Riverside", lat: 42.337059, lon: -71.251742 },
  { id: "place-rsmnl", name: "Reservoir", lat: 42.335027, lon: -71.148952 },
  { id: "place-rvrwy", name: "Riverway", lat: 42.331684, lon: -71.111931 },
  {
    id: "place-smary",
    name: "Saint Marys Street",
    lat: 42.345974,
    lon: -71.107353,
  },
  { id: "place-sougr", name: "South Street", lat: 42.3396, lon: -71.157661 },
  { id: "place-spmnl", name: "Science Park", lat: 42.366664, lon: -71.067666 },
  {
    id: "place-sthld",
    name: "Sutherland Road",
    lat: 42.341614,
    lon: -71.146202,
  },
  {
    id: "place-stplb",
    name: "Saint Paul Street",
    lat: 42.3512,
    lon: -71.116104,
  },
  {
    id: "place-stpul",
    name: "Saint Paul Street",
    lat: 42.343327,
    lon: -71.116997,
  },
  { id: "place-sumav", name: "Summit Avenue", lat: 42.34111, lon: -71.12561 },
  { id: "place-symcl", name: "Symphony", lat: 42.342687, lon: -71.085056 },
  { id: "place-tapst", name: "Tappan Street", lat: 42.338459, lon: -71.138702 },
  { id: "place-waban", name: "Waban", lat: 42.325943, lon: -71.230728 },
  {
    id: "place-wascm",
    name: "Washington Street",
    lat: 42.343864,
    lon: -71.142853,
  },
  { id: "place-woodl", name: "Woodland", lat: 42.333374, lon: -71.244301 },
  { id: "place-wrnst", name: "Warren Street", lat: 42.348343, lon: -71.140457 },
]

export default stopsGreen