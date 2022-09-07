-- schema/01_create_users.sql
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS histories CASCADE;
DROP TABLE IF EXISTS songs CASCADE;
DROP TABLE IF EXISTS songFavouriteList CASCADE;
-- CREATE USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255)
);
-- CREATE favourites

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE histories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255),
  url VARCHAR(255),
  cover VARCHAR(255),
  lyric VARCHAR(255),
  favorite_id INTEGER REFERENCES favourites(id) ON DELETE CASCADE, 
  history_id INTEGER REFERENCES histories(id) on DELETE CASCADE
);

CREATE TABLE songFavouriteList (
  id SERIAL PRIMARY KEY, 
  song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
  favorite_id INTEGER REFERENCES favourites(id) ON DELETE CASCADE
)
