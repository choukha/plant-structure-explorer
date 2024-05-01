from flask import Flask, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return pymysql.connect(host='localhost',
                           user='root',
                           password='password',
                           db='plant_structure',
                           cursorclass=pymysql.cursors.DictCursor)

@app.route('/structure')
def get_structure():
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
    SELECT p.name AS process_name, p.description, e.name AS equipment_name, e.type AS equipment_type, s.type AS sensor_type, s.data AS sensor_data
    FROM processes p
    JOIN equipment e ON p.id = e.process_id
    JOIN sensors s ON e.id = s.equipment_id
    """
    cursor.execute(query)
    structure = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(structure)

if __name__ == '__main__':
    app.run(debug=True)
