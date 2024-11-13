from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = 'database/investors_commitments.db'

def query_db(query, args=(), one=False):
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute(query, args)
    rv = cur.fetchall()
    conn.close()
    return (rv[0] if rv else None) if one else rv


# Endpoint to get list of investors and total commitments
@app.route('/investors', methods=['GET'])
def get_investors():
    query = '''
        SELECT investors.id, investors.name, investors.country, investors.type,
               SUM(commitments.amount) as total_commitment
        FROM investors
        LEFT JOIN commitments ON investors.id = commitments.investor_id
        GROUP BY investors.id
    '''
    results = query_db(query)
    investors = [
        {"id": row[0], "name": row[1], "country": row[2], "type": row[3], "total_commitment": row[4]}
        for row in results
    ]
    return jsonify(investors)

@app.route('/commitments', methods=['GET'])
def get_commitments():
    # Retrieve optional query parameters
    investor_id = request.args.get('investor_id', type=int)
    asset_class = request.args.get('asset_class', type=str)

    # Base query
    query = '''
        SELECT id, investor_id, asset_class, amount, currency, date_added, last_updated
        FROM commitments
    '''
    conditions = []
    args = []

    # Apply filters based on the query parameters
    if investor_id is not None:
        conditions.append('investor_id = ?')
        args.append(investor_id)

    if asset_class is not None:
        conditions.append('asset_class = ?')
        args.append(asset_class)

    # Add the WHERE clause if there are any conditions
    if conditions:
        query += ' WHERE ' + ' AND '.join(conditions)

    # Execute the query
    results = query_db(query, args)
    commitments = [
        {
            "id": row[0],
            "investor_id": row[1],
            "asset_class": row[2],
            "amount": row[3],
            "currency": row[4],
            "date_added": row[5],
            "last_updated": row[6]
        }
        for row in results
    ]

    # Return the filtered commitments as JSON
    return jsonify(commitments)

if __name__ == '__main__':
    app.run(debug=True)
