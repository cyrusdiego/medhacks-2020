const geolib = require('geolib');
const util = require('./util');
const fs = require('fs');

class MockTable {
  constructor(rows) {
    this.rows = rows;
  }
}

class Row {
  constructor(name, multipolygon, center, size, occupants) {
    this.name = name;
    this.multipolygon = multipolygon;
    this.center = center;
    this.size = size;
    this.occupants = occupants;
  }
}

// let coord_list = [
//   [-113.5251815, 53.5192145],
//   [-113.5251735, 53.5189469],
//   [-113.5251686, 53.5187805],
//   [-113.5244498, 53.5187882],
//   [-113.5244576, 53.5191306],
//   [-113.5244596, 53.5192161],
//   [-113.5251815, 53.5192145],
// ];
// coord_list = util.reverse_coords(coord_list);
// const multi = 0;
// const cent = geolib.getCenter(util.coord_list_to_dict(coord_list));
// const cent2 = {
//   latitude: cent.latitude + 5,
//   longitude: cent.longitude + 5,
// };
// const size = geolib.getAreaOfPolygon(coord_list);
// const occup = 0;
// const mockRows = [
//   new Row('Canadian Blood Services', multi, cent, size, occup),
//   new Row('Canadian Blood Services', multi, cent2, size, occup),
// ];

let geojsonData = JSON.parse(fs.readFileSync('./generator/buildings.geojson'));
let mockRows = [];
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
for (let i = 0; i < geojsonData.features.length; i++) {
  const coords = util.reverse_coords(
    geojsonData.features[i].geometry.coordinates
  );
  const multi = coords;
  const cent = geolib.getCenter(util.coord_list_to_dict(coords));
  const size = geolib.getAreaOfPolygon(coords);
  const occup = Math.ceil(util.randomIntFromInterval(1, 100));
  // TODO: name
  let row = new Row('', multi, cent, size, occup);
  mockRows.push(row);
}

const shuffled = shuffle(mockRows).splice(0, mockRows.length / 100);

const mockTable = new MockTable(shuffled);

module.exports = mockTable;
