import Link from "next/link";
import { ArrowRight, HardDrive, Ruler, Scale, Beaker, Clock, Thermometer, ChefHat, Map, Gauge, Wind, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Unit Converters | SmartToolsWala",
    description: "Browse our collection of free online unit converters. Convert MB to KB, length, weight, temperature and more instantly.",
    alternates: {
        canonical: "https://smarttoolswala.com/unit-converters",
    },
};

const categories = [
    {
        id: "digital-storage",
        title: "Digital Storage",
        icon: HardDrive,
        iconBg: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
        iconColor: "#6d28d9",
        tools: [
            { href: "/unit-converters/digital-storage/mb-to-kb", badge: "Popular", badgeBg: "#6366f1", title: "MB to KB", description: "1 MB = 1,024 KB.", tags: ["mb to kb"] },
            { href: "/unit-converters/digital-storage/gb-to-mb", badge: "New", badgeBg: "#3b82f6", title: "GB to MB", description: "1 GB = 1,024 MB.", tags: ["gb to mb"] },
            { href: "/unit-converters/digital-storage/kb-to-mb", title: "KB to MB", description: "Convert kilobytes back to megabytes.", tags: ["KB to MB"] },
            { href: "/unit-converters/digital-storage/mb-to-gb", title: "MB to GB", description: "Convert MB to gigabytes flawlessly.", tags: ["MB to GB"] },
            { href: "/unit-converters/digital-storage/gb-to-kb", title: "GB to KB", description: "Gigabytes to Kilobytes.", tags: ["GB to KB"] },
            { href: "/unit-converters/digital-storage/kb-to-gb", title: "KB to GB", description: "Tiny KB items calculated in Gigabytes.", tags: ["KB to GB"] },
            { href: "/unit-converters/digital-storage/gb-to-tb", title: "GB to TB", description: "Storage solutions in Terabytes calculation.", tags: ["GB to TB"] },
            { href: "/unit-converters/digital-storage/tb-to-gb", title: "TB to GB", description: "Terabyte to Gigabyte hard drive sizing.", tags: ["TB to GB"] },
            { href: "/unit-converters/digital-storage/mb-to-tb", title: "MB to TB", description: "Megabytes against Terabytes volumes.", tags: ["MB to TB"] },
            { href: "/unit-converters/digital-storage/tb-to-mb", title: "TB to MB", description: "Convert huge drives into exact megabytes.", tags: ["TB to MB"] },
            { href: "/unit-converters/digital-storage/kb-to-tb", title: "KB to TB", description: "Extreme conversions between KB and TB.", tags: ["KB to TB"] },
            { href: "/unit-converters/digital-storage/tb-to-kb", title: "TB to KB", description: "Calculate maximum precision files from Terabytes.", tags: ["TB to KB"] },
        ]
    },
    {
        id: "length",
        title: "Length",
        icon: Ruler,
        iconBg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
        iconColor: "#15803d",
        tools: [
            { href: "/unit-converters/length/cm-to-inch",     badge: "Popular", badgeBg: "#15803d", title: "cm to inch",       description: "Convert centimeters to inches instantly.",     tags: ["cm to inch", "Metric"] },
            { href: "/unit-converters/length/inch-to-cm",     title: "inch to cm",       description: "Convert inches to centimeters.",                 tags: ["inch to cm"] },
            { href: "/unit-converters/length/feet-to-meter",  badge: "Popular", badgeBg: "#15803d", title: "feet to meter",     description: "Convert feet to meters easily.",               tags: ["feet to meter"] },
            { href: "/unit-converters/length/meter-to-feet",  title: "meter to feet",    description: "Convert meters back to feet.",                   tags: ["meter to feet"] },
            { href: "/unit-converters/length/mm-to-inch",     title: "mm to inch",       description: "Convert millimeters to inches.",                  tags: ["mm to inch"] },
            { href: "/unit-converters/length/inch-to-mm",     title: "inch to mm",       description: "Convert inches to millimeters.",                  tags: ["inch to mm"] },
            { href: "/unit-converters/length/km-to-miles",    badge: "Popular", badgeBg: "#15803d", title: "km to miles",        description: "Convert kilometers to miles.",                 tags: ["km to miles"] },
            { href: "/unit-converters/length/miles-to-km",    title: "miles to km",      description: "Convert miles to kilometers.",                    tags: ["miles to km"] },
            { href: "/unit-converters/length/meter-to-cm",    title: "meter to cm",      description: "Convert meters to centimeters.",                  tags: ["meter to cm"] },
            { href: "/unit-converters/length/cm-to-meter",    title: "cm to meter",      description: "Convert centimeters to meters.",                  tags: ["cm to meter"] },
            { href: "/unit-converters/length/feet-to-inches", title: "feet to inches",   description: "Convert feet to inches.",                         tags: ["feet to inches"] },
            { href: "/unit-converters/length/inches-to-feet", title: "inches to feet",   description: "Convert inches to feet.",                         tags: ["inches to feet"] },
            { href: "/unit-converters/length/yard-to-feet",   title: "yard to feet",     description: "Convert yards to feet.",                          tags: ["yard to feet"] },
            { href: "/unit-converters/length/feet-to-yard",   title: "feet to yard",     description: "Convert feet to yards.",                          tags: ["feet to yard"] },
            { href: "/unit-converters/length/mile-to-meter",  title: "mile to meter",    description: "Convert miles to meters.",                        tags: ["mile to meter"] },
            { href: "/unit-converters/length/meter-to-mile",  title: "meter to mile",    description: "Convert meters to miles.",                        tags: ["meter to mile"] },
            { href: "/unit-converters/length/km-to-meter",    title: "km to meter",      description: "Convert kilometers to meters.",                   tags: ["km to meter"] },
            { href: "/unit-converters/length/meter-to-km",    title: "meter to km",      description: "Convert meters to kilometers.",                   tags: ["meter to km"] },
            { href: "/unit-converters/length/inch-to-feet",   title: "inch to feet",     description: "Convert inches to feet.",                         tags: ["inch to feet"] },
            { href: "/unit-converters/length/foot-to-cm",     title: "foot to cm",       description: "Convert feet to centimeters.",                    tags: ["foot to cm"] },
        ]
    },
    {
        id: "weight",
        title: "Weight",
        icon: Scale,
        iconBg: "linear-gradient(135deg, #ffedd5, #fed7aa)",
        iconColor: "#c2410c",
        tools: [
            { href: "/unit-converters/weight/kg-to-lbs",       badge: "Popular", badgeBg: "#c2410c", title: "kg to lbs",        description: "Convert kilograms to pounds instantly.",        tags: ["kg to lbs", "Fitness"] },
            { href: "/unit-converters/weight/lbs-to-kg",       badge: "Popular", badgeBg: "#c2410c", title: "lbs to kg",        description: "Convert pounds to kilograms.",                  tags: ["lbs to kg", "Fitness"] },
            { href: "/unit-converters/weight/grams-to-kg",     title: "grams to kg",      description: "Convert grams to kilograms.",                    tags: ["grams to kg"] },
            { href: "/unit-converters/weight/kg-to-grams",     title: "kg to grams",      description: "Convert kilograms to grams.",                    tags: ["kg to grams"] },
            { href: "/unit-converters/weight/grams-to-pounds", title: "grams to pounds",  description: "Convert grams to pounds.",                       tags: ["grams to pounds"] },
            { href: "/unit-converters/weight/pounds-to-grams", title: "pounds to grams",  description: "Convert pounds to grams.",                       tags: ["pounds to grams"] },
            { href: "/unit-converters/weight/ounces-to-grams", title: "ounces to grams",  description: "Convert ounces to grams.",                       tags: ["ounces to grams"] },
            { href: "/unit-converters/weight/grams-to-ounces", title: "grams to ounces",  description: "Convert grams to ounces.",                       tags: ["grams to ounces"] },
            { href: "/unit-converters/weight/kg-to-oz",        title: "kg to oz",         description: "Convert kilograms to ounces.",                   tags: ["kg to oz"] },
            { href: "/unit-converters/weight/oz-to-kg",        title: "oz to kg",         description: "Convert ounces to kilograms.",                   tags: ["oz to kg"] },
            { href: "/unit-converters/weight/mg-to-grams",     title: "mg to grams",      description: "Convert milligrams to grams.",                   tags: ["mg to grams"] },
            { href: "/unit-converters/weight/grams-to-mg",     title: "grams to mg",      description: "Convert grams to milligrams.",                   tags: ["grams to mg"] },
            { href: "/unit-converters/weight/tons-to-kg",      title: "tons to kg",       description: "Convert metric tons to kilograms.",              tags: ["tons to kg"] },
            { href: "/unit-converters/weight/kg-to-tons",      title: "kg to tons",       description: "Convert kilograms to metric tons.",              tags: ["kg to tons"] },
            { href: "/unit-converters/weight/stone-to-kg",     title: "stone to kg",      description: "Convert stone to kilograms.",                    tags: ["stone to kg", "UK"] },
            { href: "/unit-converters/weight/kg-to-stone",     title: "kg to stone",      description: "Convert kilograms to stone.",                    tags: ["kg to stone", "UK"] },
            { href: "/unit-converters/weight/lbs-to-oz",       title: "lbs to oz",        description: "Convert pounds to ounces.",                      tags: ["lbs to oz"] },
            { href: "/unit-converters/weight/oz-to-lbs",       title: "oz to lbs",        description: "Convert ounces to pounds.",                      tags: ["oz to lbs"] },
            { href: "/unit-converters/weight/mcg-to-mg",       title: "mcg to mg",        description: "Convert micrograms to milligrams.",              tags: ["mcg to mg", "Medical"] },
            { href: "/unit-converters/weight/mg-to-mcg",       title: "mg to mcg",        description: "Convert milligrams to micrograms.",              tags: ["mg to mcg", "Medical"] },
        ]
    },
    {
        id: "volume",
        title: "Volume",
        icon: Beaker,
        iconBg: "linear-gradient(135deg, #fae8ff, #f5d0fe)",
        iconColor: "#a21caf",
        tools: [
            { href: "/unit-converters/volume/liters-to-ml",         badge: "Popular", badgeBg: "#a21caf", title: "Liters to mL",        description: "Convert liters to milliliters.",                 tags: ["Liters to mL"] },
            { href: "/unit-converters/volume/ml-to-liters",         title: "mL to Liters",        description: "Convert milliliters to liters.",                 tags: ["mL to Liters"] },
            { href: "/unit-converters/volume/gallons-to-liters",    badge: "Popular", badgeBg: "#a21caf", title: "Gallons to Liters",   description: "Convert US gallons to liters.",                  tags: ["Gallons to Liters"] },
            { href: "/unit-converters/volume/liters-to-gallons",    title: "Liters to Gallons",   description: "Convert liters to US gallons.",                  tags: ["Liters to Gallons"] },
            { href: "/unit-converters/volume/cups-to-liters",       title: "Cups to Liters",      description: "Convert US cups to liters.",                     tags: ["Cups to Liters"] },
            { href: "/unit-converters/volume/liters-to-cups",       title: "Liters to Cups",      description: "Convert liters to US cups.",                     tags: ["Liters to Cups"] },
            { href: "/unit-converters/volume/ml-to-oz",             title: "mL to fl oz",         description: "Convert milliliters to fluid ounces.",           tags: ["mL to oz"] },
            { href: "/unit-converters/volume/oz-to-ml",             title: "fl oz to mL",         description: "Convert fluid ounces to milliliters.",           tags: ["oz to mL"] },
            { href: "/unit-converters/volume/cubic-meter-to-liters",title: "Cubic Meter to Liters",description: "Convert cubic meters to liters.",               tags: ["m³ to L"] },
            { href: "/unit-converters/volume/liters-to-cubic-meter",title: "Liters to Cubic Meter",description: "Convert liters to cubic meters.",               tags: ["L to m³"] },
        ]
    },
    {
        id: "time",
        title: "Time",
        icon: Clock,
        iconBg: "linear-gradient(135deg, #e0f2fe, #bae6fd)",
        iconColor: "#0369a1",
        tools: [
            { href: "/unit-converters/time/seconds-to-minutes", title: "Seconds to Minutes", description: "Convert seconds to minutes instantly.", tags: ["sec to min"] },
            { href: "/unit-converters/time/minutes-to-seconds", title: "Minutes to Seconds", description: "Convert minutes to seconds.", tags: ["min to sec"] },
            { href: "/unit-converters/time/hours-to-minutes", badge: "Popular", badgeBg: "#0369a1", title: "Hours to Minutes", description: "Convert hours to minutes easily.", tags: ["hr to min"] },
            { href: "/unit-converters/time/minutes-to-hours", title: "Minutes to Hours", description: "Convert minutes to hours.", tags: ["min to hr"] },
            { href: "/unit-converters/time/days-to-hours", title: "Days to Hours", description: "Convert days to hours.", tags: ["day to hr"] },
            { href: "/unit-converters/time/hours-to-days", title: "Hours to Days", description: "Convert hours to days.", tags: ["hr to day"] },
            { href: "/unit-converters/time/weeks-to-days", title: "Weeks to Days", description: "Convert weeks to days.", tags: ["wk to day"] },
            { href: "/unit-converters/time/days-to-weeks", title: "Days to Weeks", description: "Convert days to weeks.", tags: ["day to wk"] },
            { href: "/unit-converters/time/months-to-days", title: "Months to Days", description: "Convert months to days.", tags: ["mo to day"] },
            { href: "/unit-converters/time/days-to-months", title: "Days to Months", description: "Convert days to months.", tags: ["day to mo"] },
            { href: "/unit-converters/time/years-to-days", title: "Years to Days", description: "Convert years to days.", tags: ["yr to day"] },
            { href: "/unit-converters/time/days-to-years", title: "Days to Years", description: "Convert days to years.", tags: ["day to yr"] },
        ]
    },
    {
        id: "area",
        title: "Area",
        icon: Map,
        iconBg: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
        iconColor: "#065f46",
        tools: [
            { href: "/unit-converters/area/square-feet-to-square-meter", badge: "Popular", badgeBg: "#065f46", title: "sq ft to sq m",           description: "Convert square feet to square meters.",  tags: ["sq ft to sq m"] },
            { href: "/unit-converters/area/square-meter-to-square-feet",                                       title: "sq m to sq ft",           description: "Convert square meters to square feet.",  tags: ["sq m to sq ft"] },
            { href: "/unit-converters/area/acre-to-square-feet",                                               title: "acre to sq ft",           description: "Convert acres to square feet.",          tags: ["acre to sq ft"] },
            { href: "/unit-converters/area/square-feet-to-acre",                                               title: "sq ft to acre",           description: "Convert square feet to acres.",          tags: ["sq ft to acre"] },
            { href: "/unit-converters/area/hectare-to-acre",                                                   title: "hectare to acre",         description: "Convert hectares to acres.",             tags: ["hectare to acre"] },
            { href: "/unit-converters/area/acre-to-hectare",                                                   title: "acre to hectare",         description: "Convert acres to hectares.",             tags: ["acre to hectare"] },
            { href: "/unit-converters/area/sq-ft-to-sq-m",                                                    title: "sq ft to sq m (short)",   description: "Quick sq ft to sq m conversion.",       tags: ["sq ft", "sq m"] },
            { href: "/unit-converters/area/sq-m-to-sq-ft",                                                    title: "sq m to sq ft (short)",   description: "Quick sq m to sq ft conversion.",       tags: ["sq m", "sq ft"] },
        ]
    },
    {
        id: "speed",
        title: "Speed",
        icon: Wind,
        iconBg: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
        iconColor: "#1d4ed8",
        tools: [
            { href: "/unit-converters/speed/kmh-to-mph",  badge: "Popular", badgeBg: "#1d4ed8", title: "km/h to mph",   description: "Convert kilometers per hour to miles per hour.",  tags: ["kmh to mph"] },
            { href: "/unit-converters/speed/mph-to-kmh",  badge: "Popular", badgeBg: "#1d4ed8", title: "mph to km/h",   description: "Convert miles per hour to kilometers per hour.",  tags: ["mph to kmh"] },
            { href: "/unit-converters/speed/mps-to-kmh",                                         title: "m/s to km/h",   description: "Convert meters per second to km/h.",             tags: ["mps to kmh"] },
            { href: "/unit-converters/speed/kmh-to-mps",                                         title: "km/h to m/s",   description: "Convert km/h to meters per second.",             tags: ["kmh to mps"] },
            { href: "/unit-converters/speed/knot-to-kmh",                                        title: "knot to km/h",  description: "Convert knots to kilometers per hour.",          tags: ["knot to kmh"] },
            { href: "/unit-converters/speed/kmh-to-knot",                                        title: "km/h to knot",  description: "Convert kilometers per hour to knots.",          tags: ["kmh to knot"] },
        ]
    },
    {
        id: "pressure",
        title: "Pressure",
        icon: Gauge,
        iconBg: "linear-gradient(135deg, #cffafe, #a5f3fc)",
        iconColor: "#0e7490",
        tools: [
            { href: "/unit-converters/pressure/psi-to-bar", badge: "Popular", badgeBg: "#0e7490", title: "PSI to Bar",  description: "Convert PSI to Bar pressure.",             tags: ["psi to bar"] },
            { href: "/unit-converters/pressure/bar-to-psi",                                       title: "Bar to PSI",  description: "Convert Bar to PSI pressure.",             tags: ["bar to psi"] },
            { href: "/unit-converters/pressure/atm-to-psi",                                       title: "ATM to PSI",  description: "Convert Atmospheres to PSI.",              tags: ["atm to psi"] },
            { href: "/unit-converters/pressure/psi-to-atm",                                       title: "PSI to ATM",  description: "Convert PSI to Atmospheres.",              tags: ["psi to atm"] },
            { href: "/unit-converters/pressure/kpa-to-psi",                                       title: "kPa to PSI",  description: "Convert Kilopascals to PSI.",              tags: ["kpa to psi"] },
            { href: "/unit-converters/pressure/psi-to-kpa",                                       title: "PSI to kPa",  description: "Convert PSI to Kilopascals.",              tags: ["psi to kpa"] },
        ]
    },
    {
        id: "energy",
        title: "Energy",
        icon: Zap,
        iconBg: "linear-gradient(135deg, #fef9c3, #fef08a)",
        iconColor: "#854d0e",
        tools: [
            { href: "/unit-converters/energy/joules-to-calories", badge: "Popular", badgeBg: "#854d0e", title: "Joules to Calories",     description: "Convert joules to calories.",          tags: ["joules to calories"] },
            { href: "/unit-converters/energy/calories-to-joules",                                   title: "Calories to Joules",     description: "Convert calories to joules.",          tags: ["calories to joules"] },
            { href: "/unit-converters/energy/kwh-to-joules",                                       title: "kWh to Joules",          description: "Convert kilowatt-hours to joules.",    tags: ["kwh to joules"] },
            { href: "/unit-converters/energy/joules-to-kwh",                                       title: "Joules to kWh",          description: "Convert joules to kilowatt-hours.",    tags: ["joules to kwh"] },
            { href: "/unit-converters/energy/btu-to-kwh",                                          title: "BTU to kWh",             description: "Convert BTUs to kilowatt-hours.",      tags: ["btu to kwh"] },
            { href: "/unit-converters/energy/kwh-to-btu",                                          title: "kWh to BTU",             description: "Convert kilowatt-hours to BTUs.",      tags: ["kwh to btu"] },
        ]
    },
    {
        id: "temperature",
        title: "Temperature",
        icon: Thermometer,
        iconBg: "linear-gradient(135deg, #ffe4e6, #fecdd3)",
        iconColor: "#e11d48",
        tools: [
            { href: "/unit-converters/temperature/celsius-to-fahrenheit",  badge: "Popular", badgeBg: "#e11d48", title: "°C to °F",           description: "Convert Celsius to Fahrenheit.",   tags: ["C to F", "Weather"] },
            { href: "/unit-converters/temperature/fahrenheit-to-celsius",  badge: "Popular", badgeBg: "#e11d48", title: "°F to °C",           description: "Convert Fahrenheit to Celsius.",   tags: ["F to C", "Weather"] },
            { href: "/unit-converters/temperature/c-to-f",                 title: "C to F",             description: "Quick C to F converter.",          tags: ["c to f"] },
            { href: "/unit-converters/temperature/f-to-c",                 title: "F to C",             description: "Quick F to C converter.",          tags: ["f to c"] },
            { href: "/unit-converters/temperature/celsius-to-kelvin",      title: "Celsius to Kelvin",  description: "Convert °C to Kelvin.",            tags: ["C to K", "Science"] },
            { href: "/unit-converters/temperature/kelvin-to-celsius",      title: "Kelvin to Celsius",  description: "Convert Kelvin to °C.",            tags: ["K to C", "Science"] },
            { href: "/unit-converters/temperature/fahrenheit-to-kelvin",   title: "°F to Kelvin",       description: "Convert Fahrenheit to Kelvin.",    tags: ["F to K"] },
            { href: "/unit-converters/temperature/kelvin-to-fahrenheit",   title: "Kelvin to °F",       description: "Convert Kelvin to Fahrenheit.",    tags: ["K to F"] },
        ]
    },
    {
        id: "cooking",
        title: "Cooking",
        icon: ChefHat,
        iconBg: "linear-gradient(135deg, #fef3c7, #fde68a)",
        iconColor: "#b45309",
        tools: [
            { href: "/unit-converters/cooking/ml-to-grams", title: "mL to Grams", description: "Convert milliliters to grams based on ingredient density.", tags: ["mL to Grams", "Baking"] },
            { href: "/unit-converters/cooking/grams-to-ml", title: "Grams to mL", description: "Convert grams back to milliliters accurately.", tags: ["Grams to mL", "Liquids"] },
            { href: "/unit-converters/cooking/cups-to-grams", badge: "Popular", badgeBg: "#f59e0b", title: "Cups to Grams", description: "Convert baking cups to exact grams.", tags: ["Cups to Grams", "Flour"] },
            { href: "/unit-converters/cooking/grams-to-cups", title: "Grams to Cups", description: "Figure out exactly how many cups makes your gram weight.", tags: ["Grams to Cups", "Baking"] },
            { href: "/unit-converters/cooking/ml-to-cups", title: "mL to Cups", description: "Convert metric liquid to standard US cups.", tags: ["mL to Cups", "Liquids"] },
            { href: "/unit-converters/cooking/cups-to-ml", title: "Cups to mL", description: "Convert US cups into milliliters.", tags: ["Cups to mL", "Baking"] },
            { href: "/unit-converters/cooking/tbsp-to-grams", title: "Tbsp to Grams", description: "Convert tablespoons to grams for precise seasoning.", tags: ["Tbsp to Grams", "Dry"] },
            { href: "/unit-converters/cooking/grams-to-tbsp", title: "Grams to Tbsp", description: "Find out how many tablespoons are in a gram measurement.", tags: ["Grams to Tbsp", "Dry"] },
            { href: "/unit-converters/cooking/tsp-to-grams", title: "Tsp to Grams", description: "Convert teaspoons to grams.", tags: ["Tsp to Grams", "Spices"] },
            { href: "/unit-converters/cooking/grams-to-tsp", title: "Grams to Tsp", description: "Convert grams to teaspoons.", tags: ["Grams to Tsp", "Spices"] },
            { href: "/unit-converters/cooking/oz-to-grams", title: "Oz to Grams", description: "Convert ounces to grams.", tags: ["Oz to Grams", "Standard"] },
            { href: "/unit-converters/cooking/grams-to-oz", title: "Grams to Oz", description: "Convert grams to ounces.", tags: ["Grams to Oz", "Standard"] },
            { href: "/unit-converters/cooking/liters-to-grams", title: "Liters to Grams", description: "Convert huge liters to grams.", tags: ["Liters to Grams", "Scaling"] },
            { href: "/unit-converters/cooking/grams-to-liters", title: "Grams to Liters", description: "Convert grams to liters.", tags: ["Grams to Liters", "Scaling"] },
            { href: "/unit-converters/cooking/cups-to-ounces", title: "Cups to Ounces", description: "Convert volume cups to weight ounces.", tags: ["Cups to Ounces", " Baking"] },
            { href: "/unit-converters/cooking/ounces-to-cups", title: "Ounces to Cups", description: "Convert weight ounces to volume cups.", tags: ["Ounces to Cups", "Baking"] },
            { href: "/unit-converters/cooking/ml-to-tbsp", title: "mL to Tbsp", description: "Convert milliliters to tablespoons.", tags: ["mL to Tbsp", "Liquids"] },
            { href: "/unit-converters/cooking/tbsp-to-ml", title: "Tbsp to mL", description: "Convert tablespoons to milliliters.", tags: ["Tbsp to mL", "Liquids"] },
            { href: "/unit-converters/cooking/ml-to-tsp", title: "mL to Tsp", description: "Convert milliliters to teaspoons.", tags: ["mL to Tsp", "Liquids"] },
            { href: "/unit-converters/cooking/tsp-to-ml", title: "Tsp to mL", description: "Convert teaspoons to milliliters.", tags: ["Tsp to mL", "Liquids"] },
            { href: "/unit-converters/cooking/tablespoons-to-cups", title: "Tbsp to Cups", description: "Convert tablespoons to cups.", tags: ["Tbsp to Cups", "Volume"] },
            { href: "/unit-converters/cooking/cups-to-tablespoons", title: "Cups to Tbsp", description: "Convert cups to tablespoons.", tags: ["Cups to Tbsp", "Volume"] }
        ]
    }
];

