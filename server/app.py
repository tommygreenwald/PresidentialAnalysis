#!flask/bin/python
from flask import Flask, request, make_response, jsonify
import src.service as service

app = Flask(__name__)

@app.route('/getOneSRToneAnalysis', methods=['GET'])
def getOneSRToneAnalysis():
    subreddit = request.headers['subreddit']
    keyword = request.headers['keyword']
    results = service.getOneSRToneAnalysis(subreddit, keyword)
    resp = make_response(jsonify(results))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == '__main__':
    app.debug = True
    app.logger.debug('Starting Presidential Tone Analyzer Service!')
    app.run()
