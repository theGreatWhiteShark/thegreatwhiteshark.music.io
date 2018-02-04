+++
comments = true
date = "2017-11-26T18:00:00+01:00"
draft = false
tags = ["Linux", "emulation"]
title = "Using ZynAddSubFx as sound synthesizer in TuxGuitar"
type = "post"
slug = "zynaddsubfx-with-tuxguitar"

+++

Although not as good as the original GuitarPro, I really like
[TuxGuitar](https://sourceforge.net/projects/tuxguitar/). After all,
it is the only usable software to produce guitar tabs and scores in
Linux systems I'm aware of. But of all its shortcomings the issues I
had with its sound system were the worst: The sound generation is
broken quite frequently and the whole program remains silent. In this
short post I'll explain to you how to replace the internal sound
generator of TuxGuitar with ZynAddSubFX for a more stable and reliable
setup. 

# TuxGuitar configuration

![TuxGuitar-configuration](/static/images/posts/2017/tuxguitar-using-zynaddsubfx/tuxguitar-configuration.jpeg)

It's fairly simple. Just start
[ZynAddSubFX](http://zynaddsubfx.sourceforge.net/) and TuxGuitar right
after each other. Now in TuxGuitar head to the menu entry *Tools >
Settings* and choose the bottom tab *Sound*. As **MIDI Sequencer**
choose *TuxGuitar Sequencer* and as **MIDI Port** choose
*ZynAddSubFX*. This will wire up both programs and you can use them
seamlessly from now on.

# ZynAddSubFX configuration

![ZynAddSubFX-configuration](/static/images/posts/2017/tuxguitar-using-zynaddsubfx/zynaddsubfx-configuration.jpeg)

But to generate sounds using ZynAddSubFX you have to select an
instrument first. (Or you can build your own using the provided effect
suite.) Check the box called **Enabled** and click on the rectangle box
to its right. In the *bank selection* popping up choose whatever
instrument you want to use for your particular track and you are ready
to go.

# JACK configuration

![JACK-configuration](/static/images/posts/2017/tuxguitar-using-zynaddsubfx/zynaddsubfx-configuration.jpeg)

If you are using **JACK** click the **Connect** button in
[QjackCtl](https://qjackctl.sourceforge.io/) (or your preferred
patchbay software) and connect the outputs of ZynAddSubFX to the
playback of your system.

# Notes

I'm still using version 2.4.3 of ZynAddSubFX. So no need for the new
and improved interface. But if you like this project and use it quite
frequently, be sure to thank its developers appropriately. ;)

If you have **multiple tracks** in your TuxGuitar file you can easily
add further instruments to your ZynAddSubFX generator by incrementing
the **part number** left of the *Enabled* checkbox and adjusting the
MIDI channel in the **MIDI Chn.Rcv** dropdown menu.

Tired of setting up the whole thing every time you want to use
TuxGuitar? Then usethe [Non Session
Manager](http://non.tuxfamily.org/wiki/Non%20Session%20Manager) to do
it with a single click. 
