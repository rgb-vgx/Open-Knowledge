Hi, this Difen from Conduktor.

And in this lecture

we're going to practice using open search,

which is the same as elastic search.

Okay. We'll use the rest API using open search dashboards

or the online console at bonsai.io to send some commands

and see how elastic search or open search works.

We're going to follow this tutorial right here.

So let's go to the URL.

So I have opened the quick start instruction

on the right hand side, and we're going to

customize them a little bit just to make sure they work both

on this console right here and this console right here.

Okay.

So

we're going to first run a session

to get information about opensource.

So you get on slash and then empty content.

You click on play and then you have access

to some information around open search.

Same for here

for the dev tools what you can do is

you can do just get star

and then click to send request.

And it's again

getting to give you some information around open search.

So far so good.

Alright.

Next, we can create our first index.

So indexes are where data is going to be stored

in open search.

And so for this, we need to look at this command

and we go to

slash my first index

and it has to be a put.

So let's do

put

slash my first index

and press click to send request.

And as you can see it's going to create my first index.

It was acknowledged and it was created.

So this worked on open search dashboards.

And if you do a put

here of my first index and then click

on the play button again, the index is also created. Okay.

So both these things worked.

Now we can add some data to the newly created index.

So we can send some JSON documents

into the index to be indexed.

Of course.

So

we'll go to

slash my first index slash

underscore doc slash one to create a doc with Id one.

So slash my first index slash core doc slash one.

It's going to create

a document with Id one in my first index.

And then for the content type, it's JSON.

We're going to specify it.

And here we can copy all of this, which is the JSON.

So I'll copy it, paste it here.

So there's a description to be or not to be.

That is the question.

Cool. We press on play.

And then here we go.

The result was that it was created it, and then in it,

we have access to some information.

Alright.

So this is good.

This worked here.

So we can just copy and paste that here.

And then we need to do a put and then add

in the JSON document right under.

Click on play.

And yes, again, it was created. Cool

Now we can retrieve the data to make sure

that it was added properly. And to do so,

we need to do a get.

We don't need any Jason, so I can remove this.

We press click on send and here

send

and now we have some information.

So this belongs to the index.

my first index. The ID is one.

And then we have the source

with the source of the document, which contains the JSON

we just sent.

So description to be or not to be.

That is the question.

And this request right here is also valid here.

So get, and were now going to remove the content

and then play.

And as well

we get some source information with the description.

So we're about to add some data to retrieve some data

and then we can delete the documents.

So we just do a delete right here,

play and it has been deleted. Results

deleted. Good and here as well.

I do a delete

play and then it has been deleted as well.

Very good.

And finally, we can also, if you wanted to delete the index

so you remove this,

you delete the index

and then you remove this

and the index has been deleted.

So it looks like a very simple database operation.

So we create an index, we add some data

we retrieve the data, we delete the data

and finally we delete the index.

Okay. So fairly easy, but this is a good introduction

to elastic search or open search, because then

in the next lecture, I'm going to show you how to do this

from a

Java code.

And this is where we'll start writing some code to take data

from Kafka and send it to open search.

Alright.

So that's it for this lecture.

I hope you liked it.

And I will see you in the next lecture.
