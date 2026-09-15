Hi, this is Stephane from Conduktor,

and in this lecture, we're going to look

at how to send okay messages in Kafka with keys.

So we're going to send non-null keys

to the Kafka topic and then we'll observe the behavior.

That same key goes to the same partition, you remember?

And so what happens?

Well, the key is going to be an ID we define

and then the data

with the same key will always go to the same partition.

Okay?

So this is the same when we had this truck_id

and the truck_id_123 was always going to be

in partition zero

and truck_id_345 always going to be in partition one.

So let's observe this behavior

by adding a little bit of programming.

Okay, so let's duplicate the ProducerDemoWithCallback

and I'm going to call it ProducerDemoKeys.

Next, I'm going to scroll down.

I will remove this batch size.

I will remove the partitioner class

because we don't need it.

I don't need this for loop.

I will just loop on 10 messages back with my i

and I will also remove anything related to sleeping.

So now my code looks good, I believe,

and I go back one level of tabs and we're good.

Okay, so now we're going to be sending some keys.

So to do so, first, let's go

and create, externalize some things.

So the string topic equals demo_java.

And then we're going to say

that the key is going to be id_, and then i.

So id_1, id_2, id_3, id_4, and so on.

And then the value is a string as well.

And the value, we have it right here.

It's hello world plus i.

So let's have it here.

Okay.

And what we want to see

is that the same keys goes to the same partition.

So how do we do this?

Well, first of all, in this ProducerRecord,

I'm going to edit it and I'm going to add the key.

So I'm going to replace the arguments

by topic, key, and value.

So now we have three arguments

and that's why I externalize them.

So we have topic, key, and value.

And in the callback itself now, I'm just going to strip it

to the most important information.

So we have this most important thing

is going to be the key and the partition.

So I'm going to have key is metadata.key.

The key itself, sorry.

So I'm going to just say key.

And then the other thing that's important is the partition.

So key is there

and then I'm going to remove this new line as well.

I don't need it.

And I'm going to have partition as a space

and a level.

Okay, partition being equals to metadata, the partition.

Just to really isolate as much

as possible the information we need.

And we're going to run this twice.

So I can actually have a external for loop,

of for int j equals zero, and then j less than two.

J++.

We run the same command.

So that means that we're going to produce multiple message

with the same key and we'll see whether

or not they end up in the same partition.

So let's run this code right now.

And we start seeing some outputs.

So my first batch is my first 10 messages.

So we see that id_0 goes to partition one,

id_8 goes to partition one.

And then again, things get sent very quickly.

Actually, I should probably add a sleep in there

just to send the batch away.

So I will have Thread.sleep

for 500 milliseconds just to separate my two batches.

And I will surround this too with try catch

and I will also have a little bit.

Okay, we're good.

That should be good.

So now we actually going to produce this again.

And observe the behavior we want.

Okay, so it's better.

So we have id_1, id_3, and id_6.

They go to partition zero.

We have id_2, id_4, and id_5, 7 and 9.

They go to partition two.

And we have id_0, 8 that go to partition one.

And then we send the second batch.

So we send again, id_ 2, we send again, id_4, id_5.

And as you can see, these IDs two, four, and five that go

to partition two are the exact same two, four

and five that went to partition two before and so on.

So id_7, goed to partition two,

id_9 go to partition two, and so on.

So we can see here,

and we've demonstrated

that the same key goes to the same partition.

And we've also seen as part

of this lecture how to send a key in a producer record.

And that's something you can verify in here

in the Conduktor console.

If we have a look at some messages,

we can see now that the key gets sent.

So id_0, hello world 0, id_8, hello world 8.

And then if you go to the metadata,

you can have a look at the partition as well.

All right, so that's it for this lecture.

I hope you liked it, and I will see you in the next lecture.
