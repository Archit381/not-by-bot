from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch
import nltk
from nltk.util import ngrams
from nltk.probability import FreqDist
from collections import Counter
from nltk.corpus import stopwords
import string
from nltk.tokenize.regexp import wordpunct_tokenize
from fastapi import FastAPI, Path
from pydantic import BaseModel
from typing import Optional

tokenizer=GPT2Tokenizer.from_pretrained('gpt2')

model=GPT2LMHeadModel.from_pretrained('gpt2')

def calculate_perplexity(text):
    encoded_input= tokenizer.encode(text, add_special_tokens=False, return_tensors='pt')
    input_ids=encoded_input[0]

    with torch.no_grad():
        outputs=model(input_ids)
        logits=outputs.logits


    perplexity = torch.exp(torch.nn.functional.cross_entropy(logits.view(-1, logits.size(-1)), input_ids.view(-1)))

    return perplexity.item()

def calculate_burstiness(text):
    tokens=wordpunct_tokenize(text.lower())
    word_freq=FreqDist(tokens)

    repeated_count=sum(count>1 for count in word_freq.values())

    burstiness_score=repeated_count/len(word_freq)

    return burstiness_score

def calculate_burstiness(text):
    tokens=nltk.word_tokenize(text.lower())
    word_freq=FreqDist(tokens)

    repeated_count=sum(count>1 for count in word_freq.values())

    burstiness_score=repeated_count/len(word_freq)

    return burstiness_score



text='''
In a secluded village, where magic was shunned, lived a young girl named Elara. Despite the ban, she discovered her innate magical abilities. Fearing persecution, she practiced in secret, deep in the forest. Her determination was fueled by a desire to prove that magic could be a force for good. As her skills grew, she dreamt of a day when she could reveal her powers and change the villagers' hearts, showing them the true potential of magic to heal and protect. With each passing day, she inched closer to her goal, ready to challenge the age-old prejudices and bring a new era of acceptance and wonder to her world.'''

p=calculate_perplexity(text)
b=calculate_burstiness(text)

print(p)
print(b)

if(p>30000 and b<0.2):
    print("Ai generated content")
else:
    print('human content')


app = FastAPI()

@app.get('/get-perplexity/{text}')
def get_perplexity(text: str):

  p=calculate_perplexity(text)

  return {"perplexity": p}

@app.get('/get-burstiness/{text}')
def get_burstiness(text: str):

  p=calculate_burstiness(text)

  return {"burstiness": b}



