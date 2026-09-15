Hi, this is Stephane Maarek from Conduktor,

and in this lecture

we're going to start Kafka and Zookeeper

as well as the Schema Registry and Conduktor platform,

using something called Docker Compose.

So, Docker Compose is a way

for you to start multiple Docker containers,

and the reason I'm doing this is that

because I want us to use a localhost environment

comprised of Zookeeper and Kafka,

but I also want to use the Schema Registry,

and I also want to use Conduktor platform,

and doing the setup without Docker Compose

would be a great, great pain.

So, I want us to do this,

this way you can follow the lectures,

you can skip this step if you just want Kafka

and Zookeeper on localhosts without a UI.

In that case, you just started using the Command Line,

but if you want to follow along with me and use the UI,

stop Kafka and stop Zookeeper,

so that they're not running,

and then you go to the Docker website

where you can install Docker for Mac,

Docker for Windows, or Docker for Linux.

And when you're done with the installation

please make sure that Docker is running,

and when Docker is running, you'll see something like this.

So, you may not have as much data as me,

but you'll see that Docker is running and we're good.

And then from this page, you're gonna click on Services,

the two chevrons here, to play,

and it's going to download the containers,

and then it's going to start them.

So, I've already downloaded them,

so it's going to be a little bit quicker,

and I will show you in a second.

So, we have here, these four services that are running.

Okay, we see the Conduktor platform,

the Kafka Schema Registry, Kafka1, and Zoo1.

So, this starts everything for you,

and this comes preconfigured,

and then, if you go under your logs

for the Conduktor platform,

you should see something like this,

which means that Conduktor is running.

So, back into your web browser.

Now, how do you access Conduktor?

Well, the access Conduktor badge is going

to localhost Port 8080,

and by refreshing it, you have this page,

the login is admin@conduktor.io

and the password is admin.

And this is how you connect to Conduktor.

So, you can find the password in here.

So, if you scroll down in Docker Compose,

excuse me, and you look at the bottom,

you will find that we set the admin@conduktor.io

as the admin email, and admin as the password.

So, now we have this running.

So, we are on localhost 8080.

This is where Conduktor is normally going to be running,

and by default, if you're go into console,

you're connected to my local Kafka cluster,

which has been preconfigured,

and you can do anything you want from there.

On top of it, you are able to connect

to Kafka on port 80, on port 9092, just as usual.

So, you can do everything you've done with the CLI so far,

as well as use the Conduktor UI but on localhost.

So, it's a bit of a more involved setup

but it's good for you to see a Docker setup, as well.

So, once you've done that,

you're good to go to the programming section,

and I will be running everything

against my localhost so you can follow along.

All right, that's it.

I hope you liked it, and I will see you in the next lecture.
