+++
date = "2018-02-25T14:23:41+01:00"
comments = true
draft = false
tags = [ "Linux", "Emacs", "Hydrogen" ]
type = "post"
slug = "switching-hydrogen-drum-kits-using-emacs"
title = "Switching Hydrogen drum kits using Emacs"
description = "If you ever used Hydrogen, you might know the following problem: you want to switch to a different drum kit but it has a different layout and all the activations of the instruments are off. I wrote some Emacs functions to ease the pain of changing all the activations and to do it without excessively clicking in the Hydrogen GUI."
+++

As much as I like the
[Hydrogen](https://github.com/hydrogen-music/hydrogen) drum machine,
there are some details, which are quite annoying. One of those things
is that you do not have a set commands, which help you to migrate from
one drum kit to another. 

The usual scenario is the following. You programmed a song and are
curious how it would sound using a different drum kit. But just
loading another one doesn't work in many cases. Since the drum kits
inserted their instruments in different orders, you are bound to
either adjust all the activations by hand or to change the drum kit
itself. Both ways are not nice. That's why I wrote some functions for
[Emacs](https://www.gnu.org/software/emacs/) that help you with the
migration. 

# The Emacs functions

You might wonder why someone would want to write a function in
[Elisp](https://en.wikipedia.org/wiki/Emacs_Lisp) just to change some
text in a Hydrogen song file. There are more accessible programming
languages concerning string handling out there, like e.g. awk or
perl. True. But in the end we want to edit a single file and we don't
want to introduce any artifacts. So it feel most natural, at least for
me, to do all the altering within an editor. This way, we can visually
check all the changes and might do some adjustments.

The two functions I wrote, **hydrogen-swap-instrument** and
**hydrogen-replace-instrument**, can be found on
[Github](https://github.com/theGreatWhiteShark/configurations-and-scripts/blob/master/emacs/elisp/hydrogen.el). Both
functions ask you via a prompt which instrument you want to replace
and what do you want to replace it with. 

By **replacing an instrument** I mean *changing the instrument
number for a specific activation*. If the snare drum in your previous
drum kit did reside at the 4th position and your new drum kit placed
it on the 3rd, you have to replace the instrument number of all the
activations of the snare drum by the new value. But be careful,
**counting the instrument numbers starts at 0**!

**hydrogen-replace-instrument** does what the function name is
hinting. It simply replaces an instrument number by another one. But
this might produce some artifacts. Imagine you replaced the instrument
in your snare drum activations by 3 and later on you realized there
already was an instrument at position 3 with activations present. So
you mixed up both. 

In order to avoid such inconvenience, I also introduced the function
**hydrogen-swap-instrument**. It swaps the number of the
instruments for the activation of your snare drum with those of the
instrument 3. If no instrument was present at the third position, it
performs an ordinary replacement.

Both functions act on the whole buffer unless they are called after
marking a region.

# Example

Since the intersection between people using Hydrogen and people using
Emacs might not be that huge, I will provide a basic introduction of
how to use these functions. 

First of all, you need to add the following lines to your
**$HOME/.emacs** Emacs configuration file so Emacs can find the
functions. The *PATH-TO-YOUR-COPY-OF* has to be replace by the full
path to the folder containing the *hydrogen.el* file.

```cl
(load "PATH-TO-YOUR-COPY-OF/hydrogen.el")
```

Now,

1. Open an Emacs instance.
2. Open the Hydrogen song file by pressing **C-x C-f** (Ctrl+x
   followed by Ctrl+f) and enter the path to the song file.
3. Press **M-x** (Alt-x) and enter the name of one of the two
   functions, e.g hydrogen-swap-instrument.
4. Enter the number of the instrument you want to replace
5. Press return
6. Enter the target number of the instrument
7. Press return

This is it. Just do it for all the different instruments and you are
done. Way better than changing the activations by hand.
