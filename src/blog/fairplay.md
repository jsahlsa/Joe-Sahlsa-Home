---
title: Fairplay App
tags:
    - blog
    - javascript
    - CSS
    - HTML
date: 2024-04-16
description: 'An app for equitable playing time in kids sports'
---

# {{ title | capitalize }}

## {{ description }}

{{ page.date | postDate }} {.page-dates}

<!-- intro -->

First off, here is a link to the app: [Fairplay App](https://fairplay.joesahlsa.dev).

This year I coached both my daughter and sons' basketball teams. They are little kids, and one of the rules of the league is for everyone to have equal playing time. So rather than keep track with paper and pencil, I thought I would build an overwrought app to do it for me. I took this approach for two reasons, the first is that I like things to be overcomplicated and harder than they should be, and the second is to keep these kids off my back. I can just say "I didn't decide, the app did, so get off my back!". I thought it would be a simple, straightforward design. Just select 5 kids who haven't played yet, or have played less than others, make sure they are active, make sure they actually want to play..., and, well, it got out of hand pretty quickly.

## Implementation

Before I set out I made a couple of goals for myself to aid in my own learning. I wanted the app to be only HTML, CSS, and javascript. The one luxury I used was [vite](https://vitejs.dev/) for development. The other goal was to make it look more or less like an app, since I would only be using it on my phone.

I won't go into great detail into everything I did, you can take a look at the spaghetti code [here](https://github.com/jsahlsa/fair-play), I'll just highlight a couple pieces.

For the roster and lineups I used javascript objects and [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). The roster object keeps track of names, times played, active/inactive, and whether they played in the last period. The lineup object is each lineup and a number that indicates what lineup it is. When certain actions are performed these save to local storage, and are retrieved from local storage, updating that part of the DOM. Check out the [docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#setting_values_in_storage) for saving and retrieving local storage objects.

Of course once I started using the app I quickly realized I needed some other features for the app to be truly usable. I added active checkmarks for each player in case of injury, not wanting to play, bathroom breaks, and various kid related problems that crop up. These check boxes have the extra feature of checking whether or not the game is being played, and making an appropriate substitution if it is. I also added an undo button to get rid of the most recent lineup.

## Conclusion

Overall I am pretty happy with how it works. Some ideas going forward would be to add different size lineups, and maybe assign positions, but I'll probably never get around to it.

I absolve myself of all liablity if this app doesn't work, or results in crying, or perhaps unhappy children.
