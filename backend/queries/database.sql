CREATE TABLE IF NOT EXISTS user_device_info (
	Device_ID int generated always as identity,
	Device_Name varchar(255),
	DateLogin TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	primary KEY(Device_ID)
);

CREATE TABLE IF NOT EXISTS users (
	User_id int generated always as identity,
	Name varchar(255) NOT NULL,
	Email varchar(255) NOT NULL,
	DateCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Birthday DATE NOT NULL DEFAULT CURRENT_DATE,
	Device_ID int,
	Location GEOMETRY(POINT),
	FOREIGN KEY (Device_ID) REFERENCES user_device_info(Device_ID),
	primary key(User_id)
);


CREATE TABLE IF NOT EXISTS user_oauth_provider (
	User_ID int,
	Oauth_ID varchar(400),
	AccessToken varchar(400),
	RefreshToken varchar(255),
	TokenType varchar(255),
	Expiry TIMESTAMP,
	Last_Accessed TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (User_ID) REFERENCES users(User_ID),
	PRIMARY KEY (Oauth_ID)
);

-- consider using an enum for Pile
CREATE TABLE IF NOT EXISTS match (
    User_id_1 int,
    User_id_2 int,
    MatchDate DATE,
    Pile int,
	FOREIGN KEY (User_id_1) REFERENCES users(User_id),
    FOREIGN KEY (User_id_2) REFERENCES users(User_id)
);
