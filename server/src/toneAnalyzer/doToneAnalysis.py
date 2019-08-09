import requests
import json
import os

absFilePath = os.path.join(os.path.dirname(__file__), '../../config.json')
with open(absFilePath) as json_data:
    config = json.load(json_data,)

def analyzeToneOneSR(comments):
  session = requests.Session()
  session.auth = ("apiKey", config['toneSecretKey'])

  params = {
    "version": "2017-09-21",
    "sentences": "false"
  }
  headers = {
    "Content-Type": "application/json"
  }

  resp = session.post(config['toneUrl'], json=comments, params=params, headers=headers)
  resp = resp.json()
  tones = resp['document_tone']['tones']
  return tones