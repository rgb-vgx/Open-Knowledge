Hi, this is Stephane from Conduktor,

and we are going to set up our

Kafka consumer Opensearch projects in this lecture.

So I create a new module.

I go with Gradle, Java, and then I will name it

Kafka

consumer

Opensearch,

and this is necessary

because we're going to have our files in this project.

Okay so we're good to go.

Next, I'm going to have two ways

to start Opensearch on my-

on this project.

Okay, on this course.

We can either use Docker

or we can use a managed Opensearch.

So to do the Docker way

what I'm going to do is I'm going to leave right here

a Docker composed file.

So Docker-compose dot yml.

Now, if you don't know Docker, that's fine,

you can just skip that and go

to using Bonsai to create your elastic search

your open search, excuse me, cluster.

Okay, but if you like Docker

then you will for sure appreciate this file.

So this file can find directly

on the GitHub project of this course.

So we have created this file

and I will show you how to use it in the next lectures.

Okay, in the meantime

we need to set up our dependencies for our project.

So this is a Kafka project.

So let's go into Kafka basics

and then copy my dependencies from here

into my build dot Gradle file.

Okay, so this is good.

Now other dependencies I need to set up

are going to be around the Opensearch rest clients.

So what I'm going to do is just go over here

and type Opensearch high level rest clients

and then I will type it Maven as well.

So we have this Maven repository,

Opensearch-rest-high-level-client, this is perfect.

We're going to choose the latest version

in the one dot X type of realm.

So I know that 1 dot 2 dot 4 is working.

So this is the one I'm going to use,

and we're going to use the Gradle Groovy DSL.

I'll go copy this, going back into my code

and I will paste this in, okay.

So this is the Opensearch dependency,

and I can just copy this page actually,

just to have a link to it.

Okay.

Next we need the JSON

with a G GSON from Google.

And this is to deal with

JSON manipulations of objects in our codes.

So I will copy this one,

use the Gradle Groovy DSL

and paste this in

as well as copy the URL so we can get back

to it if we need to.

Okay, so once I have this, I will click

on the little load Gradle changes icon,

which is going to build a model,

download my dependencies, and then

we're good to go.

Finally, we're going to create

our main Java class, okay, for this.

And then we're going to click on the right click

new Java class.

It's going to be an Opensearch consumer

and the package is

io.Conduktor.demos.kafka.opensearch dot this

Okay, perfect.

So we have this class ready.

I'm going to have the main, press tab

and run this code just to see if everything is good

And the code is running.

Perfect.

So now we have set up our projects for

the Kafka consumer Opensearch implementation.

We have set up our dependencies.

We have the Docker composed file if we ever need to.

So we're good to go.

And I will see you in the next lecture to start setting

up Opensearch on Docker or using Bonsai.
