CREATE TABLE users (
    usr_id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    usr_password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL CHECK (position('@' IN email)>1),
    gold_amt INTEGER DEFAULT 0 CHECK (gold_amt >= 0),
    usr_avt TEXT,
    last_login DATE NOT NULL
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    pet_name VARCHAR(25) UNIQUE NOT NULL,
    hunger INTEGER NOT NULL DEFAULT 0 CHECK (hunger>=0),
    happiness INTEGER NOT NULL DEFAULT 0 CHECK (happiness>=0),
    pet_lvl INTEGER NOT NULL DEFAULT 1 CHECK (pet_lvl >= 1),
    lvl_exp INTEGER NOT NULL DEFAULT 0 CHECK (lvl_exp >= 0),
    pet_img TEXT NOT NULL,
    pet_status TEXT NOT NULL,
    last_fed TIMESTAMP,
    last_play TIMESTAMP,
    usr_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE inventories (
    item_id INTEGER NOT NULL,
    usr_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

