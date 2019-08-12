#!flask/bin/python
from flask import Blueprint, request, make_response, jsonify
import src.service as service

home_view = Blueprint('home_view', __name__)

@home_view.route('/getOneSRToneAnalysis', methods=['GET'])
def getOneSRToneAnalysis():
    subreddit = request.headers['subreddit']
    keyword = request.headers['keyword']
    results = service.getOneSRToneAnalysis(subreddit, keyword)
    resp = make_response(jsonify(results))
    return resp