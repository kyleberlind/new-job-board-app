use user;
create table tbl_employer (
	employer_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
	employer_name NVARCHAR(64),
	employer_size NVARCHAR(64),
    sign_up_date datetime Default Now(),
    primary key (employer_id)
);

CREATE INDEX user_id_employer_id_index
on tbl_employer (user_id, employer_id);

CREATE UNIQUE INDEX unique_employer_id_user_id_index
on tbl_employer (employer_id, user_id);
