# IATFProtocolManager-api
CREATE TABLE IF NOT EXISTS animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tag_number VARCHAR(255) UNIQUE NOT NULL,
    breed VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS protocols (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    hormones TEXT,
    bull VARCHAR(255),
    notifications BOOLEAN
);

CREATE TABLE IF NOT EXISTS protocol_animals (
    protocol_id INTEGER REFERENCES protocols(id),
    animal_id INTEGER REFERENCES animals(id),
    pregnant BOOLEAN,
    PRIMARY KEY (protocol_id, animal_id)
);

-- Inserir todos os animais primeiro
INSERT INTO animals (name, tag_number, breed) VALUES
('Mimosa', 'MMS001', 'Gir'),
('Estrela', 'EST002', 'Holandesa'),
('Rajada', 'RJD003', 'Girolando'),
('Malhada', 'MLH004', 'Jersey'),
('Canela', 'CNL005', 'Pardo-Suíça'),
('Diamante', 'DIA006', 'Gir'),
('Pérola', 'PRL007', 'Holandesa'),
('Jade', 'JDE008', 'Girolando'),
('Safira', 'SFR009', 'Jersey'),
('Topázio', 'TPZ010', 'Pardo-Suíça'),
('Lua', 'LUA011', 'Gir'),
('Sol', 'SOL012', 'Holandesa'),
('Íris', 'IRS013', 'Girolando'),
('Aurora', 'AUR014', 'Jersey'),
('Brisa', 'BRS015', 'Pardo-Suíça'),
('Cacau', 'CAC016', 'Gir'),
('Mel', 'MEL017', 'Holandesa'),
('Avelã', 'AVL018', 'Girolando'),
('Amora', 'AMR019', 'Jersey'),
('Figo', 'FIG020', 'Pardo-Suíça'),
('Kiwi', 'KIW021', 'Gir'),
('Lima', 'LMA022', 'Holandesa'),
('Manga', 'MGA023', 'Girolando'),
('Noz', 'NOZ024', 'Jersey'),
('Oliva', 'OLV025', 'Pardo-Suíça'),
('Pêssego', 'PSG026', 'Gir'),
('Roma', 'RMA027', 'Holandesa'),
('Uva', 'UVA028', 'Girolando'),
('Cereja', 'CRJ029', 'Jersey'),
('Damasco', 'DMS030', 'Pardo-Suíça'),
('Lírio', 'LIR031', 'Gir'),
('Tulipa', 'TLP032', 'Holandesa'),
('Rosa', 'ROS033', 'Girolando'),
('Cravo', 'CRV034', 'Jersey'),
('Margarida', 'MGD035', 'Pardo-Suíça'),
('Girassol', 'GRS036', 'Gir'),
('Hortênsia', 'HRT037', 'Holandesa'),
('Violeta', 'VLT038', 'Girolando'),
('Orquídea', 'ORQ039', 'Jersey'),
('Jasmim', 'JSM040', 'Pardo-Suíça'),
('Alecrim', 'ALC041', 'Gir'),
('Manjericão', 'MNJ042', 'Holandesa'),
('Sálvia', 'SVG043', 'Girolando'),
('Tomilho', 'TML044', 'Jersey'),
('Louro', 'LOU045', 'Pardo-Suíça'),
('Pimenta', 'PMT046', 'Gir'),
('Canela', 'CNL047', 'Holandesa'),
('Gengibre', 'GGB048', 'Girolando'),
('Mostarda', 'MST049', 'Jersey'),
('Anis', 'ANS050', 'Pardo-Suíça');

-- Inserir os protocolos
INSERT INTO protocols (name, start_date, hormones, bull, notifications) VALUES
('IATF Abril', '2025-04-15', 'GnRH, PGF2α, eCG', 'Touro A', true),
('Repasse Maio', '2025-05-10', 'GnRH', 'Touro B', false),
('Inseminação Junho', '2025-06-01', 'Sêmen Congelado X', null, true),
('Sincronização Julho', '2025-07-20', 'Progesterona, PGF2α', 'Touro C', true),
('Transferência Agosto', '2025-08-05', 'Nenhum', null, false);
select * from animals
-- Associar os animais aos protocolos
-- Protocolo 'IATF Abril'
INSERT INTO protocol_animals (protocol_id, animal_id, pregnant) VALUES
(1, 3, false), -- Rajada não prenha
(1, 5, true), -- Canela prenha
(1, 7, false), -- Pérola não prenha
(1, 9, true);  -- Safira prenha

-- Protocolo 'Repasse Maio'
INSERT INTO protocol_animals (protocol_id, animal_id, pregnant) VALUES
(2, 2, false), -- Estrela não prenha
(2, 4, true),  -- Malhada prenha
(2, 6, false), -- Diamante não prenha
(2, 8, true),  -- Jade prenha
(2, 10, false); -- Topázio não prenha

-- Protocolo 'Inseminação Junho'
INSERT INTO protocol_animals (protocol_id, animal_id, pregnant) VALUES
(3, 11, true), -- Lua prenha
(3, 13, true), -- Íris prenha
(3, 15, false), -- Brisa não prenha
(3, 17, true), -- Mel prenha
(3, 19, false); -- Amora não prenha

-- Protocolo 'Sincronização Julho'
INSERT INTO protocol_animals (protocol_id, animal_id, pregnant) VALUES
(4, 12, false), -- Sol não prenha
(4, 14, true),  -- Aurora prenha
(4, 16, false), -- Cacau não prenha
(4, 18, true),  -- Avelã prenha
(4, 20, false); -- Figo não prenha

-- Protocolo 'Transferência Agosto'
INSERT INTO protocol_animals (protocol_id, animal_id, pregnant) VALUES
(5, 21, true), -- Kiwi prenha
(5, 23, false), -- Manga não prenha
(5, 25, true), -- Oliva prenha
(5, 27, false), -- Roma não prenha
(5, 29, true);  -- Cereja prenha



-- Deletar os dados da tabela de junção primeiro, pois ela referencia as outras tabelas
DELETE FROM protocol_animals;

-- Em seguida, deletar os dados das tabelas que são referenciadas
DELETE FROM protocols;
DELETE FROM animals;

ALTER SEQUENCE animals_id_seq RESTART WITH 1;
ALTER SEQUENCE protocols_id_seq RESTART WITH 1;
select * from protocols


ALTER TABLE animals ADD COLUMN weight VARCHAR(255);
ALTER TABLE animals ADD COLUMN age VARCHAR(255);
ALTER TABLE animals ADD COLUMN reproductive_history TEXT;
ALTER TABLE animals ADD COLUMN image_url VARCHAR(255);

ALTER TABLE protocols
RENAME COLUMN start_date TO startDate;