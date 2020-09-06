let reverse_coords = function (coords_list) {
    let cl = coords_list;
    for (let i = 0; i < cl.length; i++) {
        let cp = cl[i];
        let temp = cp[0];
        cp[0] = cp[1];
        cp[1] = temp;
    }
    return cl;
}

let coord_list_to_dict = function (coords_list) {
    let coords = [];
    for (let i = 0; i < coords_list.length; i++) {
        coords.push({ latitude: coords_list[i][0], longitude: coords_list[i][1]});
    }
    return coords;
}

module.exports.reverse_coords=reverse_coords;
module.exports.coord_list_to_dict=coord_list_to_dict;