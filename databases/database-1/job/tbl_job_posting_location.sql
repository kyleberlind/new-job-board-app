use job;
create table tbl_job_posting_location (
	id INT NOT NULL AUTO_INCREMENT,
	job_id INT NOT NULL,
	city NVARCHAR(64) NOT NULL,
    state NVARCHAR(64) NOT NULL,
    zip_code NVARCHAR(64) NOT NULL,
    primary key (id)
);

CREATE INDEX job_id_city_index
on tbl_job_posting_location (job_id, city);