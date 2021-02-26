use job;
create table tbl_job_posting_field_mapping (
	id INT NOT NULL AUTO_INCREMENT,
    job_id INT NOT NULL,
    field_id INT NOT NULL,
    required BOOLEAN NOT NULL,
    primary key (id)
);

CREATE INDEX job_id_field_id_type_index
on tbl_job_posting_field_mapping (job_id, field_id);
