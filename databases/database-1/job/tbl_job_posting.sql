use job;
create table tbl_job_posting (
	id INT NOT NULL AUTO_INCREMENT,
	employer_id INT NOT NULL,
	role NVARCHAR(64) NOT NULL,
    description NVARCHAR(1024) NOT NULL,
    date_created datetime Default Now(),
    team  NVARCHAR(64) NOT NULL,
    status NVARCHAR(64) NOT NULL,
    primary key (id)
);

CREATE INDEX job_id_employer_type_index
on tbl_job_posting (id, employer_id);