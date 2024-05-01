CREATE DATABASE IF NOT EXISTS plant_structure;
USE plant_structure;

CREATE TABLE processes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_id INT,
    name VARCHAR(255),
    type VARCHAR(255),
    FOREIGN KEY (process_id) REFERENCES processes(id)
);

CREATE TABLE sensors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_id INT,
    type VARCHAR(255),
    data VARCHAR(255),
    FOREIGN KEY (equipment_id) REFERENCES equipment(id)
);

-- Insert some sample data
INSERT INTO processes (name, description) VALUES 
('Melting', 'Melting raw materials into molten metal'),
('Casting', 'Casting molten metal into shapes'),
('Rolling', 'Rolling metal into sheets');

INSERT INTO equipment (process_id, name, type) VALUES 
((SELECT id FROM processes WHERE name = 'Melting'), 'Furnace', 'Induction Furnace'),
((SELECT id FROM processes WHERE name = 'Casting'), 'Mold Machine', 'Injection Mold'),
((SELECT id FROM processes WHERE name = 'Rolling'), 'Roller', 'Flat Roller');

INSERT INTO sensors (equipment_id, type, data) VALUES 
((SELECT id FROM equipment WHERE name = 'Furnace'), 'Temperature', '1500°C'),
((SELECT id FROM equipment WHERE name = 'Mold Machine'), 'Pressure', '200 bars'),
((SELECT id FROM equipment WHERE name = 'Roller'), 'Thickness Gauge', '2mm');
