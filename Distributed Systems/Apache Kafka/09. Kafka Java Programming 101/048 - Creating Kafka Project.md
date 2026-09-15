Hi, this is Stéphane from Conduktor

and welcome to this lecture.

So in this lecture, we're going to set up our Kafka project

with a Java language to start programming against Kafka.

And to do so, prerequisites is that

you should have downloaded and

installed IntelliJ Community IDEA.

This is the development environment

I'm going to use to program.

And you can use the one you want, if you wanted to.

If you're a VS Code fan or if you're an Eclipse fan,

you can do this but it will be harder for you

to follow along with me.

Also, we need to install Java 11 JDK.

So, I like Amazon Corretto 11, so you can Google it

and find link for Linux, Windows, or Mac, okay?

But if you have, for example,

the Oracle Java JDK for version 11, it's fine as well.

If you go, as well, for say, version 17,

I think it's good as well, but I know that 11 is working.

This is why I recommend you to install Java 11 JDK.

Next is, there's a question sometimes when you start

with a Java project, people ask me,

"should I start with Maven or with Gradle?"

So I prefer to use Gradle in this instance, for this course,

because I find it easier to write and easier to read,

and it will lead to less syntax errors

and less errors overall.

If you certainly wish to use Maven

because you're a Maven expert,

then I have written some instructions on my website,

Conduktor.io/kafka, and then you can find how to

create a Kafka project using Maven.

And either way, you know, either if you use Gradle or Maven,

the code will be the same

and your Java project should work the same.

So in this section, what I'm going to do

is that I'm going to set up our project using Gradle

and get back to you.

Okay, so I've opened IntelliJ IDEA

and I'm going to click on New Project.

Now, on the left hand side,

I'm greeted with a couple options.

You may see less, but you should have Gradle as an option.

And then I will choose Java for my Gradle.

For the Project SDK, make sure you select, for example,

Corretto 11, if you've installed JDK 11

through Amazon Corretto, or choose a JDK you just installed

through this dropdown.

For me, I will keep it as Corretto 11.

I'll click on Next, and then you have to give it a name.

So I'll choose kafka-beginners-course,

and then place it on a location on your computer.

In terms of the Artifact Coordinates, you can specify them.

Then for GroupId, I will enter io.Conduktor.demos.

And for the ArtifactId, I will keep it as

kafka-beginners-course, as well as the Version,

I will keep it as 1.0-SNAPSHOT.

So I'll finish it.

And this is creating a new project for me

that I can find right here.

So next, it's gonna take a little bit of time

for Gradle to synchronize,

but you're going to see a couple of folders appearing

on the left hand side.

Now I like to create subprojects for this course,

just to keep things organized.

So we're actually not going to use this source directory

with main and test.

We're going to actually delete it.

So I'm going to go ahead and delete this one.

And this is just a very special step

for me to set up subprojects, okay?

And then I'll right-click on kafka-beginners-course.

I will do New, and then Module.

And yet again, I'm going to use Gradle Java version 11,

okay?

And next, I'm going to click on Next

and bring a new project, okay?

This one is going to be called kafka-basics

because we'll start to see first the kafka-basics.

The GroupId is still the same

and the ArtifactId is now kafka-basics.

So we'll finish this.

And now you see underneath now of my kafka-beginners-course,

there is a kafka-basics.

Now it's very possible that IntelliJ will keep on recreating

source main and test for me,

but this folder you should not use, okay?

You should use the one within kafka-basics,

and then we have a build.gradle file in it.

So don't get mistaken.

Use the build.gradle file in the kafka-basics directory.

Okay. So next, once I've done that,

I need to first pull in the Kafka dependencies, okay?

So in this build.gradle file,

I'm going to add the Kafka dependencies

so we can start using Apache Kafka.

So to do so, I'm going to go on Google

and I will type "kafka maven", and then enter.

So I get the org.apache.kafka repository on Maven.

I will click on kafka-clients, okay?

Make sure the kafka-clients one.

And then you see, you get some information.

The latest version is 3.1.0.

So I'm going to click on 3.1.0,

and then I will choose the Gradle (Short).

You can choose Gradle long or Gradle (Short).

I'll choose the Gradle (Short).

And I will copy this entire BLOB of text right here

that I will paste.

And so, we need to paste it under our dependencies.

So right underneath the dependencies block right here,

I can paste this one.

So this one represents the kafka-clients.

And we have two more dependencies,

their logging dependencies, that we should be getting.

So to do, we're going to go left

and the first one is called slf4j api.

So, here it is.

So I'm going to take slf4j-api.

Again, take the latest version.

I will pick the version 1.7.36.

I will choose a non-beta one, okay?

So this is good.

I'll use the Gradle (Short)

and I will paste this one here, okay?

And then finally, I need to get SLF4J simple

and this is for, again, logging.

So I'll type in slf4j simple.

And then, again, choose the exact same version.

Copy this and paste it in here.

Great.

I don't need to test my code right now,

so I will remove these implementations of the units.

And one last thing you need to change is that

here it says "testImplementation".

So you copy it and you just have it as "implementation".

So the three dependencies are implementation.

So once we have this, then we've set up our Java project

with Gradle and we need to pull in these dependencies.

So to do so, on the right hand side, you may see here

there is, like, Load Gradle Changes.

You can also access it directly on the right hand side.

There's a Gradle.

And then there is this, like, a refresh button

to reload all Gradle projects.

So what it's going to do is it's going to actually

pull your dependencies as External Libraries, okay?

So how do you know this?

Well, under...

Sorry. Here, External Libraries.

On the left hand side, you should start seeing some Kafka.

So as you can see here,

I have some Kafka clients available to me

and I have slf4j-api and simple.

So this is thanks to reloading the Gradle projects.

So remember, if you don't find a dependency,

remember to reload these Gradle projects.

Okay, so we are almost there.

Now to finish the setup,

I'm going to go under kafka-basics,

source, main, and then Java.

And underneath here, I'm going to create a New,

and then it has to be a Java Class,

and I will name it io.Conduktor.demos.kafka.ProducerDemo.

So this is going to create for me the folder

io.Conduktor.demos.kafka

under class ProducerDemo.

And I have my first class being created.

Now we just need to make sure that it works.

So I'm going to type "main', and then tab.

So this is a little shortcut.

So, you do M-A-I-N, and then you can press enter

or you can press the tab key.

And this is automatically going to generate

the public static void, okay?

Which is, like, the class you need to start

running some code in Java.

And then I'll just do a System.out.println("Hello world").

This is just to make sure that

your Java code is working, okay?

You add a semicolon at the end,

and then we can press one of these arrows.

So I'll press this one, Run 'ProducerDemo.Main()'.

And as you can see, the "Hello World" is being run.

And the last thing I'm going to do is

go under IntelliJ IDEA, Preference,

and then under Build, Execution, Deployment,

under Build Tools, the first one, and Gradle,

I'm going to choose to build and run using IntelliJ IDEA.

This is because I found it to be working better when we go

into deeper into the programming.

So it's just a little trick.

So it should be good, anyway, but I'd like to build and run

using IntelliJ IDEA and the run test using Gradle is fine.

I will apply it.

Press enter.

Test one more time that this is working.

So I'm building it and then it's running it.

And then very soon, perfect.

I get the "Hello World" in this kind of window

and I like this kind of window to get my results, okay?

So that's it for this lecture.

We have set up our Kafka project base.

And then in the next lecture,

we're going to get started by writing our producer.
