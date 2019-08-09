import praw
from praw.models import MoreComments
import json
import sys
import os

absFilePath = os.path.join(os.path.dirname(__file__), '../../config.json')
with open(absFilePath) as json_data:
    config = json.load(json_data,)

reddit = praw.Reddit(client_id=config['clientId'], client_secret=config['clientSecret'],
 user_agent=config['userAgent'])

def keywordIn(text, keyword):
    return text.lower().find(keyword.lower()) > -1
    
def validBodyKeyword(text, keyword):
    text = text.lower()
    return text!="[removed]" and text.find('i am a bot, and this action was performed automatically') < 0 and keywordIn(text, keyword)
        
def formatBody(body):
    return (body.replace('.',';').replace('!',',').replace('?',',').replace('\u2019',"'")
                .replace('\n', ' ').replace('\"', "'").replace('&nbsp;', ' ').replace('\u201c', "'")
                .replace('\u201d', "'").replace('\u2713', "") + '.')

def jsonDumpsData(score, body):
    postData = {}
    postData['score'] = score
    postData['text'] = formatBody(body)
    return postData

def fetchOneSRKeyword(subreddit, keyword):
    data = {}
    commentsArray = []
    totalCounter = 0
    non_bmp_map = dict.fromkeys(range(0x10000, sys.maxunicode + 1), 0xfffd)
    for submission in reddit.subreddit(subreddit).hot(limit=10):
        title = submission.title
        if (keywordIn(title, keyword)):
            commentsArray.append(jsonDumpsData(submission.score, submission.title))
            totalCounter += 1
        submission.comment_sort = 'top'
        submission.comments.replace_more(limit=0)
        all_comments = submission.comments.list()
        commentCounter = 0
        for comment in all_comments:
            body = comment.body.translate(non_bmp_map)
            if validBodyKeyword(body, keyword) and comment.score > 0:
                commentsArray.append(jsonDumpsData(comment.score, body))
                commentCounter += 1
                totalCounter += 1
            if (commentCounter >= 50):
                break
        if (totalCounter > 500):
            break
    return commentsArray
