import osmium as o
import sys
import copy

factory = o.geom.GeoJSONFactory()

class FileStatsHandler(o.SimpleHandler):

    def __init__(self):
        super(FileStatsHandler, self).__init__()
        self.length = 0.0
        self.areas = None

    # def node(self, n):
    #     pass

    def way(self, w):
        if 'building' in w.tags:
            try:
                # add to batch
                x = 0
            except o.InvalidLocationError:
                # A location error might occur if the osm file is an extract
                # where nodes of ways near the boundary are missing.
                print("WARNING: way %d incomplete. Ignoring." % w.id)


    # def relation(self, r):
    #     pass

    def area(self, a):
        mp = factory.create_multipolygon(a)
        self.areas = mp


def main(osmfile):
    h = FileStatsHandler()

    h.apply_file(osmfile, locations=True)
    if h.areas:
        print(repr(h.areas))

    return 0

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python %s <osmfile>" % sys.argv[0])
        sys.exit(-1)

    exit(main(sys.argv[1]))