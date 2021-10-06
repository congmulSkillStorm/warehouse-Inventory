import mongoose from 'mongoose';
import { Warehouse } from '../models/index.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warehouse-inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const productSeed = [{"productName":"Yukon","sqft":24,"quantity":1,"color":"Mauv"},
    {"productName":"Fit","sqft":14,"quantity":11,"color":"Red"},
    {"productName":"911","sqft":18,"quantity":26,"color":"Blue"},
    {"productName":"Corvette","sqft":24,"quantity":7,"color":"Goldenrod"},
    {"productName":"3500","sqft":20,"quantity":16,"color":"Khaki"},
    {"productName":"del Sol","sqft":24,"quantity":3,"color":"Maroon"},
    {"productName":"i-280","sqft":15,"quantity":6,"color":"Pink"},
    {"productName":"760","sqft":14,"quantity":23,"color":"Red"},
    {"productName":"Montero","sqft":20,"quantity":1,"color":"Goldenrod"},
    {"productName":"Murciélago","sqft":21,"quantity":24,"color":"Crimson"},
    {"productName":"Transit Connect","sqft":16,"quantity":2,"color":"Crimson"},
    {"productName":"LSS","sqft":14,"quantity":6,"color":"Yellow"},
    {"productName":"Econoline E250","sqft":16,"quantity":7,"color":"Turquoise"},
    {"productName":"Explorer","sqft":18,"quantity":10,"color":"Turquoise"},
    {"productName":"rio","sqft":19,"quantity":26,"color":"Pink"},
    {"productName":"R-Class","sqft":23,"quantity":29,"color":"Orange"},
    {"productName":"C70","sqft":20,"quantity":3,"color":"Mauv"},
    {"productName":"Equus","sqft":21,"quantity":25,"color":"Aquamarine"},
    {"productName":"Trans Sport","sqft":15,"quantity":12,"color":"Violet"},
    {"productName":"Tundra","sqft":15,"quantity":9,"color":"Maroon"},
    {"productName":"GS","sqft":21,"quantity":16,"color":"Puce"},
    {"productName":"H2","sqft":15,"quantity":14,"color":"Puce"},
    {"productName":"A4","sqft":19,"quantity":18,"color":"Aquamarine"},
    {"productName":"LaCrosse","sqft":21,"quantity":12,"color":"Teal"},
    {"productName":"Firefly","sqft":23,"quantity":17,"color":"Indigo"},
    {"productName":"Boxster","sqft":19,"quantity":21,"color":"Indigo"},
    {"productName":"Explorer","sqft":20,"quantity":15,"color":"Aquamarine"},
    {"productName":"ES","sqft":17,"quantity":19,"color":"Turquoise"},
    {"productName":"Blazer","sqft":20,"quantity":22,"color":"Maroon"},
    {"productName":"Riviera","sqft":21,"quantity":17,"color":"Aquamarine"},
    {"productName":"Continental GT","sqft":14,"quantity":1,"color":"Orange"},
    {"productName":"Solara","sqft":24,"quantity":17,"color":"Goldenrod"},
    {"productName":"Mirage","sqft":14,"quantity":17,"color":"Aquamarine"},
    {"productName":"Express 3500","sqft":17,"quantity":8,"color":"Pink"},
    {"productName":"Ram 1500","sqft":23,"quantity":20,"color":"Fuscia"},
    {"productName":"F250","sqft":21,"quantity":9,"color":"Violet"},
    {"productName":"Sonoma Club Coupe","sqft":15,"quantity":25,"color":"Maroon"},
    {"productName":"Monte Carlo","sqft":18,"quantity":30,"color":"Puce"},
    {"productName":"Versa","sqft":15,"quantity":17,"color":"Turquoise"},
    {"productName":"Concorde","sqft":17,"quantity":8,"color":"Crimson"},
    {"productName":"Sebring","sqft":17,"quantity":25,"color":"Puce"},
    {"productName":"Intrigue","sqft":19,"quantity":22,"color":"Indigo"},
    {"productName":"Spectra5","sqft":22,"quantity":18,"color":"Violet"},
    {"productName":"530","sqft":20,"quantity":10,"color":"Mauv"},
    {"productName":"Express 1500","sqft":22,"quantity":28,"color":"Khaki"},
    {"productName":"Sequoia","sqft":15,"quantity":15,"color":"Indigo"},
    {"productName":"Express 3500","sqft":23,"quantity":22,"color":"Orange"},
    {"productName":"RX","sqft":12,"quantity":13,"color":"Goldenrod"},
    {"productName":"Roadster","sqft":14,"quantity":5,"color":"Purple"},
    {"productName":"Commander","sqft":23,"quantity":24,"color":"Turquoise"},
    {"productName":"Exige","sqft":12,"quantity":23,"color":"Orange"},
    {"productName":"Mazda6","sqft":15,"quantity":27,"color":"Purple"},
    {"productName":"Altima","sqft":16,"quantity":10,"color":"Pink"},
    {"productName":"Villager","sqft":14,"quantity":12,"color":"Mauv"},
    {"productName":"Cayman","sqft":16,"quantity":9,"color":"Yellow"},
    {"productName":"4000s","sqft":17,"quantity":15,"color":"Aquamarine"},
    {"productName":"Insight","sqft":13,"quantity":24,"color":"Blue"},
    {"productName":"Pilot","sqft":21,"quantity":20,"color":"Goldenrod"},
    {"productName":"Highlander","sqft":19,"quantity":12,"color":"Yellow"},
    {"productName":"Yukon","sqft":13,"quantity":13,"color":"Blue"},
    {"productName":"Fifth Ave","sqft":19,"quantity":15,"color":"Violet"},
    {"productName":"Grand Caravan","sqft":12,"quantity":18,"color":"Crimson"},
    {"productName":"Land Cruiser","sqft":12,"quantity":19,"color":"Teal"},
    {"productName":"Sequoia","sqft":15,"quantity":4,"color":"Indigo"},
    {"productName":"Paseo","sqft":23,"quantity":13,"color":"Purple"},
    {"productName":"Milan","sqft":19,"quantity":22,"color":"Violet"},
    {"productName":"300","sqft":22,"quantity":30,"color":"Goldenrod"},
    {"productName":"Sequoia","sqft":22,"quantity":7,"color":"Crimson"},
    {"productName":"Passat","sqft":21,"quantity":23,"color":"Indigo"},
    {"productName":"S10","sqft":17,"quantity":18,"color":"Aquamarine"},
    {"productName":"Laser","sqft":12,"quantity":9,"color":"Yellow"},
    {"productName":"FJ Cruiser","sqft":24,"quantity":11,"color":"Yellow"},
    {"productName":"Corvette","sqft":20,"quantity":4,"color":"Purple"},
    {"productName":"Envoy","sqft":18,"quantity":19,"color":"Aquamarine"},
    {"productName":"Laser","sqft":12,"quantity":19,"color":"Turquoise"},
    {"productName":"Tracer","sqft":16,"quantity":19,"color":"Fuscia"},
    {"productName":"Challenger","sqft":21,"quantity":17,"color":"Turquoise"},
    {"productName":"A6","sqft":20,"quantity":23,"color":"Turquoise"},
    {"productName":"612 Scaglietti","sqft":22,"quantity":2,"color":"Yellow"},
    {"productName":"Ciera","sqft":15,"quantity":5,"color":"Violet"},
    {"productName":"Mazda6","sqft":19,"quantity":19,"color":"Maroon"},
    {"productName":"Corvette","sqft":22,"quantity":23,"color":"Violet"},
    {"productName":"Freestar","sqft":19,"quantity":16,"color":"Fuscia"},
    {"productName":"Yukon","sqft":17,"quantity":17,"color":"Crimson"},
    {"productName":"Eurovan","sqft":12,"quantity":7,"color":"Goldenrod"},
    {"productName":"LS","sqft":19,"quantity":24,"color":"Crimson"},
    {"productName":"Vitara","sqft":17,"quantity":8,"color":"Khaki"},
    {"productName":"Expedition EL","sqft":21,"quantity":9,"color":"Red"},
    {"productName":"ES","sqft":16,"quantity":30,"color":"Violet"},
    {"productName":"3000GT","sqft":18,"quantity":16,"color":"Aquamarine"},
    {"productName":"C70","sqft":16,"quantity":29,"color":"Aquamarine"},
    {"productName":"Murano","sqft":23,"quantity":14,"color":"Green"},
    {"productName":"Odyssey","sqft":22,"quantity":30,"color":"Green"},
    {"productName":"Amanti","sqft":12,"quantity":21,"color":"Green"},
    {"productName":"Mustang","sqft":16,"quantity":29,"color":"Pink"},
    {"productName":"Spyder","sqft":20,"quantity":5,"color":"Teal"},
    {"productName":"Blazer","sqft":15,"quantity":8,"color":"Red"},
    {"productName":"Venture","sqft":19,"quantity":11,"color":"Violet"},
    {"productName":"8 Series","sqft":21,"quantity":26,"color":"Goldenrod"},
    {"productName":"Corvette","sqft":21,"quantity":15,"color":"Fuscia"},
    {"productName":"W201","sqft":18,"quantity":5,"color":"Goldenrod"},
    {"productName":"Pathfinder","sqft":21,"quantity":5,"color":"Goldenrod"},
    {"productName":"tC","sqft":15,"quantity":9,"color":"Red"},
    {"productName":"Trooper","sqft":20,"quantity":6,"color":"Red"},
    {"productName":"Fifth Ave","sqft":20,"quantity":11,"color":"Khaki"},
    {"productName":"SC","sqft":16,"quantity":2,"color":"Purple"},
    {"productName":"MX-5","sqft":20,"quantity":11,"color":"Red"},
    {"productName":"Veracruz","sqft":19,"quantity":4,"color":"Mauv"},
    {"productName":"Firebird","sqft":17,"quantity":7,"color":"Green"},
    {"productName":"Venture","sqft":21,"quantity":3,"color":"Green"},
    {"productName":"Taurus","sqft":17,"quantity":24,"color":"Orange"},
    {"productName":"Sprinter","sqft":23,"quantity":20,"color":"Puce"},
    {"productName":"Avalon","sqft":19,"quantity":17,"color":"Pink"},
    {"productName":"Mazda5","sqft":23,"quantity":18,"color":"Turquoise"},
    {"productName":"Express 1500","sqft":18,"quantity":6,"color":"Indigo"},
    {"productName":"Grand Caravan","sqft":16,"quantity":12,"color":"Green"},
    {"productName":"RX-7","sqft":21,"quantity":2,"color":"Khaki"},
    {"productName":"Discovery","sqft":14,"quantity":15,"color":"Puce"},
    {"productName":"Viper","sqft":17,"quantity":25,"color":"Goldenrod"},
    {"productName":"Suburban 1500","sqft":20,"quantity":28,"color":"Indigo"},
    {"productName":"Sentra","sqft":16,"quantity":1,"color":"Indigo"},
    {"productName":"Swift","sqft":19,"quantity":12,"color":"Goldenrod"},
    {"productName":"Skylark","sqft":14,"quantity":4,"color":"Turquoise"},
    {"productName":"Sportage","sqft":20,"quantity":5,"color":"Orange"},
    {"productName":"IS F","sqft":13,"quantity":14,"color":"Turquoise"},
    {"productName":"Fox","sqft":17,"quantity":1,"color":"Violet"},
    {"productName":"3 Series","sqft":20,"quantity":11,"color":"Pink"},
    {"productName":"2500","sqft":13,"quantity":12,"color":"Yellow"},
    {"productName":"Expo","sqft":13,"quantity":27,"color":"Puce"},
    {"productName":"LS Hybrid","sqft":20,"quantity":26,"color":"Pink"},
    {"productName":"Escort","sqft":23,"quantity":9,"color":"Maroon"},
    {"productName":"Swift","sqft":14,"quantity":1,"color":"Blue"},
    {"productName":"Sierra 3500","sqft":21,"quantity":5,"color":"Purple"},
    {"productName":"Verano","sqft":13,"quantity":12,"color":"Pink"},
    {"productName":"Fox","sqft":24,"quantity":16,"color":"Puce"},
    {"productName":"Tredia","sqft":12,"quantity":22,"color":"Violet"},
    {"productName":"Defender 110","sqft":16,"quantity":13,"color":"Khaki"},
    {"productName":"GTO","sqft":14,"quantity":22,"color":"Orange"},
    {"productName":"MR2","sqft":24,"quantity":19,"color":"Fuscia"},
    {"productName":"V8 Vantage","sqft":24,"quantity":19,"color":"Red"},
    {"productName":"Sonoma Club Coupe","sqft":15,"quantity":19,"color":"Crimson"},
    {"productName":"Firefly","sqft":12,"quantity":4,"color":"Khaki"},
    {"productName":"SVX","sqft":14,"quantity":10,"color":"Red"},
    {"productName":"Carens","sqft":18,"quantity":10,"color":"Goldenrod"},
    {"productName":"Golf","sqft":22,"quantity":17,"color":"Maroon"},
    {"productName":"Voyager","sqft":17,"quantity":28,"color":"Violet"},
    {"productName":"H1","sqft":16,"quantity":5,"color":"Teal"},
    {"productName":"Camry Hybrid","sqft":14,"quantity":9,"color":"Orange"},
    {"productName":"Range Rover","sqft":23,"quantity":3,"color":"Red"},
    {"productName":"6 Series","sqft":12,"quantity":7,"color":"Khaki"},
    {"productName":"Caravan","sqft":23,"quantity":21,"color":"Green"},
    {"productName":"GL-Class","sqft":19,"quantity":21,"color":"Violet"},
    {"productName":"Journey","sqft":14,"quantity":4,"color":"Blue"},
    {"productName":"Thunderbird","sqft":20,"quantity":30,"color":"Teal"},
    {"productName":"Yukon","sqft":24,"quantity":7,"color":"Khaki"},
    {"productName":"Nitro","sqft":22,"quantity":3,"color":"Fuscia"},
    {"productName":"X5","sqft":14,"quantity":10,"color":"Yellow"},
    {"productName":"Town Car","sqft":23,"quantity":3,"color":"Indigo"},
    {"productName":"Cougar","sqft":23,"quantity":13,"color":"Orange"},
    {"productName":"Z4","sqft":18,"quantity":1,"color":"Fuscia"},
    {"productName":"CL-Class","sqft":13,"quantity":2,"color":"Turquoise"},
    {"productName":"Vandura 3500","sqft":12,"quantity":27,"color":"Turquoise"},
    {"productName":"Ram 1500","sqft":24,"quantity":30,"color":"Teal"},
    {"productName":"Savana 3500","sqft":12,"quantity":26,"color":"Pink"},
    {"productName":"Range Rover","sqft":17,"quantity":9,"color":"Orange"},
    {"productName":"Sienna","sqft":23,"quantity":4,"color":"Aquamarine"},
    {"productName":"Esprit","sqft":23,"quantity":5,"color":"Maroon"},
    {"productName":"Econoline E250","sqft":21,"quantity":3,"color":"Turquoise"},
    {"productName":"Montero","sqft":18,"quantity":11,"color":"Puce"},
    {"productName":"525","sqft":22,"quantity":23,"color":"Pink"},
    {"productName":"Xterra","sqft":12,"quantity":21,"color":"Violet"},
    {"productName":"Concorde","sqft":17,"quantity":13,"color":"Turquoise"},
    {"productName":"9-7X","sqft":14,"quantity":13,"color":"Pink"},
    {"productName":"QX56","sqft":23,"quantity":23,"color":"Indigo"},
    {"productName":"M-Class","sqft":15,"quantity":21,"color":"Blue"},
    {"productName":"MX-6","sqft":20,"quantity":25,"color":"Yellow"},
    {"productName":"Town Car","sqft":13,"quantity":16,"color":"Goldenrod"},
    {"productName":"CLK-Class","sqft":16,"quantity":25,"color":"Pink"},
    {"productName":"Thunderbird","sqft":24,"quantity":25,"color":"Orange"},
    {"productName":"Canyon","sqft":15,"quantity":10,"color":"Purple"},
    {"productName":"Spectra","sqft":18,"quantity":22,"color":"Fuscia"},
    {"productName":"Esprit","sqft":23,"quantity":1,"color":"Pink"},
    {"productName":"Dakota Club","sqft":24,"quantity":7,"color":"Goldenrod"},
    {"productName":"Protege","sqft":12,"quantity":17,"color":"Puce"},
    {"productName":"GT-R","sqft":22,"quantity":29,"color":"Purple"},
    {"productName":"911","sqft":14,"quantity":18,"color":"Fuscia"},
    {"productName":"LR3","sqft":16,"quantity":13,"color":"Fuscia"},
    {"productName":"Riviera","sqft":14,"quantity":12,"color":"Purple"},
    {"productName":"Galaxie","sqft":12,"quantity":5,"color":"Puce"},
    {"productName":"Allroad","sqft":21,"quantity":8,"color":"Maroon"},
    {"productName":"S-Class","sqft":12,"quantity":27,"color":"Puce"},
    {"productName":"Passat","sqft":22,"quantity":18,"color":"Turquoise"},
    {"productName":"Passat","sqft":12,"quantity":22,"color":"Fuscia"},
    {"productName":"Nitro","sqft":24,"quantity":29,"color":"Fuscia"},
    {"productName":"Z8","sqft":14,"quantity":14,"color":"Mauv"},
    {"productName":"RDX","sqft":23,"quantity":27,"color":"Yellow"},
    {"productName":"XJ Series","sqft":13,"quantity":16,"color":"Puce"},
    {"productName":"Bronco II","sqft":14,"quantity":27,"color":"Red"},
    {"productName":"Skylark","sqft":20,"quantity":9,"color":"Fuscia"},
    {"productName":"929","sqft":23,"quantity":3,"color":"Teal"}
];

async function runSeed() {
    try{
        let count = 0;
        // let getAllcompanies = await Company.find({});
        let getAllwarehouses = await Warehouse.find({});
        console.log(getAllwarehouses);
        for( const product of productSeed ){
            
            let randomIndex = Math.floor(Math.random() * getAllwarehouses.length);
            console.log(randomIndex);
            let addedCurrentCapacity = getAllwarehouses[randomIndex].currentCapacity + product.sqft * product.quantity;
            await Warehouse.findByIdAndUpdate(getAllwarehouses[randomIndex]._id, {currentCapacity: addedCurrentCapacity}, {$push: {product : product}})
    
            count++;
        }
        console.log(count+ " records inserted!");
        mongoose.connection.close();
        process.exit(0);
    }catch(err) {
        console.error(err);
        mongoose.connection.close();
        process.exit(1);
    }
}

runSeed();