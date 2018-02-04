+++
comments = true
date = "2017-12-10T18:00:00+01:00"
draft = false
tags = ["music processing"]
title = "What spectra do tell us"
subtitle = "The impact of the amp and the microphone"
type = "post"
slug = "spectral-analysis-impact-of-the-amp"
+++

One of the most important tools in digital signal processing, if not
THE most important one, is the spectral analysis. In this post I
discuss what it might unveil about the recording procedure. Should I
just use the line-out of my amp? Or better a microphone picking up the
signal of the amp? Well, which microphone then? An old friend always
told me a good sound has to travel through air at least once. I want
to find out why. 

Of course I won't provide conclusive answers to those questions. In
truth, this is just my first, humble attempt to grow accustom to my
equipment and its peculiarities and frequency responses. But one
purpose of this blog is to document my projects and the bottom line of
all of this is of course: it's fun to dig into your music and audio
signals using your computer. :) 

# Equipment and software

I will use the software presented in my [last
post](/spectral-analysis-linux) on spectral analysis. **Brianalyse**
is used for the visualization and comparison of the spectra and
**Jaaa** for obtaining an average of the individual spectra. 

For the recording procedure itself I'll use a BC Rich Stealth guitar,
a Blackstar HT-5 combo valve amp, a Shure SM58 (coil microphone), and
a Tascam TM-80 (condenser microphone). In addition I use a Tascam
US-2x2 external sound card and Behringer MS40 speakers. Both the amp
and the speakers are fixed in an (arbitrary) equalization setup.

I decided not upload the corresponding sound files. It's 187 MB in
total (uncompressed) and I don't want to spam my Git repository.

# Setup

The **main objective** is to determine the difference in the recording
depending on whether or not it traveled through air.

My **hypotheses** why this might be the case are the following (yes,
I'm a physicist :D):
1. Due to the modulation caused by the master gain and the speaker of
   the amplifier 
2. Due to the modulation caused by the microphone
3. Due to the modulation caused by an arbitrary speaker

To **test these hypotheses** (the corresponding one in brackets) I
will record a piece of audio in several ways 
1. Record both the output of the amp using a microphone and the
   line-out signal (1) 
2. Perform the first test using a different microphone (2)
3. Capture the playback of the line-out signal using a microphone via
   the monitors of my computer (3) 

Since the line-out signal is composed of the guitar signal + the
modulation of the pre-amp + the equalization of the amplifier, it's an
appropriate starting point. Using test number 1 and 3 I can compare
two different sets of master gain and speaker modulation on the same
signal (modulo the effect of analog-digital-analog conversion and the
pre-amp of the external sound card for test 3). 

# Results

### Impact of the microphone

First, let's have a look on what the microphone is doing with our
signal. 

![amp+sm58](/static/images/posts/2017/what-spectra-do-tell-us/amp-sm58-average.png)
![amp+shure](/static/images/posts/2017/what-spectra-do-tell-us/amp-tm80-average.png)

(The TM-80 channels have the wrong label *Shure* in them, sorry).

In the top picture you can see the spectrum of the SM58 microphone
picking up the audio signal of the amplifier (using the internal
master gain and speaker). The bottom picture displays the same setup
but using the TM-80 instead. 

The SM58 has a much bigger response in the high frequency band from
7kHz till 11kHz resulting in a harsh sound. The TM-80, on the other
hand, is boosting the lower and mid frequencies up to 3kHz and has a
more round and warm sound.

### Impact of the speaker

![line-out](/static/images/posts/2017/what-spectra-do-tell-us/line-out-average.png)
![line-out+speaker+shure](/static/images/posts/2017/what-spectra-do-tell-us/line-out-tm80-average.png)

In the two figures above you can see spectrum of the raw line-out
signal (top) and the line-out signal played back using the Behringer
monitors and captured using the TM-80 (bottom).

![amp+shure](/static/images/posts/2017/what-spectra-do-tell-us/amp-tm80-average.png)
![amp+shure+speaker+shure](/static/images/posts/2017/what-spectra-do-tell-us/tm80-double.png)

Those figures display the spectra of the amp captured by the TM-80
(top) and this very signal again played back using the monitors and
captured again using the TM-80 (bottom).

By comparing the pure line-out signal with the one captured in front
of the amp one can see quite beautifully how much character in the
frequency range between 4kHz and 12kHz is introduced by the master
gain and the speaker of the amplifier.

On the other hand, by comparing the latter signal or the line-out with
the one obtained by capturing the playback of the line-out it is also
obvious how brutally my monitors just cuts off the signal at 7kHz,
damps the whole mid range, and boosts the lower one. With its bass and
treble settings being both set to default I'm quite puzzled about this
behaviour. Hmm... I wasn't aware of this and definitely have to look
into this matter in more detail.

Last, we compare the captured signal of the amplifier with the same
signal played back through the monitors and recaptured again. My hope
was to separate the modulation introduced by the microphone and the
one introduced by the speaker. Some of the peaks in the spectrum are
definitely enhanced in the recaptured signal and a ugly resonance was
introduced in the very low frequencies (even worse for the SM58). But
in the end these two modulations are way to convoluted to keep them
apart.

# Conclusion

So, is there a good reason to invest in a combo amp or a head-box
combination instead of using just a rack amplifier? Yes, there is.

The master gain and speaker of the box are introducing a lot of energy
in the mid and high frequency range. This gives the signal more warmth
and definition. The choice of the microphone does, of course, also
matter. But the latter is just introducing a colouring and is not as
important as the amp itself.

Another thing I've learned is, that the monitors I use with my
computer have a quite odd frequency range with a lot of damping in the
mids and a cut-off at 7kHz. (Or is some software component responsible
for this behaviour?) So it's definitely worth checking out one's
equipment properly.
