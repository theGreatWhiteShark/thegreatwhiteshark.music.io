+++
comments = true
date = "2017-08-10T18:00:00+01:00"
draft = false
tags = ["recording", "Linux"]
title = "Recording audio using Linux systems Pt. II"
subtitle = "The Linux sound servers"
type = "post"
slug = "linux-sound-server"

+++

After we got an overview about the peculiarities of the Linux system
with respect to audio and recording  in the [last
post](recording-audio-using-linux-systems) we will dive some more into
the Linux sound system itself.

As for most other Linux subsystems the audio one grew quite naturally
too. So you have quite a number of alternatives and different ways to
achieve a goal. Not just in using different software, but also in the
underlying sound servers. While this grants advanced users quite some
flexibility, it's almost threatening for beginners. That's why the overall
goal of this post is to provide you with a bigger picture of the main
Linux sound servers. If you do not understand every last bit of
information in here, don't worry.

# The Linux way of handling hardware

I don't want to go into too much detail here but instead just hook you
up with the general concepts of hardware handling in Linux. This will 
become quite handy whenever your sound card is not properly
addressed by your system and you want to search for a solution
online. 

The Linux system (or the Linux kernel, to be more precise) needs two
things to properly communicate with a sound card: a driver and a
firmware. A driver is something like a protocol mapping a general
interface to the card's internal representation. Therefore drivers
enable all cards to speak the same language. Sound card drivers are
collected within the [Advanced Linux Sound Architecture
(ALSA)](http://www.alsa-project.org/main/index.php/Main_Page) package,
which itself is part of the Linux kernel. So they are already
installed on your system and you are most probably already good to
go. Sometimes you need to install some firmware, which is more or less
a set of configuration to initialize the communication with the card,
from some non-free repositories. But beware the
[blob](https://www.openbsd.org/lyrics.html#39)! 

After initializing the communication the Linux system manages the
access of the sound card according to one of its core concepts: 

> Everything is a file.

All the entry points will be stored in */dev/snd/* while
*/proc/asound/cards* holds a list of recognized cards. 

But enough on the Linux system itself. To wrap things up, I compile a
short list of bash commands you'll find helpful for debugging and then
let's continue with the actual Linux sound servers. 

- *lshw* - Compiles a list of all available hardware
- *lspci -nn* - Very detailed list of information about every
  connection established via PCI and PCIe 
- *lsmod* - Lists all available kernel modules. The ones with *snd* in
  their names are commonly the ones responsible for the handling of
  the sound card 
- *modprobe* - Loads an inactive kernel module
- ls */lib/firmware* - Location of the firmware
- *dmesg* - Prints all system messages. Quite helpful in combination
  with removing and adding your USB sound card 

# Overall structure of the Linux sound servers and basic ALSA commands

![sketch of the Linux sound server](/static/images/posts/2017/linux-sound-systems/Linux-sound-server-sketch.svg)

While the [ALSA](http://www.alsa-project.org/main/index.php/Main_Page)
package serves as a bridge to the hardware we will actually use two
other systems for handling the sound: JACK and PulseAudio. Those sound
servers will talk *via* ALSA with your sound card. So whenever you
can't access your sound card from within Ardour or Audacity it's most
probably the ALSA system itself and not the sound server on top having
an issue. Formerly ALSA was intended to provide its own sound server
too but its configuration is quite cumbersome and I would discourage
you from using it. If you are still up for it, check out the basic
introduction of [concepts and acronyms on
Wikipedia](https://en.wikipedia.org/wiki/Advanced_Linux_Sound_Architecture#Concepts),
the
[official](http://www.alsa-project.org/main/index.php/Documentation)
and [unofficial](http://alsa.opensrc.org/) documentation, as well as
[ArchLinux'
take](https://wiki.archlinux.org/index.php/Advanced_Linux_Sound_Architecture)
on personalizing ALSA's *~/.asoundrc* configuration file. 

In addition ALSA provides a number of bash commands, which are quite
handy for checking if your sound cards are working properly or not. 

- *alsamixer* - A command line mixer for controlling volume and the
  selection of the sound card
- *aplay --list-devices* - Returns a list of all available audio devices
- *aplay -D CARDNAME AUDIOFILE.wav|.flac - Playback of a audio file
  via a specific sound card. It can be referenced with its
  full name or the its number (aplay --list-devices return card
  NUMBER: ...) using *hw:NUMBER*. Note, you can only play
  uncompressed sound files using aplay! Mp3 won't work. 

# The PulseAudio sound server

[PulseAudio](https://freedesktop.org/wiki/Software/PulseAudio) is the
sound server already installed on most contemporary Linux systems per
default. In contrast to ALSA it comes with built-in software mixing
enabling you to play music from more than one audio source
simultaneously. All those signals will be combined and sent to the
sound card via the ALSA sink. It offers a bunch of
[modules](https://freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/)
handling the audio stream and is able to transmit audio signals via
your local
[network](https://wiki.archlinux.org/index.php/PulseAudio/Examples#PulseAudio_over_network). 

In addition it offers some quite intuitive graphical user interfaces,
like **pavucontrol** (volume control and sound card selection),
**paprefs** (network access), and **pasystray** (status bar icon for
quick control). Usually these programs already deal with all
configurations you are interested in. 

Alternatively you can interact with PulseAudio via the command line in
the following way. 

- *pulseaudio -k* or *killall pulseaudio* - Stopping the PulseAudio
  server. If 'autospawn' is activated, the sound server will restart
  as soon as any application on your computer tries to connect
  with it. You can override this behavior by changing your local copy
  (*~/.config/pulse/client.conf*) of the */etc/pulse/client.conf*
  file. 
- *pulseaudio -D* - Starts the server as a daemon (it will run in the
  background and will continue even if you close the command line) 
- *paplay* - PulseAudio's version of ALSA's *aplay*
- *pacmd* - Will open an interactive shell to control the PulseAudio
  server 

For a complete list of all *pacmd* commands run *man pulse-cli-syntax*
in your bash. 

PulseAudio itself is controlled via four different script located in
*/etc/pulse*. If you intend to alter their content, please make a
local copy in *~/.config/pulse* and edit those files instead. The
*daemon.conf* file sets the basic parameters of the sound server, like
the sample rate, their format, and the handling of system resources,
while the *client.conf* file controls the default behavior of how
application will interact with the PulseAudio server. *default.conf*
and *system.conf* are basically compilations of commands available
through *pacmd* which will be executed on startup of the sound
server. The 'system' way of startup is an alternative barely ever used
(but if you have a static command line device, this one might be
interesting for you). 

Check out the [official
documentation](https://freedesktop.org/wiki/Software/PulseAudio/Documentation/),
[ArchLinux wiki page](https://wiki.archlinux.org/index.php/PulseAudio)
and the corresponding
[configuration](https://wiki.archlinux.org/index.php/PulseAudio/Configuration)
and
[troubleshooting](https://wiki.archlinux.org/index.php/PulseAudio/Troubleshooting)
guide as well as the
[examples](https://wiki.archlinux.org/index.php/PulseAudio/Examples). 

# The JACK sound server

The [Jack](http://jackaudio.org/) sound server is the one of choice
whenever you intend to establish a more sophisticated 
workflow. It handles the access of the sound card via
[callbacks](https://en.wikipedia.org/wiki/Callback_(computer_programming)),
what not just reduces the overall latency significantly but also
ensures that all the different programs in your effect chain will be
called in order and are synchronized. So you can e.g. set your
recording application as time master and your drum sequencer as
slave. This way you will have a drum playback whenever you start
your recording session without integrating it into the recording
program itself. 

One of the most convenient ways to [configure
JACK](http://libremusicproduction.com/articles/demystifying-jack-%E2%80%93-beginners-guide-getting-started-jack)
is to use [QJackCtl](https://qjackctl.sourceforge.io/) or as an
alternative
[Cadence](http://kxstudio.linuxaudio.org/Applications:Cadence) and its
siblings from the [KXStudio](http://kxstudio.linuxaudio.org/)
suite. For a more detailed configuration please have a look into the
[official
wiki](https://github.com/jackaudio/jackaudio.github.com/wiki) or
[ArchLinux's
take](https://wiki.archlinux.org/index.php/JACK_Audio_Connection_Kit). 

A running JACK server does not necessarily return any audio. It
instead serves as a convenience layer within your system all programs
can both sent audio to and receive specific audio from. In other
words: you can pipe the output of an arbitrary
[JACK-aware](http://jackaudio.org/applications/) application into
another one. To establish those connections (between programs as well
as to the system's sink and source) you can either use the connection
manager of QJackCtl or an external one like
[Patchage](http://drobilla.net/software/patchage). Worth mentioning in
the context of the graphical configuration and controlling of you JACK
server are also [JackEQ](http://djcj.org/jackeq/), [JACK
Rack](http://jack-rack.sourceforge.net/), and the [Non Session
Manager](http://non.tuxfamily.org/session-manager/doc/MANUAL.html). 

# The interplay between PulseAudio and JACK

Depending on your configuration at home you might find both the
PulseAudio and JACK sound server attractive, each for a different
scenario. Fortunately there are a number of options how those two can
[play together](http://jackaudio.org/faq/pulseaudio_and_jack.html). 

I am for example using my laptop with an external USB sound card for
recording audio. I do not really like the idea of using a JACK setup
running after system startup with my external sound card as
default. The moment the card is not attached to my laptop anymore I
have reconfigure the setup manually. Instead I can recommend to use
the 4th option: to suspend PulseAudio when one starts JACK to record
some audio. 

In *Setting > Server Prefix* in *QJackCtrl* enter *pasuspender --
jack_control start*. Instead of the classical JACK daemon *jackd* this
approach is using [D-Bus](https://en.wikipedia.org/wiki/D-Bus) for a
smoother
[transition](https://github.com/jackaudio/jackaudio.github.com/wiki/JackDbusPackaging)
between JACK and PulseAudio. To also have a smooth transition back to
PulseAudio you can use the [following
script](https://github.com/theGreatWhiteShark/blog-resources/blob/master/music/recording-audio-using-Linux-systems-II/jack-shutdown-script.sh)
in Options > Scripting > Execute script after shutdown.

Hint: the configuration file for *jackd* is located in *~/.jackdrc*
and the corresponding one for *jackdbus* in
*~/.config/jack/conf.xml*. 




