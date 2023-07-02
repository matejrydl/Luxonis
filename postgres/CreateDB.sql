CREATE TABLE IF NOT EXISTS public.flats
(
    id integer NOT NULL,
    title character varying(60) COLLATE pg_catalog."default",
    image character varying(120) COLLATE pg_catalog."default",
    link character varying(120) COLLATE pg_catalog."default",
    CONSTRAINT flats_pkey PRIMARY KEY (id)
);
 
COPY flats(id, title, image, link) FROM '/docker-entrypoint-initdb.d/hi.csv'
DELIMITER ','
CSV HEADER;