import src.reddit.getRedditData as reddit
import src.toneAnalyzer.doToneAnalysis as toneAnalyzer

def getOneSRToneAnalysis(subreddit, keyword):
  comments = reddit.fetchOneSRKeyword(subreddit, keyword)
  comments.sort(key=lambda x: x['score'], reverse=True)
  commentString = {
    'text': ''
  }

  for comment in comments:
    commentString['text'] += comment['text']

  tones = toneAnalyzer.analyzeToneOneSR(commentString)

  topComments = comments[:10]
  topCommentsMap = map(lambda x: x['text'], topComments)
  topCommentsText = list(topCommentsMap)

  cleanTopComments(topCommentsText)

  return { 'tones': tones, 'topComments': topCommentsText }

def cleanTopComments(topComments):
  for i in range(len(topComments)):
    topComments[i] = topComments[i][0:len(topComments[i]) - 1].replace(';','.')

