from flask_cors import CORS, cross_origin
from flask import Flask, send_file
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
from urllib.request import urlopen
import io
from PIL import Image
import re
from collections import OrderedDict

website='https://princess-connect.fandom.com'

def serve_pil_image(pil_img):
    img_io = io.BytesIO()
    pil_img.save(img_io, 'PNG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

def returnImageArt(url):
    with urlopen(url) as url:
        imageBytes = io.BytesIO(url.read())
        image = Image.open(imageBytes)
        return serve_pil_image(image)

def returnIconArt(url):
    with urlopen(url) as url:
        imageBytes = io.BytesIO(url.read())
        image = Image.open(imageBytes)
        width, height = image.size
        image = image.crop((0,1,width-3,height))
        return serve_pil_image(image)

def searchForFullArt(url):
    with urlopen(url) as url:
        uncleanImageList = re.findall('<a href=".*FullArt.*" class="image"><img alt="FullArt', url.read().decode('utf8'))
        if len(uncleanImageList) != 0:
            extractedImage = re.findall('https://.*" c', uncleanImageList[0])[0][:-3]
            return extractedImage

                
def searchForSkills(url):
    with urlopen(url) as url:
        uncleanImageList = list(OrderedDict.fromkeys(re.findall('style="background-color: .*; color: .*"><center><b>.*<br />.*</b></center>.*\n.*\n.*\n.*<a href=".*Skill_.*" class="image"><img alt="Skill', url.read().decode('utf8'))))
        if len(uncleanImageList) != 0:
            extractedLabels = [re.findall('b>.*<br', uncleanImageList[i])[0][2:-3] for i in range(len(uncleanImageList))]
            extractedImage = [re.findall('https://.*" c', uncleanImageList[i])[0][:-3] for i in range(len(uncleanImageList))]
            return dict(zip(extractedLabels, extractedImage))

@app.route('/')
@cross_origin()
def hello_world():
    cardList='https://princess-connect.fandom.com/wiki/List_of_Cards'
    with urlopen(cardList) as url:
       # html=io.BytesIO(url.read())
        html=url.read().decode('utf8')
        extractedList = re.findall('<a href="/wiki/.*" title=".*">.*</a>',html)
        print(extractedList)
    return 'ligma'

@app.route('/<characterName>/icon')
@cross_origin()
def getCharacterIcon(characterName):
    if '(' not in characterName:
        characterName = characterName + ' (Initial)'
    cardList='https://princess-connect.fandom.com/wiki/List_of_Cards'
    with urlopen(cardList) as url:
        extractedCharacters = re.findall('<a href=".*Icon.png.*".*\n.*\n.*<a href="/wiki/.*" title=".*">.*</a>', url.read().decode('utf8'))
        for character in extractedCharacters:
            if characterName in character:
                extractedIcon = re.findall('<a href=".*" class="image"', character)[0][9:-15]
                return returnIconArt(extractedIcon)
        

@app.route('/<characterName>')
@cross_origin()
def getCharacterFullArt(characterName):
    if '(' not in characterName:
        characterName = characterName + ' (Initial)'
    cardList='https://princess-connect.fandom.com/wiki/List_of_Cards'
    with urlopen(cardList) as url:
        extractedCharacters = re.findall('<a href="/wiki/.*" title=".*">.*</a>', url.read().decode('utf8'))
        listOfCharacterLinks = []
        for character in extractedCharacters:
            if characterName in character:
                uncleanLink = re.findall('/wiki/.*" t', character)[0]
                characterURL = website + uncleanLink.split('\s')[0][:-3]
                extractedImage = searchForFullArt(characterURL)
                if not extractedImage:
                    extractedImage = searchForFullArt(characterURL + '/Main')
                return returnImageArt(extractedImage)

@app.route('/<characterName>/<skill>')
@cross_origin()
def getCharacterSkill(characterName, skill):
    if '(' not in characterName:
        characterName = characterName + ' (Initial)'
    cardList='https://princess-connect.fandom.com/wiki/List_of_Cards'
    with urlopen(cardList) as url:
        extractedCharacters = re.findall('<a href="/wiki/.*" title=".*">.*</a>', url.read().decode('utf8'))
        listOfCharacterLinks = []
        for character in extractedCharacters:
            if characterName in character:
                uncleanLink = re.findall('/wiki/.*" t', character)[0]
                characterURL = website + uncleanLink.split('\s')[0][:-3]
                skillDict = searchForSkills(characterURL)
                if not skillDict:
                    skillDict = searchForSkills(characterURL + '/Skills')
                for key, value in skillDict.items():
                    if skill in key:
                        return returnImageArt(skillDict[key])
