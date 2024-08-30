from flask import Flask, request, jsonify
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from flask_cors import CORS
import spacy
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)
CORS(app)  


nlp = spacy.load('en_core_web_sm')

def extract_summary(text, num_sentences=3):
    doc = nlp(text)
    sentences = [sent.text for sent in doc.sents]

    if len(sentences) <= num_sentences:
        return text

    vectorizer = CountVectorizer().fit_transform(sentences)
    vectors = vectorizer.toarray()
    cosine_matrix = cosine_similarity(vectors)
    scores = cosine_matrix.sum(axis=1)
    ranked_sentences = [sentences[i] for i in np.argsort(scores, axis=0)[::-1]]
    return ' '.join(ranked_sentences[:num_sentences])

@app.route('/sentiment', methods=['POST'])
def sentiment_analysis():
    data = request.json
    text = data.get('text', '')


    blob = TextBlob(text)
    textblob_sentiment = blob.sentiment.polarity


    analyzer = SentimentIntensityAnalyzer()
    vader_sentiment = analyzer.polarity_scores(text)['compound']


    if textblob_sentiment > 0 and vader_sentiment > 0:
        sentiment = 'Positive'
    elif textblob_sentiment < 0 and vader_sentiment < 0:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'

    return jsonify({"sentiment": sentiment})

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.json
    text = data.get('text', '')
    
    try:
        summary = extract_summary(text, num_sentences=3)  
    except Exception as e:
        summary = f"Error summarizing text: {str(e)}"

    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True)
