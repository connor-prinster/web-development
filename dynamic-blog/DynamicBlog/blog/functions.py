import random

# return a random blog from a list of sentences and words
def randomIpsumBlog():
    lipsumArray = ['Lorem ipsum dolor sit amet', 'consectetur adipiscing elit. ', 'Integer vehicula mauris nec felis vehicula ultrices. ', 'Aenean varius ante ut augue fringilla vehicula. Pellentesque mi odio', 'porta sed pretium vulputate, sodales id neque. Aliquam erat volutpat. Morbi at pellentesque libero. ', 'Pellentesque vestibulum sagittis risus sed interdum. Pellentesque iaculis nunc non', 'scelerisque imperdiet. Vivamus vitae lacinia nulla, sed vulputate nisl. Vestibulum tellus', 'libero, auctor ac dictum vitae, sollicitudin non lorem. ', 'Mauris', 'scelerisque augue eu nisi auctor bibendum. Curabitur vel ullamcorper', 'sem. Suspendisse tellus massa, euismod sed auctor lacinia', 'pretium id metus. Nullam lectus tortor, ultricies in pellentesque eget, molestie sit amet ipsum. Morbi sed ultricies dolor, a molestie quam. Fusce mattis neque nec feugiat efficitur. ', 'Nulla et orci eget metus vestibulum dapibus sit amet vitae libero. ',
'In varius velit vel', 'dictum egestas. Duis varius condimentum turpis, a varius risus sagittis', 'eu. In commodo nibh ac ante convallis posuere. Aliquam diam odio, gravida quis odio', 'venenatis, accumsan dictum arcu. Donec id lectus vel dui ullamcorper rhoncus a eu nisi. ', 'Praesent sit amet ligula felis. Class aptent taciti sociosqu ad', 'litora torquent per conubia nostra, per inceptos himenaeos. In', 'pulvinar aliquet risus, id malesuada diam suscipit quis. Ut massa diam,', 'vulputate non auctor ut, ullamcorper sed leo. ', 'Quisque orci tortor, dignissim nec', 'metus quis, posuere vestibulum libero. Sed vitae accumsan diam. Cras tempor ac nisi vel congue. ',
'In finibus erat ut luctus aliquam. Orci varius', 'natoque penatibus et magnis dis parturient montes, nascetur ridiculus', 'mus. Sed sodales, magna eu vehicula eleifend, elit', 'mauris efficitur odio, eu eleifend erat nibh eu eros. ', 'Vestibulum interdum dui non eros iaculis aliquam. In hac habitasse', 'platea dictumst. Pellentesque habitant morbi tristique', 'senectus et netus et malesuada fames ac', 'turpis egestas. Aliquam lacus sem', 'feugiat non neque a, convallis egestas nunc. ', 'Praesent porta placerat ex', 'id', 'molestie', 'Etiam ', 'aliquet. ']
    random.shuffle(lipsumArray)
    lipsumText = ''.join(map(str, lipsumArray))
    return lipsumText

# return a random comment from a list of sentences and words (just a smaller blog post)
def randomIpsumComment():
    lipsumArray = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 'In varius velit vel', 'dictum egestas. Duis varius condimentum turpis, a varius risus sagittis', 'eu. In commodo nibh ac ante convallis posuere. Aliquam diam odio, gravida quis odio', 'venenatis, accumsan dictum arcu. Donec id lectus vel dui ullamcorper rhoncus a eu nisi. ', 'Praesent sit amet ligula felis. Class aptent taciti sociosqu ad', 'litora torquent per conubia nostra, per inceptos himenaeos. In', 'pulvinar aliquet risus, id malesuada diam suscipit quis. Ut massa diam,', 'vulputate non auctor ut, ullamcorper sed leo. ', 'Quisque orci tortor, dignissim nec', 'metus quis, posuere vestibulum libero. Sed vitae accumsan diam. Cras tempor ac nisi vel congue. ',
'In finibus erat ut luctus aliquam. Orci varius', 'natoque penatibus et magnis dis parturient montes, nascetur ridiculus', 'mus. Sed sodales, magna eu vehicula eleifend, elit', 'mauris efficitur odio, eu eleifend erat nibh eu eros. ', 'Vestibulum interdum dui non eros iaculis aliquam. In hac habitasse', 'platea dictumst. Pellentesque habitant morbi tristique', 'senectus et netus et malesuada fames ac', 'turpis egestas. Aliquam lacus sem', 'feugiat non neque a, convallis egestas nunc. ', 'Praesent porta placerat ex', 'id', 'molestie', 'Etiam ', 'aliquet. ']
    random.shuffle(lipsumArray)
    lipsumText = ''.join(map(str, lipsumArray))
    return lipsumText

# returns a random word
def randomIpsumWord():
    lipsumArray = ['Lorem', 'ipsum', 'dolor', 'sit', 'ame', 'consectetur', 'adipiscing', 'lit', 'varius', 'velit', 'vel', 'ridiculus', 'mus', 'sodales', 'magna', 'eu', 'vehicula', 'eleifend', 'elit', 'onsectetur', 'adipiscing', 'elit', 'Fusce', 'aliquet', 'tortor', 'mi', 'et', 'tempus', 'quam', 'pulvinar', 'vel', 'ut', 'feugiat', 'pellentesque']
    random.shuffle(lipsumArray)
    lipsumText = lipsumArray[0]
    return lipsumText