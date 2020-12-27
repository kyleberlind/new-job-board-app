use user;
create table tbl_user (
	id INT NOT NULL AUTO_INCREMENT,
	password NVARCHAR(128) NOT NULL,
	first_name NVARCHAR(64),
	last_name NVARCHAR(64),
	email_address NVARCHAR(64) NOT NULL,
    user_type INT NOT NULL,
    sign_up_date datetime Default Now(),
    salt NVARCHAR(128) NOT NULL,
    primary key (id)
);

CREATE INDEX user_id_email_address_index
on tbl_user (id, email_address);

CREATE UNIQUE INDEX unique_email_address_index
on tbl_user (email_address);