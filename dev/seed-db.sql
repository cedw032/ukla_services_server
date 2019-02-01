
DROP TABLE IF EXISTS public.user;
DROP TABLE IF EXISTS public.student;

CREATE TABLE public.user(
	id serial PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (100) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE public.student(
	id serial PRIMARY KEY,
	sid VARCHAR (50) NOT NULL,
	name VARCHAR (50) NOT NULL,
	quranTeacher VARCHAR (50) NOT NULL,
	islamiayatTeacher VARCHAR (50) NOT NULL,
	grade VARCHAR (50) NOT NULL,
	intake VARCHAR (50) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

INSERT INTO public.user (username, password) 
	VALUES ('chad', 'de8eab29d1955f6c24d5058f929a7dff9110e9d6e03af3d72f64ed5984b35015');