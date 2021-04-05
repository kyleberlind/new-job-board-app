use job;
create table tbl_job_posting_status (
	id INT NOT NULL AUTO_INCREMENT,
    status NVARCHAR(64) NOT NULL,
    primary key (id)
);

CREATE INDEX status_id_status_index
on tbl_job_posting (id, status);