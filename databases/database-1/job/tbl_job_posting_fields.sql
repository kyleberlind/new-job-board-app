use job;
create table tbl_job_posting_fields (
	id INT NOT NULL AUTO_INCREMENT,
	title NVARCHAR(64) NOT NULL,
	value NVARCHAR(1024) NOT NULL,
	type NVARCHAR(64) NOT NULL,
	description NVARCHAR(1024) NOT NULL,
    date_created datetime Default Now(),
    primary key (id)
);

CREATE INDEX field_id_field_type_index
on tbl_job_posting_fields (id, type);

CREATE UNIQUE INDEX unique_title_index
on tbl_job_posting_fields (title);

CREATE UNIQUE INDEX unique_value_index
on tbl_job_posting_fields (value);