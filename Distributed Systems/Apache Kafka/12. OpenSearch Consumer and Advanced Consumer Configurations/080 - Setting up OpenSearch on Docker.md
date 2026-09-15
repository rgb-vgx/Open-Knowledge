Hi, this is Stephane from Conduktor

and welcome to this lecture where I'm going to

show you how to start open search project with Docker.

So I've created this Docker to compose yml file

and you may have already these signs

in your IntelliJ Community IDEA.

If not, you need to go and install a plugin.

So to do this,

you need to go to preferences

and then you go to plugins.

And in this plugin,

you will type in Docker

and you will find the Docker plugin

and click on install.

This is just to enable you to use Docker that are clear

from IntelliJ which is quite nice.

And then make sure you have Docker started.

And then the next thing you have to do

is just click on these two arrows,

and then you can start your Kafka

consumer elastic search,

and start your containers.

And the goal of this

is just to have two things started

on your computer.

The number one thing to be starting is open search

which is going to be your database.

And the other one is open search dashboards

which is gonna be able to give us a console access

to the database.

So let's test that everything is working.

So number one,

I can go to my web browser

and I can type local host 9200.

And this is gonna give me this JSON output

saying that, yes,

my open search version is correct.

And so everything looks good.

I did set up a few properties in here

to have a single node.

So, this is, of course, good.

Plugin security disabled: true.

So to disable any sort of https

and logins because this will give us some problems,

otherwise in our code.

We are in development mode anyway.

And finally this,

override main response version: true

is necessary when we get to the Kafka connect version.

This is so that the version number is 7.10.2

available here and not the 1.2.4.

So leave it as is,

but everything like here is expected.

Next we have open search dashboards.

So, it's available at local hosts

and then 5601.

And then it's going to say,

loading open search dashboards,

going to give you a welcome

and then you can just explore on my own.

And the one thing we're going to use for this,

is going to go to the Dev tools

and then on the Dev tools,

we get this console.

Okay?

So, this is the URL that I copied right here.

You can copy this URL

and base it as well if you wanna get to it quickly.

But this is going to allow us

to run REST API queries against Elasticsearch.

All right?

So once you have this running,

you're good to go

and you can go straight into the programming section.

If you don't want to use Docker

or Docker is too complicated for you,

I will show you

in the next lecture,

how to use Bonsai to get started.
