-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
--database name account_a_goals_db
create table "user" (
	id serial primary key,
	f_name varchar(255) not null,
	l_name varchar(255) not null ,
	username varchar(80) not null unique ,
	password varchar(1000) not null 
);
