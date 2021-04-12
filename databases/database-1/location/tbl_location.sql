use location;
create table tbl_location (
	id INT NOT NULL AUTO_INCREMENT,
    city NVARCHAR(64) NOT NULL,
    state_id NVARCHAR(2) NOT NULL,
    primary key (id)
);

CREATE INDEX id_city_index_tbl_location
on tbl_location (id, city);

CREATE INDEX city_state_index_tbl_location
on tbl_location (city, state_id);

CREATE UNIQUE INDEX unique_city_state_index
on tbl_location (city, state);
