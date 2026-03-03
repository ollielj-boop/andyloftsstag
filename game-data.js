const gameData = {
  "Pub1": {
    "image": "PubOutside1",
    "text": "It\u2019s a lovely, sunny day. You find yourself outside a lovely pub, The Farmers Boy Inn, in the beautiful town of Longhope.",
    "options": [
      {
        "text": "Enter Pub",
        "lead": "PubInt1"
      }
    ]
  },
  "PubInt1": {
    "image": "PubInterior1",
    "text": "The pub is nice and cosy. There is a smell of fine ales in the air and the ocasional scent of pies from the kitchen when the doors open. \nBut whats that in the corner in the smoky corner? \nIt\u2019s a horrible old goblin. It beckons you over.",
    "options": [
      {
        "text": "Walk over",
        "lead": "MC1"
      }
    ]
  },
  "MC1": {
    "image": "Clayton1",
    "text": "You walk over.\nPhew - it isnt a horrible old goblin, its just a horrible old man!\nIt's Matt Clayton. He speaks.\n\"Hello traveller, you look weary. You must have low blood sugar - but fear not, im here to help! I am known throughout the land for my dessert pairing abilities. I can help you pick the two best puddings for your palate, to enhance the flavours of both, creating a balanced and enhanced dining experience. Now sit down and I'll ask you a few questions to feed into my algorithm...\" ",
    "options": [
      {
        "text": "Sit",
        "lead": "MC2"
      }
    ]
  },
  "MC2": {
    "image": "Clayton1",
    "text": "\"So, lets get started - do you like desserts?\"",
    "options": [
      {
        "text": "Yes",
        "lead": "MC4"
      }
    ]
  },
  "MC3": {
    "image": "Clayton2",
    "text": "The old man puts his head in his hands.\n\"What.\nThe.\nFuck\"\nHe seems distraught. You try to calm him but he lashes out.\n\"GET OUT!\"",
    "options": [
      {
        "text": "Leave",
        "lead": "Golf Game page"
      }
    ]
  },
  "MC4": {
    "image": "Clayton1",
    "text": "\"Do you like chocolate?\"",
    "options": [
      {
        "text": "Yes",
        "lead": "MC5"
      }
    ]
  },
  "MC5": {
    "image": "Clayton1",
    "text": "\"Do you LOVE chocolate?\" ",
    "options": [
      {
        "text": "I do!",
        "lead": "D1"
      }
    ]
  },
  "MC6": {
    "image": "Clayton1",
    "text": "\"Hmmm. Ok - what do you think of fruit in desserts?\"",
    "options": [
      {
        "text": "I like it",
        "lead": "MC8"
      }
    ]
  },
  "MC7": {
    "image": "Clayton1",
    "text": "I see\u2026 Do you like fruit in your desserts as well?",
    "options": [
      {
        "text": "Yes",
        "lead": "D2"
      }
    ]
  },
  "MC8": {
    "image": "Clayton1",
    "text": "\"I see - interesting. What about a citrus based dessert, would that be of interest?\"",
    "options": [
      {
        "text": "Yes",
        "lead": "D4"
      }
    ]
  },
  "D1": {
    "image": "Dessert1",
    "text": "\"That's easy then - you should get TWO portions of the Rich Chocolate Fudge Cake \u2013 the deeply indulgent decadence of the first cake slice will perfectly compliment the super-moist, dense sponge of the second piece. Chocolate heaven!\u201d",
    "options": [
      {
        "text": "Thanks!",
        "lead": "SMC1"
      }
    ]
  },
  "D2": {
    "image": "Dessert2",
    "text": "\u201cOk, then I\u2019d suggest the Thick Belgian Waffle with Chocolate and Caramel Sauce alongside the Raspberry and Apple Crumble. A very sophisticated European dessert to start with, followed by a decadent pub classic. You\u2019ll also be able to feel good by getting in a couple of your five a day\u201d",
    "options": [
      {
        "text": "Thanks!",
        "lead": "SMC1"
      }
    ]
  },
  "D3": {
    "image": "Dessert3",
    "text": "\u201cOk, then I\u2019d suggest the Rich Chocolate Fudge Cake alongside the Homemade Cheesecake. Double cake, but very different flavours \u2013 however both fantastically decadent\u201d",
    "options": [
      {
        "text": "Thanks!",
        "lead": "SMC1"
      }
    ]
  },
  "D4": {
    "image": "Dessert4",
    "text": "\u201cDouble fruity it is! Get the Raspberry and Apple Crumble and the Tangy Lemon Meringue Pie. Don\u2019t worry, although it\u2019s a healthy choice, it is extremely decadent. The crunchy top of the crumble perfectly contrasts the softness of the meringue pie\u201d",
    "options": [
      {
        "text": "Thanks!",
        "lead": "SMC1"
      }
    ]
  },
  "D5": {
    "image": "Dessert5",
    "text": "\u201cGet the Raspberry and Apple Crumble and the Classic Cr\u00e8me Brul\u00e9. Hard tops and soft innards. A very decadent choice\u201d",
    "options": [
      {
        "text": "Thanks!",
        "lead": "SMC1"
      }
    ]
  },
  "D6": {
    "image": "Dessert6",
    "text": "\u201cNo chocolate, no fruit, no problem. Get the Homemade Cheesecake and the Cr\u00e8me Brul\u00e9e. Smooth vanilla flavours all the way. Rich and decadent. A lovely choice\u201d",
    "options": [
      {
        "text": "Thanks!",
        "lead": "SMC1"
      }
    ]
  },
  "SMC1": {
    "image": "SadMatt1",
    "text": "Something terrible had happened. The horrible old man has eaten both desserts before you even had a chance to taste them.\n\"Oh no, its happened again\" he says",
    "options": [
      {
        "text": "Leave",
        "lead": "Golf Game page"
      }
    ]
  },
  "SMC2": {
    "image": "SadMatt2",
    "text": "You reign blows upon the old mans fragile face. He cowers in the corner and begs you to leave",
    "options": [
      {
        "text": "Leave",
        "lead": "PubInt2"
      }
    ]
  },
  "PubInt2": {
    "image": "PubInterior2",
    "text": "Everyone in the pub is cheering. A dishevelled guy with glasses who was sat in the corner is absolutely loving it. Matt hides behind the table.\nThe barman thanks you:\n\u201cWe hate the horrible old man. He\u2019s been stealing desserts all day. And we think he may have been pleasuring himself in toilets. Thanks for giving him a richly deserved beating\u201d",
    "options": [
      {
        "text": "Leave",
        "lead": "Pub2"
      }
    ]
  },
  "Pub2": {
    "image": "PubOutside2",
    "text": "Andy Lofts is waiting for you outside:\n\"Hello! You ready to go and play golf?\"",
    "options": [
      {
        "text": "Go to play golf",
        "lead": "Golf Game page"
      }
    ]
  },
  "Pub3": {
    "image": "PubOutside2",
    "text": "\"This is my pint - im going to down it, then lets head off!\"",
    "options": [
      {
        "text": "Go to play golf",
        "lead": "Golf Game page"
      }
    ]
  },
  "Pub4": {
    "image": "PubOutside3",
    "text": "\"This? Its my trusty car hammer - you know I'd don\u2019t travel without it!\"",
    "options": [
      {
        "text": "Of course - lets go play golf",
        "lead": "Golf Game page"
      }
    ]
  },
  "Pub5": {
    "image": "PubOutside3",
    "text": "\"Sure! But don\u2019t be too long, we need to be at the golf course for 16:30\"",
    "options": [
      {
        "text": "Enter Pub",
        "lead": "PubInt3"
      }
    ]
  },
  "PubInt3": {
    "image": "PubInterior3",
    "text": "You enter the Pub again. Matt is still cowering in the corner.",
    "options": [
      {
        "text": "Leave and go and play golf",
        "lead": "Golf Game page"
      }
    ]
  },
  "SMC3": {
    "image": "SadMatt2",
    "text": "Matt is sobbing in the corner.",
    "options": [
      {
        "text": "Leave and go and play golf",
        "lead": "Golf Game page"
      }
    ]
  },
  "SMC4": {
    "image": "SadMatt3",
    "text": "\"No! My dessert algorithm!\"",
    "options": [
      {
        "text": "Leave and go and play golf",
        "lead": "Golf Game page"
      }
    ]
  },
  "Pub6": {
    "image": "PubOutside4",
    "text": "Oh no. You\u2019re in trouble now. \nYou are in the back of a police car. They have taken your hammer off you. ",
    "options": [
      {
        "text": "Remain silent and wait to be taken to the station",
        "lead": "Website Home Page"
      }
    ]
  },
  "Pub7": {
    "image": "PubOutside4",
    "text": "\u201cNo mate. I\u2019ll be honest, best case scenario today is you\u2019re only charged with grievous bodily harm. We\u2019ll have to see how he does, but its not looking good. He was very decrepit\u201d",
    "options": [
      {
        "text": "Remain silent and wait to be taken to the station",
        "lead": "Website Home Page"
      }
    ]
  },
  "Amb1": {
    "image": "Ambulance",
    "text": "The old man lies unconscious on a stretcher with an oxygen mask on.",
    "options": [
      {
        "text": "Say sorry",
        "lead": "Website Home Page"
      }
    ]
  },
  "Pub8": {
    "image": "PubOutside4",
    "text": "You're in really big trouble now. \nYou manage to punch Matt a few times but then the police throw you to the ground and drag you back into the police car. \nThey aren\u2019t speaking to you anymore.",
    "options": [
      {
        "text": "Remain silent and wait to be taken to the station",
        "lead": "Website Home Page"
      }
    ]
  }
};