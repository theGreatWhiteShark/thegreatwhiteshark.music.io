+++
comment = true
date = "2017-12-03T18:00:00+01:00"
draft = false
tags = ["Linux", "music processing", "spectra"]
title = "Spectral analysis"
subtitle = "Real-time spectral analysis in Linux using JACK"
type = "post"
slug = "spectral-analysis-linux"
+++

A very important part of digital signal processing (DSP) as well as
music processing is to analyze the
[spectrum](https://en.wikipedia.org/wiki/Spectral_density) and the
[spectrogram](https://en.wikipedia.org/wiki/Spectrogram) of your
recording. Even Audacity already can
[handle](http://manual.audacityteam.org/man/plot_spectrum.html) it. So
let's use it with [Non
Timeline](http://non.tuxfamily.org/wiki/Non%20Timeline) or a general
[JACK](http://jackaudio.org/)-based environment too.

In this blog post I will review the available software for creating
spectra in Linux systems and how to deploy them. I will not write
about the Fourier transform and spectra in general. For a very nice
and gentle introduction I can recommend the second
chapter of [Fundamentals of Music
Processing](https://www.springer.com/us/book/9783319219448) by Meinard
Müller. 

# Setup

As a prerequisite I assume you have the [Non DAW
Suite](http://non.tuxfamily.org/) installed and JACK configured on
your system. Now, power up JACK (e.g. via
[QjackCtl](https://qjackctl.sourceforge.io/)) and open [Non
Timeline](http://non.tuxfamily.org/wiki/Non%20Timeline).

For the sake of reproducibility I will use a [gong sample](http://freewavesamples.com/gong) provided by
[freewavesamples.com](http://freewavesamples.com). So, in order to
**import the file** into Non Timeline create a new project, add an audio
track using the *a* key, click at the
track using your right mouse key, and select *Import source at mouse*. 

![picture Non Timeline loop](/static/images/posts/2017/spectral-analysis/non-timeline-setup.jpeg)

Since we want to play this little example over and over again for the
spectral analysis, we have to define a **loop over the whole
sample**. First, drag the sample to the beginning of the time
line. Afterwards, create an edit region enclosing the sample by
pressing the *home* key and *Ctrl+[* to mark the beginning of the region
and *end* and *Ctrl+]* to mark its end. Finally, use *Shift+Ctrl+L*
to convert the edit region into a playback region and set the
transport behaviour to looped playback by pressing *L*. Now, whenever
you start the playback using *Space* the sample is played over an over
again. (Just using the keyboard and almost without any mouse
interaction. Isn't that awesome?)

![Picture connections](/static/images/posts/2017/spectral-analysis/connection-setup.png)

In order to actually **hear the output** of Non Timeline, you have to
connect it with the playback of the system (e.g. using the *Connect*
tab of QjackCtl). In the same manner you also have to wire up the
output of Non Timeline with the JACK-based spectral analysis softwares
covered in the remainder of the post.

# Jaaa

[Jaaa](http://kokkinizita.linuxaudio.org/linuxaudio/) (JACK and ALSA
Audio Analyser) is a very simple program to visualize the spectrum of
sound piped into it.

![Jaaa picture](/static/images/posts/2017/spectral-analysis/jaaa.png)

To start it with JACK support, use the following command in your bash
shell 
```bash
jaaa -J &
```

+ Its binary is available in the distributions repositories 
+ Quite a number of options to adjust the visualization
+ Can display 8 different signals through different input channels
- No control over the FFT, e.g. like window function or window size
- No support for spectrograms (2D plot of spectra against time)

# Brianalyse

[Brianalyse](http://humanleg.org.uk/code/brianalyze/) is a nice little
piece of software quite similar to Jaaa. 

![Brianalyse](/static/images/posts/2017/spectral-analysis/brianalyse.png)

+ Can display a arbitrary amount of different signals/channels
+ Both the frequency and amplitude axes can be scaled linear or
  logarithmic 
+ Visually more appealing then Jaaa (well, at least for me)
- Less options to alter the visualization
- Needs to be compiled from source (but only has a few dependencies and
  does not take long)
  

# Baudline

[Baudline](http://www.baudline.com/index.html) is a very powerful
software enabling you to perform a proper exploration of your signals
in frequency space. Using additional windows, e.g. for displaying the
average spectrum or monitoring some relevant quantities, and a
spectrogram this software is capable of uncovering much more hidden
details of your signals than the previous ones. 

But the software is **NOT open source** but free. You can download
binaries at their [homepage](http://www.baudline.com/download.html).

![Baudline](/static/images/posts/2017/spectral-analysis/baudline-basic.jpeg)

It supports different kinds of Fourier transforms,
different window types and sizes, and even enables you to perform
mathematical operations of the different channels and transforms or to
calculate their auto- or cross-correlation.

![Baudline extended](/static/images/posts/2017/spectral-analysis/baudline-advanced.jpeg)

+ Spectrogram
+ Customizable Visualization
+ Customizable Fourier transforms
+ Monitoring DSP quantities in separate windows
+ Enables mathematical operations on the channels and transforms
-- Not open source

# Spectral analysis without JACK

If you are interested in the spectra of audio but do not want to
use the JACK system, you'll find in [Spek](http://spek.cc/) and [Sonic Visualizer](http://www.sonicvisualiser.org/) some
alternatives working on files instead of audio streams.

![Spek](/static/images/posts/2017/spectral-analysis/spek.jpeg)

Spek itself is quite minimalist. But it works. For a more thorough
analysis you might want to use the more sophisticated Sonic Visualizer
instead. But to be honest: I haven't dived into it.

# Conclusion

I personally like **Brianalyse** as a lightweight program for
displaying the spectrum of a signal most. If you are just wondering
how your mix is doing in terms of spectral coverage and what effect
your equalization steps had on your record, I would recommend this
little piece of software.

If, on the other hand, you want to perform a comprehensive spectral
analyses or use a spectrogram instead, **baudline** should be your
software of choice.

# Further software

Of course the software mentioned above does not represent the whole
landscape of the Linux ecosystem. Worth mentioning (but not working on
my system) are also
[BRP-PACU](https://sourceforge.net/projects/brp-pacu/), which is meant
to have JACK support too, and [friture](http://friture.org/) and
[Spectrum3d](http://spectrum3d.sourceforge.net/index.html), which are
visualization programs working on files instead of
streams. In addition, linux-sound.org published a
[list](http://linux-sound.org/scopes.html) of spectrum visualization
software some years ago too. But most of them are discontinued,
unavailable, or not working anymore.

