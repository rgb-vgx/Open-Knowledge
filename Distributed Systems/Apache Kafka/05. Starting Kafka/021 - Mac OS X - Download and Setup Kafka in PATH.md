Hi, this is Stefan from Conductor

and in this lecture we're going

to set up the Kafka binaries.

So this step is needed

even if you have used Conductor and Docker to start Kafka.

This is so that we can run Kafka CLI commands

directly from our computer against our Kafka cluster.

So for this,

we're going to install the latest Java stable version.

So JDK version 21.

We're going to install Kafka from this webpage.

We will extract the content on your Mac.

We'll set up the $PATH environment variables

for easy access to the Kafka binaries

and we'll be good to go.

Note that all these steps can be replaced

with the brew command.

And I will show this after in other videos,

but I want show you first of all the manual method.

So let's get started.

So here I'm going to install Java first.

So I'm gonna type java jdk corretto amazon.

And I really like Amazon Corretto

because Amazon Corretto

gives us production-ready distributions of OpenJDK

and you can install them easily.

So you go on the website of Amazon Corretto

and then you download the latest LTS version.

So here it's Download Corretto 21,

and that should be good to go.

And then in there you have the list of all the JDK versions.

So you scroll down and I want to use macOS x,

this one with this architecture, this is fine.

And you click on it, then you allow it,

this is going to download it, and then you install it.

Okay, so now this is not the right one.

So if you get this prompt, actually,

you probably need to install with the Rosetta prompt.

You need to install the other one.

So the aarch64.

So let's try again.

And now we're good to go.

So this installed Amazon Corretto natively on your computer.

All right, so now we're good to go.

This is because I have a Mac version with a M.

Okay, so how do we make sure that this is installed?

Well, I'm going to just open the Terminal,

so Launchpad and then I'm going to open a Terminal.

And if I type in, so I'm going to zoom in,

java --version.

As you can see I've opened JDK version 21.

This is running Corretto, so this part is good to go.

Okay, so next we're going to install Kafka.

So I will just type apache kafka download.

And here we have the version 4.0.

So this is the one that I want to download minimum.

And I'm going to download the binary.

So you click here on Binary downloads.

And we allow this.

All right, so my Kafka is now downloaded

so I can just look for it in my downloads page

and I can just double click on it to extract it.

So now this has been extracted with its files.

Now I want to move this one level up.

So I will just copy it

and I press Command + Up to go one level up

in this directory

and then Command + V to paste it.

And the idea now is that my Kafka

is in my top level directory under stefanemaarek.

So how do I make sure, well here if I type pwd,

this is the current directory, /Users/stefanemaarek,

and if I type ls,

I can see that I find my Kafka directory in there.

So that's pretty good.

And now we want to set up the $PATH environment variables,

because if you look in this directory under the bin folder,

you will find a lot of .sh files,

these .sh files right here.

And they're very handy

to allow you to start the CLI commands

and to start a Kafka server if you want to.

So you want to add those to the path

so we can invoke them directly from the CLI.

Okay, so you may ask me, "What's the path

and why do I need it?"

Well, if I wanted to start a Kafka command,

I could just do like this

and then I will choose the Kafka folder

then bin and for example, kafka-topics.sh.

So this is a way for me to launch the Kafka topics file

command directly from the bin folder in this Kafka.

So if I press enter, as you can see,

here the command is returning some output,

we'll learn how to use it later.

But what I would like to just do

is to just write kafka-topics.sh directly and have it work.

But right now as you can see, it says command not found.

So I need to set up the path.

So that's fairly easy.

The first thing I'm going to do

is open a new tab on this, Command + T.

So we're going to edit a file called .zshrc,

.zshrc.

So you do that now, and we're going to create this file.

And next we need to set up the path.

So let's go into our Kafka directory

and into the bin directory,

we type pwd and we get the full path of our bin directory.

And now the only thing I have to do is to write

PATH="$PATH:

and then we paste in the path we just got.

So you write this line right here,

remember where the quote and the dollar signs go.

Then you do Ctrl + X and Y to save, press Enter,

make sure that this has been saved by doing a cat .zshrc

to see that we have this indeed.

And what I'm going to do now is close both my Terminals

and I'm going to just open a new Terminal.

So let's go ahead and open a Terminal right here.

I'll zoom in again.

And now if I type kafka-topics.sh,

as you can see now I don't have a command not found,

I have this command right here.

So that means that my path has been set up successfully

and I can run the Kafka commands.

I just type kafka- and then command,

tab, sorry for it to complete,

and I have all these Kafka commands available to me

that can run directly from anywhere on my Terminal.

So that's perfect.

So if you've started Kafka with Conductor already,

you're good to go.

You have the CLI tool installed on your computer.

And if you haven't,

I will show you in the next lecture

how to start Kafka using now the CLI tools.

So I will see you in the next lecture.
