use job;
create table tbl_job_posting_questions (
	id INT NOT NULL AUTO_INCREMENT,
	title NVARCHAR(64) NOT NULL,
	value NVARCHAR(64) NOT NULL,
	type NVARCHAR(64) NOT NULL,
	description NVARCHAR(1024) NOT NULL,
    date_created datetime Default Now(),
    primary key (id)
);

CREATE INDEX question_id_question_type_index
on tbl_job_posting_questions (id, email_address);

CREATE UNIQUE INDEX unique_title_index
on tbl_job_posting_questions (title);

CREATE UNIQUE INDEX unique_value_index
on tbl_job_posting_questions (value);