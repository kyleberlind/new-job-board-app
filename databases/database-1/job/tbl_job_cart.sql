use job;
create table tbl_job_cart (
	id INT NOT NULL AUTO_INCREMENT,
    job_id INT NOT NULL,
    user_id INT NOT NULL,
    primary key (id)
);

CREATE INDEX tbl_job_cart_job_id_user_id__index
on tbl_job_cart (job_id, user_id);

CREATE UNIQUE INDEX tbl_job_cart_unique_index
on tbl_job_cart (job_id, user_id);