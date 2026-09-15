Hi and welcome to this lecture

in which we will make our consumer idempotent.

So the reason our consumer is not idempotent

right now is that in case we see the same message twice,

it will get new ID

because we don't send any ID right now

to open search.

And so therefore,

if we see the same message twice,

it will be inserted twice into open search,

which may not be a behavior we want.

We may not want to have duplicates

into open search and therefore we need

to send the ID into open search.

How?

Well, we have two different ways, okay?

So we have two strategy.

The strategy one

is to define an ID

using Kafka record coordinates.

What do I mean by that?

Well, we can say string ID equals,

and then the record dot, excuse me,

the record dot topic

plus the record dot partition plus

the record dot offsets.

Well, this is unique

because yes, there's going to be only one message

that has a defined topic, partition and offsets.

So no matter what,

even if the message itself does not contain any ID,

then Kafka will contain a coordinate

of that record and we can use this

as an ID when inserting it

into our target database.

So this is strategy one and we can use it.

And if we do so, then we need

to add the ID into the index request.

And to do so, you just add a new line right here.

You dot ID and then we pass in the ID.

So that's strategy number one.

And it will work fine.

But the better strategy is

that if your data itself provides you

with an ID, then use that.

So let's have a look at our data

and if we look at one of these messages,

for example, and do a drill down in it,

as you can see there is a meta ID field in here.

So this ID field right here

represents the ID that we're going to use

for our program.

You'll notice there's another ID right here

but this ID in my experience is not there

on every single message.

So we're going to keep

just doing the ID underneath meta, okay?

So that means that we need to create a function

that is going to extract the ID.

So therefore, I can do string ID

equals extract ID.

And we need to pass into json.

So record dot value with parenthesis.

And I'm going to remove this.

This is my strategy two,

where we extract the ID from the json value.

So now we need to write this function extract id.

So let's go up outside of our main.

And in here I'm going

to do a private static string called Extract ID

that gets a string Json as an input.

And next we need to use a library from Google

to actually deal with extracting the ID.

So therefore what I'm going to do is

I'm going to do return and this is directly

from the gson library.

So we use a Json Parser

and make sure you import com.google.gson.

Then we can do parse string json.

And then we do get as a json object

because well this string,

everything here is a json object.

Then we need to go one level down.

So we do dot get and then meta.

And meta is right here.

This is meta.

And again, this is a json object.

So let's do dot get as json object.

Then dot get id well because the ID is

with a meta and the ID itself is a string.

So in here what I can do is dot get as string.

And here we go.

We have found a way to extract the ID.

So this is good.

We are here.

Scrolling down,

we extract the ID right here,

we add it into our index request

and then in our index response, we get this ID.

And so therefore that means that

if we see twice the same message,

elastic search is just going to update the one

in place because we have provided an ID.

So it's quite nice.

Now if I run my open search consumer

just to try this out,

as we can see the IDs right

here are good looking.

They're the ones we expect

and they are coming directly from our data sets.

Okay, so this is pretty nice.

It works really, really nicely.

And now if we were to, for example,

rerun our consumer because maybe these offsets

have not been committed.

These offsets of these messages

have not been committed.

When the rerun our code,

we're going to find the same ID.

And open search is smart enough to just update

and not have duplicates.

So effectively what we've done here is

that we've made our consumer idempotent

and therefore we are in

at least once plus idempotent

which means effectively once,

effectively exactly once setting.

Okay?

So pretty cool.

I hope you liked it

and I will see you in the next lecture.
