from ..__init__ import db


class LocationModel(db.Model):
    __tablename__ = "tbl_location"
    __table_args__ = {'schema': 'location'}

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(64))
    state_id = db.Column(db.String(2))