export default function UnitConvertersPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col container mx-auto px-4 py-12 md:py-24 mt-16">
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
                <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "12px" }}>
                    Universal Converters
                </span>
                <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                    Unit Converters Collection
                </h1>
                <p style={{ marginTop: "16px", color: "#64748b", fontSize: "16px", maxWidth: "600px", margin: "16px auto 0" }}>
                    Fast, accurate, and completely free unit conversion tools categorized for your convenience. Convert digital storage, length, metrics and imperial units with zero hassle.
                </p>
            </div>

            <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: "60px" }}>
                {categories.map((category) => {
                    const CatIcon = category.icon;
                    return (
                        <div key={category.id} id={category.id}>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px", paddingBottom: "16px", borderBottom: "2px solid #e2e8f0" }}>
                                <div style={{
                                    width: "48px", height: "48px", borderRadius: "12px",
                                    background: category.iconBg, color: category.iconColor,
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    <CatIcon size={24} />
                                </div>
                                <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                                    {category.title} Converters
                                </h2>
                            </div>

                            {category.tools.length > 0 ? (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "20px" }}>
                                    {category.tools.map((tool) => (
                                        <Link key={tool.href} href={tool.href} style={{ textDecoration: "none" }}>
                                            <div
                                                className="unit-tool-card"
                                                style={{
                                                    background: "white", borderRadius: "20px", border: "1px solid #f1f5f9",
                                                    padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                                                    cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
                                                    height: "100%", display: "flex", flexDirection: "column", gap: "12px",
                                                }}
                                            >
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0 }}>{tool.title}</h3>
                                                    {tool.badge && (
                                                        <span style={{ fontSize: "10px", fontWeight: 700, background: tool.badgeBg, color: "white", padding: "2px 8px", borderRadius: "999px", letterSpacing: "0.05em" }}>
                                                            {tool.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>{tool.description}</p>
                                                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: category.iconColor, fontWeight: 700, fontSize: "13px", marginTop: "auto", paddingTop: "8px" }}>
                                                    Convert Now <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ background: "white", border: "2px dashed #e2e8f0", borderRadius: "20px", padding: "40px", textAlign: "center" }}>
                                    <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#475569", marginBottom: "8px" }}>Coming Soon</h3>
                                    <p style={{ fontSize: "14px", color: "#94a3b8" }}>Tools for {category.title} category are being developed.</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
