import osmium as o
import sys
import copy
import json
import os 
from geojson import Feature, FeatureCollection, dump

factory = o.geom.GeoJSONFactory()

class FileStatsHandler(o.SimpleHandler):

    def __init__(self):
        super(FileStatsHandler, self).__init__()
        self.areas = []

    # def node(self, n):
    #     pass

    # def way(self, w):
    #     if 'building' in w.tags:
    #         try:
    #             # do something
    #         except o.InvalidLocationError:
    #             # A location error might occur if the osm file is an extract
    #             # where nodes of ways near the boundary are missing.
    #             print("WARNING: way %d incomplete. Ignoring." % w.id)


    # def relation(self, r):
    #     pass

    def area(self, a):
        try:
            mp = factory.create_multipolygon(a)
            self.areas.append(mp)
        except:
            print("Error while creating multipolygon; likely invalid Area")

        

def write_GeoJSON(areas):
    features = []
    for i in areas:
        d = json.loads(i)    # load string repr of a dict into a dict
        # remove extra lists from coordinates
        coord = d.get('coordinates')
        if coord:
            if len(coord) != 4:
                coord = coord[0][0]
                d['coordinates'] = coord
                features.append(Feature(geometry=d))
            else:
                print("Warning: expected to strip off dimensions of the coordinates list")

    feature_collection = FeatureCollection(features)

    dir_path = os.path.dirname(os.path.realpath(__file__))
    dump_file = os.path.join(dir_path, 'buildings.geojson')
    with open(dump_file, 'w') as f:
        dump(feature_collection, f)


def main(osmfile):
    h = FileStatsHandler()

    h.apply_file(osmfile, locations=True)
    if h.areas:
        write_GeoJSON(h.areas)

    return 0

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python %s <osmfile>" % sys.argv[0])
        sys.exit(-1)

    exit(main(sys.argv[1]))