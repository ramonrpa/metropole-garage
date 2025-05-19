CREATE TABLE IF NOT EXISTS metropole.vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  plate VARCHAR(10) NOT NULL,
  fuel FLOAT NOT NULL,
  body_health FLOAT NOT NULL,
  engine_health FLOAT NOT NULL,
  primary_color VARCHAR(50) NOT NULL DEFAULT '[]',
  secondary_color VARCHAR(50) NOT NULL DEFAULT '[]',
  modifications TEXT
);

INSERT INTO metropole.vehicles (owner, model, plate, fuel, body_health, engine_health, primary_color, secondary_color, modifications)
VALUES
('license:135452456c75f1c5c7ab1980fcf5d4be23df65c1', 'adder', 'ABC123', 100.0, 100.0, 100.0, '[255,0,255]', '[]', '[{"type":11,"value":3},{"type":23,"value":4}]'),
('license:135452456c75f1c5c7ab1980fcf5d4be23df65c1', 'schafter3', 'ABC124', 80.0, 90.0, 95.0, '[0,255,15]', '[]', '[{"type":11,"value":3},{"type":23,"value":4}]'),
('license:135452456c75f1c5c7ab1980fcf5d4be23df65c1', 'sanctus', 'ABC125', 50.0, 85.0, 90.0, '[25,0,255]', '[]', '[{"type":11,"value":3},{"type":23,"value":4}]');
