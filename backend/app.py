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

# Endpoint to get commitment breakdown for a specific investor
@app.route('/investors/<int:investor_id>/commitments', methods=['GET'])
def get_investor_commitments(investor_id):
    asset_class = request.args.get('asset_class')
    query = '''
        SELECT asset_class, amount, currency, date_added, last_updated
        FROM commitments
        WHERE investor_id = ?
    '''
    args = [investor_id]

    if asset_class:
        query += ' AND asset_class = ?'
        args.append(asset_class)

    results = query_db(query, args)
    commitments = [
        {"asset_class": row[0], "amount": row[1], "currency": row[2], "date_added": row[3], "last_updated": row[4]}
        for row in results
    ]
    return jsonify(commitments)

if __name__ == '__main__':
    app.run(debug=True)
