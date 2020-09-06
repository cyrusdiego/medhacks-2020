const geolib = require('geolib');
const util = require('./util');

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

let coord_list = [[-113.5251815,53.5192145],[-113.5251735,53.5189469],[-113.5251686,53.5187805],[-113.5244498,53.5187882],[-113.5244576,53.5191306],[-113.5244596,53.5192161],[-113.5251815,53.5192145]];
console.log(coord_list);
coord_list = util.reverse_coords(coord_list);
console.log(coord_list);
const multi = 0;
const cent = geolib.getCenter(util.coord_list_to_dict(coord_list));
const size = geolib.getAreaOfPolygon(coord_list);
const occup = 0;
const mockRows = [new Row("Canadian Blood Services", multi, cent, size, occup)];
console.log(mockRows[0].center)
console.log(mockRows[0].size)
const mockTable = new MockTable(mockRows);

module.exports=mockTable;