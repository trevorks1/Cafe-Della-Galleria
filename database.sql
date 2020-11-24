
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (25) NOT NULL, 
    "first_name" VARCHAR (25) NOT NULL, 
    "last_name" VARCHAR (25) NOT NULL,
    "mailing_address" VARCHAR (50), 
    "city" VARCHAR (30) not null, 
    "state" VARCHAR (30) not null,
    "postal_code" INT, 
    "contact_count" INT
);

CREATE TABLE "portfolio" (
    "id" SERIAL PRIMARY KEY, 
    "title" VARCHAR (30),
    "description" VARCHAR (250) NOT NULL, 
    "forsale" boolean, 
    "user_id" INT
); 

CREATE TABLE "images" (
    "id" SERIAL PRIMARY KEY, 
    "alt" VARCHAR (30), 
    "url" VARCHAR (50) NOT NULL,
    "portfolio_id" INT
);

CREATE TABLE "genre" (
    "id" SERIAL PRIMARY KEY, 
    "genre_name" VARCHAR (20),
    "portfolio_id" INT
);

CREATE TABLE "rating" (
    "id" SERIAL PRIMARY KEY,
    "portfolio_id" INT,
    "star_rating" INT,
    "date" date
); 
