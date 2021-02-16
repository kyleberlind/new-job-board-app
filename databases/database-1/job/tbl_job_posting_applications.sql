use job;
create table tbl_job_posting_applications (
	id INT NOT NULL AUTO_INCREMENT,
  job_id INT NOT NULL,
  applicant_id INT NOT NULL,
	employer_id INT NOT NULL,
  date_applied datetime Default Now(),
  primary key (id)
);
