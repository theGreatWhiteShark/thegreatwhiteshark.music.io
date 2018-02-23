+++
date = "2018-02-23T22:27:35+01:00"
draft = false
comment = true
type = "post"
slug = "moving-to-github"
title = "Moving from Wordpress to Github Pages+Hugo"
description = "I'm moving the blog from Wordpress to Github Pages where I deploy it on my own using the static web package. If you encounter any strange behavior, bugs, bad rendering, or you are not able to follow me or subscribe using RSS, please write me a mail. Sorry for that. I'm still new to this kind of technology :blush:"

+++

I moved my blog from Wordpress to Github Pages. 

In addition, I also decided to split the blog in three different parts. Art, coding, and music are just a little too diverse and I intend to do further posts in all of these subjects.

You can find the blogs via the following links

- [music blog](https://thegreatwhiteshark.github.io/thegreatwhiteshark.music.io/)
- [coding blog](https://thegreatwhiteshark.github.io/thegreatwhiteshark.coding.io/)
- [overall blog](https://thegreatwhiteshark.github.io/)

### Motivation

First of all, I have to say: I had a nice time on Wordpress and it was a great place to start my blog. 

But since I kept writing posts and I still intend to do some major series, the urge to get rid of all the short-comings of Wordpress was getting bigger and bigger. Yes, there are a number of them

- I do not really like the layouts offered by the free version
- There is a very, very limited way of customizing the appearance (at least in the free version)
- Code chunks just look awful and Wordpress fucks up all the indentations and white space
- And most importantly: I have to use this stupid GUI, Word-like editor to write my posts. I'm capable of writing text in a [proper](https://www.gnu.org/software/emacs/) editor. But there is no way to import it. On top of all of that, copying and pasting the whole document tore it apart countless times.

The last point was the most frustrating one. Usually after completing the post it took me another 30-60 minutes, depending of the length of the post, to insert it into the Wordpress editor. Gosh, I'm sick of it. That's why I started to look for alternatives.

## Github Pages + Travis + Hugo
In the end I decided to use [Github Pages](https://pages.github.com/) to host my code. 

In Github you can upload the HTML code for a *static* web page in each and every repository and tell the Github Pages service to serve this content as a web page. This way, you do not see the content of the folders anymore when accessing the repository via a special URL, but the actual web page. On Github you have about 500MB of space without any charges. You can do a lot of blog posts without scratching this limit.

To generate the blog, I needed a [static site generator](https://www.staticgen.com/). I choose [Hugo](http://gohugo.io/) and it was one of the best choices I ever made in software. It is incredibly fast, very simple, and yet powerful enough to let me do whatever I wanted to. Every single little feature I came up with I could implement in no time. The documentation is comprehensive and there a loads of themes to choose from. But most importantly: once you set things up you only have to write posts. No painful formatting and inserting anymore. Even the upload is far more easy: all the figures in your posts are placed within the Hugo project and you upload them all including the post using git. Still not convinced? You can deploy your blog locally while Hugo is watching your files. If you do any changes and save them to file, Hugo will recompile the blog and updates the instance in the browser. For my blog this update needs only 15ms. Isn't that awesome?

But translating markdown and configuration files for Hugo into a static web page with all its different assets and upload the site to Github is not what I wanted. It would be far more preferable to just upload the new markdown files and the blog is updated on its own. This is possible using the [Travis](http://travis-ci.org/) continuous integration. This service gets triggered as soon as you upload content to your Github repository. Then it loads a default virtual machine and runs all the code you specify. In our case we tell Travis to 1. install the latest Hugo version and all additional requirements, 2. mirror the repository containing the Hugo project, 3. generate the static site using Hugo, and 4. to upload the result to a special branch. To enable Travis to push to your repository, I recommend using [encryption via ssh keys](http://rcoedo.com/post/hugo-static-site-generator/).

But why Github? Well, because it is the most prominent one and most of the projects I like to contribute to are hosted there. So it was just the network effect. If you already have a Gitlab account, I would recommend hosting the blog over there instead. I played around with the instance we have at work and it is more advanced and way more easy to handle. There, you do not need a service like Travis. Using the so-called [GitLab runners](https://docs.gitlab.com/runner/) you can perform the deployment of Hugo without an additional service. On top of that, the runners don't have a very limited number of virtual machines like Travis has. They support [Docker](http://docker.com/) instead, which means you can build own custom virtual machine, upload it to [Docker Hub](https://hub.docker.com/) for free, and have a way more faster deployment since there is no need for any installation anymore. Okay, for just using Hugo to compile a web page, you do not need Docker. But for more complicated tasks, like testing your code, this really pays off.

### How to follow?

As with all Github repositories you can *watch* the one corresponding to the blog. Also Hugo includes some RSS capabilities using [feedburner](http://feedburner.com/). 

What about commenting and discussing a post? Hugo also features support for [Disqus](http://disqus.com/). Your readers have to create an account at this site. True. But it is not just for your blog and you can use it with more and more web sites nowadays.

Nevertheless, if you like my blog but have difficulties following me, just send me a mail and we will figure out something :wink:.

